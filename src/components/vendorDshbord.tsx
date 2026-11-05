import DashboardCard from "@/components/dashboard-card";
import VendorSalesChart from "@/components/vendorcahrt"
import VendorOrders from "@/components/vendorOrdere"
import { vendorDashboardCard } from "@/data/mock-vendorpanel"
import { useLocale, useTranslations } from "next-intl"

export default function VendorDashboard() {
  const t = useTranslations("VendorDashboard")
  const locale = useLocale()

  const cardTranslationKeys = {
    "My Products": "myProducts",
    "Total Products": "totalProducts",
    "Total Orders": "totalOrders",
    "All Orders": "allOrders",
    "Total Sales": "totalSales",
    "Total Revenue": "totalRevenue",
    "Pending Orders": "pendingOrders",
    "Need Attention": "needAttention",
    "Total Reviews": "totalReviews",
    "Customer Reviews": "customerReviews",
  } as const
  return (
    <div className={`xl:w-315 ${locale === "fa" ? "xl:pr-5" : " xl:pl-5"} pt-6`}>
      {/* <div>
        <p className="mt-2 text-lg "> Overview of the Store's Status </p>
      </div> */}

      <div className="md:flex-row mx-5 flex flex-wrap xl:gap-0 gap-3 xl:justify-between md:justify-start  justify-center pb-5">
        {vendorDashboardCard.map((card) => (
          <DashboardCard
            key={card.title}
            title={t(cardTranslationKeys[card.title])}
            value={card.value}
            icon={card.icon}
            description={t(cardTranslationKeys[card.description])}
          />
        ))}
      </div>
      <div className="xl:flex-row flex flex-col px-5 justify-between gap-5 w-full">
        <VendorSalesChart />
        <VendorOrders />

      </div>
    </div>
  );
}
