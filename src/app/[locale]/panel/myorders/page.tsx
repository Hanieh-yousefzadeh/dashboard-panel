
"use client";

import { mockMyOrders } from "@/data/mock-myOrders";
import Image from "next/image";
import { Package, Truck, XCircle, RotateCcw } from "lucide-react"
import { useTranslations ,useLocale } from "next-intl"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const orderStats = [
    {
        title: "Current Orders",
        status: "Pendding",
        icon: Package,
    }, {
        title: "Delivered",
        status: "delivered",
        icon: Truck,
    }, {
        title: "Cancelled",
        status: "cancelled",
        icon: XCircle,
    }, {
        title: "Returned",
        status: "returned",
        icon: RotateCcw,
    }
]

export default function MyOrdersPage() {
    const t = useTranslations("MyOrdersPage")
    const locale = useLocale()
    return (
        <div className={` ${locale === "fa" ? "xl:pr-9" : "xl:pl-9"} p-6 `}>
            <div className="flex xl:flex-row flex-col items-center  gap-23">
                <h1 className="text-2xl font-bold">{t("title")}</h1>
                <div className="flex flex-wrap justify-center lg:justify-start xl:pt-0 pt-5 gap-3">

                    {orderStats.map((item) => {
                        const Icon = item.icon
                        const count = mockMyOrders.filter((order) => order.status === item.status).length

                        return (
                            <div key={item.status} className="rounded-2xl border border-[#7a3ffa0b] dark:bg-[#14162A] bg-[#f1ebfe6a] p-5 shadow-sm flex flex-col justify-center items-center md:w-58  w-45 md:h-30 ">
                                <div className="flex items-center justify-between gap-3">
                                    <Icon className="h-6 w-6 text-[#7a3ffa]" />
                                    <p className="text-sm text-[#031481a6] dark:text-[#FAFAFA]">
                                        {item.title === "Total Number" ? t("totalNumber") :
                                        item.title === "Pending Orders" ? t("pendingOrders") :
                                        item.title === "Delivered Orders" ? t("deliveredOrders") :
                                        item.title === "Cancelled Orders" ? t("cancelledOrders") : 
                                        t("returnedOrders")} </p>
                                </div>
                                <p className="mt-4 text-3xl font-bold">{count}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="rounded-md border-2 border-[#7a3ffa1a] mt-8  dark:bg-[#0B0E1A] xl:w-full w-80 lg:w-180 sm:w-170 overflow-x-auto">
                <Table>
                    <TableHeader className="h-15 text-base bg-[#f1ebfe6a] dark:bg-[#6a50b11e]">
                        <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                            <TableHead className={`font-bold  text-[#5409cd] dark:text-[#d7c7f9b8] ${ locale === "fa" ? "text-right pr-16" : "xl:pl-16 pl-7"} `}>{t("orderId")}</TableHead>
                            <TableHead className={`font-bold  text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right" : ""}`}>{t("product")}</TableHead>
                            <TableHead className={`font-bold  text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right" : ""}`}>{t("date")}</TableHead>
                            <TableHead className={`font-bold  text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right pr-10" : ""}`}>{t("price")}</TableHead>
                            <TableHead className={`font-bold  text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right" : ""}`}>{t("status")}</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {mockMyOrders.map((order) => (
                            <TableRow key={order.id} className="h-13">
                                <TableCell className="font-medium xl:pl-16 pl-7 pr-16"> #{order.id}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3 min-w-40">
                                        <Image src={order.image} alt={order.name} width={48} height={48}
                                            className="size-12 shrink-0 rounded-md object-cover" />
                                        <span className="line-clamp-1"> {order.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className={` ${locale === "fa" ? "" : "pr-10"}`}>{order.date}</TableCell>
                                <TableCell className={` ${locale === "fa" ? "pr-10" : "pr-10"}`}> {order.price.toLocaleString("en-US")} $
                                </TableCell>

                                <TableCell>
                                    <span
                                        className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${locale === "fa" &&  order.status === "cancelled" ? "px-6" : ""} ${order.status === "pending" ? "bg-[#F9F7FF] dark:bg-[#39305d9f] dark:text-[#af8dfc] text-[#7B29FB] px-5"
                                            : order.status === "delivered"
                                                ? "bg-green-50 dark:bg-[#39305d9f] dark:text-green-700 text-green-700"
                                                : order.status === "cancelled"
                                                    ? "bg-red-50 dark:bg-[#39305d9f] dark:text-red-800 text-red-700"
                                                    : "bg-blue-50 dark:bg-[#39305d9f] px-4.5 dark:text-blue-500 text-[#031381]"
                                            }`}
                                    >
                                        {order.status === "pending" ? t("pending")
                                            : order.status === "delivered" ? t("delivered")
                                                : order.status === "cancelled" ? t("cancelled") : t("returned")}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}

                        {mockMyOrders.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-gray-500"
                                >
                                    {t("noOrders")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}