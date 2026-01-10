import { useState, useEffect } from "react";
import { Car, ShoppingBag, TrendingUp, Loader2, Wallet } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { BrandChart } from "@/components/dashboard/BrandChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { analyticsService } from "@/services/analytics.service";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [stats, setStats] = useState([
    { title: "Platform Fee Revenue", value: "৳0", icon: Wallet, trend: { value: 0, isPositive: true } },
    { title: "Vehicles Sold", value: "0", icon: ShoppingBag, trend: { value: 0, isPositive: true } },
    { title: "Active Listings", value: "0", icon: Car, trend: { value: 0, isPositive: false } },
    { title: "Conversion Rate", value: "0%", icon: TrendingUp, trend: { value: 0, isPositive: true } },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const analytics = await analyticsService.getAnalytics();
      
      const conversionRate = analytics.totalVehicles > 0
        ? ((analytics.soldVehicles / analytics.totalVehicles) * 100).toFixed(1)
        : 0;

      // Platform fee revenue is the money collected from vehicle posts
      const platformFeeRevenue = analytics.platformFeeCollected || analytics.totalRevenue || 0;

      setStats([
        {
          title: "Platform Fee Revenue",
          value: `৳${platformFeeRevenue.toLocaleString()}`,
          icon: Wallet,
          trend: { value: 12.5, isPositive: true },
        },
        {
          title: "Vehicles Sold",
          value: analytics.soldVehicles.toString(),
          icon: ShoppingBag,
          trend: { value: 8.2, isPositive: true },
        },
        {
          title: "Active Listings",
          value: analytics.approvedVehicles.toString(),
          icon: Car,
          trend: { value: 3.1, isPositive: false },
        },
        {
          title: "Conversion Rate",
          value: `${conversionRate}%`,
          icon: TrendingUp,
          trend: { value: 5.4, isPositive: true },
        },
      ]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load dashboard data",
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
      {/* Stats Grid */}
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

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <SalesChart />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <BrandChart />
        <RecentActivity />
      </div>
    </div>
  );
}
