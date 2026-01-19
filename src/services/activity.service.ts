import { vehiclesService, Vehicle } from './vehicles.service';
import { paymentsService, Payment } from './payments.service';

export interface Activity {
  id: string;
  type: 'approved' | 'rejected' | 'payment' | 'listing' | 'pending';
  title: string;
  description: string;
  time: string;
  timestamp: Date;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return 'Just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
}

function vehicleToActivity(vehicle: Vehicle): Activity {
  const timestamp = new Date(vehicle.updatedAt || vehicle.createdAt);

  switch (vehicle.status) {
    case 'approved':
      return {
        id: `vehicle-approved-${vehicle.id}`,
        type: 'approved',
        title: 'Vehicle Approved',
        description: `${vehicle.title} approved for listing`,
        time: formatTimeAgo(timestamp),
        timestamp,
      };
    case 'rejected':
      return {
        id: `vehicle-rejected-${vehicle.id}`,
        type: 'rejected',
        title: 'Vehicle Rejected',
        description: `${vehicle.title} - Rejected`,
        time: formatTimeAgo(timestamp),
        timestamp,
      };
    case 'pending':
      return {
        id: `vehicle-pending-${vehicle.id}`,
        type: 'listing',
        title: 'New Listing',
        description: `${vehicle.title} submitted for review`,
        time: formatTimeAgo(timestamp),
        timestamp,
      };
    case 'sold':
      return {
        id: `vehicle-sold-${vehicle.id}`,
        type: 'approved',
        title: 'Vehicle Sold',
        description: `${vehicle.title} has been sold`,
        time: formatTimeAgo(timestamp),
        timestamp,
      };
    default:
      return {
        id: `vehicle-${vehicle.id}`,
        type: 'pending',
        title: 'Vehicle Update',
        description: vehicle.title,
        time: formatTimeAgo(timestamp),
        timestamp,
      };
  }
}

function paymentToActivity(payment: Payment): Activity {
  const timestamp = new Date(payment.updatedAt || payment.createdAt);
  const vehicleTitle = payment.vehicle?.title || `Vehicle #${payment.vehicleId}`;
  const formattedAmount = `৳${payment.amount.toLocaleString()}`;

  if (payment.status === 'paid') {
    return {
      id: `payment-paid-${payment.id}`,
      type: 'payment',
      title: 'Payment Received',
      description: `${formattedAmount} payment for ${vehicleTitle}`,
      time: formatTimeAgo(timestamp),
      timestamp,
    };
  }

  return {
    id: `payment-pending-${payment.id}`,
    type: 'pending',
    title: 'Payment Pending',
    description: `${formattedAmount} pending for ${vehicleTitle}`,
    time: formatTimeAgo(timestamp),
    timestamp,
  };
}

class ActivityService {
  async getRecentActivity(limit: number = 10): Promise<Activity[]> {
    try {
      // Fetch data from multiple sources in parallel
      const [pendingVehicles, approvedVehicles, rejectedVehicles, soldVehicles, payments] = await Promise.all([
        vehiclesService.getPendingVehicles().catch(() => []),
        vehiclesService.getApprovedVehicles().catch(() => []),
        vehiclesService.getRejectedVehicles().catch(() => []),
        vehiclesService.getSoldVehicles().catch(() => []),
        paymentsService.getAllPayments().catch(() => []),
      ]);

      // Convert all data to activities
      const activities: Activity[] = [
        ...pendingVehicles.map(vehicleToActivity),
        ...approvedVehicles.map(vehicleToActivity),
        ...rejectedVehicles.map(vehicleToActivity),
        ...soldVehicles.map(vehicleToActivity),
        ...payments.map(paymentToActivity),
      ];

      // Sort by timestamp (most recent first) and limit
      return activities
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }
  }
}

export const activityService = new ActivityService();
