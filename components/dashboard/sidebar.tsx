import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  BarChart2, 
  Users, 
  Settings, 
  Mail, 
  Bell, 
  FileText, 
  CreditCard,
  ChevronLeft,
  Boxes,
  LogOut,
  Table,
  Component
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/mode-toggle";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart2 className="h-5 w-5" />,
  },
  {
    title: "Tables",
    href: "/dashboard/tables",
    icon: <Table className="h-5 w-5" />,
  },
  {
    title: "Examples",
    href: "/dashboard/examples",
    icon: <Component className="h-5 w-5" />,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: <Boxes className="h-5 w-5" />,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: <Mail className="h-5 w-5" />,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: <FileText className="h-5 w-5" />,
  }
];

const secondaryNavItems: NavItem[] = [
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export function Sidebar({ isCollapsed, onToggle, className }: SidebarProps) {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex h-screen flex-col border-r border-border/50 bg-card/90 text-muted-foreground shadow-glow-lg backdrop-blur-xl transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-16 items-center border-b border-border/40 px-3">
        <Link
          to="/dashboard"
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center w-full" : "justify-start"
          )}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/85 to-secondary text-sm font-semibold text-primary-foreground shadow-glow-sm">
            H
          </div>
          {!isCollapsed && (
            <span className="ml-3 text-sm font-semibold text-foreground">
              Haslab UI
            </span>
          )}
        </Link>
      </div>

      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 hidden h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground shadow-glow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-md md:flex"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isCollapsed ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      <ScrollArea className="flex-1 py-4">
        <div className="space-y-6 px-2">
          <div className="space-y-2">
            <div
              className={cn(
                "text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground/70",
                isCollapsed ? "sr-only" : "px-3"
              )}
            >
              Main
            </div>
            <TooltipProvider delayDuration={0}>
              <nav className="grid gap-1">
                {mainNavItems.map((item, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
                          pathname === item.href
                            ? "bg-primary/15 text-foreground shadow-glow-sm"
                            : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                          isCollapsed ? "justify-center" : "justify-start gap-3"
                        )}
                      >
                        {item.icon}
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent
                        side="right"
                        className="border border-border/60 bg-card/95 px-3 py-1 text-xs font-medium text-foreground shadow-glow-sm"
                      >
                        {item.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                ))}
              </nav>
            </TooltipProvider>
          </div>

          <Separator className="bg-border/40" />

          <div className="space-y-2">
            <div
              className={cn(
                "text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground/70",
                isCollapsed ? "sr-only" : "px-3"
              )}
            >
              System
            </div>
            <TooltipProvider delayDuration={0}>
              <nav className="grid gap-1">
                {secondaryNavItems.map((item, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
                          pathname === item.href
                            ? "bg-primary/15 text-foreground shadow-glow-sm"
                            : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                          isCollapsed ? "justify-center" : "justify-start gap-3"
                        )}
                      >
                        {item.icon}
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent
                        side="right"
                        className="border border-border/60 bg-card/95 px-3 py-1 text-xs font-medium text-foreground shadow-glow-sm"
                      >
                        {item.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                ))}
              </nav>
            </TooltipProvider>
          </div>
        </div>
      </ScrollArea>

      <div
        className={cn(
          "border-t border-border/40 bg-card/90 px-3 py-4",
          isCollapsed ? "flex justify-center" : ""
        )}
      >
        <TooltipProvider delayDuration={0}>
          <div
            className={cn(
              "flex items-center",
              isCollapsed ? "flex-col space-y-2" : "gap-3"
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-10 w-10 border border-border/40 shadow-glow-sm">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                  <AvatarFallback className="bg-muted text-foreground font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent
                  side="right"
                  className="border border-border/60 bg-card/95 px-3 py-1 text-xs font-medium text-foreground shadow-glow-sm"
                >
                  John Doe
                </TooltipContent>
              )}
            </Tooltip>
            
            {!isCollapsed && (
              <div className="flex flex-1 flex-col space-y-0.5">
                <span className="text-sm font-semibold text-foreground">John Doe</span>
                <span className="text-xs text-muted-foreground">
                  admin@example.com
                </span>
              </div>
            )}
            
            <div className={cn(
              "flex",
              isCollapsed ? "flex-col space-y-2" : "gap-2"
            )}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="[&_button]:text-muted-foreground [&_button]:hover:bg-muted/50 [&_button]:hover:text-foreground">
                    <ModeToggle variant="ghost" />
                  </div>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent
                    side="right"
                    className="border border-border/60 bg-card/95 px-3 py-1 text-xs font-medium text-foreground shadow-glow-sm"
                  >
                    Toggle theme
                  </TooltipContent>
                )}
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    asChild
                  >
                    <Link to="/auth/sign-in">
                      <LogOut className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent
                    side="right"
                    className="border border-border/60 bg-card/95 px-3 py-1 text-xs font-medium text-foreground shadow-glow-sm"
                  >
                    Log out
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}