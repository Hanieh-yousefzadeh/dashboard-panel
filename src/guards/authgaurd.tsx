"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useRouter, usePathname } from "@/i18n/nav"
import type { stateType } from "@/lib/store"
import { Spinner } from "@/components/ui/spinner"

export default function AuthGuard({
    children,
    type
}: {
    children: React.ReactNode,
    type: "auth" | "guest"
}) {

    const user = useSelector((state: stateType) => state.auth.user)
    const loaded = useSelector((state: stateType) => state.auth.loaded)



    const router = useRouter()
    const pathname = usePathname()

    const [mounted, setMounted] = useState(false)
    // console.log("AuthGuard state:", {
    //     user,
    //     loaded,
    //     mounted,
    //     pathname
    // });

    let allowedRoles: string[] = []

    if (pathname === "/panel") {
        allowedRoles = ["Admin", "Vendor", "User"]
    }
    else if (
        pathname.startsWith("/panel/users") ||
        pathname.startsWith("/panel/vendors") ||
        pathname.startsWith("/panel/categories")
    ) {
        allowedRoles = ["Admin"]
    }
    else if (pathname.startsWith("/panel/products") || pathname.startsWith("/panel/orders")) {
        allowedRoles = ["Admin", "Vendor"]
    }
    else if (pathname.startsWith("/panel/visit")) {
        allowedRoles = ["Vendor"]
    }
    else if (
        pathname.startsWith("/panel/favorites") ||
        pathname.startsWith("/panel/myorders") ||
        pathname.startsWith("/panel/addresses") ||
        pathname.startsWith("/panel/reviews")
    ) {
        allowedRoles = ["User"]
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {

        // console.log("AuthGuard effect:", {
        //     user,
        //     loaded,
        //     pathname
        // });
        if (!loaded) return

        if (type === "auth" && !user) {
            router.replace("/")
        }
        else if (type === "guest" && user) {
            router.replace("/panel")
        }
        else if (type === "auth" && user && !allowedRoles.includes(user.role)) {
            router.replace("/panel")
        }

    }, [loaded, user, type, router, pathname])

    if (!mounted || !loaded) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner className="size-10 text-purple-600" />
            </div>
        )

    }

    if (type === "auth" && !user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner className="size-10 text-purple-600" />
            </div>
        )
    }

    if (type === "guest" && user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner className="size-10 text-purple-600" />
            </div>
        )
    }

    if (type === "auth" && user && !allowedRoles.includes(user.role)) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner className="size-10 text-purple-600" />
            </div>
        )
    }

    return children
}