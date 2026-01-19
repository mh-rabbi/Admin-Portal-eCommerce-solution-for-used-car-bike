import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status: "pending" | "approved" | "rejected" | "sold";
  seller: string;
  date: string;
  image: string;
}

interface VehicleTableProps {
  vehicles: Vehicle[];
  showActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewDetails?: (id: number) => void;
}

const statusStyles = {
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  sold: "bg-primary/10 text-primary border-primary/20",
};

export function VehicleTable({
  vehicles,
  showActions = false,
  onApprove,
  onReject,
  onViewDetails,
}: VehicleTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const itemsPerPage = 8;
  const totalPages = Math.ceil(vehicles.length / itemsPerPage);
  const currentVehicles = vehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApprove = (id: string) => {
    onApprove?.(id);
    toast({
      title: "Vehicle Approved",
      description: "The vehicle has been approved for listing.",
    });
  };

  const handleReject = (id: string) => {
    onReject?.(id);
    toast({
      title: "Vehicle Rejected",
      description: "The vehicle has been rejected.",
      variant: "destructive",
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card animate-fade-in-up">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Vehicle</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            {showActions && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentVehicles.map((vehicle, index) => (
            <TableRow
              key={vehicle.id}
              className="animate-fade-in group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="h-12 w-16 rounded-lg object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div>
                    <p className="font-medium text-foreground">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-xs text-muted-foreground">ID: {vehicle.id}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                ৳{vehicle.price.toLocaleString()}
              </TableCell>
              <TableCell className="text-muted-foreground">{vehicle.seller}</TableCell>
              <TableCell className="text-muted-foreground">{vehicle.date}</TableCell>
              <TableCell>
                <Badge variant="outline" className={cn(statusStyles[vehicle.status])}>
                  {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                </Badge>
              </TableCell>
              {showActions && (
                <TableCell className="text-right">
                  {vehicle.status === "pending" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => {
                            const numericId = parseInt(vehicle.id.replace('VH', ''));
                            onViewDetails?.(numericId);
                          }}
                        >
                          <Eye className="h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 text-emerald-500"
                          onClick={() => handleApprove(vehicle.id)}
                        >
                          <CheckCircle className="h-4 w-4" /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 text-destructive"
                          onClick={() => handleReject(vehicle.id)}
                        >
                          <XCircle className="h-4 w-4" /> Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        const numericId = parseInt(vehicle.id.replace('VH', ''));
                        onViewDetails?.(numericId);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, vehicles.length)} of {vehicles.length} vehicles
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
