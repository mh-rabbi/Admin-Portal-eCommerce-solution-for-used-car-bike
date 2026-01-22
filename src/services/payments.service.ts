import { apiService } from './api';

export interface Payment {
  id: number;
  vehicleId: number;
  amount: number;
  vehiclePrice: number;
  feePercentage: number;
  status: 'pending' | 'paid' | 'failed';
  paymentMethod?: string;
  transactionId?: string;
  sslTransactionId?: string;
  cardType?: string;
  bankTransactionId?: string;
  createdAt: string;
  updatedAt: string;
  vehicle?: {
    id: number;
    title: string;
    brand: string;
    type: string;
    price: number;
    status: string;
    seller?: {
      id: number;
      name: string;
      email: string;
    };
  };
}

export interface PaymentStats {
  totalRevenue: number;
  paidCount: number;
  pendingCount: number;
  failedCount: number;
}

class PaymentsService {

  async getPaidPayments(): Promise<Payment[]> {
    return apiService.get<Payment[]>('/payments/paid');
  }

  async getAllPayments(): Promise<Payment[]> {
    return apiService.get<Payment[]>('/payments');
  }

  async getPaymentStats(): Promise<PaymentStats> {
    return apiService.get<PaymentStats>('/payments/stats');
  }



  async getPaymentByVehicle(vehicleId: number): Promise<Payment | null> {
    try {
      return await apiService.get<Payment>(`/payments/vehicle/${vehicleId}`);
    } catch {
      return null;
    }
  }
}

export const paymentsService = new PaymentsService();

