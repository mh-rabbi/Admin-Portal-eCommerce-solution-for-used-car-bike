import { useState, useEffect } from "react";
import { Calendar, User, Mail, Shield, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User as UserType, usersService } from "@/services/users.service";
import { useToast } from "@/hooks/use-toast";

interface UserDetailsDialogProps {
  userId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const roleStyles = {
  user: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  admin: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

export function UserDetailsDialog({ userId, open, onOpenChange }: UserDetailsDialogProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (userId && open) {
      loadUserDetails();
    }
  }, [userId, open]);

  const loadUserDetails = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const data = await usersService.getUserById(userId);
      setUser(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load user details",
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            User Details
            {user && (
              <Badge variant="outline" className={roleStyles[user.role]}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : user ? (
          <div className="space-y-6">
            {/* User Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-10 w-10" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">ID: USR{String(user.id).padStart(5, '0')}</p>
              </div>
            </div>

            <Separator />

            {/* User Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Email Address</label>
                  <p className="text-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Role</label>
                  <p className="text-foreground capitalize">{user.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Member Since</label>
                  <p className="text-foreground">{formatDate(user.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">No user data available</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
