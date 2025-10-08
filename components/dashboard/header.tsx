import React from 'react';
import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Bell, Search, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NotificationList } from "@/components/dashboard/notification-list";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  className?: string;
}

export function Header({ title, className }: HeaderProps) {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const [notificationCount, setNotificationCount] = useState(3);
  
  // Extract breadcrumb segments from pathname
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => ({
      title: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: `/${segment}`
    }));

  // If there are more than one segment, update the paths to be cumulative
  if (segments.length > 1) {
    for (let i = 1; i < segments.length; i++) {
      segments[i].href = segments[i-1].href + "/" + segments[i].href.split("/").pop();
    }
  }

  return (
    <header
      className={cn(
        "border-b border-border/50 bg-background/70 backdrop-blur-xl",
        className
      )}
    >
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground sm:text-xl">
              {title}
            </h1>
            {segments.length > 0 && (
              <Breadcrumb className="mt-1 flex items-center text-xs uppercase tracking-[0.28em] text-muted-foreground">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/dashboard"
                      className="transition-colors hover:text-foreground"
                    >
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  {segments.map((segment, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        <BreadcrumbLink 
                          href={segment.href}
                          className={cn(
                            "transition-colors hover:text-foreground",
                            index === segments.length - 1
                              ? "font-semibold text-foreground"
                              : ""
                          )}
                        >
                          {segment.title}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < segments.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] rounded-full pl-9 shadow-none transition-all focus-visible:ring-ring/40 lg:w-[280px]"
              />
            </div>

            <ThemeToggle />

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-muted/50 hover:text-foreground"
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-destructive via-destructive/85 to-warning text-xs font-bold text-destructive-foreground shadow-glow-sm animate-pulse">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <NotificationList 
                  onNotificationRead={() => setNotificationCount(prev => Math.max(0, prev - 1))}
                />
              </SheetContent>
            </Sheet>
            
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted/50 hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}