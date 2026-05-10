"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = () => {
        const newLocale = locale === "tr" ? "en" : "tr";
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-navy/10 text-navy/70 hover:text-navy hover:border-navy/20 transition-all duration-200 text-sm font-medium"
            aria-label="Switch language"
        >
            <Globe size={16} />
            <span className="uppercase">{locale === "tr" ? "EN" : "TR"}</span>
        </button>
    );
}
