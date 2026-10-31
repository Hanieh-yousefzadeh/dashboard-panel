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

import { vendorMonthSales } from "@/data/mock-vendorpanel"
import { useTranslations } from "next-intl"

export default function VendorSalesChart() {
  const t = useTranslations("VendorDashboard")
  return (
    <section className="xl:w-1/2 rounded-xl border border-[#7a3ffa1a] bg-card p-5 shadow-sm dark:bg-[#14162A]">
      <div className="mb-6">
        <h2 className="sm:text-lg font-semibold">
          {t("salesStatistics")}
        </h2>

        <p className="mt-1 text-sm text-[#7B29FB] dark:text-[#af8dfc]">
          {t("monthlySales")}
        </p>
      </div>

      <div className="sm:h-75 h-50 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart className="-ml-4 xl:ml-0"
            data={vendorMonthSales}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              tickFormatter={(month) => t(`months.${month}`)}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              tickMargin={16}
              width={35}
            />

            <Tooltip
              formatter={(value) => [`${value} ${t("millionDollars")}`, t("sales")]}
            />

            <defs>
              <linearGradient
                id="vendorSalesGradient"
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

            <Area
              type="monotone"
              dataKey="sales"
              name={t("sales")}
              stroke="#7B29FB"
              strokeWidth={3}
              fill="url(#vendorSalesGradient)"
              activeDot={{
                r: 6,
                fill: "#7B29FB",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}