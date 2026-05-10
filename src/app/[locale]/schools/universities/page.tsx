import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SchoolCard } from "@/components/SchoolCard";
import { UNIVERSITIES } from "@/constants/schools";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        return {};
    }

    const t = await getTranslations({ locale, namespace: "uniMetadata" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function UniversitiesPage({ params }: Props) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: "schoolPages.universities" });

    return (
        <main className="min-h-screen bg-sand-light/30">
            <Navbar />
            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">{t("title")}</h1>
                    <p className="text-xl font-medium text-navy/80 max-w-2xl mx-auto mb-6">{t("subtitle")}</p>
                    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-navy/5 text-left">
                        <p className="text-navy/65 leading-relaxed">{t("intro")}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                    {UNIVERSITIES.map((school) => (
                        <SchoolCard key={school.id} school={school} />
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
