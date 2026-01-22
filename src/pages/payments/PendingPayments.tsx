// import { useState, useEffect } from "react";
// import { Clock, Search, CheckCircle, Loader2, AlertCircle } from "lucide-react";
// import { paymentsService, Payment } from "@/services/payments.service";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";

// export default function PendingPayments() {
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [search, setSearch] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     loadPayments();
//   }, []);

//   const loadPayments = async () => {
//     try {
//       setIsLoading(true);
//       const data = await paymentsService.getPendingPayments();
//       setPayments(data);
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to load pending payments",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredPayments = payments.filter(
//     (p) =>
//       p.vehicle?.title?.toLowerCase().includes(search.toLowerCase()) ||
//       p.vehicle?.seller?.name?.toLowerCase().includes(search.toLowerCase()) ||
//       p.vehicle?.seller?.email?.toLowerCase().includes(search.toLowerCase()) ||
//       p.transactionId?.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleMarkPaid = async (id: number) => {
//     try {
//       await paymentsService.confirmPayment(id);
//       setPayments((prev) => prev.filter((p) => p.id !== id));
//       toast({
//         title: "Payment Confirmed",
//         description: "The payment has been marked as paid.",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to confirm payment",
//         variant: "destructive",
//       });
//     }
//   };

//   const totalPending = payments.reduce((sum, p) => sum + Number(p.amount), 0);
//   const pendingCount = payments.filter(p => p.status === 'pending').length;
//   const failedCount = payments.filter(p => p.status === 'failed').length;

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return <Badge variant="outline" className="bg-amber-500/10 text-amber-500">Pending</Badge>;
//       case 'failed':
//         return <Badge variant="outline" className="bg-red-500/10 text-red-500">Failed</Badge>;
//       default:
//         return <Badge variant="outline">{status}</Badge>;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
//             <Clock className="h-5 w-5" />
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold text-foreground">Pending Payments</h2>
//             <p className="text-sm text-muted-foreground">
//               {pendingCount} pending · {failedCount} failed · ৳{totalPending.toLocaleString()} total
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="relative max-w-sm">
//         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//         <Input
//           placeholder="Search payments..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="pl-9"
//         />
//       </div>

//       <div className="rounded-xl border border-border bg-card animate-fade-in-up">
//         <Table>
//           <TableHeader>
//             <TableRow className="hover:bg-transparent">
//               <TableHead>Transaction ID</TableHead>
//               <TableHead>Vehicle</TableHead>
//               <TableHead>Seller</TableHead>
//               <TableHead>Vehicle Price</TableHead>
//               <TableHead>Platform Fee</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead className="text-right">Action</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {isLoading ? (
//               <TableRow>
//                 <TableCell colSpan={8} className="text-center py-12">
//                   <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
//                 </TableCell>
//               </TableRow>
//             ) : filteredPayments.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
//                   No pending payments found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredPayments.map((payment, index) => {
//                 const date = new Date(payment.createdAt).toLocaleDateString('en-US', {
//                   month: 'short',
//                   day: 'numeric',
//                   year: 'numeric',
//                 });
//                 return (
//                   <TableRow
//                     key={payment.id}
//                     className="animate-fade-in"
//                     style={{ animationDelay: `${index * 50}ms` }}
//                   >
//                     <TableCell className="font-mono text-sm">
//                       {payment.transactionId || `PAY${String(payment.id).padStart(5, '0')}`}
//                     </TableCell>
//                     <TableCell className="font-medium">
//                       <div>
//                         <p>{payment.vehicle?.title || `Vehicle #${payment.vehicleId}`}</p>
//                         <p className="text-xs text-muted-foreground">
//                           {payment.vehicle?.type?.toUpperCase()} · {payment.vehicle?.brand}
//                         </p>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div>
//                         <p>{payment.vehicle?.seller?.name || 'Unknown'}</p>
//                         <p className="text-xs text-muted-foreground">
//                           {payment.vehicle?.seller?.email}
//                         </p>
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-muted-foreground">
//                       ৳{Number(payment.vehiclePrice || 0).toLocaleString()}
//                     </TableCell>
//                     <TableCell className="font-semibold">
//                       ৳{Number(payment.amount).toLocaleString()}
//                       <span className="text-xs text-muted-foreground ml-1">
//                         ({payment.feePercentage}%)
//                       </span>
//                     </TableCell>
//                     <TableCell>{getStatusBadge(payment.status)}</TableCell>
//                     <TableCell className="text-muted-foreground">{date}</TableCell>
//                     <TableCell className="text-right">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         className="gap-2 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500"
//                         onClick={() => handleMarkPaid(payment.id)}
//                       >
//                         <CheckCircle className="h-4 w-4" /> Mark Paid
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
