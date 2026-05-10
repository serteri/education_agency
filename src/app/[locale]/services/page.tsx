import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceGrid } from "@/components/ServiceGrid";
import { LocalAdvantage } from "@/components/LocalAdvantage";
import { JourneyForm } from "@/components/JourneyForm";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        return {};
    }

    const t = await getTranslations({ locale, namespace: "servicesMetadata" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function ServicesPage({ params }: Props) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: "servicesPage" });
    const dict = await getTranslations({ locale });

    const detailedServices = [
        {
            id: "elicos",
            titleKey: "elicos.heading",
            descKey: "elicos.description",
            btnKey: "elicos.button",
            href: "/schools/language-schools",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000",
            features: [
                "General English",
                "IELTS / PTE Preparation",
                "Academic English Programs",
                "Flexible Start Dates"
            ]
        },
        {
            id: "vet",
            titleKey: "vet.heading",
            descKey: "vet.description",
            btnKey: "vet.button",
            href: "/schools/tafe",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000",
            features: [
                "Commercial Cookery & Hospitality",
                "Information Technology",
                "Health & Community Services",
                "Automotive & Trades"
            ],
            reversed: true
        },
        {
            id: "university",
            titleKey: "university.heading",
            descKey: "university.description",
            btnKey: "university.button",
            href: "/schools/universities",
            image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2000",
            features: [
                "Foundation Programs",
                "Bachelor Degrees",
                "Master & PhD Programs",
                "Scholarship Assistance"
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-sand-light/30">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-navy">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000"
                        alt="Education Services"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight">
                        {t("hero.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-amber-500">{t("hero.titleHighlight")}</span>
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                        {t("hero.subtitle")}
                    </p>
                </div>
            </div>

            {/* Existing Service Grid Component Container */}
            <div className="-mt-10 relative z-20 mb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[2.5rem] shadow-[0px_8px_32px_rgba(10,25,47,0.08)] border border-navy/5 overflow-hidden">
                        <ServiceGrid />
                    </div>
                </div>
            </div>

            {/* Detailed Services Sections (Alternating Layout) */}
            <div className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-32">
                {detailedServices.map((service, index) => (
                    <div key={service.id} className={`flex flex-col gap-12 lg:gap-16 items-center ${service.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                        {/* Image Side */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(10,25,47,0.1)] border-2 border-navy/10 group">
                                <Image
                                    src={service.image}
                                    alt={t(service.titleKey)}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            {/* Decorative element */}
                            <div className={`absolute -z-10 w-full h-full rounded-[2rem] bg-accent-gold/20 blur-2xl top-4 ${service.reversed ? '-left-4' : '-right-4'}`} />
                        </div>

                        {/* Content Side */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border-2 border-navy/10 text-navy/80 text-sm font-bold mb-6 w-fit">
                                0{index + 1}
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-6">
                                {t(service.titleKey)}
                            </h2>
                            <p className="text-lg text-navy/65 leading-relaxed mb-8">
                                {t(service.descKey)}
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-navy/80 font-medium">
                                        <CheckCircle2 size={20} className="text-accent-gold shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={service.href}
                                className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 w-fit shadow-[4px_4px_0px_0px_rgba(239,186,63,0.5)] hover:shadow-[2px_2px_0px_0px_rgba(239,186,63,0.5)] hover:translate-x-[2px] hover:translate-y-[2px]"
                            >
                                {t(service.btnKey)}
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Local Advantage Section */}
            <div className="bg-white py-20 border-y border-navy/5 mt-10">
                <LocalAdvantage />
            </div>

            {/* CTA Journey Form */}
            <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 border-2 border-accent-gold/20 text-accent-gold text-sm font-bold mb-6">
                        {dict("form.badge")}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-6">
                        {dict("form.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-amber-600">{dict("form.titleHighlight")}</span>
                    </h2>
                    <p className="text-navy/60 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        {dict("form.subtitle")}
                    </p>
                </div>
                <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(10,25,47,0.06)] border-2 border-navy/5">
                    <JourneyForm />
                </div>
            </div>

            <Footer />
        </main>
    );
}
