import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GUIDES } from "@/constants/guides";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Metadata } from "next";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        return {};
    }

    const t = await getTranslations({ locale });
    return {
        title: `${t("guides.title")} | EduBrisbane`,
        description: t("guides.subtitle"),
    };
}

export default async function GuidesPage({ params }: Props) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const t = await getTranslations({ locale });
    const localeKey = locale as "en" | "tr";

    return (
        <main className="min-h-screen bg-sand-light/30">
            <Navbar />

            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16 lg:mb-24">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border-2 border-navy/10 text-navy/80 text-sm font-bold mb-6">
                        {t("guides.badge")}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy mb-6">
                        {t("guides.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-amber-600">{t("guides.titleHighlight")}</span>
                    </h1>
                    <p className="text-navy/60 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        {t("guides.subtitle")}
                    </p>
                </div>

                {/* Guides Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {GUIDES.map((guide) => {
                        const content = guide.translations[localeKey];

                        return (
                            <Link
                                href={`/guides/${guide.slug}`}
                                key={guide.slug}
                                className="group flex flex-col bg-white rounded-3xl overflow-hidden border-2 border-navy/5 shadow-[8px_8px_0px_0px_rgba(10,25,47,0.06)] hover:shadow-[4px_4px_0px_0px_rgba(10,25,47,0.06)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300"
                            >
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={guide.image}
                                        alt={content.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-300" />
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-bold text-navy shadow-lg">
                                        {content.categoryLabel}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h2 className="text-2xl font-bold text-navy mb-4 group-hover:text-accent-gold transition-colors line-clamp-2">
                                        {content.title}
                                    </h2>
                                    <p className="text-navy/60 leading-relaxed mb-6 line-clamp-3 flex-grow">
                                        {content.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-navy/10">
                                        <div className="flex items-center gap-4 text-sm text-navy/50 font-medium">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={16} />
                                                {new Date(guide.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={16} />
                                                {guide.readTime}
                                            </span>
                                        </div>
                                        <div className="text-navy font-bold flex items-center gap-1 group-hover:text-accent-gold transition-colors">
                                            {t("guides.readMore")} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </main>
    );
}
