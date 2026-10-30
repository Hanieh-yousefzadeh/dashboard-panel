"use client"

import { useRouter } from "@/i18n/nav"
import { useState, useEffect } from "react"
import { dispatchType, stateType } from "@/lib/store"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "@/redux/authSlice"
import { LogOut, Menu, X, } from "lucide-react"
import Theme from "./theme"
import LanguageSwitch from "@/components/lang-switch"
import { useLocale, useTranslations } from "next-intl"
import { navigation } from "@/data/navigation"
import { Link, usePathname } from "@/i18n/nav"
import { Spinner } from "./ui/spinner"





export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const pathName = usePathname()
    const t = useTranslations("AdminDashboard.header")
    const n = useTranslations("AdminDashboard.sidebar")
    const locale = useLocale()
    const user = useSelector((state: stateType) => state.auth.user)
    const dispatch = useDispatch<dispatchType>()
    const router = useRouter()
    const [mounted, setMounted] = useState(false);
    const menu = user ? navigation[user.role] : []
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

    function handleLogout() {
        dispatch(logout())
        setIsOpen(false)
        router.replace("/", { locale })

    }

    return (

        <>
            <header className="lg:hidden block">
                <div className="flex items-center pl-8">
                    <div>
                        <button onClick={() => setIsOpen(true)} className={`lg:hidden self-start p-2 rounded-md border ${locale === "fa" ? "right-4" : "left-4"}`}>
                            <Menu size={26} />
                        </button>
                    </div>
                    <div className="h-20 flex justify-between items-center">
                        <img src="/Logo.png" className=" w-50 dark:hidden" alt="Ecomrace" />
                        <img src="/vdark.png" className="hidden  w-40 dark:block brightness-125" alt="Ecomrace" />
                    </div>
                </div>
                {isOpen && (
                    <div onClick={() => setIsOpen(false)} className="lg:hidden fixed inset-0 z-40 bg-black/40"> </div>
                )}
                <aside className={`lg:hidden fixed top-0 z-50 h-dvh w-72 bg-white dark:bg-[#111025] p-4 shadow-xl transition-transform duration-300
                             ${locale === "fa" ? "right-0" : "left-0"}  ${isOpen ? "translate-x-0" :
                        locale === "fa" ? "translate-x-full" : "-translate-x-full"}`} >


                    <div className="flex items-center justify-between border-b border-[#7a3ffa5b] pb-3">
                        {user && (
                            <h2 className="font-bold  text-lg"> {n("dashboard")} {n(user.role.toLowerCase())} </h2>
                        )}
                        <button onClick={() => setIsOpen(false)} ><X size={24} /> </button>
                    </div>




                    <div className="pt-3">
                        {menu.map((item) => {
                            const Icon = item.icon
                            const isActive = pathName === item.href

                            return (
                                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-base mb-1 ${isActive ? "text-[#7a3ffa] bg-[#7a3ffa1a] dark:bg-[#17143D]" : "hover:text-[#7a3ffa] hover:bg-[#7a3ffa1a]"}`} >
                                    <Icon size={20} />

                                    <span>
                                        {n(({
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
                                        )}
                                    </span>
                                </Link>
                            )
                        })}
                        <div className="flex flex-col gap-3 my-4 ">
                            <div className="flex gap-2.5 items-center">
                                <div className="self-start"> <LanguageSwitch /></div>
                                <span> {t("language")}</span>
                            </div>
                            <div className="flex gap-2.5 items-center">
                                <div className=" rounded-full border-[#7a3ffa2d] border pt-1.5 px-1.5 self-start"> <Theme /> </div>
                                <span>{t("theme")}</span>

                            </div>
                            <button onClick={handleLogout} className="flex items-center pl-2  gap-3">
                                <LogOut size={26} />
                                {t("logout")}
                            </button>
                        </div>
                    </div>

                </aside>
            </header>
            <header className="w-5xl xl:w-full lg:flex hidden justify-between md:pr-7 sm:pl-4 border-b-2 border-[#7a3ffa2d] dark:border-[#7a3ffa51]">
                <div className="h-20 flex justify-between items-center">
                    <img src="/Logo.png" className="md:h-20 w-40 dark:hidden" alt="Ecomrace" />
                    <img src="/vdark.png" className="hidden md:h-15 w-40 dark:block brightness-125" alt="Ecomrace" />
                </div>
                <div className="flex items-center gap-3">
                    <LanguageSwitch />
                    <div className=" border-2 border-[#7a3ffa2d] hover:bg-[#8049FD] hover:text-white  dark:border-[#7a3ffaa0] flex items-center rounded-full p-1 cursor-pointer">
                        <Theme />
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-1 cursor-pointer sm:text-base"><LogOut className="sm:size-5.5" /> {t("logout")}</button>
                </div>
            </header></>
    )
}