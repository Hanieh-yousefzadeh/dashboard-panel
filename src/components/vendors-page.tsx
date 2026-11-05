"use client"

import { useDispatch, useSelector } from "react-redux"
import type { stateType, dispatchType } from "@/lib/store"
import { addVendor, editeVendor, deleteVendor } from "@/redux/vendorSlice"
import type { Vendor } from "@/data/mock-vendors"
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
import { useTranslations, useLocale } from "next-intl"

export default function VendorsPage() {
     console.log("Vendors Client Component rendered");

    const [mounted, setMounted] = useState(false)
    console.log("VendorsPage rendered");

    useEffect(() => {
        console.log("VendorsPage rendered");
        setMounted(true)
    }, [])

    const dispatch = useDispatch<dispatchType>()

    const vendors = useSelector((state: stateType) => state.vendors.vendors)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [open, setOpen] = useState(false)
    const [editingVendor, setEditingVendor] = useState<Vendor | null>(null)
    const [editName, setEditName] = useState("")
    const [editEmail, setEditEmail] = useState("")
    const [editAddress, setEditAddress] = useState("")

    function handleAddVendor() {
        if (!name.trim() || !email.trim() || !address.trim()) return

        const newVendor: Vendor = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            address: address.trim(),
        }

        dispatch(addVendor(newVendor))

        setName("")
        setEmail("")
        setAddress("")
        setOpen(false)
    }
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        handleAddVendor()
    }

    function handleEditClick(vendor: Vendor) {
        setEditingVendor(vendor)
        setEditName(vendor.name)
        setEditEmail(vendor.email)
        setEditAddress(vendor.address)
    }
    function handleEditSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!editingVendor) return

        dispatch(editeVendor({
            ...editingVendor,
            name: editName,
            email: editEmail,
            address: editAddress
        })
        )
        setEditingVendor(null)
    }
    function handleDeleteVendor(id: number) {
        dispatch(deleteVendor(id))
    }
    const t = useTranslations("VendorsPage")
    const locale = useLocale()
    return (
        <div className={`p-5  ${locale === "fa" ? "xl:pr-8" : "xl:pl-8"} xl:w-316 md:w-3xl w-80 overflow-x-atuo`}>
            <div className="flex justify-between pb-12">
                <div className="flex flex-col gap-3">
                    <h1 className="sm:text-2xl font-bold"> 	{t("title")} </h1>
                    <p className="text-base text-[#7B29FB] dark:text-[#decaf9]">  {t("totalVendors", { count: mounted ? vendors.length : "..." })} </p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger render={<Button className="text-base  bg-[#8C29FB] py-5  pr-3.5 hover:bg-[#5409cd] dark:hover:text-[#d1ccd5] dark:bg-[#6A50B1] dark:text-white cursor-pointer"><Plus strokeWidth={3} />{t("addVendor")}</Button>} />

                    <DialogContent className="border-[#7a3ffa1a] text-[#051164] dark:text-[#dbc8f9] dark:border-[#b392fbab]   dark:bg-[#0B0E1A]">
                        <DialogHeader>
                            <DialogTitle className="text-[#051164] dark:text-[#d1ccd5] font-bold ">{t("addNewVendor")}</DialogTitle>
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
                                    className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1] text-[#051164] placeholder:text-[#05126463]  focus-visible:ring-0"
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
                                    className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1]  text-[#051164] placeholder:text-[#05126463]  focus-visible:ring-0 "
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="address">{t("address")}</Label>
                                <Input
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder={t("enterAddress")}
                                    required
                                    className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#af81f8a1] dark:text-[#bea2eba1] text-[#051164] placeholder:text-[#05126463]  focus-visible:ring-0"
                                />
                            </div>

                            <Button type="submit" className=" cursor-pointer w-full py-5 mt-3 dark:text-[#d1ccd5] dark:bg-[#6A50B1] bg-[#e1d4fe51] border-2  hover:border-[#5409cddb] border-[#b88ffa31] text-[#3b0b87] hover:bg-[#5409cd] hover:text-white">	{t("addVendor")}</Button>
                        </form>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={editingVendor !== null}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) {
                            setEditingVendor(null)
                        }
                    }}
                >
                    <DialogContent className="border-[#7a3ffa1a] text-[#051164]  dark:border-[#b392fbab] dark:text-[#dbc8f9] dark:bg-[#0B0E1A] ">
                        <DialogHeader>
                            <DialogTitle className="text-[#051164] dark:text-[#d1ccd5] font-bold"> {t("editVendor")}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="flex flex-col gap-7 pt-5 dark:text-[#d1ccd5]">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="editName">{t("name")}</Label>
                                <Input
                                    id="editName"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required
                                    className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#a881e6a1] dark:text-[#d7c5f5a1] text-[#051164] placeholder:text-[#6315e16e] focus-visible:ring-0"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="editEmail">	{t("email")}</Label>
                                <Input
                                    id="editEmail"
                                    type="email"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    required
                                    className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#a881e6a1] dark:text-[#d7c5f5a1] text-[#051164] placeholder:text-[#6315e16e] focus-visible:ring-0"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="editSddress">{t("address")}</Label>
                                <Input
                                    id="editAddress"
                                    value={editAddress}
                                    onChange={(e) => setEditAddress(e.target.value)}
                                    required
                                    className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#a881e6a1] dark:text-[#d7c5f5a1] text-[#051164] placeholder:text-[#6315e16e] focus-visible:ring-0"
                                />
                            </div>

                            <Button type="submit" className="w-full py-5 bg-[#e1d4fe51] border-2  hover:border-[#5409cddb] border-[#b88ffa31] text-[#3b0b87] dark:bg-[#6A50B1] hover:bg-[#5409cd] hover:text-white dark:text-[#d1ccd5] " > {t("saveChanges")}  </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {mounted && (
                <div className="rounded-md border-2 border-[#7a3ffa1a] dark:bg-[#14162A]">
                    <Table className="">
                        <TableHeader className="h-15 text-base bg-[#f1ebfe6a] dark:bg-[#6a50b11e]">
                            <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right xl:pr-15" : "text-left xl:pl-11"}`}>{t("id")}</TableHead>
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right" : "text-left"}`}>{t("name")}</TableHead>
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right" : "text-left"}`}>{t("email")}</TableHead>
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right" : "text-left"}`}>{t("address")}</TableHead>
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-center  " : "text-center"}`}>{t("actions")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody >
                            {vendors.map((vendor) => (
                                <TableRow key={vendor.id} className="h-14">
                                    <TableCell className={`${locale === "fa" ? "pr-15" : "pl-10"}`}>{vendor.id}</TableCell>
                                    <TableCell>{vendor.name}</TableCell>
                                    <TableCell>{vendor.email}</TableCell>
                                    <TableCell>{vendor.address}</TableCell>
                                    <TableCell className="flex items-center justify-center ">
                                        <button onClick={() => handleEditClick(vendor)} className="text-[#6e2dfab3] dark:text-[#a286f0da] cursor-pointer ">
                                            <PencilSparkles className=" size-5" />
                                        </button>
                                        <button onClick={() => handleDeleteVendor(vendor.id)} className="ml-3 text-red-600 dark:text-[#8A0B19] cursor-pointer">
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