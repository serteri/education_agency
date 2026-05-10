"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Plane, Home, CreditCard, HeartHandshake, MapPin } from "lucide-react";

const featureIcons = {
    arrival: Plane,
    accommodation: Home,
    banking: CreditCard,
    ongoing: HeartHandshake,
};

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.3 + i * 0.15,
            duration: 0.5,
            ease: easeOut,
        },
    }),
};

export function LocalAdvantage() {
    const t = useTranslations("localAdvantage");

    const featureKeys = [
        "arrival",
        "accommodation",
        "banking",
        "ongoing",
    ] as const;

    return (
        <section
            id="local-advantage"
            className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-sand-light/50 to-sand-light"
        >
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-navy/[0.02] to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left - Content */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border-2 border-navy/10 text-navy/80 text-sm font-medium mb-6"
                        >
                            <MapPin size={16} className="text-accent-gold" />
                            {t("badge")}
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight"
                        >
                            {t("title")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-amber-600">
                                {t("titleHighlight")}
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-4 text-lg text-navy/55 leading-relaxed"
                        >
                            {t("subtitle")}
                        </motion.p>
                    </div>

                    {/* Right - Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {featureKeys.map((key, index) => {
                            const Icon = featureIcons[key];
                            return (
                                <motion.div
                                    key={key}
                                    custom={index}
                                    variants={featureVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="bento-card group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center mb-4 group-hover:bg-accent-gold/20 transition-colors">
                                        <Icon className="w-6 h-6 text-accent-gold" />
                                    </div>
                                    <h3 className="text-base font-bold text-navy mb-2">
                                        {t(`features.${key}.title`)}
                                    </h3>
                                    <p className="text-sm text-navy/50 leading-relaxed">
                                        {t(`features.${key}.description`)}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
