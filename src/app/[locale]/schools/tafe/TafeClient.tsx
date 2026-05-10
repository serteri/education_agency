"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SchoolCard } from "@/components/SchoolCard";
import { TAFE_COLLEGES } from "@/constants/schools";

const FILTER_TABS = [
    { id: "All", labelKey: "all" },
    { id: "Trade Courses", labelKey: "tradeCourses" },
    { id: "IT & Business", labelKey: "itBusiness" },
    { id: "Health & Community Services", labelKey: "healthCommunity" },
];

export function TafeClient() {
    const tFilters = useTranslations("schoolPages.filters");
    const [activeTab, setActiveTab] = useState("All");

    const filteredSchools = TAFE_COLLEGES.filter((school) => {
        if (activeTab === "All") return true;
        return school.categories?.includes(activeTab);
    });

    return (
        <div className="w-full">
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
