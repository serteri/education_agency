"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Home, Utensils, TrainFront, Info, Calculator, ArrowRight, MessageCircle } from "lucide-react";
import { IMMIGRATION_RULES } from "@/constants/rules";

const ACCOMMODATION_OPTIONS = [
    { id: "homestay", cost: 380 },
    { id: "shared", cost: 300 },
    { id: "solo", cost: 550 },
];

const LIFESTYLE_OPTIONS = [
    { id: "cook", cost: 120 },
    { id: "eatOut", cost: 230 },
];

const TRANSPORT_OPTIONS = [
    { id: "gocard", cost: 40 },
    { id: "bike", cost: 0 },
];

const MISC_COST = 50; // Fixed weekly cost for phone plan, subscriptions, occasional coffee

export function BudgetPlannerClient() {
    const t = useTranslations("budgetPlanner");

    // State
    const [accType, setAccType] = useState(ACCOMMODATION_OPTIONS[1].id);
    const [lifestyleType, setLifestyleType] = useState(LIFESTYLE_OPTIONS[0].id);
    const [transportType, setTransportType] = useState(TRANSPORT_OPTIONS[0].id);

    // Calculate Costs (Weekly)
    const accCost = ACCOMMODATION_OPTIONS.find(o => o.id === accType)?.cost || 0;
    const lifeCost = LIFESTYLE_OPTIONS.find(o => o.id === lifestyleType)?.cost || 0;
    const tranCost = TRANSPORT_OPTIONS.find(o => o.id === transportType)?.cost || 0;

    const weeklyTotal = accCost + lifeCost + tranCost + MISC_COST;
    const monthlyTotal = Math.round(weeklyTotal * 52 / 12);

    const govAnnualRequirement = IMMIGRATION_RULES.financial.mainApplicantLivingCostAUD; // ~31,000
    const govMonthlyRequirement = Math.round(govAnnualRequirement / 12);

    // Chart Data calculations using conic-gradient or SVG paths. 
    // We'll use a simple CSS conic-gradient for the pie chart.
    const chartData = useMemo(() => {
        const total = weeklyTotal || 1; // avoid div by 0
        let currentAngle = 0;

        const items = [
            { id: "rent", value: accCost, color: "#1E3A5F" }, // Navy
            { id: "food", value: lifeCost, color: "#EFBA3F" }, // Gold
            { id: "transport", value: tranCost, color: "#E85C41" }, // Terracotta
            { id: "misc", value: MISC_COST, color: "#7FA3B1" }, // Teal
        ];

        let gradientParts = items.map(item => {
            const percentage = (item.value / total) * 100;
            const startStr = `${currentAngle}%`;
            currentAngle += percentage;
            const endStr = `${currentAngle}%`;
            return `${item.color} ${startStr} ${endStr}`;
        });

        return {
            gradient: `conic-gradient(${gradientParts.join(", ")})`,
            items
        };
    }, [accCost, lifeCost, tranCost, weeklyTotal]);

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent(t("cta.whatsappText"));
        window.open(`https://wa.me/61461280387?text=${message}`, '_blank');
    };

    return (
        <div className="w-full flex flex-col lg:flex-row gap-8 items-start">

            {/* Left Column: Form Inputs */}
            <div className="w-full lg:w-3/5 flex flex-col gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 tracking-tight">
                        {t("title")}
                    </h1>
                    <p className="text-lg text-navy/70 max-w-2xl">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-[0px_8px_32px_rgba(10,25,47,0.06)] border border-navy/5 p-6 md:p-8 flex flex-col gap-8">

                    {/* Accommodation */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Home size={24} className="text-accent-gold" />
                            <h2 className="text-xl font-bold text-navy">{t("accommodation.title")}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {ACCOMMODATION_OPTIONS.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => setAccType(opt.id)}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${accType === opt.id
                                            ? "border-accent-gold bg-accent-gold/5 shadow-sm"
                                            : "border-navy/10 hover:border-navy/20 bg-white"
                                        }`}
                                >
                                    <div className="font-bold text-navy mb-1">{t(`accommodation.${opt.id}.label`)}</div>
                                    <div className="text-xs text-navy/60">{t(`accommodation.${opt.id}.desc`)}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Lifestyle */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Utensils size={24} className="text-accent-gold" />
                            <h2 className="text-xl font-bold text-navy">{t("lifestyle.title")}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {LIFESTYLE_OPTIONS.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => setLifestyleType(opt.id)}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${lifestyleType === opt.id
                                            ? "border-accent-gold bg-accent-gold/5 shadow-sm"
                                            : "border-navy/10 hover:border-navy/20 bg-white"
                                        }`}
                                >
                                    <div className="font-bold text-navy mb-1">{t(`lifestyle.${opt.id}.label`)}</div>
                                    <div className="text-xs text-navy/60">{t(`lifestyle.${opt.id}.desc`)}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Transport */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <TrainFront size={24} className="text-accent-gold" />
                            <h2 className="text-xl font-bold text-navy">{t("transport.title")}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {TRANSPORT_OPTIONS.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => setTransportType(opt.id)}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${transportType === opt.id
                                            ? "border-accent-gold bg-accent-gold/5 shadow-sm"
                                            : "border-navy/10 hover:border-navy/20 bg-white"
                                        }`}
                                >
                                    <div className="font-bold text-navy mb-1">{t(`transport.${opt.id}.label`)}</div>
                                    <div className="text-xs text-navy/60">{t(`transport.${opt.id}.desc`)}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Right Column: Visualization & Breakdown */}
            <div className="w-full lg:w-2/5 flex flex-col gap-6 sticky top-24">

                {/* Visual Output */}
                <div className="bg-navy rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                    {/* Decorative pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-1">{t("weeklyLabel")}</div>
                            <div className="text-4xl font-black text-accent-gold">${weeklyTotal}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-1">{t("monthlyLabel")}</div>
                            <div className="text-2xl font-bold text-white">${monthlyTotal}</div>
                        </div>
                    </div>

                    {/* CSS Pie Chart */}
                    <div className="flex flex-col items-center justify-center mb-8">
                        <motion.div
                            className="w-48 h-48 rounded-full border-4 border-navy-light relative shadow-inner"
                            style={{ background: chartData.gradient }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <div className="absolute inset-0 m-auto w-24 h-24 bg-navy rounded-full flex items-center justify-center">
                                <Calculator className="text-white/30" size={32} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Breakdown List */}
                    <div className="space-y-3">
                        {chartData.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-white/80">{t(`breakdown.${item.id}`)}</span>
                                </div>
                                <span>${item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gov Requirement Comparison */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-navy/10">
                    <h3 className="text-lg font-bold text-navy mb-2">{t("comparison.title")}</h3>
                    <p className="text-sm text-navy/60 mb-6">{t("comparison.desc")}</p>

                    <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1 font-semibold text-navy">
                            <span>{t("comparison.yourBudget")}</span>
                            <span>${monthlyTotal}</span>
                        </div>
                        {/* Progress bar container */}
                        <div className="w-full h-3 bg-navy/10 rounded-full overflow-hidden flex">
                            <motion.div
                                className={`h-full ${monthlyTotal > govMonthlyRequirement ? "bg-red-500" : "bg-accent-gold"}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((monthlyTotal / govMonthlyRequirement) * 100, 100)}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                        <div className="flex justify-between text-xs mt-1 text-navy/50 font-medium">
                            <span>$0</span>
                            <span className="text-navy font-bold">{t("comparison.govRequirement")}: ${govMonthlyRequirement}</span>
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl text-sm border flex gap-3 ${monthlyTotal > govMonthlyRequirement
                            ? "bg-red-50 text-red-800 border-red-100"
                            : "bg-amber-50 text-amber-800 border-amber-100"
                        }`}>
                        <Info size={18} className="flex-shrink-0 mt-0.5" />
                        <p>{monthlyTotal > govMonthlyRequirement ? t("comparison.overBudget") : t("comparison.underBudget")}</p>
                    </div>
                </div>

                {/* Affordable Options CTA */}
                <div className="bg-gradient-to-br from-sand-light to-white p-6 rounded-3xl border border-navy/10 relative overflow-hidden group">
                    <div className="relative z-10 w-full">
                        <h3 className="text-lg font-bold text-navy mb-2">{t("cta.title")}</h3>
                        <p className="text-sm text-navy/70 mb-5">{t("cta.desc")}</p>
                        <button
                            onClick={handleWhatsAppClick}
                            className="bg-navy hover:bg-navy-light text-white font-bold py-3 px-5 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(239,186,63,0.5)] w-full justify-center"
                        >
                            <MessageCircle size={16} className="text-accent-gold" />
                            {t("cta.button")}
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
