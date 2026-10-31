"use client"

import { mockProducts } from "@/data/mock-products"
import { mockProductStats } from "@/data/mock-prostats"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function VisitPage() {
       const t = useTranslations("VisitPage")
    const locale = useLocale()
    console.log("Locale:", locale)
    console.log("Product:", t("product"))
    const productTranslationKeys = {
        "Sunscreen": "sunscreen",
        "Smart Watch": "smartWatch",
        "T-Shirt": "tShirt",
        "English Language Tutorial": "englishTutorial",
        "Stainless steel pot": "steelPot",
    } as const
    const productsWithStats = mockProducts.map((product) => {
        const stats = mockProductStats.find((item) => item.productId === product.id)
        return {
            ...product,
            views: stats?.views ? stats.views : 0,
            addedToWishlist: stats?.Wishlist ? stats.Wishlist : 0,
        }
    })
    return (
        <div className={`${locale === "fa" ? "pr-6" : "xl:pl-6 px-5 "} py-8  xl:w-312 md:w-3xl w-80 overflow-x-atuo`}>
            <div className="rounded-md border-2 border-[#7a3ffa1a] dark:bg-[#0B0E1A]">
                <Table>
                    <TableHeader className="h-15 text-base bg-[#f1ebfe6a] dark:bg-[#6a50b11e]">
                        <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                            <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right pr-20":"pl-19"}`}>{t("product")}</TableHead>
                            <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right": ""}`}>{t("views")}</TableHead>
                            <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right": ""}`}>{t("addedToWishlist")}</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {productsWithStats.map((product) => {
                            const productKey = productTranslationKeys[product.name as keyof typeof productTranslationKeys]
                            return (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <div className={`flex min-w-40 items-center gap-3  ${locale === "fa" ? "pr-15" : "pl-15"}`}>
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={48}
                                                height={48}
                                                className="size-12 shrink-0 rounded-md object-cover"
                                            />

                                            <span className="line-clamp-1">{t(productKey)}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className={`${locale === "fa" ? "pl-25" : "pr-20"}`}> {product.views} </TableCell>
                                    <TableCell className="pl-15"> {product.addedToWishlist}</TableCell>
                                </TableRow>
                            )
                        })}

                        {productsWithStats.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="py-8 text-center"> {t("noProductsFound")}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
