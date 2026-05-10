import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { LANGUAGE_SCHOOLS } from "@/constants/schools";
import { NextIntlClientProvider } from "next-intl";
import LanguageSchoolDetailClient from "./LanguageSchoolDetailClient";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;

    if (!routing.locales.includes(locale as any)) {
        return {};
    }

    const school = LANGUAGE_SCHOOLS.find(s => s.slug === slug);
    if (!school) return {};

    const description = typeof school.description === 'object'
        ? (school.description[locale as 'en' | 'tr'] || school.description.en)
        : (school.description || `Explore English language programs at ${school.name} with EduBrisbane.`);

    return {
        title: `${school.name} | EduBrisbane`,
        description,
    };
}

export default async function LanguageSchoolDetailPage({ params }: Props) {
    const { locale, slug } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const school = LANGUAGE_SCHOOLS.find(s => s.slug === slug);

    if (!school) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <LanguageSchoolDetailClient school={school} />
        </NextIntlClientProvider>
    );
}

export function generateStaticParams() {
    return LANGUAGE_SCHOOLS.filter(s => s.slug).map(s => ({
        slug: s.slug
    }));
}
