"use client"

import { navigation } from "@/data/navigation"
import { useState, useEffect } from "react"
import { stateType } from "@/lib/store"
import { useSelector } from "react-redux"
import { CircleUserRound } from "lucide-react"
import { Link, usePathname } from "@/i18n/nav"
import { useTranslations , useLocale} from "next-intl"
import { Spinner } from "./ui/spinner"



export default function SideBar() {
    const t = useTranslations("AdminDashboard.sidebar")
    const locale = useLocale()
    const pathName = usePathname()
    const user = useSelector((state: stateType) => state.auth.user)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner className="size-10 text-purple-600" />
            </div>
        )
    }

    if (!user) {
        return null
    }

    const menu = navigation[user.role]
    return (
        <aside className={`hidden lg:flex min-h-153 w-64 shrink-0 flex-col ${ locale === "fa" ? "border-l-2" : " border-r-2"} border-[#7a3ffa2d] dark:border-[#7a3ffa51] p-4  `}>
            <div className="flex items-center pl-1 pb-8 gap-1">
                <CircleUserRound className="text-[#5d16f76f] dark:text-[#9a70fc] size-9" />
                <h2 className=" font-bold">  {t("dashboard")} {t(user.role.toLowerCase())} </h2>
            </div>
            <div className="">
                {menu.map((item) => {
                    const Icon = item.icon
                    const isActive = pathName === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-md px-3 py-2 text-base mb-1 ${isActive ? "text-[#7a3ffa] dark:text-[#9a70fc] dark:bg-[#17143D] bg-[#7a3ffa1a]"
                                : " hover:text-[#7a3ffa] dark:hover:text-[#9a70fc] dark:hover:bg-[#17143D] hover:bg-[#7a3ffa1a]"
                                }`}
                        >
                            <Icon size={20} />
                            <span> {t(({
                                    Dashboard: "dashboard",
                                    Users: "users",
                                    Vendors: "vendors",
                                    Products: "products",
                                    Categories: "categories",
                                    Orders: "orders",
                                    "My Products": "myProducts",
                                    Visit: "visit",
                                    "My Orders": "myOrders",
                                    Favorite: "favorite",
                                    Addresses: "addresses",
                                    "Reviews & Questions": "reviews",
                                }[item.title] || item.title)
                            )}</span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    )
}