"use client"

import { useDispatch, useSelector } from "react-redux"
import type { stateType, dispatchType } from "@/lib/store"
import { addCategory, editCategory, deleteCategory } from "@/redux/categorySlice"
import type { Category } from "@/data/mock-categoris"
import { PencilSparkles, Trash } from "lucide-react"
import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

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

export default function categoryPage() {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const dispatch = useDispatch<dispatchType>()

    const categories = useSelector((state: stateType) => state.categories.categories)

    const [category, setCategory] = useState("")
    const [open, setOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)


    function handleAddCategory(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!category.trim()) return

        const newCategory: Category = {
            id: Date.now(),
            name: category
        }
        dispatch(addCategory(newCategory))
        setCategory("")
        setOpen(false)
    }

    function handleEditClick(category: Category) {
        setEditingCategory(category)
    }
    function handleEditSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!editingCategory || !editingCategory.name.trim()) return

        dispatch(editCategory({
            id: editingCategory.id,
            name: editingCategory.name,
        }))
        setEditingCategory(null)
    }

    function handleDeleteCategory(id: number) {
        dispatch(deleteCategory(id))
    }
    const t = useTranslations("CategoriesPage")
    const tCategories = useTranslations("Categories")

    const categoryTranslationKeys = {
        "Cosmetics & Personal Care": "cosmetics",
        "Digital Products": "digitalProducts",
        Books: "books",
        "Home & Kitchen": "homeKitchen",
        Clothing: "clothing",
    } as const
    const locale = useLocale()
    return (
        <div className={`p-5 ${locale === "fa" ? "xl:pr-8" : "xl:pl-8"}  xl:w-316  md:w-3xl w-80 overflow-x-atuo`}>
            <div className="flex justify-between pb-12">
                <div className="flex flex-col gap-3">
                    <p className="lg:text-2xl font-bold"> {t("title")}</p>
                    <p className="text-base text-[#7B29FB] dark:text-[#decaf9]"> {t("totalCategories")}: ({categories.length}) </p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger render={<Button className="text-base  bg-[#8C29FB] py-5  pr-3.5 dark:hover:text-[#d1ccd5] dark:bg-[#261666] dark:text-[#d1ccd5]  hover:bg-[#5409cd] cursor-pointer"><Plus strokeWidth={3} /> {t("addCategory")}</Button>} />

                    <DialogContent className="border-[#7a3ffa1a] text-[#051164] dark:text-[#dbc8f9] dark:border-[#b392fbab]   dark:bg-[#0a0220]">
                        <DialogHeader>
                            <DialogTitle className="text-[#051164] dark:text-[#d1ccd5] font-bold">	{t("addNewCategory")}</DialogTitle>
                        </DialogHeader>

                        <form
                            onSubmit={handleAddCategory}
                            className=" flex flex-col gap-7 pt-5 text-[#051164] dark:text-[#d1ccd5]"
                        >
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name">	{t("categoryName")}</Label>
                                <Input
                                    id="category-name"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Enter category name"
                                    required
                                    className="border-[#7a3ffa1a] text-[#051164] placeholder:text-[#05126463] h-10 dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1] focus-visible:ring-0"
                                />
                            </div>
                            <Button type="submit" className=" cursor-pointer dark:text-[#d1ccd5]  w-full py-5 mt-3 bg-[#e1d4fe51] border-2  hover:border-[#5409cddb] border-[#b88ffa31] text-[#3b0b87] dark:bg-[#3b0b87] hover:bg-[#5409cd] hover:text-white">{t("addCategory")}</Button>
                        </form>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={editingCategory !== null}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) setEditingCategory(null)
                    }}
                >
                    <DialogContent className="border-[#7a3ffa1a] text-[#051164] dark:border-[#b392fbab] dark:text-[#dbc8f9] dark:bg-[#0a0220]">
                        <DialogHeader>
                            <DialogTitle className="text-[#051164] dark:text-[#d1ccd5] font-bold">	{t("editCategory")}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="flex flex-col gap-7 pt-5 dark:text-[#d1ccd5]">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="editName"> {t("categoryName")}</Label>
                                <Input
                                    id="edit-category-name"
                                    value={editingCategory?.name}
                                    onChange={(e) => setEditingCategory((prev) => prev ? { ...prev, name: e.target.value } : null
                                    )
                                    }
                                    required
                                    placeholder={t("enterCategoryName")}
                                    className="border-[#7a3ffa1a] h-10 text-[#051264d2] dark:placeholder:text-[#a881e6a1] dark:text-[#d7c5f5a1] placeholder:text-[#6315e16e] focus-visible:ring-0"
                                />
                            </div>
                            <Button type="submit" className="w-full py-5  bg-[#e1d4fe51] border-2  hover:border-[#5409cddb] border-[#b88ffa31] text-[#3b0b87] dark:bg-[#3b0b87] hover:text-white hover:bg-[#5409cddb] dark:text-[#d1ccd5]" > {t("saveChanges")}  </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {mounted && (
                <div className="rounded-md border-2 border-[#7a3ffa1a] dark:bg-[#0E0B2F]">
                    <Table className="">
                        <TableHeader className="h-15 text-lg bg-[#f1ebfe6a] dark:bg-[#7a3ffa23]">
                            <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                                <TableHead className={`${locale === "fa" ? "text-right pr-18" : "xl:pl-22"} font-semibold text-[#5409cd] dark:text-[#bd8efb]`}>{t("id")}</TableHead>
                                <TableHead className={`${locale === "fa" ? "text-right" : "text-left xl:pl-1"} font-semibold text-[#5409cd] dark:text-[#bd8efb]`}>{t("categoryName")}</TableHead>
                                <TableHead className={` font-semibold text-[#5409cd] dark:text-[#bd8efb]  ${locale === "fa" ? "text-center pl-10" : "text-center pr-5"}`}>{t("actions")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody >
                            {categories.map((item) => (
                                <TableRow key={item.id} className="h-14">
                                    <TableCell className={`${locale === "fa" ? "pr-16" : "xl:pl-22"}`}>{item.id}</TableCell>
                                    <TableCell> {tCategories(categoryTranslationKeys[item.name as keyof typeof categoryTranslationKeys])}</TableCell>
                                    <TableCell className="flex items-center justify-center">
                                        <button onClick={() => handleEditClick(item)} className="text-[#6e2dfab3] dark:text-[#6e2dfae0]  cursor-pointer ">
                                            <PencilSparkles className=" size-5" />
                                        </button>
                                        <button onClick={() => handleDeleteCategory(item.id)} className="m-3 text-red-600 dark:text-red-900 cursor-pointer">
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