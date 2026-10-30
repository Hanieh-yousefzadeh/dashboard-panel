"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { stateType, dispatchType } from "@/lib/store"
import { updateOrderStatus } from "@/redux/orderSlice"
import type { OrderStatus } from "@/data/mock-order"
import { useLocale, useTranslations } from "next-intl"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

export default function OrdersPage() {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const dispatch = useDispatch<dispatchType>()
    const orders = useSelector((state: stateType) => state.orders.orders
    )

    const [filter, setFilter] = useState("all")

    const pending = orders.filter((order) => order.status === "pending").length
    const delivered = orders.filter((order) => order.status === "delivered").length
    const cancelled = orders.filter((order) => order.status === "cancelled").length
    const returned = orders.filter((order) => order.status === "returned").length

    const filteredOrders = orders.filter((order) => {
        if (filter === "all") {
            return true
        }

        return order.status === filter
    })
    const t = useTranslations("OrdersPage")
    const locale = useLocale()

    return (
        <main className=" p-6">
            {mounted && (
                <>
                    <div className="sm:flex-row flex flex-col items-center  justify-center lg:justify-start xl:gap-55 lg:gap-15 md:gap-10 pb-6">
                        <h1 className="xl:text-2xl font-bold xl:w-60 sm:pb-0 pb-5">	{t("title")}</h1>

                        <div className="grid xl:gap-4 gap-5 grid-cols-2  sm:grid-cols-4">
                            <Card className="flex flex-row justify-between items-center  xl:w-45 w-30 h-18 border border-[#7a3ffa0b] dark:border-[#7a3ffa4d] bg-[#f1ebfe6a] dark:bg-[#0E0B2F]">
                                <CardHeader>
                                    <CardTitle className=" xl:w-30 text-[#031381] dark:text-[#FAFAFA]">{t("currentOrders")}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="lg:text-3xl font-bold text-purple-600">{pending}</p>
                                </CardContent>
                            </Card>

                            <Card className="flex flex-row justify-between items-center xl:w-45 w-30 h-18 border  border-[#7a3ffa0b] dark:border-[#7a3ffa4d] bg-[#f1ebfe6a] dark:bg-[#0E0B2F]">
                                <CardHeader>
                                    <CardTitle className="text-[#031381] dark:text-[#FAFAFA]">	{t("delivered")}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="lg:text-3xl font-bold text-green-600 dark:text-green-800">{delivered}</p>
                                </CardContent>
                            </Card>

                            <Card className="flex flex-row justify-between items-center xl:w-45 w-30 h-18 border  border-[#7a3ffa0b] dark:border-[#7a3ffa4d] bg-[#f1ebfe6a] dark:bg-[#0E0B2F]">
                                <CardHeader>
                                    <CardTitle className="text-[#031381] dark:text-[#FAFAFA]">	{t("cancelled")}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="lg:text-3xl font-bold text-red-600 dark:text-red-900">{cancelled}</p>
                                </CardContent>
                            </Card>

                            <Card className="flex flex-row justify-between items-center xl:w-45 w-30 h-18 border  border-[#7a3ffa0b] dark:border-[#7a3ffa4d] bg-[#f1ebfe6a] dark:bg-[#0E0B2F]">
                                <CardHeader>
                                    <CardTitle className="text-[#031381] dark:text-[#FAFAFA]">	{t("returned")}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="lg:text-3xl font-bold text-[#7a3ffab7]">{returned} </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <Card className="w-full  border-[#7a3ffa1a] border-2 dark:bg-[#0E0B2F]">
                        <CardHeader className="flex items-center justify-between ">
                            <CardTitle className="text-xl  font-semibold text-[#031381] dark:text-[#FAFAFA]"> {t("orderList")}</CardTitle>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className={` ${locale === "fa" ? "border-l-transparent border-l-6 " : " border-r-4 border-r-transparent  "} outline  rounded-md p-2  outline-[#7a3ffa3f] dark:bg-[#3b0b87]`}
                            >
                                <option value="all">{t("allOrders")}</option>
                                <option value="pending">{t("pending")}</option>
                                <option value="delivered">{t("delivered")}</option>
                                <option value="cancelled">{t("cancelled")}</option>
                                <option value="returned">{t("returned")}</option>
                            </select>
                        </CardHeader>

                        <CardContent className="min-w-0">
                            <div className="xl:w-full w-80 lg:w-180 sm:w-170 overflow-x-auto">
                                <Table className="">
                                    <TableHeader >
                                        <TableRow className="bg-[#f1ebfe6a] border-t h-18 dark:bg-[#7a3ffa23]" >
                                            <TableHead className={`text-base font-extrabold text-[#5409CD] dark:text-[#bd8efb] ${locale === "fa" ? " text-right pr-15" : "pl-8  pr-18"} `}>{t("orderNumber")}</TableHead>
                                            <TableHead className={`text-base font-extrabold text-[#5409CD] dark:text-[#bd8efb] ${locale === "fa" ? "text-right" : "pr-10"} `}>{t("customerName")}</TableHead>
                                            <TableHead className={`text-base font-extrabold text-[#5409CD] dark:text-[#bd8efb] ${locale === "fa" ? "text-right pr-10" : "pr-28"} `}>{t("date")}</TableHead>
                                            <TableHead className={`text-base font-extrabold text-[#5409CD] dark:text-[#bd8efb] ${locale === "fa" ? "text-right pr-10" : "pr-25 "} `}>{t("amount")}</TableHead>
                                            <TableHead className={`text-base font-extrabold text-[#5409CD] dark:text-[#bd8efb] ${locale === "fa" ? "text-right pr-15" : "pr-25 "}`}>{t("status")}</TableHead>
                                            <TableHead className={`text-base font-extrabold text-[#5409CD] dark:text-[#bd8efb] ${locale === "fa" ? "text-right" : "text-left"}`}>{t("changeStatus")}</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody className="text-[#031381] dark:text-[#FAFAFA]">
                                        {filteredOrders.map((order) => (
                                            <TableRow key={order.id} className="h-14">
                                                <TableCell className={`${locale === "fa" ? "pr-15" : "pl-8"}`}>#{order.id}</TableCell>
                                                <TableCell>{order.customer}</TableCell>
                                                <TableCell className="pr-10">{order.date}</TableCell>
                                                <TableCell className="pr-10"> {order.total.toLocaleString("en")}$</TableCell>
                                                <TableCell className="pr-15">
                                                    {/* {order.status === "pending" && "pending"}
                                                    {order.status === "delivered" && "delivered"}
                                                    {order.status === "cancelled" && "cancelled"}
                                                    {order.status === "returned" && "returned"} */}
                                                    {t(order.status)}
                                                </TableCell>

                                                <TableCell className="">
                                                    <select value={order.status}
                                                        onChange={(e) => dispatch(updateOrderStatus({
                                                            id: order.id,
                                                            status: e.target.value as OrderStatus,
                                                        })
                                                        )} className={` ${locale === "fa" ? "border-l-transparent border-l-5" : "border-r-4 border-r-transparent"} outline outline-[#7a3ffa3f] rounded-md  p-2  dark:bg-[#1D124B] dark:outline-[#7a3ffa4d]`}>
                                                        <option value="pending">{t("pending")}</option>
                                                        <option value="delivered">{t("delivered")}</option>
                                                        <option value="cancelled">{t("cancelled")}</option>
                                                        <option value="returned">{t("returned")}</option>
                                                    </select>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        {filteredOrders.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center"> {t("noOrders")}</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>

                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </main>
    )
}