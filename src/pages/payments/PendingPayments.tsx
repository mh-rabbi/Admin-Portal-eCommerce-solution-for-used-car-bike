import { useState, useEffect } from "react";
import { Clock, Search, CheckCircle, Loader2 } from "lucide-react";
import { paymentsService, Payment } from "@/services/payments.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function PendingPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setIsLoading(true);
      const data = await paymentsService.getPendingPayments();
      setPayments(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load pending payments",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPayments = payments.filter(
    (p) =>
      p.vehicle?.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.buyer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.buyer?.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleMarkPaid = async (id: number) => {
    try {
      await paymentsService.confirmPayment(id);
      setPayments((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: "Payment Confirmed",
        description: "The payment has been marked as paid.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to confirm payment",
        variant: "destructive",
      });
    }
  };

  const totalPending = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Pending Payments</h2>
            <p className="text-sm text-muted-foreground">
              {payments.length} payments · ${totalPending.toLocaleString()} pending
            </p>
          </div>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search payments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-xl border border-border bg-card animate-fade-in-up">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Payment ID</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                  No pending payments found
                </TableCell>
              </TableRow>
            ) : (
              filteredPayments.map((payment, index) => {
                const date = new Date(payment.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
                return (
                  <TableRow
                    key={payment.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="font-mono text-sm">PAY{String(payment.id).padStart(5, '0')}</TableCell>
                    <TableCell className="font-medium">
                      {payment.vehicle?.title || `Vehicle #${payment.vehicleId}`}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {payment.buyer?.name || 'Unknown'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">-</TableCell>
                    <TableCell className="font-semibold">
                      ${payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Online</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{date}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500"
                        onClick={() => handleMarkPaid(payment.id)}
                      >
                        <CheckCircle className="h-4 w-4" /> Mark Paid
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
