import { apiService } from './api';

export interface Vehicle {
  id: number;
  title: string;
  description: string;
  brand: string;
  type: string;
  price: number;
  images: string[];
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  sellerId: number;
  seller?: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

class VehiclesService {
  async getPendingVehicles(): Promise<Vehicle[]> {
    return apiService.get<Vehicle[]>('/admin/vehicles/pending');
  }

  async getApprovedVehicles(): Promise<Vehicle[]> {
    return apiService.get<Vehicle[]>('/vehicles?status=approved');
  }

  async getRejectedVehicles(): Promise<Vehicle[]> {
    return apiService.get<Vehicle[]>('/vehicles?status=rejected');
  }

  async getSoldVehicles(): Promise<Vehicle[]> {
    return apiService.get<Vehicle[]>('/admin/vehicles/sold');
  }

  async approveVehicle(id: number): Promise<Vehicle> {
    return apiService.post<Vehicle>(`/admin/vehicles/${id}/approve`);
  }

  async rejectVehicle(id: number): Promise<Vehicle> {
    return apiService.post<Vehicle>(`/admin/vehicles/${id}/reject`);
  }

  async getVehicle(id: number): Promise<Vehicle> {
    return apiService.get<Vehicle>(`/vehicles/${id}`);
  }
}

export const vehiclesService = new VehiclesService();

