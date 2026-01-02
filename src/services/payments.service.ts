import { apiService } from './api';

export interface Payment {
  id: number;
  vehicleId: number;
  amount: number;
  status: 'pending' | 'paid';
  createdAt: string;
  updatedAt: string;
  vehicle?: {
    id: number;
    title: string;
    brand: string;
    type: string;
    price: number;
  };
  buyer?: {
    id: number;
    name: string;
    email: string;
  };
}

class PaymentsService {
  async getPendingPayments(): Promise<Payment[]> {
    return apiService.get<Payment[]>('/payments?status=pending');
  }

  async getPaidPayments(): Promise<Payment[]> {
    return apiService.get<Payment[]>('/payments?status=paid');
  }

  async getAllPayments(): Promise<Payment[]> {
    return apiService.get<Payment[]>('/payments');
  }

  async confirmPayment(id: number): Promise<Payment> {
    return apiService.post<Payment>(`/payments/${id}/confirm`);
  }
}

export const paymentsService = new PaymentsService();

