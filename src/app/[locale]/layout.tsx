
import { Geist, Geist_Mono } from "next/font/google";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import StoreProvider from "@/providers/StoreProvider";
import AuthStorage from "@/lib/authStorage";
import CustomersStorage from "@/lib/customerStorage";
import VendorsStorage from "@/lib/vendorStorage";
import ProductStorage from "@/lib/productStorage";
import CategoriesStorage from "@/lib/categoryStorage";
import OrderStorage from "@/lib/orderStorage";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export const instant = false;

export function generateStaticParams() {
    return routing.locales.map((locale) => ({
        locale: locale,
    }));
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // console.log("Current locale:", locale);

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const messages = await getMessages({ locale })

    console.log("RootLayout locale:", locale);
    console.log("VisitPage messages:", messages.VisitPage);

    console.log("Login messages:", messages.Login)

    return (
        <NextIntlClientProvider locale={locale} messages={messages} >
            <StoreProvider>

                <div dir={locale === "fa" ? "rtl" : "ltr"} className="min-h-screen flex flex-col" >
                    <AuthStorage />
                    <CustomersStorage />
                    <VendorsStorage />
                    <ProductStorage />
                    <CategoriesStorage />
                    <OrderStorage />
                    {children}
                </div>

            </StoreProvider>
        </NextIntlClientProvider>
    );
}
