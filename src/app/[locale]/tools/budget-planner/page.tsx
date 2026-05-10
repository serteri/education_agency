import { setRequestLocale } from "next-intl/server";
import { BudgetPlannerClient } from "./BudgetPlannerClient";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function BudgetPlannerPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="min-h-screen bg-sand-light/50 flex flex-col pt-32 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 flex-grow">
                <BudgetPlannerClient />
            </div>
        </main>
    );
}
