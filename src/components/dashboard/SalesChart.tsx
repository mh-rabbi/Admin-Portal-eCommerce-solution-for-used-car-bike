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

const data = [
  { name: "SUV", sales: 48, revenue: 1920000 },
  { name: "Sedan", sales: 35, revenue: 875000 },
  { name: "Truck", sales: 28, revenue: 1400000 },
  { name: "Sports", sales: 15, revenue: 975000 },
  { name: "Electric", sales: 22, revenue: 1100000 },
  { name: "Luxury", sales: 12, revenue: 1200000 },
];

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--primary))",
];

export function SalesChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sales by Category</h3>
        <p className="text-sm text-muted-foreground">Vehicle sales distribution this month</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
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
              width={60}
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
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
