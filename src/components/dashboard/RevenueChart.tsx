import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const monthlyData = [
  { name: "Jan", revenue: 45000, sales: 32 },
  { name: "Feb", revenue: 52000, sales: 38 },
  { name: "Mar", revenue: 48000, sales: 35 },
  { name: "Apr", revenue: 61000, sales: 45 },
  { name: "May", revenue: 55000, sales: 40 },
  { name: "Jun", revenue: 67000, sales: 49 },
  { name: "Jul", revenue: 72000, sales: 52 },
  { name: "Aug", revenue: 69000, sales: 50 },
  { name: "Sep", revenue: 78000, sales: 56 },
  { name: "Oct", revenue: 82000, sales: 59 },
  { name: "Nov", revenue: 91000, sales: 65 },
  { name: "Dec", revenue: 98000, sales: 71 },
];

const weeklyData = [
  { name: "Mon", revenue: 12000, sales: 8 },
  { name: "Tue", revenue: 15000, sales: 11 },
  { name: "Wed", revenue: 18000, sales: 13 },
  { name: "Thu", revenue: 14000, sales: 10 },
  { name: "Fri", revenue: 22000, sales: 16 },
  { name: "Sat", revenue: 25000, sales: 18 },
  { name: "Sun", revenue: 19000, sales: 14 },
];

type TimeRange = "week" | "month";

export function RevenueChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  const data = timeRange === "month" ? monthlyData : weeklyData;

  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-fade-in-up">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">
            {timeRange === "month" ? "Monthly" : "Weekly"} revenue and sales
          </p>
        </div>
        <div className="flex gap-1 rounded-lg bg-accent p-1">
          {(["week", "month"] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200",
                timeRange === range
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range === "week" ? "This Week" : "This Year"}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-lg)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number, name: string) => [
                name === "revenue" ? `$${value.toLocaleString()}` : value,
                name === "revenue" ? "Revenue" : "Sales",
              ]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
