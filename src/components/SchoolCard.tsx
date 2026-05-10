"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { MapPin, BookOpen, ArrowRight, Plus, Check } from "lucide-react";
import { School } from "@/constants/schools";
import { useCompare } from "@/context/CompareContext";

export function SchoolCard({ school }: { school: School }) {
    const t = useTranslations("schoolPages.card");
    const tCompare = useTranslations("compare");

    const { addSchool, removeSchool, isSchoolSelected, selectedSchools } = useCompare();
    const isSelected = isSchoolSelected(school.id);
    const isMaxReached = selectedSchools.length >= 3;

    // Determine link destination based on if it's a university (has slug/full profile) or a generic TAFE/Language School
    let destinationHref = "/contact";
    if (school.slug) {
        if (school.id.startsWith("u-")) destinationHref = `/schools/universities/${school.slug}`;
        else if (school.id.startsWith("ls-")) destinationHref = `/schools/language-schools/${school.slug}`;
        else if (school.id.startsWith("tc-")) destinationHref = `/schools/tafe/${school.slug}`;
    }

    const handleCompareToggle = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigating if this is inside a link wrapper
        if (isSelected) {
            removeSchool(school.id);
        } else if (!isMaxReached) {
            addSchool(school);
        }
    };

    return (
        <div className={`group relative rounded-2xl border-2 bg-white p-6 sm:p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full
            ${isSelected ? "border-accent-gold shadow-[0px_8px_0px_0px_rgba(239,186,63,0.3)]" : "border-navy/8 shadow-[4px_4px_0px_0px_rgba(10,25,47,0.06)] hover:shadow-[6px_6px_0px_0px_rgba(10,25,47,0.1)]"}
        `}>
            <div className="flex-1">
                {/* Header: Name and Location */}
                <h3 className="text-xl font-bold text-navy mb-3">{school.name}</h3>

                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                    {school.isLocalChoice && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded bg-accent-gold/15 text-accent-gold text-xs font-bold border-2 border-accent-gold/20">
                            {t("localChoice")}
                        </span>
                    )}
                    {school.assessmentLevel && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded bg-navy/5 text-navy/80 text-xs font-bold border-2 border-navy/10">
                            {t("assessmentLevel")} {school.assessmentLevel}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1.5 text-sm text-navy/55 mb-6">
                    <MapPin size={16} className="text-accent-gold flex-shrink-0" />
                    <span>{school.location}</span>
                </div>

                {school.price && (
                    <div className="mb-6 bg-sand-light/50 p-3 rounded-xl border border-sand-light/80">
                        <div className="text-xs text-navy/60 font-medium uppercase tracking-wider mb-1">{t("startingFrom")}</div>
                        <div className="text-xl font-extrabold text-navy">
                            ${school.price} <span className="text-sm font-medium text-navy/60">{t("weekly")}</span>
                        </div>
                    </div>
                )}

                {/* Featured Courses */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm font-semibold text-navy mb-3">
                        <BookOpen size={16} className="text-navy/70" />
                        <span>{t("featuredCourses")}</span>
                    </div>
                    <ul className="space-y-2">
                        {(school.featuredCourses || []).map((course, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-navy/70">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/50 mt-1.5 flex-shrink-0" />
                                <span>{course}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Action / CTA */}
            <div className="mt-auto pt-6 border-t-2 border-navy/5 flex flex-col gap-3">
                <button
                    onClick={handleCompareToggle}
                    disabled={!isSelected && isMaxReached}
                    className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all
                        ${isSelected
                            ? "bg-accent-gold/10 border-accent-gold text-accent-gold"
                            : !isSelected && isMaxReached
                                ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white border-navy/10 text-navy hover:border-navy hover:bg-navy/5"}
                    `}
                >
                    {isSelected ? (
                        <>
                            <Check size={16} />
                            {tCompare("added")}
                        </>
                    ) : (
                        <>
                            <Plus size={16} />
                            {tCompare("add")}
                        </>
                    )}
                </button>
                <Link
                    href={destinationHref}
                    className="inline-flex items-center justify-between w-full sm:w-auto sm:justify-start gap-2 bg-navy/5 hover:bg-navy text-navy hover:text-white px-5 min-h-[44px] rounded-xl text-sm font-semibold transition-all duration-300 group"
                >
                    {t("getDetails")}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
