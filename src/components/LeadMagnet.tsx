"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Download, Mail, CheckCircle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LeadMagnet() {
    const t = useTranslations("guides.leadMagnet");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // Simulating an API call for PDF delivery
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus("success");
    };

    return (
        <div className="bg-navy rounded-[2rem] p-8 md:p-12 relative overflow-hidden text-center shadow-[8px_8px_0px_0px_rgba(239,186,63,0.3)] border-2 border-accent-gold/20 mb-16">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Download size={200} />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-gold/20 text-accent-gold mb-6 shadow-xl">
                    <Download size={32} />
                </div>

                <h3 className="text-3xl font-extrabold text-white mb-4">
                    {t("title")}
                </h3>

                <p className="text-white/70 text-lg mb-8">
                    {t("subtitle")}
                </p>

                <AnimatePresence mode="wait">
                    {status === "success" ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-3"
                        >
                            <CheckCircle size={40} className="text-green-400" />
                            <p className="text-white font-semibold text-lg">{t("success")}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                                <div className="relative flex-grow">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-navy/40" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t("emailPlaceholder")}
                                        className="w-full bg-white text-navy pl-11 pr-4 py-4 rounded-xl border-2 border-transparent focus:border-accent-gold outline-none transition-colors"
                                        disabled={status === "loading"}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="bg-accent-gold hover:bg-amber-400 text-navy font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-70 whitespace-nowrap flex items-center justify-center gap-2"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                                            {t("sending")}
                                        </>
                                    ) : (
                                        t("button")
                                    )}
                                </button>
                            </form>

                            <div className="mt-4 flex items-center justify-center gap-2 text-white/50 text-sm">
                                <ShieldCheck size={16} />
                                <span>{t("spamNote")}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
