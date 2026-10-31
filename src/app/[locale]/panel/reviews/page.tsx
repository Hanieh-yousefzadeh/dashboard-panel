
"use client"

import { useState, useEffect } from "react"
import { mockMyOpinions, type MyOpinion } from "@/data/mock-opinion"
import { PencilSparkles, Trash } from "lucide-react"
import Image from "next/image"

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
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLocale, useTranslations } from "next-intl"

export default function MyOpinionsPage() {
    const [opinions, setOpinions] = useState<MyOpinion[]>(mockMyOpinions)
    const [loaded, setLoaded] = useState(false)
    const [editingOpinion, setEditingOpinion] = useState<MyOpinion | null>(null)
    const t = useTranslations("MyOpinionsPage")
    const locale = useLocale()
    useEffect(() => {
        const savedOpinions = localStorage.getItem("myOpinions")
        if (savedOpinions) {
            setOpinions(JSON.parse(savedOpinions))
        }
        setLoaded(true)
    }, [])
    useEffect(() => {
        if (loaded) {
            localStorage.setItem("myOpinions", JSON.stringify(opinions))
        }
    }, [opinions, loaded])

    function handleEditClick(opinion: MyOpinion) {
        setEditingOpinion(opinion)
    }

    function handleEditSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!editingOpinion || !editingOpinion.message.trim()) return
        const updatedOpinions = opinions.map((item) => item.id === editingOpinion.id ? { ...item, message: editingOpinion.message.trim() } : item)
        setOpinions(updatedOpinions)
        setEditingOpinion(null)
    }

    function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const changeMessage = editingOpinion ? { ...editingOpinion, message: e.target.value } : null
        setEditingOpinion(changeMessage)
    }

    function handleDeleteOpinion(id: number) {
        const updatedOpinions = opinions.filter((item) => item.id !== id)
        setOpinions(updatedOpinions)
    }

    return (
        <div className="px-9 pt-6">
            <h1 className="text-2xl font-bold pb-5"> {t("title")}</h1>
            <Dialog open={editingOpinion !== null}
                onOpenChange={(isOpen) => {
                    if (!isOpen) setEditingOpinion(null)
                }}
            >
                <DialogContent className="border-[#7a3ffa1a] text-[#051164] dark:text-[#dbc8f9] dark:border-[#b392fbab]   dark:bg-[#0B0E1A]">
                    <DialogHeader>
                        <DialogTitle className="font-bold text-[#051164] dark:text-[#d1ccd5]"> {t("editTitle")} </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleEditSubmit} className="flex flex-col gap-7 pt-5 dark:text-[#d1ccd5]">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="edit-message"> {t("yourMessage")} </Label>

                            <Textarea id="edit-message"
                                value={editingOpinion?.message}
                                onChange={handleMessageChange}
                                placeholder={t("messagePlaceholder")}
                                required
                                className="min-h-28 border-[#7a3ffa1a] text-[#051264d2] focus-visible:ring-0 dark:placeholder:text-[#b098d6bd] dark:text-[#bea2eba1]"
                            />
                        </div>
                        <Button type="submit" className="mt-3 w-full py-5 bg-[#e1d4fe51] border-2  hover:border-[#5409cddb] border-[#b88ffa31] text-[#3b0b87] dark:bg-[#6A50B1] hover:bg-[#5409cddb] dark:text-white">
                            {t("saveChanges")}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="xl:w-300 md:w-3xl w-80 overflow-x-auto rounded-md border border-[#7a3ffa1a] dark:bg-[#14162A] mt-4  shadow-sm">
                <Table >
                    <TableHeader className="h-15 text-base bg-[#f1ebfe6a] dark:bg-[#6a50b11e]">
                        <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                            <TableHead className={`dark:text-[#d7c7f9b8] font-bold text-[#5409cd] ${locale === "fa" ? " text-right pr-10" : "pl-9"}`}>{t("product")}</TableHead>
                            <TableHead className={`dark:text-[#d7c7f9b8] font-bold text-[#5409cd] ${locale === "fa" ? "text-right" : ""}`}>{t("type")}</TableHead>
                            <TableHead className={`dark:text-[#d7c7f9b8] font-bold text-[#5409cd] ${locale === "fa" ? "text-right pr-17" : "pl-10"}`}>{t("message")}</TableHead>
                            <TableHead className={`dark:text-[#d7c7f9b8] font-bold text-[#5409cd] ${locale === "fa" ? "text-center" : " pl-5"}`}>{t("status")}</TableHead>
                            <TableHead className={`dark:text-[#d7c7f9b8] font-bold text-[#5409cd] ${locale === "fa" ? "text-right pr-21" : "pl-10"}`}>{t("adminReply")}</TableHead>
                            <TableHead className={`dark:text-[#d7c7f9b8] font-bold text-[#5409cd] ${locale === "fa" ? "text-center" : "pr-6"}`}>{t("actions")}</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {opinions.map((opinion) => (
                            <TableRow key={opinion.id}>
                                <TableCell>
                                    <div className={`flex min-w-40 items-center gap-1 ${locale === "fa" ? "pr-5" : "pl-5 "}`}>
                                        <Image src={opinion.image} alt={opinion.name} width={48} height={48}
                                            className="size-12 shrink-0 rounded-md object-cover"
                                        />
                                        <span className="line-clamp-1"> {opinion.name === "Sunscreen" ? t("sunscreen") : t("englishTutorial")}</span>
                                    </div>
                                </TableCell>


                                <TableCell>
                                    {opinion.type === "opinion" ? t("opinion") : t("question")}
                                </TableCell>

                                <TableCell><div className={`line-clamp-1 ${locale === "fa" ? "pr-15" : "pl-10"}`}> {opinion.message === "The product quality was good." ? t("goodQualityMessage") : t("printedVersionQuestion")}</div></TableCell>

                                <TableCell><div className={`rounded-lg text-center py-2 px-1.5 text-sm font-semibold ${opinion.status === "Answered" ? "bg-green-50 text-green-700 dark:bg-[#39305d9f] dark:text-green-700" : "bg-[#ede8fd] dark:bg-[#39305d9f] dark:text-[#af8dfc] text-[#5909CD]"}`}>
                                    {opinion.status === "Answered" ? t("answered") : t("pending")}
                                </div>
                                </TableCell>

                                <TableCell>
                                    <div className={`line-clamp-1 ${locale === "fa" ? " pr-20" : "pl-10"}`}>
                                        {opinion.adminReply === "Thank you for your comment" ? t("thankYouReply") : opinion.adminReply}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center justify-center pr-7">
                                        <button onClick={() => handleEditClick(opinion)}
                                            className="text-[#6e2dfab3] cursor-pointer dark:text-[#a286f0da]" >
                                            <PencilSparkles className="size-5" />
                                        </button>

                                        <button onClick={() => handleDeleteOpinion(opinion.id)}
                                            className="m-3 text-red-600 dark:text-[#8A0B19] cursor-pointer">
                                            <Trash className="size-5" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
