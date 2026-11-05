"use client"

import { useTranslations } from "next-intl"
import { mockUsers } from "@/data/mock-users"
import { dispatchType } from "@/lib/store"
import { login } from "@/redux/authSlice"
import { useRouter } from "@/i18n/nav"
import { LockKeyhole, Mail } from "lucide-react"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card"
import LanguageSwitch from "@/components/lang-switch";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schemas/login-schema";
import { z } from "zod"




export default function LoginPage() {
    const router = useRouter()
    const dispatch = useDispatch<dispatchType>()
    const t = useTranslations("Login")

    const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting }
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    function onSubmit(data: z.infer<typeof loginSchema>) {
        clearErrors("root")

        const currentUser = mockUsers.find((user) => (
            user.email === data.email.trim() &&
            user.password === data.password
        ));

        if (!currentUser) {
            setError("root", {
                type: "manual",
                message: t("error")
            });

            return;
        }

        dispatch(login({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role
        }));

        router.replace("/panel")
    }

    return (

        <main className="flex w-full ">


            <div className="flex relative flex-col md:flex-row lg:w-[36%] sm:w-[45%]  w-full items-center justify-center dark:bg-[#0E0B2F] bg-white md:p-10">
                <div className="absolute top-4 right-4"> <LanguageSwitch /> </div>
                <img src="/Logo.png" className="md:hidden  h-26" />
                <Card className="w-full max-w-md md:p-7 px-5 xl:pt-30  border-0 ring-0 shadow-none xl:h-130 dark:bg-[#0E0B2F]">
                    <CardHeader className="text-center pb-9">
                        <CardTitle className="lg:text-3xl text-xl font-extrabold md:text-start pb-3">   {t("title")} </CardTitle>
                        <CardDescription className="md:text-start lg:w-75 md:text-base text-sm"> {t("description")} </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5" >
                            <div>
                                <div className="flex items-center  border rounded-lg px-3 py-1.5 w-full">
                                    <Mail className="text-gray-500" size={16} />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder={t("emailPlaceholder")}
                                        {...register("email")}
                                        className="border-0 bg-white file:bg-white disabled:bg-white focus-visible:ring-0 placeholder:text-sm"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-600 mt-1"> {errors.email.message} </p>
                                )}

                            </div>

                            <div>
                                <div className="flex items-center  border rounded-lg px-3 py-1.5 w-full">
                                    <LockKeyhole className="text-gray-500" size={16} />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder={t("passwordPlaceholder")}
                                        {...register("password")}
                                        className="border-0 file:bg-white disabled:bg-white focus-visible:ring-0"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                                )}
                            </div>
                            {errors.root && (
                                <p className="text-sm text-red-600"> {errors.root.message}</p>
                            )}

                            <Button type="submit"   disabled={isSubmitting} className="w-full bg-[#7925FF] dark:bg-[#6A50B1] py-5.5 text-lg cursor-pointer dark:text-white dark:hover:bg-[#4b3094] hover:bg-[#071499]"> {t("submit")} </Button>
                        </form>
                    </CardContent>
                </Card>


            </div>
            <div className="w-[64%] hidden sm:block sm:h-auto">
                <img src="/Experience.png" className="w-300 xl:h-173.5 h-140 dark:brightness-75" />
            </div>

        </main>
    )

}