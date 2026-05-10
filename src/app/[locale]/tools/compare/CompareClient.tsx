"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useCompare } from "@/context/CompareContext";
import { ArrowLeft, Trash2, MapPin, Building2, CheckCircle2, GraduationCap, DollarSign, Target, Briefcase } from "lucide-react";

export function CompareClient() {
    const t = useTranslations("compare");
    const { selectedSchools, removeSchool, clearComparison } = useCompare();

    // Helper to get locale-specific string or fallback
    const tLocale = useTranslations();
    const currentLocale = "tr"; // We can derive this if needed, but in client components we usually just render what we get. For { en, tr } objects, we need to extract.

    // We'll use a hack to get the locale from the pathname or a generic hook.
    // For simplicity, let's assume `localInsight` is handled by a helper.
    const getLocalizedText = (textObj: any, locale: "en" | "tr") => {
        if (!textObj) return "-";
        if (typeof textObj === 'string') return textObj;
        return textObj[locale] || textObj['en'];
    };

    if (selectedSchools.length === 0) {
        return (
            <div className="bg-white rounded-[2.5rem] shadow-[0px_8px_32px_rgba(10,25,47,0.08)] border border-navy/5 p-12 text-center max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-24 h-24 bg-navy/5 rounded-full flex items-center justify-center text-navy/30 mb-6">
                    <Building2 size={48} />
                </div>
                <h2 className="text-3xl font-bold text-navy mb-4">{t("title")}</h2>
                <p className="text-navy/60 mb-8 max-w-md mx-auto">{t("emptyState")}</p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Link href="/schools/universities" className="px-6 py-3 rounded-xl bg-navy text-white font-bold hover:bg-navy-light text-sm text-center">
                        {t("browseUniversities")}
                    </Link>
                    <Link href="/schools/language-schools" className="px-6 py-3 rounded-xl bg-accent-gold text-navy font-bold hover:bg-amber-400 text-sm text-center">
                        {t("browseLanguage")}
                    </Link>
                </div>
            </div>
        );
    }

    // Read locale for data selection
    const locale = useLocale() as "en" | "tr";

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                    <Link href="/schools/universities" className="inline-flex items-center gap-2 text-navy/60 hover:text-navy font-medium text-sm mb-6 transition-colors">
                        <ArrowLeft size={16} />
                        Geri
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 tracking-tight">
                        {t("title")}
                    </h1>
                    <p className="text-lg text-navy/70 max-w-2xl">
                        {t("subtitle")}
                    </p>
                </div>
                <button
                    onClick={clearComparison}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-bold transition-colors w-fit md:w-auto"
                >
                    <Trash2 size={18} />
                    {t("clearAll")}
                </button>
            </div>

            {/* Comparison Table / Grid */}
            <div className="bg-white rounded-[2rem] shadow-[0px_8px_32px_rgba(10,25,47,0.06)] border border-navy/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-sand-light/30 border-b-2 border-navy/10">
                                <th className="p-6 w-1/4 min-w-[200px] align-bottom">
                                    <span className="text-xs uppercase tracking-widest text-navy/40 font-bold">Okullar</span>
                                </th>
                                {selectedSchools.map((school) => (
                                    <th key={school.id} className="p-6 w-1/4 min-w-[250px] align-bottom relative">
                                        <button
                                            onClick={() => removeSchool(school.id)}
                                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"
                                            title={t("remove")}
                                        >
                                            <XIcon />
                                        </button>
                                        <div className="aspect-[3/2] w-full rounded-xl overflow-hidden bg-navy/5 mb-4 border border-navy/10 relative">
                                            {school.image ? (
                                                <img src={school.image} alt={school.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-navy/20">
                                                    <Building2 size={48} />
                                                </div>
                                            )}
                                            {school.isLocalChoice && (
                                                <div className="absolute top-3 left-3 px-3 py-1 bg-accent-gold text-navy text-xs font-bold rounded-lg shadow-sm">
                                                    Yerel Seçim
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-extrabold text-navy leading-tight mb-2">{school.name}</h3>
                                        <div className="flex items-center gap-1.5 text-sm text-navy/60">
                                            <MapPin size={14} className="text-accent-gold" />
                                            {school.location}
                                        </div>
                                    </th>
                                ))}
                                {/* Fill empty slots if less than 3 */}
                                {Array.from({ length: 3 - selectedSchools.length }).map((_, idx) => (
                                    <th key={`empty-${idx}`} className="p-6 w-1/4 min-w-[250px] align-bottom text-center">
                                        <div className="aspect-[3/2] w-full rounded-xl border-2 border-dashed border-navy/10 flex flex-col items-center justify-center text-navy/30 gap-3 mb-4">
                                            <Building2 size={32} />
                                            <span className="text-sm font-semibold">Boş Slot</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-navy/5">

                            {/* Tuition Fee */}
                            <tr className="hover:bg-sand-light/10 transition-colors">
                                <td className="p-6 font-semibold text-navy/70 border-r border-navy/5 flex items-center gap-2">
                                    <DollarSign size={18} className="text-navy/40" />
                                    {t("table.tuitionFee")}
                                </td>
                                {selectedSchools.map((school) => (
                                    <td key={school.id} className="p-6 text-navy border-r border-navy/5 last:border-r-0">
                                        {school.price ? (
                                            <div>
                                                <span className="text-2xl font-black text-navy">${school.price}</span>
                                                <span className="text-sm text-navy/50 font-medium ml-1">
                                                    {school.id.startsWith("u-") ? "/ yıl" : "/ hafta"}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-navy/40 italic">Uygulama/bölüm bazlı değişir</span>
                                        )}
                                    </td>
                                ))}
                                {Array.from({ length: 3 - selectedSchools.length }).map((_, idx) => <td key={`empty-fee-${idx}`} className="p-6"></td>)}
                            </tr>

                            {/* Assessment Level */}
                            <tr className="hover:bg-sand-light/10 transition-colors">
                                <td className="p-6 font-semibold text-navy/70 border-r border-navy/5 flex items-center gap-2">
                                    <Target size={18} className="text-navy/40" />
                                    {t("table.assessmentLevel")}
                                </td>
                                {selectedSchools.map((school) => (
                                    <td key={school.id} className="p-6 border-r border-navy/5 last:border-r-0">
                                        {school.assessmentLevel ? (
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-navy/5 text-navy font-bold text-lg border-2 border-navy/10">
                                                {school.assessmentLevel}
                                            </span>
                                        ) : "-"}
                                    </td>
                                ))}
                                {Array.from({ length: 3 - selectedSchools.length }).map((_, idx) => <td key={`empty-al-${idx}`} className="p-6"></td>)}
                            </tr>

                            {/* Global Ranking */}
                            <tr className="hover:bg-sand-light/10 transition-colors">
                                <td className="p-6 font-semibold text-navy/70 border-r border-navy/5 flex items-center gap-2">
                                    <GraduationCap size={18} className="text-navy/40" />
                                    {t("table.ranking")}
                                </td>
                                {selectedSchools.map((school) => (
                                    <td key={school.id} className="p-6 border-r border-navy/5 last:border-r-0 text-sm text-navy font-medium">
                                        {getLocalizedText(school.ranking, locale)}
                                    </td>
                                ))}
                                {Array.from({ length: 3 - selectedSchools.length }).map((_, idx) => <td key={`empty-rnk-${idx}`} className="p-6"></td>)}
                            </tr>

                            {/* Featured Courses */}
                            <tr className="hover:bg-sand-light/10 transition-colors">
                                <td className="p-6 font-semibold text-navy/70 border-r border-navy/5 flex items-center gap-2">
                                    <Briefcase size={18} className="text-navy/40" />
                                    {t("table.featuredCourses")}
                                </td>
                                {selectedSchools.map((school) => (
                                    <td key={school.id} className="p-6 border-r border-navy/5 last:border-r-0">
                                        <ul className="space-y-2">
                                            {(school.featuredCourses || []).slice(0, 4).map((course, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-navy/80">
                                                    <CheckCircle2 size={16} className="text-accent-gold flex-shrink-0 mt-0.5" />
                                                    <span>{course}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                ))}
                                {Array.from({ length: 3 - selectedSchools.length }).map((_, idx) => <td key={`empty-fc-${idx}`} className="p-6"></td>)}
                            </tr>

                            {/* Local Insight */}
                            <tr className="hover:bg-sand-light/10 transition-colors bg-accent-gold/5">
                                <td className="p-6 font-bold text-accent-gold border-r border-navy/5 flex items-start gap-2 pt-8">
                                    <img src="/avatar-serter.png" alt="Serter" className="w-8 h-8 rounded-full border-2 border-accent-gold object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                    <span className="mt-1">{t("table.localInsight")}</span>
                                </td>
                                {selectedSchools.map((school) => (
                                    <td key={school.id} className="p-6 border-r border-navy/5 last:border-r-0">
                                        {school.localInsight ? (
                                            <div className="relative">
                                                <div className="absolute -top-2 -left-3 text-4xl text-accent-gold/20 font-serif leading-none">"</div>
                                                <p className="text-sm text-navy/80 italic font-medium relative z-10 leading-relaxed pl-2">
                                                    {getLocalizedText(school.localInsight, locale)}
                                                </p>
                                            </div>
                                        ) : (
                                            <span className="text-navy/30 text-sm italic">Henüz yerel bir görüş eklenmedi.</span>
                                        )}
                                    </td>
                                ))}
                                {Array.from({ length: 3 - selectedSchools.length }).map((_, idx) => <td key={`empty-ins-${idx}`} className="p-6"></td>)}
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Simple X icon for the remove button
function XIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );
}
