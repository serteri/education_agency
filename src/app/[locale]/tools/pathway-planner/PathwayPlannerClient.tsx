"use client";

import { useState, useMemo, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, Briefcase, Printer, MessageCircle, User, CheckCircle2, X, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { generatePathway, StudyLevel, EnglishLevel, TargetCareer } from "@/constants/pathways";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function PathwayPlannerClient() {
    const t = useTranslations("pathwayPlanner");
    const locale = useLocale() as "en" | "tr";

    // State
    const [currentVisa, setCurrentVisa] = useState<string>("none");
    const [studyLevel, setStudyLevel] = useState<StudyLevel>("highSchool");
    const [englishLevel, setEnglishLevel] = useState<EnglishLevel>("B1-B2");
    const [targetCareer, setTargetCareer] = useState<TargetCareer>("IT");

    // Generate Roadmap
    const pathwaySteps = useMemo(() => generatePathway(studyLevel, englishLevel, targetCareer), [studyLevel, englishLevel, targetCareer]);

    // Compliance Logic: Visa Hopping Risk (485 -> VET is highly restricted)
    const isHighRiskMode = currentVisa === "graduate" && pathwaySteps.some(step => step.type === "vet");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const pdfRef = useRef<HTMLDivElement>(null);

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent(t("cta.whatsappText"));
        window.open(`https://wa.me/61461280387?text=${message}`, '_blank');
    };

    const handleGeneratePdfClick = () => {
        setIsModalOpen(true);
        setIsSuccess(false);
    };

    const handleModalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) return;

        setIsGenerating(true);

        try {
            if (!pdfRef.current) throw new Error("PDF reference not found");

            // Temporary styling for PDF capture
            const element = pdfRef.current;
            element.classList.remove("hidden"); // Ensure it's not display:none if hidden on mobile
            element.style.padding = "40px";
            element.style.width = "800px"; // Fixed width so layout is consistent on PDF

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 800
            });

            element.style.padding = "";
            element.style.width = "";

            const imgData = canvas.toDataURL("image/png");

            // Calculate A4 dimensions
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

            // Add a second page for On-ground Support
            pdf.addPage();
            // We use simple JS PDF text/shapes for the second page so we don't need a huge DOM element
            pdf.setFillColor(10, 25, 47); // Navy
            pdf.rect(0, 0, pdfWidth, 40, "F");
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(24);
            pdf.text(t("pdf.supportTitle"), 20, 25);

            pdf.setTextColor(10, 25, 47);
            pdf.setFontSize(16);
            pdf.text(t("pdf.supportSubtitle"), 20, 60);

            pdf.setFontSize(12);
            pdf.setTextColor(80, 80, 80);
            const textLines = [
                t("pdf.supportText1"),
                t("pdf.supportText2"),
                t("pdf.supportText3")
            ];
            let y = 80;
            textLines.forEach(line => {
                const splitText = pdf.splitTextToSize(line, pdfWidth - 40);
                pdf.text(splitText, 20, y);
                y += 20 * splitText.length;
            });

            // Logo / Footer
            pdf.setTextColor(10, 25, 47);
            pdf.setFontSize(18);
            pdf.text("EduBrisbane", pdfWidth / 2, 280, { align: "center" });

            const pdfBase64 = pdf.output("datauristring");

            const firstStep = pathwaySteps.length > 0 ? pathwaySteps[0].title[locale] : "Pathway Program";

            // Post to API
            const res = await fetch("/api/pathway-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    locale,
                    pdfBase64,
                    firstStepData: firstStep
                })
            });

            if (!res.ok) throw new Error("Failed to send email");

            setIsSuccess(true);

            // Optionally, download the PDF locally for the user too:
            pdf.save("EduBrisbane_PathwayPlanner.pdf");

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("An error occurred while generating your PDF. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    // Helper functions for step visuals
    const getStepIcon = (type: string) => {
        switch (type) {
            case "language": return <MessageCircle size={24} />;
            case "vet": return <BookOpen size={24} />;
            case "higherEd": return <GraduationCap size={24} />;
            case "professional": return <Briefcase size={24} />;
            default: return <CheckCircle2 size={24} />;
        }
    };

    const getStepColor = (type: string) => {
        switch (type) {
            case "language": return "bg-blue-100 text-blue-700 border-blue-200";
            case "vet": return "bg-orange-100 text-orange-700 border-orange-200";
            case "higherEd": return "bg-navy/10 text-navy border-navy/20";
            case "professional": return "bg-green-100 text-green-700 border-green-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="w-full flex flex-col gap-12">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-5xl font-black text-navy mb-6 tracking-tight">
                    {t("title")}
                </h1>
                <p className="text-xl text-navy/70">
                    {t("subtitle")}
                </p>
            </div>

            {/* Inputs / Configurator (Does not display on print) */}
            <div className="print:hidden bg-white rounded-3xl shadow-[0px_8px_32px_rgba(10,25,47,0.06)] border border-navy/5 p-8 flex flex-col gap-8">

                {/* Row 1: Current Visa & Study Level */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Current Visa */}
                    <div className="flex-1">
                        <label className="block text-sm font-bold text-navy/60 uppercase tracking-wider mb-3">
                            {t("inputs.currentVisa.label")}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {(["none", "student", "whv", "graduate"]).map(visa => (
                                <button
                                    key={visa}
                                    onClick={() => setCurrentVisa(visa)}
                                    className={`w-full text-left px-4 py-3 rounded-xl border-2 font-semibold transition-all flex items-center gap-3 text-sm ${currentVisa === visa
                                        ? "border-accent-gold bg-accent-gold/5 text-navy shadow-sm"
                                        : "border-navy/10 hover:border-navy/30 text-navy/70"
                                        }`}
                                >
                                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${currentVisa === visa ? "border-accent-gold" : "border-navy/20"}`}>
                                        {currentVisa === visa && <div className="w-1.5 h-1.5 rounded-full bg-accent-gold" />}
                                    </div>
                                    <span className="leading-tight">{t(`inputs.currentVisa.${visa}`)}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Study Level */}
                    <div className="flex-1">
                        <label className="block text-sm font-bold text-navy/60 uppercase tracking-wider mb-3">
                            {t("inputs.studyLevel.label")}
                        </label>
                        <div className="space-y-3">
                            {(["highSchool", "bachelor", "master"] as StudyLevel[]).map(level => (
                                <button
                                    key={level}
                                    onClick={() => setStudyLevel(level)}
                                    className={`w-full text-left px-5 py-3 rounded-xl border-2 font-semibold transition-all flex items-center gap-3 text-sm ${studyLevel === level
                                        ? "border-accent-gold bg-accent-gold/5 text-navy shadow-sm"
                                        : "border-navy/10 hover:border-navy/30 text-navy/70"
                                        }`}
                                >
                                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${studyLevel === level ? "border-accent-gold" : "border-navy/20"}`}>
                                        {studyLevel === level && <div className="w-1.5 h-1.5 rounded-full bg-accent-gold" />}
                                    </div>
                                    {t(`inputs.studyLevel.${level}`)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="h-px bg-navy/5 w-full" />

                {/* Row 2: English Level & Target Career */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* English Level */}
                    <div className="flex-1">
                        <label className="block text-sm font-bold text-navy/60 uppercase tracking-wider mb-3">
                            {t("inputs.englishLevel.label")}
                        </label>
                        <div className="space-y-3">
                            {(["A1-A2", "B1-B2", "C1-C2"] as EnglishLevel[]).map(level => {
                                const mapKey = level.replace("-", "").toLowerCase() as "a1a2" | "b1b2" | "c1c2";
                                return (
                                    <button
                                        key={level}
                                        onClick={() => setEnglishLevel(level)}
                                        className={`w-full text-left px-5 py-3 rounded-xl border-2 font-semibold transition-all flex items-center gap-3 text-sm ${englishLevel === level
                                            ? "border-accent-gold bg-accent-gold/5 text-navy shadow-sm"
                                            : "border-navy/10 hover:border-navy/30 text-navy/70"
                                            }`}
                                    >
                                        <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${englishLevel === level ? "border-accent-gold" : "border-navy/20"}`}>
                                            {englishLevel === level && <div className="w-1.5 h-1.5 rounded-full bg-accent-gold" />}
                                        </div>
                                        {t(`inputs.englishLevel.${mapKey}`)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Target Career */}
                    <div className="flex-1">
                        <label className="block text-sm font-bold text-navy/60 uppercase tracking-wider mb-3">
                            {t("inputs.targetCareer.label")}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {(["IT", "Health", "Engineering", "Trades"] as TargetCareer[]).map(career => {
                                const mapKey = career.toLowerCase() as "it" | "health" | "engineering" | "trades";
                                return (
                                    <button
                                        key={career}
                                        onClick={() => setTargetCareer(career)}
                                        className={`w-full text-left px-4 py-3 rounded-xl border-2 font-semibold transition-all flex items-center gap-3 text-sm ${targetCareer === career
                                            ? "border-accent-gold bg-accent-gold/5 text-navy shadow-sm"
                                            : "border-navy/10 hover:border-navy/30 text-navy/70"
                                            }`}
                                    >
                                        <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${targetCareer === career ? "border-accent-gold" : "border-navy/20"}`}>
                                            {targetCareer === career && <div className="w-1.5 h-1.5 rounded-full bg-accent-gold" />}
                                        </div>
                                        <span className="leading-tight">{t(`inputs.targetCareer.${mapKey}`)}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Visualizer (Shows on Print) */}
            <div ref={pdfRef} className="bg-white rounded-3xl shadow-xl shadow-navy/5 border border-navy/10 p-8 md:p-12 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sand-light/50 via-white to-white">
                {/* PDF Generation Title */}
                <div className="hidden print:block text-center mb-8 pb-8 border-b-2 border-navy/10">
                    <h2 className="text-3xl font-black text-navy">EduBrisbane Pathway Plan</h2>
                    <p className="text-navy/60 mt-2">Custom generated roadmap for ambitious students.</p>
                </div>

                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-bold text-navy flex items-center gap-3">
                        <User className="text-accent-gold" />
                        {t("roadmap.title")}
                    </h2>

                    {/* CTA Buttons - Hidden on Print */}
                    {!isHighRiskMode && (
                        <div className="hidden md:flex items-center gap-4 print:hidden" data-html2canvas-ignore="true">
                            <button
                                onClick={handleGeneratePdfClick}
                                className="p-3 text-navy hover:text-white hover:bg-navy rounded-xl transition-colors border-2 border-navy/10 hover:border-navy flex items-center gap-2 font-bold text-sm"
                                title={t("cta.printPdf")}
                            >
                                <Printer size={18} />
                                {t("cta.printPdf")}
                            </button>
                            <button
                                onClick={handleWhatsAppClick}
                                className="bg-navy hover:bg-navy-light text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(239,186,63,0.5)]"
                            >
                                <MessageCircle size={16} className="text-accent-gold" />
                                {t("cta.contact")}
                            </button>
                        </div>
                    )}
                </div>

                {/* High Risk Compliance Block */}
                <AnimatePresence>
                    {isHighRiskMode && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-50 border-4 border-red-500 shadow-[8px_8px_0px_0px_#ef4444] rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-6 items-start"
                        >
                            <div className="w-16 h-16 shrink-0 bg-red-100 rounded-2xl border-2 border-red-500 flex items-center justify-center text-red-600">
                                <AlertTriangle size={32} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-red-700 tracking-tight uppercase mb-3">
                                    {t("compliance.highRiskTitle")}
                                </h3>
                                <p className="text-red-900/80 font-bold leading-relaxed mb-4">
                                    {t("compliance.legalWarningBackhopping")}
                                </p>
                                <p className="text-red-700 bg-red-100/50 p-4 rounded-xl border-2 border-red-200 font-semibold mb-6">
                                    {t("compliance.action")}
                                </p>
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="bg-navy hover:bg-navy-light text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-[4px_4px_0px_0px_rgba(10,25,47,0.3)] active:translate-y-1 active:shadow-none"
                                >
                                    {t("cta.contact")}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Animated Timeline */}
                <div className={`relative ${isHighRiskMode ? 'opacity-30 pointer-events-none filter grayscale blur-sm transition-all duration-500' : ''}`}>
                    {/* Main Line connecting steps */}
                    <div className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-1 bg-navy/10 rounded-full md:-translate-x-1/2" />

                    <div className="flex flex-col gap-8">
                        <AnimatePresence mode="popLayout">
                            {pathwaySteps.map((step, index) => {
                                const isEven = index % 2 === 0;

                                return (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index * 0.15, type: "spring" }}
                                        className={`flex flex-col md:flex-row relative items-start md:items-center ${isEven ? "md:flex-row-reverse" : ""}`}
                                    >

                                        {/* Center Icon Node */}
                                        <div className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-accent-gold shadow-[0_0_0_8px_rgba(255,255,255,1)] z-10" />

                                        {/* Step Content */}
                                        <div className={`w-full md:w-1/2 flex pt-2 md:pt-0 pl-16 md:pl-0 ${isEven ? "md:pr-16 md:justify-end" : "md:pl-16 md:justify-start"}`}>
                                            <div className={`w-full max-w-sm rounded-2xl border-2 p-6 flex flex-col gap-3 ${getStepColor(step.type)} shadow-sm relative group hover:-translate-y-1 transition-transform`}>

                                                {/* Arrow Pointer */}
                                                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 bg-inherit transform rotate-45 ${getStepColor(step.type)} border-l-0 border-b-0 ${isEven ? "-right-[9px] border-l-transparent border-b-transparent" : "-left-[9px] border-r-transparent border-t-transparent rotate-[225deg]"}`} />

                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className={`p-3 rounded-xl bg-white/50 backdrop-blur-sm border-2 ${getStepColor(step.type).split(' ')[2]}`}>
                                                        {getStepIcon(step.type)}
                                                    </div>
                                                    <div>
                                                        <span className="text-xs uppercase font-bold opacity-70 mb-1 block">
                                                            {t("roadmap.step")} {index + 1}
                                                        </span>
                                                        <h3 className="text-lg font-black leading-tight">
                                                            {step.title[locale]}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <p className="text-sm opacity-80 font-medium mb-3">
                                                    {step.description[locale]}
                                                </p>

                                                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-current/10">
                                                    <div className="flex items-center gap-1.5 text-xs font-bold">
                                                        <span className="opacity-60 uppercase">{t("roadmap.duration")}:</span>
                                                        <span>{step.duration[locale]}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs font-bold bg-white/50 px-2 py-1 rounded-md">
                                                        <span className="opacity-60">{t("roadmap.visa")}:</span>
                                                        <span>{step.visa}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Mobile Print/CTA (Only visible on small screens to catch bottom scroll) */}
            {!isHighRiskMode && (
                <div className="md:hidden flex flex-col gap-3 print:hidden px-4" data-html2canvas-ignore="true">
                    <button
                        onClick={handleGeneratePdfClick}
                        className="p-4 text-navy font-bold hover:bg-navy/5 rounded-xl transition-colors border-2 border-navy/10 flex items-center justify-center gap-2"
                    >
                        <Printer size={18} />
                        {t("cta.printPdf")}
                    </button>
                    <button
                        onClick={handleWhatsAppClick}
                        className="bg-navy text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(239,186,63,0.5)]"
                    >
                        <MessageCircle size={18} className="text-accent-gold" />
                        {t("cta.contact")}
                    </button>
                </div>
            )}

            {/* Lead Capture Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-navy p-6 flex items-center justify-between text-white">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Sparkles size={20} className="text-accent-gold" />
                                    {t("leadModal.title")}
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6">
                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-8 flex flex-col items-center gap-4"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2">
                                            <CheckCircle2 size={32} />
                                        </div>
                                        <h4 className="text-xl font-black text-navy">{t("leadModal.successTitle")}</h4>
                                        <p className="text-navy/70">{t("leadModal.successDesc")}</p>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="mt-4 w-full bg-navy text-white font-bold py-3 rounded-xl hover:bg-navy-light transition-colors"
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
                                        <p className="text-sm text-navy/70 mb-2 leading-relaxed">
                                            {t("leadModal.subtitle")}
                                        </p>

                                        <div>
                                            <label className="block text-xs font-bold text-navy/60 uppercase mb-1">{t("leadModal.name")}</label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-navy/10 focus:border-navy outline-none transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-navy/60 uppercase mb-1">{t("leadModal.email")}</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-navy/10 focus:border-navy outline-none transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-navy/60 uppercase mb-1">{t("leadModal.phone")} (Optional)</label>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-navy/10 focus:border-navy outline-none transition-colors"
                                                placeholder="+61 400 000 000"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isGenerating}
                                            className="mt-4 w-full bg-navy text-white font-bold py-4 rounded-xl hover:bg-navy-light transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(239,186,63,0.5)] active:translate-y-1 active:shadow-none disabled:opacity-70"
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    {t("leadModal.processing")}
                                                </>
                                            ) : (
                                                <>
                                                    <Printer size={18} className="text-accent-gold" />
                                                    {t("leadModal.submit")}
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
