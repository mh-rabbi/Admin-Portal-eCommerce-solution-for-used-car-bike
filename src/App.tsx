import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import PendingVehicles from "@/pages/vehicles/PendingVehicles";
import ApprovedVehicles from "@/pages/vehicles/ApprovedVehicles";
import RejectedVehicles from "@/pages/vehicles/RejectedVehicles";
import SoldVehicles from "@/pages/vehicles/SoldVehicles";
import PaidPayments from "@/pages/payments/PaidPayments";
import Analytics from "@/pages/Analytics";
import Users from "@/pages/Users";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vehicles/pending" element={<PendingVehicles />} />
            <Route path="/vehicles/approved" element={<ApprovedVehicles />} />
            <Route path="/vehicles/rejected" element={<RejectedVehicles />} />
            <Route path="/vehicles/sold" element={<SoldVehicles />} />
            <Route path="/payments/paid" element={<PaidPayments />} />
            <Route path="/users" element={<Users />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
