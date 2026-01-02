import { apiService } from './api';

export interface Analytics {
  totalUsers: number;
  totalVehicles: number;
  soldVehicles: number;
  pendingVehicles: number;
  approvedVehicles: number;
  rejectedVehicles: number;
  totalRevenue: number;
  revenueByMonth?: Array<{ month: string; revenue: number }>;
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

