import { useState, useEffect } from "react";
import { Calendar, DollarSign, User, Mail, Phone, FileText, Image as ImageIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Vehicle } from "@/services/vehicles.service";
import { vehiclesService } from "@/services/vehicles.service";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface VehicleDetailsDialogProps {
  vehicleId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusStyles = {
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  sold: "bg-primary/10 text-primary border-primary/20",
};

export function VehicleDetailsDialog({ vehicleId, open, onOpenChange }: VehicleDetailsDialogProps) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (vehicleId && open) {
      loadVehicleDetails();
    }
  }, [vehicleId, open]);

  const loadVehicleDetails = async () => {
    if (!vehicleId) return;

    try {
      setIsLoading(true);
      const data = await vehiclesService.getVehicle(vehicleId);
      setVehicle(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load vehicle details",
        variant: "destructive",
      });
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Vehicle Details
            {vehicle && (
              <Badge variant="outline" className={statusStyles[vehicle.status]}>
                {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : vehicle ? (
          <ScrollArea className="max-h-[70vh]">
            <div className="space-y-6">
              {/* Vehicle Images */}
              {vehicle.images && vehicle.images.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Images
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vehicle.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.startsWith('http') ? image : `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${image}`}
                        alt={`${vehicle.title} - Image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Vehicle Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Title</label>
                      <p className="text-foreground">{vehicle.title}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Brand</label>
                      <p className="text-foreground">{vehicle.brand}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Type</label>
                      <p className="text-foreground">{vehicle.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-2xl font-bold text-primary">
                        ${vehicle.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Seller Information */}
                {vehicle.seller && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Seller Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                        <p className="text-foreground">{vehicle.seller.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-foreground flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {vehicle.seller.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Description */}
              {vehicle.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Description
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-foreground whitespace-pre-wrap">{vehicle.description}</p>
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Created: {formatDate(vehicle.createdAt)}</span>
                </div>
                {vehicle.updatedAt !== vehicle.createdAt && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Updated: {formatDate(vehicle.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
