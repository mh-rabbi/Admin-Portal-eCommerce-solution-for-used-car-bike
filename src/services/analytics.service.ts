import { apiService } from './api';

export interface Analytics {
  totalUsers: number;
  totalVehicles: number;
  soldVehicles: number;
  pendingVehicles: number;
  approvedVehicles: number;
  rejectedVehicles: number;
  totalRevenue: number;
  platformFeeCollected: number;
  revenueGrowth: number;
  vehiclesSoldGrowth: number;
  activeListingsGrowth: number;
  conversionRateGrowth: number;
  avgMargin: number;
  topSellers: Array<{ name: string; sales: number; revenue: number }>;
  revenueByMonth?: Array<{ month: string; revenue: number }>;
  payments?: {
    paidCount: number;
    pendingCount: number;
    failedCount: number;
  };
  revenueChartData: {
    monthly: Array<{ name: string; revenue: number; sales: number }>;
    weekly: Array<{ name: string; revenue: number; sales: number }>;
  };
}

export interface BrandAnalytics {
  brand: string;
  count: number;
  percentage: number;
}

export interface TypeAnalytics {
  type: string;
  count: number;
  percentage: number;
}

class AnalyticsService {
  async getAnalytics(): Promise<Analytics> {
    return apiService.get<Analytics>('/analytics');
  }

  async getBrandAnalytics(): Promise<BrandAnalytics[]> {
    return apiService.get<BrandAnalytics[]>('/analytics/brands');
  }

  async getTypeAnalytics(): Promise<TypeAnalytics[]> {
    return apiService.get<TypeAnalytics[]>('/analytics/types');
  }
}

export const analyticsService = new AnalyticsService();

