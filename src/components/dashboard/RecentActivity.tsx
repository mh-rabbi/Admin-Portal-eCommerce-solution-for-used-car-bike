import { CheckCircle, Clock, XCircle, DollarSign, Car } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "approved" | "rejected" | "payment" | "listing" | "pending";
  title: string;
  description: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "approved",
    title: "Vehicle Approved",
    description: "2024 Toyota Camry XLE approved for listing",
    time: "2 min ago",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    description: "$45,000 payment for Ford F-150 Platinum",
    time: "15 min ago",
  },
  {
    id: "3",
    type: "listing",
    title: "New Listing",
    description: "2023 BMW X5 submitted for review",
    time: "32 min ago",
  },
  {
    id: "4",
    type: "rejected",
    title: "Vehicle Rejected",
    description: "2019 Honda Civic - Missing documentation",
    time: "1 hour ago",
  },
  {
    id: "5",
    type: "pending",
    title: "Pending Review",
    description: "3 new vehicles awaiting approval",
    time: "2 hours ago",
  },
];

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "approved":
      return CheckCircle;
    case "rejected":
      return XCircle;
    case "payment":
      return DollarSign;
    case "listing":
      return Car;
    case "pending":
      return Clock;
  }
};

const getActivityColor = (type: Activity["type"]) => {
  switch (type) {
    case "approved":
      return "bg-emerald-500/10 text-emerald-500";
    case "rejected":
      return "bg-destructive/10 text-destructive";
    case "payment":
      return "bg-primary/10 text-primary";
    case "listing":
      return "bg-chart-2/10 text-chart-2";
    case "pending":
      return "bg-amber-500/10 text-amber-500";
  }
};

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest actions and updates</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                  getActivityColor(activity.type)
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {activity.description}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
