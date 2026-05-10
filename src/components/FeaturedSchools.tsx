"use client";

import { useTranslations } from "next-intl";
import { UNIVERSITIES } from "@/constants/schools";
import { SchoolCard } from "@/components/SchoolCard";
import { Link } from "@/i18n/routing";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturedSchools() {
    const t = useTranslations("featuredSchools");

    // Select the top 3 universities
    const featuredUniversities = UNIVERSITIES.slice(0, 3);

    return (
        <section className="py-20 bg-sand-light/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 border-2 border-accent-gold/20 text-accent-gold text-sm font-bold mb-4"
                        >
                            <Star size={16} />
                            {t("badge")}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-extrabold text-navy"
                        >
                            {t("title")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-amber-600">
                                {t("titleHighlight")}
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-navy/60 text-lg mt-4 max-w-2xl"
                        >
                            {t("subtitle")}
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link
                            href="/schools/universities"
                            className="inline-flex items-center gap-2 bg-white text-navy px-6 py-3 rounded-xl border-2 border-navy/10 hover:border-navy hover:shadow-[4px_4px_0px_0px_rgba(10,25,47,0.1)] transition-all duration-300 font-semibold group"
                        >
                            {t("viewAll")}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {featuredUniversities.map((school, index) => (
                        <motion.div
                            key={school.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <SchoolCard school={school} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
