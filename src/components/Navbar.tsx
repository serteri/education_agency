"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
    const t = useTranslations("nav");
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);
    const navLinks = [
        { href: "/services", label: t("services") },
        { href: "/about", label: t("about") },
        { href: "/guides", label: t("guides") },
        { href: "/contact", label: t("contact") },
    ];

    const schoolLinks = [
        { href: "/schools/language-schools", label: t("languageSchools") },
        { href: "/schools/tafe", label: t("tafe") },
        { href: "/schools/universities", label: t("universities") },
    ];

    const toolLinks = [
        { href: "/tools/visa-checker", label: t("visaSuccess") || "Visa Checker" },
        { href: "/tools/compare", label: t("compare") || "Compare Schools" },
        { href: "/tools/budget-planner", label: t("budgetPlanner") || "Budget Planner" },
        { href: "/tools/pathway-planner", label: t("pathwayPlanner") || "Pathway Planner" },
    ];


    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b-2 border-navy/5"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
                            <span className="text-white font-bold text-lg">E</span>
                        </div>
                        <span className="text-navy font-bold text-xl hidden sm:block">
                            EduBrisbane
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {/* Schools Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <button className="flex items-center gap-1 text-navy/70 hover:text-navy font-medium transition-colors duration-200 text-sm py-2">
                                {t("schools")}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 w-48 bg-white border-2 border-navy/10 rounded-xl shadow-[4px_4px_0px_0px_rgba(10,25,47,0.1)] py-2"
                                    >
                                        {schoolLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className="block px-4 py-2 text-sm text-navy/70 hover:text-navy hover:bg-navy/5 transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Tools Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsToolsDropdownOpen(true)}
                            onMouseLeave={() => setIsToolsDropdownOpen(false)}
                        >
                            <button className="flex items-center gap-1 text-navy/70 hover:text-navy font-medium transition-colors duration-200 text-sm py-2">
                                {t("tools")}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isToolsDropdownOpen ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                                {isToolsDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 w-56 bg-white border-2 border-navy/10 rounded-xl shadow-[4px_4px_0px_0px_rgba(10,25,47,0.1)] py-2"
                                    >
                                        {toolLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className="block px-4 py-2 text-sm text-navy/70 hover:text-navy hover:bg-navy/5 transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Other Links */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-navy/70 hover:text-navy font-medium transition-colors duration-200 text-sm"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <LanguageSwitcher />

                        <Link
                            href="/contact"
                            className="bg-navy text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-navy-light transition-colors duration-200 border-2 border-navy shadow-[3px_3px_0px_0px_rgba(10,25,47,0.15)]  hover:shadow-[1px_1px_0px_0px_rgba(10,25,47,0.15)] hover:translate-x-[2px] hover:translate-y-[2px]"
                        >
                            {t("startJourney")}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-3 lg:hidden">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="p-2 rounded-xl border-2 border-navy/10 text-navy"
                            aria-label="Open Menu"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-40 lg:hidden"
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[85%] sm:w-80 bg-white z-50 lg:hidden shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-navy/5">
                                <span className="text-navy font-bold text-xl">Menu</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-xl border-2 border-navy/10 text-navy bg-white hover:bg-navy/5 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
                                <div className="space-y-4">
                                    <span className="block text-navy/50 font-bold text-xs uppercase tracking-wider">{t("schools")}</span>
                                    <div className="space-y-3">
                                        {schoolLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block text-navy hover:text-accent-gold font-semibold text-lg transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <span className="block text-navy/50 font-bold text-xs uppercase tracking-wider">{t("tools")}</span>
                                    <div className="space-y-3">
                                        {toolLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block text-navy hover:text-accent-gold font-semibold text-lg transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <span className="block text-navy/50 font-bold text-xs uppercase tracking-wider">EduBrisbane</span>
                                    <div className="space-y-3">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block text-navy hover:text-accent-gold font-semibold text-lg transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer of Drawer */}
                            <div className="p-6 border-t border-navy/5 space-y-6 bg-sand-light/30">
                                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-navy/5">
                                    <span className="text-navy/70 text-sm font-medium">Language</span>
                                    <LanguageSwitcher />
                                </div>
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="flex justify-center bg-navy text-white px-5 py-4 rounded-xl font-bold text-base text-center border-2 border-navy shadow-[4px_4px_0px_0px_rgba(10,25,47,0.15)] w-full active:translate-y-1 active:shadow-none transition-all"
                                >
                                    {t("startJourney")}
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
