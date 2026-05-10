"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useCompare } from "@/context/CompareContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale } from "lucide-react";

export function CompareBar() {
    const t = useTranslations("compare");
    const { selectedSchools, removeSchool, clearComparison } = useCompare();

    if (selectedSchools.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 flex justify-center md:justify-end"
            >
                <div className="bg-navy/95 backdrop-blur-md rounded-2xl shadow-[0px_8px_32px_rgba(10,25,47,0.2)] border border-white/10 p-4 w-full md:w-auto max-w-2xl flex flex-col md:flex-row items-center gap-4">

                    {/* Schools List */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 flex-1">
                        {selectedSchools.map((school) => (
                            <div key={school.id} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 flex items-center gap-2">
                                <span className="text-white text-xs font-semibold truncate max-w-[120px]">{school.name}</span>
                                <button
                                    onClick={() => removeSchool(school.id)}
                                    className="text-white/60 hover:text-red-400 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-4">
                        <button
                            onClick={clearComparison}
                            className="text-white/50 hover:text-white text-xs font-medium px-2"
                        >
                            {t("clearAll")}
                        </button>
                        <Link
                            href="/tools/compare"
                            className="bg-accent-gold text-navy hover:bg-amber-400 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-transform hover:scale-105"
                        >
                            <Scale size={16} />
                            {t("compareNow")} ({selectedSchools.length})
                        </Link>
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
}
