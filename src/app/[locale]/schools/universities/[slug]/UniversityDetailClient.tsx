"use client";

import { useTranslations, useLocale } from "next-intl";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JourneyForm } from "@/components/JourneyForm";
import { School } from "@/constants/schools";
import { Link } from "@/i18n/routing";
import { ArrowRight, MapPin, Award, BookOpen, ExternalLink, GraduationCap, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function UniversityDetailClient({ university }: { university: School }) {
    const t = useTranslations("uniDetails");
    const locale = useLocale();

    const getLocalized = (content?: string | { en: string; tr: string }) => {
        if (!content) return undefined;
        if (typeof content === 'string') return content;
        // @ts-ignore - dynamic access
        return content[locale] || content.en;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 100, damping: 15 }
        }
    };

    return (
        <main className="min-h-screen bg-sand-light/30">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden flex items-end min-h-[50vh]">
                {/* Background Image Setup */}
                <div className="absolute inset-0 z-0">
                    {university.image ? (
                        <Image
                            src={university.image}
                            alt={`${university.name} campus`}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-navy" />
                    )}
                    {/* Dark gradient overlay so text remains readable - strengthened for mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/70 to-navy/40 md:via-navy/60 md:to-navy/30" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/schools/universities" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 text-sm font-medium uppercase tracking-wider backdrop-blur-md bg-white/10 px-4 py-2 rounded-full border border-white/20">
                            <ArrowRight size={16} className="rotate-180" />
                            {t("backToUniversities")}
                        </Link>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 text-white leading-tight"
                    >
                        {university.name}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap items-center gap-4 md:gap-8 text-white/90 font-medium text-lg"
                    >
                        <div className="flex items-center gap-2 bg-navy/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                            <MapPin size={22} className="text-accent-gold" />
                            <span>{university.location}</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bento Box Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-min"
                >
                    {/* Bento Box 1: Ranking */}
                    <motion.div variants={itemVariants} className="col-span-1 bg-white rounded-3xl p-6 sm:p-8 shadow-[0px_8px_24px_rgba(10,25,47,0.06)] border border-navy/5 flex flex-col justify-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-gold/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                            <Award size={24} className="text-accent-gold sm:w-7 sm:h-7" />
                        </div>
                        <h3 className="text-navy/60 font-semibold mb-1 sm:mb-2 uppercase tracking-wide text-xs sm:text-sm">{t("worldRanking")}</h3>
                        <p className="text-xl sm:text-2xl font-bold text-navy flex-1">
                            {getLocalized(university.ranking) || "N/A"}
                        </p>
                    </motion.div>

                    {/* Bento Box 2: Distance from Office */}
                    <motion.div variants={itemVariants} className="col-span-1 bg-white rounded-3xl p-6 sm:p-8 shadow-[0px_8px_24px_rgba(10,25,47,0.06)] border border-navy/5 flex flex-col justify-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                            <MapPin size={24} className="text-blue-600 sm:w-7 sm:h-7" />
                        </div>
                        <h3 className="text-navy/60 font-semibold mb-1 sm:mb-2 uppercase tracking-wide text-xs sm:text-sm">{t("distanceFromOffice")}</h3>
                        <p className="text-base sm:text-lg font-bold text-navy flex-1">
                            {getLocalized(university.distanceFromOffice) || t("defaultDistance")}
                        </p>
                    </motion.div>

                    {/* Bento Box 3: Entry Requirements */}
                    <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1 bg-white rounded-3xl p-6 sm:p-8 shadow-[0px_8px_24px_rgba(10,25,47,0.06)] border border-navy/5 flex flex-col justify-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                            <BookOpen size={24} className="text-green-600 sm:w-7 sm:h-7" />
                        </div>
                        <h3 className="text-navy/60 font-semibold mb-1 sm:mb-2 uppercase tracking-wide text-xs sm:text-sm">{t("entryRequirements")}</h3>
                        <p className="text-sm sm:text-base font-medium text-navy/80 flex-1 leading-relaxed">
                            {getLocalized(university.entryRequirements) || t("defaultEntryReq")}
                        </p>
                    </motion.div>

                    {/* Wide Box: Description */}
                    <motion.div variants={itemVariants} className="md:col-span-2 bg-navy rounded-3xl p-8 lg:p-10 shadow-[8px_8px_0px_0px_rgba(230,223,213,1)] border-2 border-navy text-white flex flex-col">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            {t("about")}
                        </h3>
                        <p className="text-white/80 leading-relaxed text-lg flex-1">
                            {getLocalized(university.description) || t("noDescriptionAvailable")}
                        </p>
                    </motion.div>

                    {/* Expert Insight Box (Highlighter effect) */}
                    <motion.div variants={itemVariants} className="md:col-span-1 bg-gradient-to-br from-sand-light to-sand rounded-3xl p-8 shadow-[0px_8px_24px_rgba(10,25,47,0.06)] border border-navy/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Lightbulb size={120} />
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2 relative z-10">
                            <Lightbulb size={24} className="text-accent-gold" />
                            {t("expertInsight")}
                        </h3>
                        <p className="text-navy/80 italic font-medium leading-relaxed relative z-10">
                            "{getLocalized(university.expertInsight) || t("defaultInsight")}"
                        </p>
                    </motion.div>

                    {/* Long Box: Top Programs */}
                    <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3 bg-white rounded-3xl p-8 lg:p-10 shadow-[0px_8px_24px_rgba(10,25,47,0.06)] border border-navy/5">
                        <h3 className="text-2xl font-bold text-navy mb-8 flex items-center gap-3">
                            <GraduationCap size={28} className="text-navy/40" />
                            {t("topPrograms")}
                        </h3>
                        {university.topPrograms && university.topPrograms.length > 0 ? (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {university.topPrograms.map((program, index) => (
                                    <li key={index} className="flex items-start gap-3 p-5 rounded-2xl bg-sand-light/30 border border-navy/5 hover:border-accent-gold/50 transition-colors">
                                        <div className="w-2.5 h-2.5 rounded-full bg-accent-gold mt-1.5 shrink-0" />
                                        <span className="text-navy font-semibold text-lg">{program}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {(university.featuredCourses || []).map((course, index) => (
                                    <span key={index} className="px-5 py-3 bg-sand-light text-navy rounded-xl font-medium border border-navy/5 shadow-sm">
                                        {course}
                                    </span>
                                ))}
                            </div>
                        )}

                        {university.officialWebsite && (
                            <div className="mt-10 pt-6 border-t border-navy/5">
                                <a
                                    href={university.officialWebsite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-accent-gold font-bold hover:text-navy transition-colors"
                                >
                                    {t("visitWebsite")}
                                    <ExternalLink size={18} />
                                </a>
                            </div>
                        )}
                    </motion.div>

                </motion.div>
            </div>

            {/* Sticky Application CTA / Corner Button */}
            <div className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-auto sm:right-6 lg:bottom-10 lg:right-10 z-50 p-4 sm:p-0 bg-white sm:bg-transparent border-t sm:border-t-0 border-navy/10 shadow-[0_-8px_16px_rgba(10,25,47,0.05)] sm:shadow-none">
                <button
                    onClick={() => {
                        const formSection = document.getElementById("contact");
                        formSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex w-full sm:w-auto items-center justify-center gap-3 bg-accent-gold hover:bg-navy text-navy hover:text-white px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 shadow-[0_12px_24px_rgba(239,186,63,0.4)] hover:shadow-[0_12px_24px_rgba(10,25,47,0.4)] sm:hover:-translate-y-1 group"
                >
                    <span className="text-base sm:text-lg">{t("contactUsCta")}</span>
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Contact Form CTA Section */}
            <div id="contact" className="bg-white py-20 lg:py-24 border-t-2 border-navy/5 relative scroll-mt-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-0">
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-navy mb-4 sm:mb-6">
                            {t("formTitle", { name: university.name })}
                        </h2>
                        <p className="text-navy/60 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                            {t("formSubtitle")}
                        </p>
                    </div>
                    <div className="bg-sand-light/30 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-10 shadow-[4px_4px_0px_0px_rgba(10,25,47,0.06)] sm:shadow-[8px_8px_0px_0px_rgba(10,25,47,0.06)] border-2 border-navy/5">
                        <JourneyForm />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
