import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JourneyForm } from "@/components/JourneyForm";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        return {};
    }

    const t = await getTranslations({ locale, namespace: "contactMetadata" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: "contactMetadata" });
    const dict = await getTranslations({ locale });

    return (
        <main className="min-h-screen bg-sand-light/30">
            <Navbar />
            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 border-2 border-accent-gold/20 text-accent-gold text-sm font-bold mb-6">
                        {dict("form.badge")}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-6">
                        {dict("form.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-amber-600">{dict("form.titleHighlight")}</span>
                    </h1>
                    <p className="text-navy/60 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        {dict("form.subtitle")}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(10,25,47,0.06)] border-2 border-navy/5 mb-20">
                    <JourneyForm />
                </div>

                {/* Map Section */}
                <div className="max-w-6xl mx-auto mt-20">
                    <div className="bg-white rounded-[2rem] p-4 sm:p-6 shadow-[8px_8px_0px_0px_rgba(10,25,47,0.06)] border-2 border-navy/5 overflow-hidden">
                        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative">
                            {/* Standard Embed code for Albion, Brisbane */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113576.953181816!2d152.96677464335937!3d-27.426176399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915993a4046d1d%3A0x502a35af3dea8a0!2sAlbion%20QLD%204010%2C%20Australia!5e0!3m2!1sen!2str!4v1700000000000!5m2!1sen!2str"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="EduBrisbane Office Location - Albion, Brisbane"
                                className="absolute inset-0 grayscale contrast-125 opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
