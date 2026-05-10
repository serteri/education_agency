import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LocalAdvantage } from "@/components/LocalAdvantage";
import { Building2, Globe2, Handshake } from "lucide-react";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        return {};
    }

    const t = await getTranslations({ locale, namespace: "aboutMetadata" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: "about" });

    return (
        <main className="min-h-screen bg-sand-light/30">
            <Navbar />

            <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 border-2 border-accent-gold/20 text-accent-gold text-sm font-bold mb-6">
                        <Building2 size={16} />
                        {t("badge")}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-6">
                        {t("title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-amber-600">{t("titleHighlight")}</span>
                    </h1>
                    <p className="text-xl text-navy/70 leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
                    <div className="bg-white rounded-3xl p-8 shadow-[4px_4px_0px_0px_rgba(10,25,47,0.06)] border-2 border-navy/5">
                        <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-6">
                            <Globe2 className="w-6 h-6 text-navy" />
                        </div>
                        <h2 className="text-2xl font-bold text-navy mb-4">{t("vision.title")}</h2>
                        <p className="text-navy/70 leading-relaxed">
                            {t("vision.description")}
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-[4px_4px_0px_0px_rgba(10,25,47,0.06)] border-2 border-navy/5">
                        <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center mb-6">
                            <Handshake className="w-6 h-6 text-accent-gold" />
                        </div>
                        <h2 className="text-2xl font-bold text-navy mb-4">{t("mission.title")}</h2>
                        <p className="text-navy/70 leading-relaxed">
                            {t("mission.description")}
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border-2 border-navy/10 shadow-[6px_6px_0px_0px_rgba(10,25,47,0.08)]">
                    <h3 className="text-2xl font-extrabold text-navy mb-4">
                        {locale === "tr" ? "Kurumsal Güven Bilgileri" : "Corporate Trust Signals"}
                    </h3>
                    <div className="space-y-3 text-navy/80 font-semibold">
                        <p>ABN: XX XXX XXX XXX</p>
                        <p>Member of ICEF Academy (In-Training)</p>
                    </div>
                </div>
            </section>

            {/* Keeping the detailed LocalAdvantage component here as the main focus */}
            <div className="border-t-2 border-navy/5 bg-white">
                <LocalAdvantage />
            </div>

            <Footer />
        </main>
    );
}
