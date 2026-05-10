import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VisaCheckerClient } from "./VisaCheckerClient";
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
        title: `${t("tools.visaChecker.title")} ${t("tools.visaChecker.titleHighlight")} | EduBrisbane`,
        description: t("tools.visaChecker.subtitle"),
    };
}

export default async function VisaCheckerPage({ params }: Props) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const t = await getTranslations({ locale });

    return (
        <main className="min-h-screen bg-sand-light/30">
            <Navbar />

            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16 lg:mb-20">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/20 border-2 border-accent-gold/30 text-accent-gold text-sm font-bold mb-6">
                        {t("tools.visaChecker.badge")}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy mb-6">
                        {t("tools.visaChecker.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-amber-600">{t("tools.visaChecker.titleHighlight")}</span>
                    </h1>
                    <p className="text-navy/60 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        {t("tools.visaChecker.subtitle")}
                    </p>
                </div>

                {/* Interactive Tool Component */}
                <VisaCheckerClient />
            </div>

            <Footer />
        </main>
    );
}
