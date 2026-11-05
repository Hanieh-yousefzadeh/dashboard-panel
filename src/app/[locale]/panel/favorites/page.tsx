"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { FavoriteProduct, mockMyFavorites } from "@/data/mock-favorite";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function MyFavoritePage() {
    const [favorites, setFavorites] = useState<FavoriteProduct[]>([])
    const [loaded, setLoaded] = useState(false)
    const t = useTranslations("MyFavoritePage")
    const locale = useLocale()
    useEffect(() => {
        const savedFavorites = localStorage.getItem("myFavorites")
        if (savedFavorites !== null) {
            setFavorites(JSON.parse(savedFavorites))
        } else {
            setFavorites(mockMyFavorites)
        }
        setLoaded(true)
    }, [])

    useEffect(() => {
        if (loaded) { localStorage.setItem("myFavorites", JSON.stringify(favorites)) }
    }, [favorites, loaded])

    function deleteFavorite(id: number) {
        const deletefav = favorites.filter((product) => product.id !== id)
        setFavorites(deletefav)
    }

    if (!loaded) {
        return null
    }
    return (
        <div className="p-6">
            <h1 className={`mb-8 ${locale === "fa" ? "pr-3" : "pl-3"}  text-2xl font-bold`}>{t("title")} </h1>

            <div className={`mt-4 ${locale === "fa" ? "mr-3" : "ml-3 "}  rounded-md border border-[#7a3ffa1a] shadow-sm dark:bg-[#0B0E1A] xl:w-300 w-80 lg:w-180 sm:w-170 overflow-x-auto`}>
                <Table>
                    <TableHeader className="h-15 text-base bg-[#f1ebfe6a] dark:bg-[#6a50b11e]">
                        <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                            <TableHead className={` ${locale === "fa" ? "text-right pr-20" : "xl:pl-10 pl-5"} font-semibold text-[#5409cd] dark:text-[#d7c7f9b8]`}> {t("product")}</TableHead>
                            <TableHead className={` ${locale == "fa" ? "text-right" : ""} font-semibold text-[#5409cd] dark:text-[#d7c7f9b8]`}>{t("price")} </TableHead>
                            <TableHead className="text-center  font-semibold text-[#5409cd] dark:text-[#d7c7f9b8]"> {t("action")}</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {favorites.map((product) => (
                            <TableRow key={product.id} className="h-16">
                                <TableCell>
                                    <div className={`flex min-w-40 items-center gap-3  ${locale === "fa" ? "pr-15" : "xl:pl-8"}`}>
                                        <Image src={product.image} alt={product.name} width={48} height={48}
                                            className="size-12 shrink-0 rounded-md object-cover"
                                        />

                                        <span className="line-clamp-1">
                                            {product.name === "Smart Watch" ? t("smartWatch") :
                                                product.name === "Sunscreen" ? t("sunscreen") : t("tShirt")}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell className={` ${locale === "fa" ? "pl-25" : ""}`}> {product.price.toLocaleString("en-US")} $</TableCell>

                                <TableCell className="text-center">
                                    <button
                                        onClick={() => deleteFavorite(product.id)}
                                        className="rounded-lg p-2 text-red-500 dark:text-[#8A0B19] hover:bg-red-50">
                                        <Trash className="size-5" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {favorites.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center text-gray-500" >
                                    {t("noFavorites")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}