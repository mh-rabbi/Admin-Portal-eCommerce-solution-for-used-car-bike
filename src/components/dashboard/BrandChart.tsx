import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface BrandChartProps {
  data?: Array<{ name: string; value: number; color: string }>;
}

export function BrandChart({ data = [] }: BrandChartProps) {
  const chartData = data.length > 0 ? data : [];

  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sales by Brand</h3>
        <p className="text-sm text-muted-foreground">Market share distribution</p>
      </div>

      <div className="h-[300px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                animationDuration={1500}
                animationBegin={300}
              >
                {chartData.map((entry, index) => (
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
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No brand data available
          </div>
        )}
      </div>
    </div>
  );
}
