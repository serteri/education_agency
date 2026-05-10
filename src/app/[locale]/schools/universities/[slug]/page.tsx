import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { UNIVERSITIES } from "@/constants/schools";
import { NextIntlClientProvider } from "next-intl";
import UniversityDetailClient from "./UniversityDetailClient";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;

    if (!routing.locales.includes(locale as any)) {
        return {};
    }

    const university = UNIVERSITIES.find(u => u.slug === slug);
    if (!university) return {};

    const description = typeof university.description === 'object'
        ? (university.description[locale as 'en' | 'tr'] || university.description.en)
        : (university.description || `Learn more about studying at ${university.name} with EduBrisbane.`);

    return {
        title: `${university.name} | EduBrisbane`,
        description,
    };
}

export default async function UniversityDetailPage({ params }: Props) {
    const { locale, slug } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const university = UNIVERSITIES.find(u => u.slug === slug);

    if (!university) {
        notFound();
    }

    // Explicitly load messages for this page to pass down to the Client Component
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <UniversityDetailClient university={university} />
        </NextIntlClientProvider>
    );
}

// Generate static params if desired for all slugs
export function generateStaticParams() {
    return UNIVERSITIES.filter(u => u.slug).map(u => ({
        slug: u.slug
    }));
}
