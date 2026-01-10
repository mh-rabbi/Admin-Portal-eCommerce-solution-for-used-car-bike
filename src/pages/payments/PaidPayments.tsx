import { useState, useEffect } from "react";
import { Wallet, Search, Download, Loader2 } from "lucide-react";
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

export default function PaidPayments() {
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
      const data = await paymentsService.getPaidPayments();
      setPayments(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load paid payments",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPayments = payments.filter(
    (p) =>
      p.vehicle?.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.vehicle?.seller?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.vehicle?.seller?.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.transactionId?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Completed Payments</h2>
            <p className="text-sm text-muted-foreground">
              {payments.length} payments · ৳{totalPaid.toLocaleString()} collected
            </p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export
        </Button>
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
              <TableHead>Transaction ID</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Vehicle Price</TableHead>
              <TableHead>Platform Fee</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
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
                  No paid payments found
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
                    <TableCell className="font-mono text-sm">
                      {payment.transactionId || `PAY${String(payment.id).padStart(5, '0')}`}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <p>{payment.vehicle?.title || `Vehicle #${payment.vehicleId}`}</p>
                        <p className="text-xs text-muted-foreground">
                          {payment.vehicle?.type?.toUpperCase()} · {payment.vehicle?.brand}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{payment.vehicle?.seller?.name || 'Unknown'}</p>
                        <p className="text-xs text-muted-foreground">
                          {payment.vehicle?.seller?.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      ৳{Number(payment.vehiclePrice || 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ৳{Number(payment.amount).toLocaleString()}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({payment.feePercentage}%)
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {payment.paymentMethod || 'SSLCommerz'}
                      </Badge>
                      {payment.cardType && (
                        <p className="text-xs text-muted-foreground mt-1">{payment.cardType}</p>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{date}</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                        Paid
                      </Badge>
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
