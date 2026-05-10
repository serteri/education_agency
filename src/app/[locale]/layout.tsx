import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CompareProvider } from "@/context/CompareContext";
import { CompareBar } from "@/components/CompareBar";
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { locale } = await params;

    // Validate locale before fetching translations
    if (!routing.locales.includes(locale as 'tr' | 'en')) {
        return {
            title: "EduBrisbane",
            description: "Avustralya Eğitim Danışmanlığı",
        };
    }

    const t = await getTranslations({ locale, namespace: "metadata" });

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Params;
}) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as 'tr' | 'en')) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} className="scroll-smooth">
            <body
                className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <CompareProvider>
                        {children}
                        <WhatsAppButton />
                        <CompareBar />
                    </CompareProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
