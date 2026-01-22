import { useState, useEffect } from "react";
import { Users as UsersIcon, Search, Loader2 } from "lucide-react";
import { UserTable, UserDisplay } from "@/components/users/UserTable";
import { UserDetailsDialog } from "@/components/users/UserDetailsDialog";
import { usersService, User } from "@/services/users.service";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Transform user data for display
function transformUsers(users: User[]): UserDisplay[] {
  return users.map((user) => ({
    id: `USR${String(user.id).padStart(5, '0')}`,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    createdAt: user.createdAt,
    formattedDate: new Date(user.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  }));
}

export default function Users() {
  const [users, setUsers] = useState<UserDisplay[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await usersService.getAllUsers();
      setUsers(transformUsers(data));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewDetails = (userId: number) => {
    setSelectedUserId(userId);
    setIsDetailsDialogOpen(true);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await usersService.deleteUser(userId);
      setUsers((prev) => prev.filter((u) => parseInt(u.id.replace('USR', '')) !== userId));
      toast({
        title: "User Deleted",
        description: "The user has been successfully deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
            <UsersIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Users</h2>
            <p className="text-sm text-muted-foreground">
              {users.length} registered users
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <UserTable
          users={filteredUsers}
          onViewDetails={handleViewDetails}
          onDelete={handleDeleteUser}
        />
      )}

      <UserDetailsDialog
        userId={selectedUserId}
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
      />
    </div>
  );
}
