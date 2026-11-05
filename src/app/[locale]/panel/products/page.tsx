"use client"

import { useDispatch, useSelector } from "react-redux"
import type { stateType, dispatchType } from "@/lib/store"
import type { Product } from "@/data/mock-products"
import { addProduct, editProduct, deleteProduct } from "@/redux/productSlice"
import { PencilSparkles, Trash } from "lucide-react"
import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import Image from "next/image"
import { mockCategories } from "@/data/mock-categoris"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from "next-intl"

export default function ProductsPage() {

    const [imageName, setImageName] = useState("")
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    const dispatch = useDispatch<dispatchType>()
    const products = useSelector((state: stateType) => state.products.products)
    const [form, setForm] = useState({
        name: "",
        image: "",
        categoryId: "",
        price: "",
        stock: "",
    })
    const [editForm, setEditForm] = useState({
        name: "",
        image: "",
        categoryId: "",
        price: "",
        stock: "",
    })
    const [open, setOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    function handleAddProduct() {
        if (!form.name.trim() || !form.image.trim() || !form.categoryId || !form.price || !form.stock) {
            return
        }
        const newProduct: Product = {
            id: Date.now(),
            name: form.name,
            image: form.image,
            categoryId: Number(form.categoryId),
            price: Number(form.price),
            stock: Number(form.stock),
        }
        dispatch(addProduct(newProduct))
        setForm({
            name: "",
            image: "",
            categoryId: "",
            price: "",
            stock: "",
        })
        setOpen(false)
    }
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        handleAddProduct()
    }
    function handleEditClick(product: Product) {
        setEditingProduct(product)

        setEditForm({
            name: product.name,
            image: product.image,
            categoryId: String(product.categoryId),
            price: String(product.price),
            stock: String(product.stock),
        })
        setImageName("")
    }
    function handleEditSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!editingProduct) return
        if (!editForm.name.trim() || !editForm.image.trim() || !editForm.categoryId || !editForm.price || !editForm.stock) {
            return
        }

        dispatch(editProduct({
            ...editingProduct,
            name: editForm.name,
            image: editForm.image,
            categoryId: Number(editForm.categoryId),
            price: Number(editForm.price),
            stock: Number(editForm.stock),
        })
        )
        setEditingProduct(null)
    }
    function handleDeleteProduct(id: number) {
        dispatch(deleteProduct(id))
    }
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        // const file = e.target.files?.[0]
        // if (file) {
        //     const imageUrl = URL.createObjectURL(file)
        //     setForm({
        //         ...form,
        //         image: imageUrl,
        //     })
        //     setImageName(file.name)
        // }
        const file = e.target.files?.[0]

        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const imageData = reader.result as string
                setForm({
                    ...form,
                    image: imageData,
                })
                setImageName(file.name)
            }
            reader.readAsDataURL(file)
        }
    }
    function handleEditImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        // const file = e.target.files?.[0]
        // if (file) {
        //     const imageUrl = URL.createObjectURL(file)
        //     setEditForm({
        //         ...editForm,
        //         image: imageUrl,
        //     })
        //     setImageName(file.name)
        // }
        const file = e.target.files?.[0]

        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const imageData = reader.result as string
                setEditForm({
                    ...editForm,
                    image: imageData,
                })
                setImageName(file.name)
            }
            reader.readAsDataURL(file)
        }
    }
    const t = useTranslations("ProductsPage")
    const tCategories = useTranslations("Categories")
    const categoryTranslationKeys = {
        "Cosmetics & Personal Care": "cosmetics",
        "Digital Products": "digitalProducts",
        Books: "books",
        "Home & Kitchen": "homeKitchen",
        Clothing: "clothing",
    } as const
    const locale = useLocale();
    const n = useTranslations("ProductsPage")
    const productTranslationKeys = {
        "Sunscreen": "sunscreen",
        "Smart Watch": "smartWatch",
        "T-Shirt": "tShirt",
        "English Language Tutorial": "englishTutorial",
        "Stainless steel pot": "steelPot",
    } as const

    return (
        <div className={`p-5 ${locale === "fa" ? "xl:pr-8" : "xl:pl-8"}  xl:w-316 md:w-3xl w-80 overflow-x-atuo`}>
            <div className="pb-12 flex items-start justify-between">
                <div className="flex flex-col gap-3">
                    <h1 className="sm:text-2xl font-bold"> {t("title")}</h1>
                    <p className="text-base text-[#7B29FB] dark:text-[#decaf9]"> {t("totalProducts", { count: mounted ? products.length : "..." })} </p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger render={<Button className="text-base  bg-[#8C29FB] py-5  pr-3.5 hover:bg-[#5409cd] dark:hover:text-[#d1ccd5] dark:bg-[#6A50B1] dark:text-white  cursor-pointer">
                        <Plus strokeWidth={3} /> {t("addProduct")} </Button>} />
                    <DialogContent className="border-[#7a3ffa1a] text-[#051164]] dark:text-[#dbc8f9] dark:border-[#b392fbab]   dark:bg-[#0B0E1A]">
                        <DialogHeader>
                            <DialogTitle className="text-[#051164] dark:text-[#d1ccd5] font-bold">	{t("addNewProduct")}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-7 pt-5 dark:text-[#d1ccd5] text-[#051164]">
                            <div className="flex flex-col gap-2">
                                <Label>	{t("productName")}</Label>
                                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Product name"
                                    required className="border-[#7a3ffa1a] h-10 text-[#051164] placeholder:text-[#05126463] dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1] focus-visible:ring-0"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>	{t("productImage")}</Label>

                                <div className="flex h-10 items-center rounded-md border border-[#7a3ffa1a] dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1] dark:bg-[#161824] px-3 text-sm text-[#05126463]">
                                    {imageName || t("noFileChosen")}
                                </div>

                                <Input id="productImage" type="file" accept="image/*" required
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                <label htmlFor="productImage"
                                    className="flex w-fit cursor-pointer items-center rounded-md bg-[#e1d4fe51] border-2  hover:border-[#5409cddb] border-[#b88ffa31] text-[#3b0b87]  hover:bg-[#5409cd] hover:text-white dark:bg-[#6A50B1]  px-4 py-2 dark:text-[#d1ccd5]"
                                >
                                    {t("chooseFile")}
                                </label>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>	{t("category")}</Label>
                                <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                                    required className="w-full rounded-md bg-transparent  dark:text-[#bea2ebc6] dark:bg-[#161824] h-10 p-2 text-sm outline outline-[#7a3ffa1a] border-r-5 border-r-transparent"
                                >
                                    <option value="">{t("selectCategory")}</option>
                                    {mockCategories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {tCategories(categoryTranslationKeys[category.name as keyof typeof categoryTranslationKeys]
                                            )}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>	{t("price")}</Label>
                                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    placeholder="Price"
                                    required className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1] text-[#051164] placeholder:text-[#05126463] focus-visible:ring-0"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>	{t("stock")}</Label>
                                <Input type="number" value={form.stock}
                                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                    placeholder="Stock"
                                    required className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1]  text-[#051164] placeholder:text-[#05126463] focus-visible:ring-0"
                                />
                            </div>
                            <Button type="submit" className="w-full py-5 mt-3  dark:text-white  bg-[#e1d4fe51] border-2  hover:border-[#5409cddb] border-[#b88ffa31] text-[#3b0b87] dark:bg-[#6A50B1] hover:bg-[#5409cd] hover:text-white">	{t("addProduct")}</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {mounted && (
                <div className="rounded-md border-2 border-[#7a3ffa1a] dark:bg-[#14162A]">
                    <Table>
                        <TableHeader className="h-15 text-base bg-[#f1ebfe6a] dark:bg-[#6a50b11e]">
                            <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right xl:pr-15" : "text-left pl-8"}`}>{t("id")} </TableHead>
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right" : "text-left"}`}> {t("product")} </TableHead>
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-right" : "text-left"}`}> {t("category")}  </TableHead>
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-center pl-7" : "text-left"}`}> {t("price")} </TableHead>
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-center pl-5" : "text-left pr-2"}`}> {t("stock")} </TableHead>
                                <TableHead className={`font-semibold text-[#5409cd] dark:text-[#d7c7f9b8] ${locale === "fa" ? "text-center pl-10" : "text-left"}`}> {t("actions")} </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => {
                                const category = mockCategories.find((item) => item.id === product.categoryId)
                                return (
                                    <TableRow key={product.id}>
                                        <TableCell className={`${locale === "fa" ? "pr-15 pl-16" : "pl-8 pr-20"}`}>{product.id} </TableCell>
                                        <TableCell>
                                            <div className={"flex items-center gap-3  min-w-40"}>
                                                <Image src={product.image} alt={product.name} width={48} height={48}
                                                    className="size-12 shrink-0 rounded-md object-cover" />
                                                <span className={`line-clamp-1 ${locale === "fa" ? "" : "pr-25"} `}>
                                                    {n(`productNames.${productTranslationKeys[product.name as keyof typeof productTranslationKeys]}`
                                                    )}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className={` ${locale === "fa" ? "" : "pr-30"}`}>
                                            {category ?
                                                tCategories(categoryTranslationKeys[category.name as keyof typeof categoryTranslationKeys])
                                                : "-"}
                                        </TableCell>
                                        <TableCell className={`${locale === "fa" ? "pr-10 pl-6" : "pr-25"}`}>  ${product.price} </TableCell>
                                        <TableCell className={`${locale === "fa" ? "pr-8 pl-8" : "pr-23"}`}> {product.stock}</TableCell>

                                        <TableCell>
                                            <div className={`flex items-center justify-center gap-3 ${locale === "fa" ? "pl-5" : "pr-8"}`}>
                                                <Dialog open={editingProduct?.id === product.id}
                                                    onOpenChange={(isOpen) => { if (!isOpen) setEditingProduct(null) }}
                                                >
                                                    <DialogTrigger render={
                                                        <button type="button" className="cursor-pointer text-[#6e2dfab3] dark:text-[#a286f0da]" onClick={() => handleEditClick(product)}>
                                                            <PencilSparkles className="size-5" />
                                                        </button>
                                                    } />
                                                    <DialogContent className="border-[#7a3ffa1a] text-[#051164] dark:border-[#b392fbab] dark:text-[#dbc8f9] dark:bg-[#0B0E1A] ">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-[#051164] dark:text-[#d1ccd5] font-bold">	{t("editProduct")}</DialogTitle>
                                                        </DialogHeader>

                                                        <form onSubmit={handleEditSubmit} className="flex flex-col gap-5 pt-5 dark:text-[#d1ccd5]">
                                                            <div className="flex flex-col gap-2">
                                                                <Label>	{t("productName")}</Label>
                                                                <Input value={editForm.name}
                                                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                                    required className="border-[#7a3ffa1a] h-10 text-[#051264d2] dark:placeholder:text-[#a881e6a1] dark:text-[#d7c5f5a1]  placeholder:text-[#6315e16e] focus-visible:ring-0"
                                                                />
                                                            </div>

                                                            <div className="flex flex-col gap-2">
                                                                <Label>	{t("productImage")}</Label>
                                                                <div className="flex items-center gap-3">
                                                                    <Image
                                                                        src={editForm.image}
                                                                        alt={editForm.name}
                                                                        width={48}
                                                                        height={48}
                                                                        className="size-12 rounded-md object-cover"
                                                                    />

                                                                    <div className="flex h-10 flex-1 items-center rounded-md border dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1] dark:bg-[#161824] border-[#7a3ffa1a] px-3 text-sm text-[#051264d2]">
                                                                        {imageName || t("currentProductImage")}
                                                                    </div>
                                                                </div>

                                                                <Input
                                                                    id="editProductImage"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={handleEditImageChange}
                                                                    className="hidden"
                                                                />

                                                                <label htmlFor="editProductImage"
                                                                    className="flex w-fit cursor-pointer px-4 py-2 items-center h-10  dark:text-white rounded-md bg-[#e1d4fe51] border-2  hover:border-[#5409cddb] border-[#b88ffa31] text-[#3b0b87] dark:bg-[#6A50B1] hover:bg-[#5409cd] hover:text-white"
                                                                >
                                                                    {t("chooseFile")}
                                                                </label>
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <Label>{t("category")}</Label>
                                                                <select value={editForm.categoryId}
                                                                    onChange={(e) => setEditForm({
                                                                        ...editForm,
                                                                        categoryId: e.target.value,
                                                                    })
                                                                    }
                                                                    required className="w-full rounded-md h-10 bg-transparent p-2 text-sm dark:text-[#bea2ebc6] dark:bg-[#161824] outline outline-[#7a3ffa1a] border-r-5 border-r-transparent"
                                                                >
                                                                    <option value="">{t("selectCategory")}</option>
                                                                    {mockCategories.map((category) => (
                                                                        <option key={category.id} value={category.id} >
                                                                            {tCategories(categoryTranslationKeys[category.name as keyof typeof categoryTranslationKeys])}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div className="flex flex-col gap-2">
                                                                <Label>	{t("price")}</Label>
                                                                <Input type="number" value={editForm.price}
                                                                    onChange={(e) => setEditForm({
                                                                        ...editForm,
                                                                        price: e.target.value,
                                                                    })
                                                                    }
                                                                    required className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#a881e6a1] dark:text-[#d7c5f5a1]  text-[#051264d2] placeholder:text-[#6315e16e] focus-visible:ring-0"
                                                                />
                                                            </div>

                                                            <div className="flex flex-col gap-2">
                                                                <Label>	{t("stock")}</Label>
                                                                <Input type="number" value={editForm.stock}
                                                                    onChange={(e) => setEditForm({
                                                                        ...editForm,
                                                                        stock: e.target.value,
                                                                    })
                                                                    }
                                                                    required className="border-[#7a3ffa1a] h-10 dark:placeholder:text-[#a881e6a1] dark:text-[#d7c5f5a1]  text-[#051264d2] placeholder:text-[#6315e16e] focus-visible:ring-0"
                                                                />
                                                            </div>
                                                            <Button type="submit" className="w-full py-5 mt-3 dark:text-white bg-[#e1d4fe51] border-2  hover:border-[#5409cddb] border-[#b88ffa31] text-[#3b0b87] dark:bg-[#6A50B1] hover:bg-[#5409cd] hover:text-white"> {t("saveChanges")}  </Button>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>

                                                <button type="button" className="cursor-pointer dark:text-[#8A0B19] text-red-600" onClick={() => handleDeleteProduct(product.id)} >
                                                    <Trash className="size-5" />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            {products.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="py-8 text-center"> {t("noProductsFound")}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}