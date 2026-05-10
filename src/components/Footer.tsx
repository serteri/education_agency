"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { MapPin, Shield, BadgeCheck } from "lucide-react";

export function Footer() {
    const t = useTranslations("footer");
    const tNav = useTranslations("nav");

    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="bg-navy text-white/80">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">E</span>
                            </div>
                            <span className="text-white font-bold text-xl">EduBrisbane</span>
                        </div>
                        <p className="text-white/50 leading-relaxed max-w-md text-sm">
                            {t("description")}
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
                            <MapPin size={16} />
                            <span>{t("address")}</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                            {t("quickLinks")}
                        </h4>
                        <ul className="space-y-3">
                            <li className="mb-2">
                                <Link
                                    href="/"
                                    className="text-white/50 hover:text-white text-sm transition-colors"
                                >
                                    {tNav("home")}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/#services"
                                    className="text-white/50 hover:text-white text-sm transition-colors"
                                >
                                    {tNav("services")}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/guides"
                                    className="text-white/50 hover:text-white text-sm transition-colors"
                                >
                                    {tNav("guides")}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/tools/visa-checker"
                                    className="text-white/50 hover:text-white text-sm transition-colors"
                                >
                                    {tNav("visaSuccess") || "Visa Checker"}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/tools/compare"
                                    className="text-white/50 hover:text-white text-sm transition-colors"
                                >
                                    {tNav("compare") || "Compare Schools"}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/tools/budget-planner"
                                    className="text-white/50 hover:text-white text-sm transition-colors"
                                >
                                    {tNav("budgetPlanner") || "Budget Planner"}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/tools/pathway-planner"
                                    className="text-white/50 hover:text-white text-sm transition-colors"
                                >
                                    {tNav("pathwayPlanner") || "Pathway Planner"}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/about"
                                    className="text-white/50 hover:text-white text-sm transition-colors"
                                >
                                    {tNav("about")}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/contact"
                                    className="text-white/50 hover:text-white text-sm transition-colors"
                                >
                                    {tNav("contact")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                            {t("legal")}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-white/50 hover:text-white text-sm transition-colors"
                                >
                                    {t("privacyPolicy")}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-white/50 hover:text-white text-sm transition-colors"
                                >
                                    {t("termsOfService")}
                                </a>
                            </li>
                            <li className="text-white/40 text-xs">
                                {t("qeac")} <span className="font-mono ml-1">XXXX</span>
                            </li>
                            <li className="text-white/40 text-xs font-semibold tracking-wide">
                                {t("abn")}
                            </li>
                            <li className="inline-flex items-center gap-2 text-white/60 text-xs font-medium">
                                <BadgeCheck size={14} className="text-accent-gold" />
                                <span>{t("icefMember")}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Disclaimer Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-start gap-2 text-white/35 text-xs">
                        <Shield size={14} className="mt-0.5 shrink-0" />
                        <p>{t("disclaimer")}</p>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <p className="text-center text-white/30 text-xs">
                        © {currentYear} EduBrisbane. {t("rights")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
