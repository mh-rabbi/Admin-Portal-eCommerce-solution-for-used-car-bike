import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, Wallet, ShoppingBag, Percent, Loader2 } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { analyticsService } from "@/services/analytics.service";
import { useToast } from "@/hooks/use-toast";

const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted))",
];

export default function Analytics() {
  const [stats, setStats] = useState([
    { title: "Total Revenue", value: "৳0", icon: Wallet, trend: { value: 0, isPositive: true } },
    { title: "Total Sales", value: "0", icon: ShoppingBag, trend: { value: 0, isPositive: true } },
    { title: "Growth Rate", value: "0%", icon: TrendingUp, trend: { value: 0, isPositive: true } },
    { title: "Avg. Margin", value: "0%", icon: Percent, trend: { value: 0, isPositive: true } },
  ]);
  const [brandShare, setBrandShare] = useState<Array<{ name: string; value: number; color: string }>>([]);
  const [typeData, setTypeData] = useState<Array<{ name: string; count: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);
      const [analytics, brands, types] = await Promise.all([
        analyticsService.getAnalytics(),
        analyticsService.getBrandAnalytics(),
        analyticsService.getTypeAnalytics(),
      ]);

      const conversionRate = analytics.totalVehicles > 0
        ? ((analytics.soldVehicles / analytics.totalVehicles) * 100).toFixed(1)
        : 0;

      setStats([
        {
          title: "Total Revenue",
          value: `৳${analytics.totalRevenue.toLocaleString()}`,
          icon: Wallet,
          trend: { value: 15.2, isPositive: true },
        },
        {
          title: "Total Sales",
          value: analytics.soldVehicles.toString(),
          icon: ShoppingBag,
          trend: { value: 12.8, isPositive: true },
        },
        {
          title: "Growth Rate",
          value: `${conversionRate}%`,
          icon: TrendingUp,
          trend: { value: 3.4, isPositive: true },
        },
        {
          title: "Avg. Margin",
          value: "10%",
          icon: Percent,
          trend: { value: 1.2, isPositive: true },
        },
      ]);

      // Transform brand data for pie chart
      const totalBrands = brands.reduce((sum, b) => sum + b.count, 0);
      const brandChartData = brands
        .map((brand, index) => ({
          name: brand.brand,
          value: totalBrands > 0 ? Math.round((brand.count / totalBrands) * 100) : 0,
          color: chartColors[index % chartColors.length],
        }))
        .slice(0, 6); // Limit to top 6 brands
      setBrandShare(brandChartData);

      // Transform type data
      setTypeData(types.map(t => ({ name: t.type, count: t.count })));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load analytics data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Revenue Chart - Simplified for now */}
      <div className="rounded-xl border border-border bg-card p-6 animate-fade-in-up">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">Total revenue from vehicle sales</p>
        </div>
        <div className="h-[350px] flex items-center justify-center text-muted-foreground">
          Revenue chart data will be available as more sales are recorded
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales by Type */}
        {typeData.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Sales by Vehicle Type</h3>
              <p className="text-sm text-muted-foreground">Distribution by type</p>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Brand Share */}
        <div className="rounded-xl border border-border bg-card p-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Market Share by Brand</h3>
            <p className="text-sm text-muted-foreground">Current brand distribution</p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={brandShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {brandShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Share"]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {brandShare.length === 0 && typeData.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
          <p>Analytics data will appear as vehicles are added and sold</p>
        </div>
      )}
    </div>
  );
}
