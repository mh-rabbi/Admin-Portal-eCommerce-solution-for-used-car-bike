import { useState, useEffect, useCallback } from "react";
import { Calendar, User, Mail, Shield, Loader2, Phone, MapPin } from "lucide-react";
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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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

  const loadUserDetails = useCallback(async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const data = await usersService.getUserById(userId);
      setUser(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to load user details";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  }, [userId, onOpenChange, toast]);

  useEffect(() => {
    if (userId && open) {
      loadUserDetails();
    }
  }, [userId, open, loadUserDetails]);

  const getProfileImageUrl = (imagePath?: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;

    // Ensure path starts with a single slash and doesn't have double slashes with API_BASE_URL
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

    return `${baseUrl}${cleanPath}`;
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

  const getFullAddress = (user: UserType) => {
    const parts = [user.streetNo, user.address, user.postalCode].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'Not provided';
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
              <div className="relative group">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary border-4 border-background shadow-xl overflow-hidden">
                  {user.profileImage ? (
                    <img
                      src={getProfileImageUrl(user.profileImage)!}
                      alt={user.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=random';
                      }}
                    />
                  ) : (
                    <User className="h-12 w-12" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 border-2 border-background" title="Active"></div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold tracking-tight">{user.name}</h3>
                <p className="text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full mt-1">
                  USR{String(user.id).padStart(5, '0')}
                </p>
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

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                <Shield className="h-5 w-5 text-purple-500" />
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</label>
                  <p className="text-sm font-medium text-foreground capitalize">{user.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                <Phone className="h-5 w-5 text-blue-500" />
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                  <p className="text-sm font-medium text-foreground">{user.phone || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                <MapPin className="h-5 w-5 text-emerald-500" />
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Address</label>
                  <p className="text-sm font-medium text-foreground leading-relaxed">{getFullAddress(user)}</p>
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
