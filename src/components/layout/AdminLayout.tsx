import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  BarChart3,
  MessageSquare,
  LogOut,
  Menu,
  ChevronDown,
  Wallet,
  ShoppingBag,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AiChatPanel } from "@/components/chat/AiChatPanel";
import BdtIcon from "../icons/BdtIcon";

interface NavItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { title: string; href: string; icon: React.ComponentType<{ className?: string }> }[];
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    title: "Vehicles",
    icon: Car,
    children: [
      { title: "Pending", href: "/vehicles/pending", icon: Clock },
      { title: "Approved", href: "/vehicles/approved", icon: CheckCircle },
      { title: "Rejected", href: "/vehicles/rejected", icon: XCircle },
      { title: "Sold", href: "/vehicles/sold", icon: ShoppingBag },
    ],
  },
  {
    title: "Payments",
    icon: BdtIcon,
    children: [
      { title: "Pending", href: "/payments/pending", icon: Clock },
      { title: "Paid", href: "/payments/paid", icon: Wallet },
    ],
  },
  { title: "Users", href: "/users", icon: Users },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (children?: { href: string }[]) =>
    children?.some((child) => location.pathname.startsWith(child.href));

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            {sidebarOpen && (
              <span className="font-semibold text-foreground animate-fade-in">
                Admin Panel
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-8 w-8"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <Collapsible defaultOpen={isParentActive(item.children)}>
                  <CollapsibleTrigger asChild>
                    <button
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent",
                        isParentActive(item.children)
                          ? "bg-accent text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {sidebarOpen && (
                        <>
                          <span className="flex-1 text-left">{item.title}</span>
                          <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
                        </>
                      )}
                    </button>
                  </CollapsibleTrigger>
                  {sidebarOpen && (
                    <CollapsibleContent className="animate-accordion-down">
                      <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-border pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:bg-accent",
                              isActive(child.href)
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground"
                            )}
                          >
                            <child.icon className="h-4 w-4" />
                            <span>{child.title}</span>
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              ) : (
                <Link
                  to={item.href!}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent",
                    isActive(item.href!)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {sidebarOpen && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-2">
          <button
            onClick={() => {
              const { authService } = require('@/services/auth.service');
              authService.logout();
              window.location.href = '/login';
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-sm">
          <h1 className="text-lg font-semibold text-foreground">
            {navItems.find((item) =>
              item.href
                ? isActive(item.href)
                : item.children?.some((c) => location.pathname.startsWith(c.href))
            )?.title || "Dashboard"}
          </h1>
          <Button
            onClick={() => setChatOpen(true)}
            className="gap-2 animate-pulse-glow"
          >
            <MessageSquare className="h-4 w-4" />
            AI Assistant
          </Button>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* AI Chat Panel */}
      <AiChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
