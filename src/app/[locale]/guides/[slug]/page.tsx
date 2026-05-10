import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GUIDES } from "@/constants/guides";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { LeadMagnet } from "@/components/LeadMagnet";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    return routing.locales.flatMap((locale) =>
        GUIDES.map((guide) => ({
            locale,
            slug: guide.slug,
        }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;

    if (!routing.locales.includes(locale as any)) {
        return {};
    }

    const guide = GUIDES.find(g => g.slug === slug);
    if (!guide) return {};

    const localeKey = locale as "en" | "tr";
    const content = guide.translations[localeKey];

    return {
        title: `${content.title} | EduBrisbane`,
        description: content.excerpt,
    };
}

export default async function GuideDetailPage({ params }: Props) {
    const { locale, slug } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const guide = GUIDES.find(g => g.slug === slug);

    if (!guide) {
        notFound();
    }

    const t = await getTranslations({ locale });
    const localeKey = locale as "en" | "tr";
    const content = guide.translations[localeKey];

    return (
        <main className="min-h-screen bg-sand-light/30">
            <Navbar />

            <article className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    href="/guides"
                    className="inline-flex items-center gap-2 text-navy/60 hover:text-navy font-semibold mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    {t("guides.backButton")}
                </Link>

                {/* Article Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-3 py-1 rounded-lg bg-accent-gold/20 text-accent-gold text-sm font-bold">
                            {content.categoryLabel}
                        </span>
                        <div className="flex items-center gap-2 text-navy/50 text-sm font-medium">
                            <Calendar size={16} />
                            {new Date(guide.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { month: 'long', day: 'numeric', year: 'numeric' })}
                            <span className="mx-2">•</span>
                            <Clock size={16} />
                            {guide.readTime} {t("guides.readTime")}
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-navy leading-tight mb-8">
                        {content.title}
                    </h1>

                    <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-navy/5">
                        <Image
                            src={guide.image}
                            alt={content.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </header>

                {/* Article Content */}
                <div
                    className="prose prose-lg md:prose-xl prose-navy max-w-none mb-16
                    prose-headings:font-bold prose-headings:text-navy
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-navy/70 prose-p:leading-relaxed prose-p:mb-6
                    prose-li:text-navy/70 prose-li:mb-2
                    prose-strong:text-navy prose-strong:font-bold
                    prose-a:text-accent-gold prose-a:no-underline hover:prose-a:underline
                    prose-em:text-navy/60 prose-em:italic"
                    dangerouslySetInnerHTML={{ __html: content.content }}
                />

                {/* Lead Magnet CTA */}
                <LeadMagnet />

                {/* Consultation CTA */}
                <div className="bg-white rounded-[2rem] p-8 md:p-12 text-center shadow-[4px_4px_0px_0px_rgba(10,25,47,0.06)] border-2 border-navy/5">
                    <h3 className="text-2xl font-bold text-navy mb-3">{t("guides.consultationCTA.title")}</h3>
                    <p className="text-navy/60 mb-8 max-w-xl mx-auto">{t("guides.consultationCTA.subtitle")}</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 w-fit shadow-[4px_4px_0px_0px_rgba(239,186,63,0.5)] hover:shadow-[2px_2px_0px_0px_rgba(239,186,63,0.5)] hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                        {t("guides.consultationCTA.button")}
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </article>

            <Footer />
        </main>
    );
}
