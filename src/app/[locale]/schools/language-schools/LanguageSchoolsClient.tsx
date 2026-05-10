"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SchoolCard } from "@/components/SchoolCard";
import { LANGUAGE_SCHOOLS } from "@/constants/schools";
import { Info } from "lucide-react";

const FILTER_TABS = [
    { id: "All", labelKey: "all" },
    { id: "General English", labelKey: "generalEnglish" },
    { id: "Exam Prep", labelKey: "examPrep" },
    { id: "Evening Classes", labelKey: "eveningClasses" },
    { id: "Academic", labelKey: "academic" },
    { id: "Business", labelKey: "business" },
    { id: "Barista/Hospitality", labelKey: "baristaHospitality" },
];

export function LanguageSchoolsClient() {
    const tFilters = useTranslations("schoolPages.filters");
    const tRights = useTranslations("schoolPages.workingRights");
    const [activeTab, setActiveTab] = useState("All");

    const filteredSchools = LANGUAGE_SCHOOLS.filter((school) => {
        if (activeTab === "All") return true;
        return school.categories?.includes(activeTab);
    });

    return (
        <div className="w-full">
            {/* Info Block */}
            <div className="max-w-4xl mx-auto bg-blue-50/80 border border-blue-200/60 rounded-2xl p-6 mb-12 flex items-start sm:items-center gap-4 shadow-sm">
                <div className="bg-blue-100 p-2.5 rounded-full flex-shrink-0 mt-1 sm:mt-0">
                    <Info className="text-blue-600" size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-navy mb-1.5">{tRights("title")}</h4>
                    <p className="text-sm text-navy/75 leading-relaxed font-medium">{tRights("description")}</p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
                {FILTER_TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab.id
                            ? "bg-navy text-white shadow-md scale-105"
                            : "bg-white text-navy/60 border border-navy/10 hover:border-navy/30 hover:bg-navy/5 hover:text-navy"
                            }`}
                    >
                        {tFilters(tab.labelKey)}
                    </button>
                ))}
            </div>

            {/* School Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {filteredSchools.map((school) => (
                    <SchoolCard key={school.id} school={school} />
                ))}
            </div>

            {filteredSchools.length === 0 && (
                <div className="text-center py-20 text-navy/50 font-medium bg-white rounded-3xl border border-navy/5 shadow-sm">
                    No schools found in this category. Try adjusting your filters.
                </div>
            )}
        </div>
    );
}
