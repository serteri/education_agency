"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import {
    Languages,
    Briefcase,
    GraduationCap,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: easeOut,
        },
    }),
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const services = [
    {
        key: "elicos" as const,
        icon: Languages,
        gradient: "from-blue-500/10 to-cyan-500/10",
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-600",
        borderAccent: "hover:border-blue-500/30",
    },
    {
        key: "vet" as const,
        icon: Briefcase,
        gradient: "from-amber-500/10 to-orange-500/10",
        iconBg: "bg-amber-500/10",
        iconColor: "text-amber-600",
        borderAccent: "hover:border-amber-500/30",
    },
    {
        key: "university" as const,
        icon: GraduationCap,
        gradient: "from-emerald-500/10 to-teal-500/10",
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-600",
        borderAccent: "hover:border-emerald-500/30",
    },
];

export function ServiceGrid() {
    const t = useTranslations("services");

    return (
        <section id="services" className="relative py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border-2 border-navy/10 text-navy/80 text-sm font-medium mb-6">
                        {t("sectionBadge")}
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
                        {t("title")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-accent-gold">
                            {t("titleHighlight")}
                        </span>
                    </h2>
                    <p className="mt-4 text-lg text-navy/50 max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Service Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                >
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        const features = t.raw(`${service.key}.features`) as string[];

                        return (
                            <motion.div
                                key={service.key}
                                custom={index}
                                variants={cardVariants}
                                className={`group relative rounded-2xl border-2 border-navy/8 bg-white p-8 shadow-[4px_4px_0px_0px_rgba(10,25,47,0.06)] hover:shadow-[6px_6px_0px_0px_rgba(10,25,47,0.1)] hover:-translate-y-2 transition-all duration-300 ${service.borderAccent}`}
                            >
                                {/* Card gradient overlay */}
                                <div
                                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div
                                        className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6`}
                                    >
                                        <Icon className={`w-7 h-7 ${service.iconColor}`} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-navy mb-3">
                                        {t(`${service.key}.title`)}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-navy/55 text-sm leading-relaxed mb-6">
                                        {t(`${service.key}.description`)}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-2.5 mb-6">
                                        {features.map((feature: string, fi: number) => (
                                            <li
                                                key={fi}
                                                className="flex items-center gap-2 text-sm text-navy/70"
                                            >
                                                <CheckCircle2
                                                    size={16}
                                                    className={service.iconColor}
                                                />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Learn More */}
                                    <Link
                                        href="/contact"
                                        className={`inline-flex items-center gap-1.5 text-sm font-semibold ${service.iconColor} group-hover:gap-2.5 transition-all duration-200`}
                                    >
                                        {t("learnMore")}
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
