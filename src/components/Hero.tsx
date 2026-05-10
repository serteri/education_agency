"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, GraduationCap, Users, Award } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: easeOut,
        },
    }),
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.6 + i * 0.1,
            duration: 0.5,
            ease: easeOut,
        },
    }),
};

export function Hero() {
    const t = useTranslations("hero");

    const stats = [
        {
            icon: <Users className="w-5 h-5" />,
            value: t("stats.students"),
            label: t("stats.studentsLabel"),
        },
        {
            icon: <GraduationCap className="w-5 h-5" />,
            value: t("stats.schools"),
            label: t("stats.schoolsLabel"),
        },
        {
            icon: <Award className="w-5 h-5" />,
            value: t("stats.years"),
            label: t("stats.yearsLabel"),
        },
    ];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-sand-light via-white to-sand/30" />
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #0A192F 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.06, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute top-20 right-10 w-96 h-96 rounded-full bg-navy blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.08, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-accent-gold blur-3xl"
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        custom={0}
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border-2 border-navy/10 text-navy/80 text-sm font-medium mb-8"
                    >
                        <MapPin size={16} className="text-accent-gold" />
                        {t("badge")}
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        custom={1}
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        className="text-4xl sm:text-5xl lg:text-7xl font-bold text-navy leading-tight tracking-tight"
                    >
                        {t("title")}
                        <br />
                        <span className="relative">
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-navy via-navy-light to-accent-gold">
                                {t("titleHighlight")}
                            </span>
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
                                className="absolute bottom-2 left-0 h-3 bg-accent-gold/20 rounded-full -z-0"
                            />
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        custom={2}
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        className="mt-6 text-lg sm:text-xl text-navy/60 max-w-2xl mx-auto leading-relaxed"
                    >
                        {t("subtitle")}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        custom={3}
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href="#journey-form"
                            className="group inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-navy shadow-[4px_4px_0px_0px_rgba(10,25,47,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(10,25,47,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
                        >
                            {t("cta")}
                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </a>
                        <a
                            href="#services"
                            className="inline-flex items-center gap-2 bg-white text-navy px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-navy/15 shadow-[4px_4px_0px_0px_rgba(10,25,47,0.06)] hover:shadow-[2px_2px_0px_0px_rgba(10,25,47,0.06)] hover:translate-x-[2px] hover:translate-y-[2px] hover:border-navy/25 transition-all duration-200"
                        >
                            {t("ctaSecondary")}
                        </a>
                    </motion.div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={scaleIn}
                                initial="hidden"
                                animate="visible"
                                className="bento-card flex flex-col items-center gap-2 !p-5"
                            >
                                <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy/60">
                                    {stat.icon}
                                </div>
                                <span className="text-2xl font-bold text-navy">
                                    {stat.value}
                                </span>
                                <span className="text-sm text-navy/50">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full"
                >
                    <path
                        d="M0 80V30C240 60 480 0 720 30C960 60 1200 0 1440 30V80H0Z"
                        fill="white"
                        fillOpacity="0.5"
                    />
                </svg>
            </div>
        </section>
    );
}
