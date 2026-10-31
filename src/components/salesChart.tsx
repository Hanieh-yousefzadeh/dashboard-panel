"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { monthSales } from "@/data/mock-dashboard";
import { useTranslations } from "next-intl"

export default function SalesChart() {
  const t = useTranslations("AdminDashboard.salesChart")
  const tMonth = useTranslations("AdminDashboard.months")
  return (
    <section className="xl:w-1/2 rounded-xl border border-[#7a3ffa1a]  p-5 shadow-sm dark:bg-[#14162A]">
      <div className="mb-6">
        <h2 className="sm:text-lg font-semibold">
          {t("title")}
        </h2>

        <p className="mt-1 text-sm text-[#7B29FB] dark:text-[#af8dfc]">
          {t("subtitle")}
        </p>
      </div>

      <div className="sm:h-75 h-50 w-ful ">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart className="-ml-4 xl:ml-0"
            data={monthSales}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10,
            }}
          >
            {/* خطوط پس‌زمینه */}
            <CartesianGrid strokeDasharray="3 3" />

            {/* ماه‌های سال */}
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              tickFormatter={(month) => tMonth(month.toLowerCase())}
            />

            {/* مقدار فروش */}
            <YAxis
              tick={{ fontSize: 12 }}
              tickMargin={14.5}
              width={20}
            />

            {/* اطلاعات هنگام حرکت موس */}
            <Tooltip
              formatter={(value) => [`${value} ${t("millionDollars")}`, t("sales")]}
            />

            {/* گرادیان رنگ زیر نمودار */}
            <defs >
              <linearGradient
                id="salesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#7B29FB"
                  stopOpacity={1}
                />

                <stop
                  offset="95%"
                  stopColor="#F1EBFE"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            {/* نمودار سطحی */}
            <Area
              type="monotone"
              dataKey="sales"
              name="Sales"
              stroke="#7B29FB"
              strokeWidth={3}
              fill="url(#salesGradient)"
              activeDot={{ r: 6, fill: "#7B29FB" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}