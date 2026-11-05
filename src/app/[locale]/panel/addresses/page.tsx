"use client"

import { useEffect, useState } from "react"
import { Plus, PencilSparkles, Trash } from "lucide-react"
import { mockAddresses, type Address } from "@/data/mock-address"

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
import { useLocale, useTranslations } from "next-intl"

const emptyAddress = {
    province: "",
    city: "",
    address: "",
    plaque: "",
    postalCode: "",
}

export default function MyAddressesPage() {
    const t = useTranslations("MyAddressesPage")
    const locale = useLocale()

    const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
    const [mounted, setMounted] = useState(false)

    const [open, setOpen] = useState(false)
    const [editingAddress, setEditingAddress] = useState<Address | null>(null)

    const [form, setForm] = useState(emptyAddress)

    useEffect(() => {
        const savedAddresses = localStorage.getItem("myAddresses")
        if (savedAddresses) {
            setAddresses(JSON.parse(savedAddresses))
        } setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("myAddresses", JSON.stringify(addresses))
        }
    }, [addresses, mounted])

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const newAddress: Address = {
            id: Date.now(),
            ...form,
        }

        setAddresses((prev) => [...prev, newAddress])
        setForm(emptyAddress)
        setOpen(false)
    }

    function handleEditClick(item: Address) {
        setEditingAddress(item)
        setForm({
            province: item.province,
            city: item.city,
            address: item.address,
            plaque: item.plaque,
            postalCode: item.postalCode,
        })
    }
    function handleEditSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!editingAddress) return

        const updatedAddress: Address = {
            id: editingAddress.id,
            ...form,
        }

        const update = addresses.map((item) => item.id === editingAddress.id ? updatedAddress : item)
        setAddresses(update)
        setEditingAddress(null)
        setForm(emptyAddress)
    }

    function handleDeleteAddress(id: number) {
        const deleteAddress = addresses.filter((item) => item.id !== id)
        setAddresses(deleteAddress)
    }

    function renderAddressForm(isEditing: boolean) {
        return (
            <form onSubmit={isEditing ? handleEditSubmit : handleSubmit}
                className="flex flex-col gap-7 pt-5 text-[#051164] dark:border-[#b392fbab] dark:text-[#dbc8f9] dark:bg-[#0B0E1A]">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="province">{t("province")}</Label>
                    <Input
                        id="province"
                        value={form.province}
                        onChange={(e) => setForm({ ...form, province: e.target.value })}
                        placeholder={t("enterProvince")}
                        required
                        className="border-[#7a3ffa1a] h-10 focus-visible:ring-0 text-[#051164] placeholder:text-[#05126463] dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="city">	{t("city")}</Label>
                    <Input
                        id="city"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder={t("enterCity")}
                        required
                        className="border-[#7a3ffa1a] h-10 focus-visible:ring-0 text-[#051164] placeholder:text-[#05126463] dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="address">{t("fullAddress")}</Label>
                    <Input
                        id="address"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder={t("addressPlaceholder")}
                        required
                        className="border-[#7a3ffa1a] h-10 focus-visible:ring-0 text-[#051164] placeholder:text-[#05126463] dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="plaque">{t("plaqueNumber")}</Label>
                    <Input
                        id="plaque"
                        value={form.plaque}
                        onChange={(e) => setForm({ ...form, plaque: e.target.value })}
                        placeholder={t("addressPlaceholder")}
                        required
                        className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#b098d6bd] text-[#051164] placeholder:text-[#05126463] dark:text-[#bea2eba1] focus-visible:ring-0"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="postalCode">{t("postalCode")}</Label>
                    <Input
                        id="postalCode"
                        value={form.postalCode}
                        onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                        placeholder={t("postalCodePlaceholder")}
                        maxLength={10}
                        required
                        className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#b098d6bd] text-[#051164] placeholder:text-[#05126463] dark:text-[#bea2eba1] focus-visible:ring-0"
                    />
                </div>

                <Button type="submit" className="w-full bg-[#e1d4fe51] border-2  hover:border-[#5409cddb] border-[#b88ffa31] text-[#3b0b87] dark:bg-[#6A50B1] hover:bg-[#5409cd] hover:text-white py-5 mt-2 dark:text-white">
                    {isEditing ? "Save Changes" : "Add Address"}
                </Button>
            </form>
        )
    }

    return (
        <div className={`p-5 ${locale === "fa" ? "pr-8" : "xl:pl-8"} xl:w-316 md:w-3xl w-80 overflow-x-auto`}>
            <div className="pb-12 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-3">
                    <h1 className="sm:text-2xl font-bold"> {t("myAddresses")} </h1>
                    <p className="text-base text-[#7B29FB] dark:text-[#decaf9]"> {t("totalAddresses")}: ({addresses.length})</p>
                </div>

                <Dialog
                    open={open}
                    onOpenChange={(isOpen) => {
                        setOpen(isOpen)

                        if (isOpen) {
                            setForm(emptyAddress)
                        }
                    }}
                >
                    <DialogTrigger
                        render={
                            <Button className="bg-[#8C29FB] py-5 hover:bg-[#5409cd] cursor-pointer  pr-3.5  dark:bg-[#6A50B1] dark:text-white">
                                <Plus strokeWidth={3} />
                                {t("addAddress")}
                            </Button>
                        }
                    />

                    <DialogContent className="border-[#7a3ffa1a] text-[#051164] dark:border-[#b392fbab] dark:text-[#dbc8f9] dark:bg-[#0B0E1A]">
                        <DialogHeader>
                            <DialogTitle className="font-bold text-[#051164] dark:text-[#d1ccd5] ">
                                {t("addNewAddress")}
                            </DialogTitle>
                        </DialogHeader>

                        {renderAddressForm(false)}
                    </DialogContent>
                </Dialog>
            </div>

            {mounted && (
                <div className="rounded-md border-2 border-[#7a3ffa1a] dark:bg-[#0B0E1A]">
                    <Table>
                        <TableHeader className="h-15 text-base bg-[#f1ebfe6a] dark:bg-[#6a50b11e]">
                            <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                                <TableHead className={`font-semibold  text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right pr-12" : " xl:pl-12 pl-5"}`}>{t("provinceCity")}</TableHead>
                                <TableHead className={`font-semibold  text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right" : ""}`}>{t("address")}</TableHead>
                                <TableHead className={`font-semibold  text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right" : ""}`}>{t("plaque")}</TableHead>
                                <TableHead className={`font-semibold  text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right" : ""}`}>{t("postalCode")}</TableHead>
                                <TableHead className="text-center font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ">{t("actions")}</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {addresses.map((item) => (
                                <TableRow key={item.id} className="h-15">
                                    <TableCell className={`${locale === "fa" ? " pr-12" : "xl:pl-12 pl-5"}`}>   {item.province === "Tehran" ? t("tehran") : t("isfahan")},
                                        {" "}
                                        {item.city === "Tehran" ? t("tehran") : t("isfahan")}
                                    </TableCell>
                                    <TableCell className={`w-90 ${locale === "fa" ? "" : "pr-10"} `}>  {item.address === "Valiasr Street" ? t("valiasrStreet") : t("chaharbaghStreet")} </TableCell>
                                    <TableCell className={`${locale === "fa" ? " pl-10" : "pl-3 pr-15"}`}>{item.plaque}</TableCell>
                                    <TableCell>{item.postalCode}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center">
                                            <button onClick={() => handleEditClick(item)}
                                                className="text-[#6e2dfab3] dark:text-[#a286f0da] cursor-pointer" >
                                                <PencilSparkles className="size-5" />
                                            </button>

                                            <button onClick={() => handleDeleteAddress(item.id)}
                                                className="m-3 text-red-600 dark:text-[#8A0B19] cursor-pointer">
                                                <Trash className="size-5" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {addresses.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        {t("noAddresses")}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            <Dialog
                open={editingAddress !== null}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        setEditingAddress(null)
                        setForm(emptyAddress)
                    }
                }}
            >
                <DialogContent className="border-[#7a3ffa1a] text-[#5409cd] dark:text-[#dbc8f9] dark:bg-[#0B0E1A] ">
                    <DialogHeader>
                        <DialogTitle className="font-bold text-[#5409cd] dark:text-[#d1ccd5] ">
                            {t("editAddress")}
                        </DialogTitle>
                    </DialogHeader>

                    {renderAddressForm(true)}
                </DialogContent>
            </Dialog>
        </div>
    )
}