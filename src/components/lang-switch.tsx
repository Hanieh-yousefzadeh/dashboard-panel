"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/nav";

export default function LanguageSwitch() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    function handleLanguageChange() {
        const newLocale = locale === "fa" ? "en" : "fa";

        router.replace(pathname, { locale: newLocale });
    }

    return (
        <button
            type="button"
            onClick={handleLanguageChange}
            className=" cursor-pointer  border-2 dark:border dark:text-current  dark:border-[#ae8dfc92]  border-[#7a3ffa2d] rounded-full  py-1 px-2 text-base  font-medium  text-[#0318A1] hover:bg-[#8049FD] hover:text-[#FFFFFF]"
        >
            {locale === "fa" ? "En" : "Fa"}
        </button>
    );
}