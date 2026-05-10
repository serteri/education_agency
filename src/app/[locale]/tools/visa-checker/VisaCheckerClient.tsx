"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Wallet, Building2, CheckCircle2, AlertCircle, ChevronRight, ChevronLeft, Bot } from "lucide-react";
import { IMMIGRATION_RULES } from "@/constants/rules";
type Step = 1 | 2 | 3 | 4 | 5; // 5 is results

interface ProfileData {
    english: "high" | "medium" | "low" | null;
    gpa: "high" | "medium" | "low" | null;
    financial: "ready" | "partial" | "need" | null;
    institution: "al1" | "al2" | "al3" | null;
}

export function VisaCheckerClient() {
    const t = useTranslations("tools.visaChecker");

    const [step, setStep] = useState<Step>(1);
    const [data, setData] = useState<ProfileData>({
        english: null,
        gpa: null,
        financial: null,
        institution: null
    });
    const [isCalculating, setIsCalculating] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [phone, setPhone] = useState("");

    const handleSelect = (field: keyof ProfileData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const calculateScore = () => {
        setIsCalculating(true);
        setStep(5);

        // Simple weighted logic for demonstration
        let totalScore = 0;

        // English (30%)
        if (data.english === "high") totalScore += 30;
        else if (data.english === "medium") totalScore += 20;
        else if (data.english === "low") totalScore += 5;

        // GPA (25%)
        if (data.gpa === "high") totalScore += 25;
        else if (data.gpa === "medium") totalScore += 15;
        else if (data.gpa === "low") totalScore += 5;

        // Financial (25%)
        if (data.financial === "ready") totalScore += 25;
        else if (data.financial === "partial") totalScore += 10;
        else if (data.financial === "need") totalScore += 0;

        // Institution (20%)
        if (data.institution === "al1") totalScore += 20;
        else if (data.institution === "al2") totalScore += 15;
        else if (data.institution === "al3") totalScore += 5;

        setTimeout(() => {
            setScore(totalScore);
            setIsCalculating(false);
        }, 2000);
    };

    const nextStep = () => {
        if (step === 4) calculateScore();
        else setStep(prev => (prev + 1) as Step);
    };

    const prevStep = () => {
        if (step > 1) setStep(prev => (prev - 1) as Step);
    };

    const restart = () => {
        setData({ english: null, gpa: null, financial: null, institution: null });
        setScore(null);
        setPhone("");
        setStep(1);
    };

    const triggerPylonChat = () => {
        // Attempt to open PylonChat if it exists on window
        if (typeof window !== "undefined" && (window as any).PylonChat) {
            (window as any).PylonChat.open();
        } else {
            // Fallback: alert or redirect if chat is not ready
            alert("Vize Asistanı başlatılıyor..."); // Placeholder
        }
    };

    const canProceed = () => {
        if (step === 1 && !data.english) return false;
        if (step === 2 && !data.gpa) return false;
        if (step === 3 && !data.financial) return false;
        if (step === 4 && !data.institution) return false;
        return true;
    };

    const renderOptions = (field: keyof ProfileData, icon: React.ReactNode, optionsKey: string) => {
        const options = ["high", "medium", "low"];
        let keys = options;
        if (field === "financial") keys = ["ready", "partial", "need"];
        if (field === "institution") keys = ["al1", "al2", "al3"];

        return (
            <div className="space-y-4 mt-8 w-full max-w-2xl mx-auto">
                <div className="mb-6 flex justify-center text-accent-gold">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-navy text-center mb-2">
                    {t(`questions.${field}Title`)}
                </h3>
                <p className="text-navy/60 text-center mb-8">
                    {t(`questions.${field}Desc`)}
                </p>

                <div className="flex flex-col gap-3">
                    {keys.map((key) => {
                        const isSelected = data[field] === key;
                        return (
                            <button
                                key={key}
                                onClick={() => handleSelect(field, key)}
                                className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-start gap-4
                                    ${isSelected
                                        ? "border-accent-gold bg-accent-gold/5 shadow-[4px_4px_0px_0px_rgba(239,186,63,0.3)]"
                                        : "border-navy/10 hover:border-navy/30 bg-white hover:bg-sand-light/10"
                                    }`}
                            >
                                <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
                                    ${isSelected ? "border-accent-gold" : "border-navy/20"}
                                `}>
                                    {isSelected && <div className="w-3 h-3 bg-accent-gold rounded-full" />}
                                </div>
                                <div>
                                    <h4 className={`font-bold text-lg mb-1 ${isSelected ? "text-navy" : "text-navy/80"}`}>
                                        {t(`questions.${optionsKey}.${key}.label`)}
                                    </h4>
                                    <p className="text-navy/60 text-sm">
                                        {key === "ready" && field === "financial" ?
                                            `${t(`questions.${optionsKey}.${key}.desc`)} (Min $${IMMIGRATION_RULES.financial.mainApplicantLivingCostAUD.toLocaleString()} AUD)` :
                                            t(`questions.${optionsKey}.${key}.desc`)}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-[0px_8px_32px_rgba(10,25,47,0.08)] border border-navy/5 overflow-hidden min-h-[600px] flex flex-col">

            {/* Header / Progress Indicator */}
            {step < 5 && (
                <div className="bg-navy p-6 flex justify-between items-center text-white/50 text-sm font-medium">
                    <span className={step === 1 ? "text-accent-gold font-bold" : ""}>1. {t("steps.english")}</span>
                    <span className={step === 2 ? "text-accent-gold font-bold" : ""}>2. {t("steps.gpa")}</span>
                    <span className={step === 3 ? "text-accent-gold font-bold" : ""}>3. {t("steps.financial")}</span>
                    <span className={step === 4 ? "text-accent-gold font-bold" : ""}>4. {t("steps.institution")}</span>
                </div>
            )}

            {/* Main Content Area */}
            <div className="p-8 md:p-12 flex-grow flex flex-col items-center justify-center relative">
                <AnimatePresence mode="wait">

                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                            {renderOptions("english", <BookOpen size={48} />, "englishOpts")}
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                            {renderOptions("gpa", <GraduationCap size={48} />, "gpaOpts")}
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                            {renderOptions("financial", <Wallet size={48} />, "financialOpts")}
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                            {renderOptions("institution", <Building2 size={48} />, "institutionOpts")}
                        </motion.div>
                    )}

                    {step === 5 && (
                        <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full text-center py-10">
                            {isCalculating ? (
                                <div className="flex flex-col items-center justify-center space-y-6">
                                    <div className="w-20 h-20 border-4 border-navy/10 border-t-accent-gold rounded-full animate-spin" />
                                    <h3 className="text-2xl font-bold text-navy">{t("results.title")}</h3>
                                    <p className="text-navy/60">{t("results.analyzing")}</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center max-w-2xl mx-auto space-y-8">
                                    <h2 className="text-3xl font-extrabold text-navy">{t("results.title")}</h2>

                                    {/* Score Display */}
                                    <div className="relative w-48 h-48 flex items-center justify-center">
                                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-navy/5" />
                                            <motion.circle
                                                initial={{ strokeDasharray: "0 1000" }}
                                                animate={{ strokeDasharray: `${(score || 0) * 5.53} 1000` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                                                strokeLinecap="round"
                                                className={(score || 0) >= 75 ? "text-green-500" : (score || 0) >= 50 ? "text-amber-500" : "text-red-500"}
                                            />
                                        </svg>
                                        <div className="text-center">
                                            <span className="text-5xl font-black text-navy">{score}%</span>
                                            <span className="block text-navy/50 text-xs font-bold uppercase tracking-wider mt-1">{t("results.scoreLabel")}</span>
                                        </div>
                                    </div>

                                    {/* Score Details */}
                                    <div className={`p-6 rounded-2xl border-2 ${(score || 0) >= 75 ? "border-green-500/20 bg-green-500/5" :
                                        (score || 0) >= 50 ? "border-amber-500/20 bg-amber-500/5" :
                                            "border-red-500/20 bg-red-500/5"
                                        }`}>
                                        <h3 className="text-xl font-bold text-navy mb-2">
                                            {score! >= 75 ? t("results.highScore.title") : score! >= 50 ? t("results.mediumScore.title") : t("results.lowScore.title")}
                                        </h3>
                                        <p className="text-navy/70">
                                            {score! >= 75 ? t("results.highScore.desc") : score! >= 50 ? t("results.mediumScore.desc") : t("results.lowScore.desc")}
                                        </p>
                                    </div>

                                    {/* Action Buttons & Lead Capture */}
                                    <div className="flex flex-col items-center gap-4 w-full justify-center pt-8 border-t border-navy/10">

                                        <div className="bg-sand-light/50 border border-navy/5 p-4 rounded-xl text-center mb-2">
                                            <p className="text-navy text-sm font-medium">
                                                {t("results.leadCapture.prompt")}
                                            </p>
                                        </div>

                                        {/* Optional WhatsApp Input */}
                                        <div className="w-full max-w-sm mb-4">
                                            <label htmlFor="whatsapp" className="block text-sm font-bold text-navy mb-2 text-center">
                                                {t("results.leadCapture.label")}
                                            </label>
                                            <input
                                                type="tel"
                                                id="whatsapp"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder={t("results.leadCapture.placeholder")}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-navy/10 focus:border-accent-gold focus:ring-0 outline-none transition-colors text-navy text-center"
                                            />
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                                            <button
                                                onClick={restart}
                                                className="px-6 py-3 rounded-xl border-2 border-navy/10 hover:bg-navy/5 text-navy font-semibold transition-colors w-full sm:w-auto text-sm"
                                            >
                                                {t("results.restart")}
                                            </button>
                                            <button
                                                onClick={triggerPylonChat}
                                                className="px-8 py-4 rounded-xl bg-navy hover:bg-navy-light text-white font-bold transition-all w-full sm:w-auto shadow-[4px_4px_0px_0px_rgba(239,186,63,0.5)] flex items-center justify-center gap-2"
                                            >
                                                <Bot size={20} className="text-accent-gold" />
                                                {t("results.cta.button")}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Dynamic Warnings */}
                                    <div className="w-full flex flex-col gap-2 mt-4 text-left">
                                        {data.english === "low" && data.financial === "need" && (
                                            <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 p-4 rounded-lg border border-red-200 font-medium shadow-sm">
                                                <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                                                <p>{t("results.warnings.criticalBlock") || "CRITICAL RISK: The combination of insufficient funds and low English proficiency brings visa rejection probability to over 90%. Consult an agent immediately to restructure your profile."}</p>
                                            </div>
                                        )}
                                        {data.english === "low" && !(data.english === "low" && data.financial === "need") && (
                                            <div className="flex items-start gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                                                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                                <p>{t("results.warnings.englishLow")}</p>
                                            </div>
                                        )}
                                        {data.gpa === "low" && (
                                            <div className="flex items-start gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                                                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                                <p>{t("results.warnings.gpaLow")}</p>
                                            </div>
                                        )}
                                        {data.financial === "need" && (
                                            <div className="flex items-start gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                                                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                                <p>{t("results.warnings.financialNeed")}</p>
                                            </div>
                                        )}
                                        {data.institution === "al3" && (
                                            <div className="flex items-start gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                                                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                                <p>{t("results.warnings.al3Risk")}</p>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-navy/40 text-xs flex items-center justify-center gap-1 mt-4">
                                        <CheckCircle2 size={12} /> {t("results.cta.help")}
                                    </p>

                                    {/* Legal Disclaimer */}
                                    <div className="mt-8 pt-8 border-t border-navy/5 text-center">
                                        <p className="text-[10px] sm:text-xs text-navy/30 leading-relaxed max-w-xl mx-auto">
                                            {t("results.disclaimer")}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Footer / Navigation Controls (Only for steps 1-4) */}
            {step < 5 && (
                <div className="bg-sand-light/30 p-6 md:p-8 flex justify-between items-center border-t border-navy/5">
                    <button
                        onClick={prevStep}
                        disabled={step === 1}
                        className={`flex items-center gap-1 font-semibold transition-colors ${step === 1 ? "text-navy/20 cursor-not-allowed" : "text-navy/60 hover:text-navy"}`}
                    >
                        <ChevronLeft size={20} />
                        {t("navigation.prev")}
                    </button>
                    <button
                        onClick={nextStep}
                        disabled={!canProceed()}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300
                            ${canProceed()
                                ? "bg-accent-gold text-navy hover:bg-amber-400 shadow-[4px_4px_0px_0px_rgba(10,25,47,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(10,25,47,0.15)]"
                                : "bg-navy/5 text-navy/30 cursor-not-allowed"
                            }`}
                    >
                        {step === 4 ? t("navigation.submit") : t("navigation.next")}
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
