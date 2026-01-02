import { Vehicle as BackendVehicle } from '@/services/vehicles.service';
import { Vehicle as FrontendVehicle } from '@/components/vehicles/VehicleTable';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function transformVehicle(backendVehicle: BackendVehicle): FrontendVehicle {
  // Get first image or placeholder
  const image = backendVehicle.images && backendVehicle.images.length > 0
    ? backendVehicle.images[0].startsWith('http')
      ? backendVehicle.images[0]
      : `${API_BASE_URL}${backendVehicle.images[0]}`
    : 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop';

  // Format date
  const date = new Date(backendVehicle.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Extract make and model from title (assuming format like "2024 Toyota Camry" or "Toyota Camry")
  const titleParts = backendVehicle.title.split(' ');
  let make = backendVehicle.brand;
  let model = backendVehicle.title.replace(backendVehicle.brand, '').trim();
  
  // Try to extract year if present
  const yearMatch = backendVehicle.title.match(/\d{4}/);
  const year = yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();

  // If model is empty, use title
  if (!model || model === '') {
    model = backendVehicle.title;
  }

  return {
    id: `VH${String(backendVehicle.id).padStart(5, '0')}`,
    make: make || 'Unknown',
    model: model || backendVehicle.title,
    year: year,
    price: backendVehicle.price,
    status: backendVehicle.status,
    seller: backendVehicle.seller?.name || 'Unknown Seller',
    date: date,
    image: image,
  };
}

export function transformVehicles(backendVehicles: BackendVehicle[]): FrontendVehicle[] {
  return backendVehicles.map(transformVehicle);
}

