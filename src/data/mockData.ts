import { Vehicle } from "@/components/vehicles/VehicleTable";

const vehicleImages = [
  "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop",
];

const makes = ["Toyota", "Honda", "Ford", "BMW", "Tesla", "Mercedes", "Audi", "Lexus"];
const models = {
  Toyota: ["Camry", "RAV4", "Highlander", "Corolla"],
  Honda: ["Civic", "CR-V", "Accord", "Pilot"],
  Ford: ["F-150", "Mustang", "Explorer", "Bronco"],
  BMW: ["X5", "3 Series", "5 Series", "X3"],
  Tesla: ["Model 3", "Model Y", "Model S", "Model X"],
  Mercedes: ["C-Class", "E-Class", "GLE", "GLC"],
  Audi: ["A4", "Q5", "A6", "Q7"],
  Lexus: ["RX", "ES", "NX", "IS"],
};
const sellers = ["John Motors", "Premium Auto", "City Cars", "Elite Vehicles", "Quick Sale Auto"];

const generateVehicle = (id: number, status: Vehicle["status"]): Vehicle => {
  const make = makes[Math.floor(Math.random() * makes.length)];
  const model = models[make as keyof typeof models][Math.floor(Math.random() * 4)];
  const year = 2019 + Math.floor(Math.random() * 6);
  const basePrice = 25000 + Math.floor(Math.random() * 75000);

  return {
    id: `VH${String(id).padStart(5, "0")}`,
    make,
    model,
    year,
    price: basePrice,
    status,
    seller: sellers[Math.floor(Math.random() * sellers.length)],
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    image: vehicleImages[Math.floor(Math.random() * vehicleImages.length)],
  };
};

export const pendingVehicles: Vehicle[] = Array.from({ length: 15 }, (_, i) =>
  generateVehicle(i + 1, "pending")
);

export const approvedVehicles: Vehicle[] = Array.from({ length: 25 }, (_, i) =>
  generateVehicle(i + 100, "approved")
);

export const rejectedVehicles: Vehicle[] = Array.from({ length: 8 }, (_, i) =>
  generateVehicle(i + 200, "rejected")
);

export const soldVehicles: Vehicle[] = Array.from({ length: 45 }, (_, i) =>
  generateVehicle(i + 300, "sold")
);

export interface Payment {
  id: string;
  vehicleId: string;
  vehicle: string;
  amount: number;
  buyer: string;
  seller: string;
  status: "pending" | "paid";
  date: string;
  method: string;
}

export const pendingPayments: Payment[] = [
  { id: "PAY001", vehicleId: "VH00001", vehicle: "2024 Toyota Camry", amount: 35000, buyer: "John Smith", seller: "Premium Auto", status: "pending", date: "Dec 14, 2024", method: "Bank Transfer" },
  { id: "PAY002", vehicleId: "VH00002", vehicle: "2023 Honda CR-V", amount: 42000, buyer: "Sarah Johnson", seller: "City Cars", status: "pending", date: "Dec 13, 2024", method: "Financing" },
  { id: "PAY003", vehicleId: "VH00003", vehicle: "2024 BMW X5", amount: 75000, buyer: "Mike Wilson", seller: "Elite Vehicles", status: "pending", date: "Dec 12, 2024", method: "Wire Transfer" },
  { id: "PAY004", vehicleId: "VH00004", vehicle: "2023 Tesla Model 3", amount: 48000, buyer: "Emily Davis", seller: "Quick Sale Auto", status: "pending", date: "Dec 11, 2024", method: "Cash" },
];

export const paidPayments: Payment[] = [
  { id: "PAY101", vehicleId: "VH00101", vehicle: "2024 Ford F-150", amount: 55000, buyer: "Robert Brown", seller: "John Motors", status: "paid", date: "Dec 10, 2024", method: "Bank Transfer" },
  { id: "PAY102", vehicleId: "VH00102", vehicle: "2023 Mercedes GLE", amount: 68000, buyer: "Lisa Anderson", seller: "Premium Auto", status: "paid", date: "Dec 9, 2024", method: "Financing" },
  { id: "PAY103", vehicleId: "VH00103", vehicle: "2024 Audi Q5", amount: 52000, buyer: "David Miller", seller: "Elite Vehicles", status: "paid", date: "Dec 8, 2024", method: "Wire Transfer" },
  { id: "PAY104", vehicleId: "VH00104", vehicle: "2023 Lexus RX", amount: 58000, buyer: "Jennifer Taylor", seller: "City Cars", status: "paid", date: "Dec 7, 2024", method: "Cash" },
  { id: "PAY105", vehicleId: "VH00105", vehicle: "2024 Honda Accord", amount: 32000, buyer: "Chris Martinez", seller: "Quick Sale Auto", status: "paid", date: "Dec 6, 2024", method: "Financing" },
];
