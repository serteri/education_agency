"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export function AboutSummary() {
    const t = useTranslations("aboutSummary");

    return (
        <section className="py-20 bg-white border-y-2 border-navy/5">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                >
                    <div className="w-16 h-16 rounded-2xl bg-navy/5 flex items-center justify-center mb-6">
                        <Building2 size={32} className="text-navy" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                        {t("title")}
                    </h2>
                    <p className="text-xl text-navy/70 leading-relaxed mb-10">
                        {t("description")}
                    </p>
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-navy shadow-[4px_4px_0px_0px_rgba(10,25,47,0.15)] hover:shadow-[2px_2px_0px_0px_rgba(10,25,47,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group"
                    >
                        {t("readMore")}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
