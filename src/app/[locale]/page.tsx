import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedSchools } from "@/components/FeaturedSchools";
import { AboutSummary } from "@/components/AboutSummary";
import { JourneyForm } from "@/components/JourneyForm";
import { Footer } from "@/components/Footer";
import { getTranslations } from "next-intl/server";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "form" });

    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <FeaturedSchools />
            <AboutSummary />
            <div id="contact" className="bg-white py-24 border-t-2 border-navy/5 relative scroll-mt-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 border-2 border-accent-gold/20 text-accent-gold text-sm font-bold mb-6">
                            {t("badge")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-navy mb-6">
                            {t("title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-amber-600">{t("titleHighlight")}</span>
                        </h2>
                        <p className="text-navy/60 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                            {t("subtitle")}
                        </p>
                    </div>
                    <div className="bg-sand-light/30 rounded-[2.5rem] p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(10,25,47,0.06)] border-2 border-navy/5">
                        <JourneyForm />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
