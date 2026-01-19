import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const defaultColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--primary))",
];

interface SalesChartProps {
  data?: Array<{ name: string; sales: number; revenue: number }>;
}

export function SalesChart({ data = [] }: SalesChartProps) {
  // Use data from props or empty array if not provided
  const chartData = data.length > 0 ? data : [];

  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sales by User</h3>
        <p className="text-sm text-muted-foreground">Per user sales distribution this month</p>
      </div>

      <div className="h-[300px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis
                type="number"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-lg)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                formatter={(value: number, name: string) => [
                  name === "sales" ? `${value} vehicles` : `৳${value.toLocaleString()}`,
                  name === "sales" ? "Units Sold" : "Revenue",
                ]}
              />
              <Bar
                dataKey="sales"
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={defaultColors[index % defaultColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No sales data available
          </div>
        )}
      </div>
    </div>
  );
}
