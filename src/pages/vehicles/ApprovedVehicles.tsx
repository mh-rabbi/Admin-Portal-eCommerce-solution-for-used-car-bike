import { useState, useEffect } from "react";
import { CheckCircle, Filter, Search, Loader2 } from "lucide-react";
import { VehicleTable } from "@/components/vehicles/VehicleTable";
import { VehicleDetailsDialog } from "@/components/vehicles/VehicleDetailsDialog";
import { vehiclesService } from "@/services/vehicles.service";
import { transformVehicles } from "@/utils/vehicle.utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ApprovedVehicles() {
  const [vehicles, setVehicles] = useState<any[]>([]);
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
      const data = await vehiclesService.getApprovedVehicles();
      setVehicles(transformVehicles(data));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load approved vehicles",
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

  const handleViewDetails = (vehicleId: number) => {
    setSelectedVehicleId(vehicleId);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Approved Vehicles</h2>
            <p className="text-sm text-muted-foreground">
              {vehicles.length} active listings
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
