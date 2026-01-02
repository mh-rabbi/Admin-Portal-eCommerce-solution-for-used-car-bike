import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Toyota", value: 28, color: "hsl(var(--chart-1))" },
  { name: "Honda", value: 22, color: "hsl(var(--chart-2))" },
  { name: "Ford", value: 18, color: "hsl(var(--chart-3))" },
  { name: "BMW", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Tesla", value: 12, color: "hsl(var(--chart-5))" },
  { name: "Others", value: 5, color: "hsl(var(--muted))" },
];

export function BrandChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sales by Brand</h3>
        <p className="text-sm text-muted-foreground">Market share distribution</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              animationDuration={1500}
              animationBegin={300}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-lg)",
              }}
              formatter={(value: number) => [`${value}%`, "Market Share"]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
