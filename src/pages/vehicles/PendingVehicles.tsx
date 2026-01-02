import { useState, useEffect } from "react";
import { Clock, Filter, Search, Loader2 } from "lucide-react";
import { VehicleTable, Vehicle } from "@/components/vehicles/VehicleTable";
import { VehicleDetailsDialog } from "@/components/vehicles/VehicleDetailsDialog";
import { vehiclesService } from "@/services/vehicles.service";
import { transformVehicles } from "@/utils/vehicle.utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function PendingVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setIsLoading(true);
      const data = await vehiclesService.getPendingVehicles();
      setVehicles(transformVehicles(data));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load pending vehicles",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.make.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.seller.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = async (id: string) => {
    try {
      // Extract numeric ID from formatted ID (VH00001 -> 1)
      const numericId = parseInt(id.replace('VH', ''));
      await vehiclesService.approveVehicle(numericId);
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      toast({
        title: "Vehicle Approved",
        description: "The vehicle has been approved for listing.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to approve vehicle",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      // Extract numeric ID from formatted ID (VH00001 -> 1)
      const numericId = parseInt(id.replace('VH', ''));
      await vehiclesService.rejectVehicle(numericId);
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      toast({
        title: "Vehicle Rejected",
        description: "The vehicle has been rejected.",
        variant: "destructive",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reject vehicle",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (vehicleId: number) => {
    setSelectedVehicleId(vehicleId);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Pending Vehicles</h2>
            <p className="text-sm text-muted-foreground">
              {vehicles.length} vehicles awaiting approval
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search vehicles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <VehicleTable
          vehicles={filteredVehicles}
          showActions
          onApprove={handleApprove}
          onReject={handleReject}
          onViewDetails={handleViewDetails}
        />
      )}

      <VehicleDetailsDialog
        vehicleId={selectedVehicleId}
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
      />
    </div>
  );
}
