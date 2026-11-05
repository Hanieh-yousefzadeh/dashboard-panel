"use client";

import { useSelector } from "react-redux";
import type { stateType } from "@/lib/store";

import AdminDashboard from "@/components/admin-dashbord";
import VendorDashboard from "@/components/vendorDshbord";
import UserDashboard from "@/components/userDshboard";

export default function DashboardPageClient() {
    const user = useSelector((state: stateType) => state.auth.user);
    const loaded = useSelector((state: stateType) => state.auth.loaded);

    if (!loaded) {
        return <p>Loading dashboard...</p>;
    }

    if (!user) {
        return <p>Redirecting...</p>;
    }

    if (user.role === "Admin") {
        return <AdminDashboard />;
    }

    if (user.role === "Vendor") {
        return <VendorDashboard />;
    }

    return <UserDashboard />;
}