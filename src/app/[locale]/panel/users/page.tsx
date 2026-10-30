"use client"

import { useDispatch, useSelector } from "react-redux"
import type { stateType, dispatchType } from "@/lib/store"
import { addCustomer, editeCustomer, deletecustomer } from "@/redux/customersSlice"
import type { Customer } from "@/data/mock-customers"
import { PencilSparkles, Trash } from "lucide-react"
import { useState, useEffect } from "react"
import { Plus } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useTranslations  , useLocale} from "next-intl"

export default function UsersPage() {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const dispatch = useDispatch<dispatchType>()

    const customers = useSelector((state: stateType) => state.customers.customers)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [open, setOpen] = useState(false)
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
    const [editName, setEditName] = useState("")
    const [editEmail, setEditEmail] = useState("")

    function handleAddCustomer() {
        if (!name.trim() || !email.trim()) return

        const newCustomer: Customer = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            created: new Date().toISOString().split("T")[0],
        }

        dispatch(addCustomer(newCustomer))

        setName("")
        setEmail("")
        setOpen(false)
    }
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        handleAddCustomer()
    }

    function handleEditClick(customer: Customer) {
        setEditingCustomer(customer)
        setEditName(customer.name)
        setEditEmail(customer.email)
    }
    function handleEditSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!editingCustomer) return

        dispatch(editeCustomer({
            ...editingCustomer,
            name: editName,
            email: editEmail,
        })
        )

        setEditingCustomer(null)
    }
    function handleDeleteCustomer(id: number) {
        dispatch(deletecustomer(id))
    }
    const t = useTranslations("UsersPage")
    const locale = useLocale()
    return (
        <div className={`p-5 ${locale === "fa" ? "pr-8" : "pl-8"}  xl:w-316 md:w-3xl w-80 overflow-x-atuo `}>
            <div className="flex justify-between pb-12">
                <div className="flex flex-col gap-3">
                    <h1 className="lg:text-2xl font-bold"> 	{t("title")}</h1>
                    <p className="text-base text-[#7B29FB] dark:text-[#decaf9]">  {t("totalCustomers", {count: mounted ? customers.length : "..."})} </p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger render={<Button className="text-base bg-[#8C29FB] py-5 pr-3.5 hover:bg-[#5409cd] dark:bg-[#261666] dark:text-[#d1ccd5] cursor-pointer dark:hover:text-current"><Plus strokeWidth={3} />	{t("addUser")}</Button>} />

                    <DialogContent className="border-[#7a3ffa1a] text-[#051164] dark:text-[#dbc8f9] dark:border-[#b392fbab]   dark:bg-[#0a0220]">
                        <DialogHeader>
                            <DialogTitle className="text-[#051164] dark:text-[#d1ccd5]  font-bold">{t("addNewUser")}</DialogTitle>
                        </DialogHeader>

                        <form
                            onSubmit={handleSubmit}
                            className=" flex flex-col gap-7 pt-5 text-[#051164] dark:text-[#d1ccd5]"
                        >
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name">{t("name")}</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={t("enterName")}
                                    required
                                    className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1] text-[#051164] placeholder:text-[#05126463] focus-visible:ring-0"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">	{t("email")}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t("enterEmail")}
                                    required
                                    className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1]  text-[#051164] placeholder:text-[#05126463] focus-visible:ring-0 "
                                />
                            </div>

                            <Button type="submit" className=" cursor-pointer w-full dark:text-[#d1ccd5] py-5 mt-3  bg-[#e1d4fe51] border-2  hover:border-[#5409cddb] border-[#b88ffa31] text-[#3b0b87] dark:bg-[#3b0b87] hover:bg-[#5409cd] hover:text-white"> {t("addCustomer")}</Button>
                        </form>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={editingCustomer !== null}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) {
                            setEditingCustomer(null)
                        }
                    }}
                >
                    <DialogContent className="border-[#7a3ffa1a] text-[#051164] dark:border-[#b392fbab] dark:text-[#dbc8f9] dark:bg-[#0a0220]">
                        <DialogHeader>
                            <DialogTitle className="text-[#051164] dark:text-[#d1ccd5] font-bold"> {t("editCustomer")} </DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleEditSubmit} className="flex flex-col gap-7 pt-5 dark:text-[#d1ccd5]">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="editName">{t("name")}</Label>
                                <Input
                                    id="editName"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required
                                    className="text-[#051264d2] h-10 dark:placeholder:text-[#a881e6a1] dark:text-[#d7c5f5a1] focus-visible:ring-0"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="editEmail">{t("email")}</Label>
                                <Input
                                    id="editEmail"
                                    type="email"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    required
                                    className="text-[#051264c9] h-10 dark:placeholder:text-[#a881e6a1] dark:text-[#d7c5f5a1] focus-visible:ring-0"
                                />
                            </div>

                            <Button type="submit" className="w-full py-5 bg-[#e1d4fe51] border-2  hover:border-[#5409cddb] border-[#b88ffa31] text-[#3b0b87] dark:bg-[#3b0b87] hover:text-white hover:bg-[#5409cddb] dark:text-[#d1ccd5]" >
                               	{t("saveChanges")}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>



            {mounted && (
                <div className="rounded-md border-2 border-[#7a3ffa1a] dark:bg-[#0E0B2F]">
                    <Table className="">
                        <TableHeader className="h-15 text-lg bg-[#f1ebfe6a] dark:bg-[#7a3ffa23]">
                            <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#bd8efb] ${locale === "fa" ? "text-right xl:pr-15" :"text-left xl:pl-11" }`}>{t("id")}</TableHead>
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#bd8efb] ${locale === "fa" ? "text-right" :"text-left" }`}>{t("name")}</TableHead>
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#bd8efb] ${locale === "fa" ? "text-right" :"text-left" }`}>{t("email")}</TableHead>
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#bd8efb] ${locale === "fa" ? "text-right" :"text-left" }`}>{t("created")}</TableHead>
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#bd8efb] ${locale === "fa" ? "text-center pl-8" :"text-center" }`}>{t("actions")}</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody >
                            {customers.map((customer) => (
                                <TableRow key={customer.id} className="h-14">
                                    <TableCell className={`${locale === "fa" ? "pr-15" :  "pl-10"}`}>{customer.id}</TableCell>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.created}</TableCell>

                                    <TableCell className={`flex items-center justify-center ${ locale === "fa" ? "gap-2" : "gap-0"}`}>
                                        <button onClick={() => handleEditClick(customer)} className="text-[#6e2dfab3] dark:text-[#6e2dfae0] cursor-pointer ">
                                            <PencilSparkles className=" size-5" />
                                        </button>
                                        <button onClick={() => handleDeleteCustomer(customer.id)} className="ml-3 text-red-600 dark:text-red-900 cursor-pointer">
                                            <Trash className="size-5" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}