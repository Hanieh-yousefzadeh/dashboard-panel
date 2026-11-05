import { vendorRecentOrders } from "@/data/mock-vendorpanel"
import { useTranslations } from "next-intl"

export default function VendorOrders() {
  const t = useTranslations("VendorDashboard")
  const statusTranslationKeys = {
    Pending: "pending",
    Processing: "processing",
    Delivered: "delivered",
    Cancelled: "cancelled",
  } as const
  return (
    <section className="xl:w-1/2 rounded-xl border border-[#7a3ffa1a] dark:bg-[#14162A] bg-card p-5 shadow-sm">
      <h2 className="mb-7 text-lg font-semibold">  {t("latestOrders")}</h2>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead>
            <tr className="border-b border-[#9468fc47] font-semibold text-[#7B29FB] dark:text-[#af8dfc]">
              <th className="w-24 pb-3 text-center"> {t("orderNumber")}</th>
              <th className="pb-3 pl-4 text-center"> {t("product")}</th>
              <th className="pb-3 pl-4 text-center"> {t("customer")} </th>
              <th className="pb-3 pl-4 text-center"> {t("amount")} </th>
              <th className="pb-3 pl-4 text-center"> {t("status")}</th>
            </tr>
          </thead>

          <tbody>
            {vendorRecentOrders.map((order) => (
              <tr key={order.id} className="border-b border-[#9468fc47]" >
                <td className="py-4 text-center"> #{order.id} </td>
                <td className="py-4 pl-4 text-center">  {t(
                  `products.${order.product}` as
                  | "products.Running Shoes"
                  | "products.Wireless Headphones"
                  | "products.Classic Watch"
                  | "products.Cotton T-Shirt"
                  | "products.Sunscreen"
                )} </td>
                <td className="py-4 pl-4 text-center"> {order.customer}</td>
                <td className="py-4 pl-4 text-center"> ${order.amount.toFixed(2)} </td>

                <td className="py-4 pl-4 text-center">
                  <span
                    className={` rounded-lg px-3 py-2 text-sm font-semibold ${order.status === "Delivered" ? "bg-green-50 dark:bg-[#39305D] px-4.5 dark:text-green-700 text-green-700"
                      : order.status === "Pending"
                        ? "bg-[#F9F7FF] dark:bg-[#39305D] dark:text-[#af8dfc] text-[#7B29FB] px-5"
                        : order.status === "Processing"
                          ? "bg-blue-50 dark:bg-[#39305D] dark:text-blue-500 text-[#031381]"
                          : "bg-red-50 px-4 dark:bg-[#39305D] dark:text-red-800 text-red-700"
                      }`}
                  >
                    {(() => {
                      switch (order.status) {
                        case "Pending":
                          return t("pending");
                        case "Processing":
                          return t("processing");
                        case "Delivered":
                          return t("delivered");
                        case "Cancelled":
                          return t("cancelled");
                        default:
                          return order.status;
                      }
                    })()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}