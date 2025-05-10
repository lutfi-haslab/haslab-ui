"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
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
        "flex flex-col border-r bg-card h-screen transition-all duration-300 relative",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      <div className="flex h-14 items-center px-4 border-b">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center w-full" : "justify-start"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="font-bold text-primary-foreground">D</span>
          </div>
          {!isCollapsed && (
            <span className="ml-2 font-bold text-xl">Haslab UI</span>
          )}
        </Link>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-16 h-8 w-8 rounded-full border bg-background shadow-md"
        onClick={onToggle}
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform",
            isCollapsed ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>

      <ScrollArea className="flex-1 py-4">
        <div className="space-y-6 px-3">
          <div className="space-y-2">
            <div
              className={cn(
                "text-xs font-semibold text-muted-foreground",
                isCollapsed ? "sr-only" : "px-2"
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
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                          pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground",
                          isCollapsed ? "justify-center" : "justify-start"
                        )}
                      >
                        {item.icon}
                        {!isCollapsed && <span className="ml-2">{item.title}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        {item.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                ))}
              </nav>
            </TooltipProvider>
          </div>

          <Separator />

          <div className="space-y-2">
            <div
              className={cn(
                "text-xs font-semibold text-muted-foreground",
                isCollapsed ? "sr-only" : "px-2"
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
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                          pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground",
                          isCollapsed ? "justify-center" : "justify-start"
                        )}
                      >
                        {item.icon}
                        {!isCollapsed && <span className="ml-2">{item.title}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
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

      <div className={cn("border-t p-4", isCollapsed ? "flex justify-center" : "")}>
        <TooltipProvider delayDuration={0}>
          <div className={cn(
            "flex items-center",
            isCollapsed ? "flex-col space-y-2" : "space-x-3"
          )}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              {isCollapsed && <TooltipContent side="right">John Doe</TooltipContent>}
            </Tooltip>
            
            {!isCollapsed && (
              <div className="flex flex-col space-y-0.5">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">
                  admin@example.com
                </span>
              </div>
            )}
            
            <div className={cn(
              "flex", 
              isCollapsed ? "flex-col space-y-2" : "ml-auto space-x-1"
            )}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ModeToggle variant={isCollapsed ? "ghost" : "ghost"} />
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Toggle theme</TooltipContent>}
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/auth/sign-in">
                      <LogOut className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Log out</TooltipContent>}
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}