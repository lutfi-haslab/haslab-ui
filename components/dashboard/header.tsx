import React from 'react';
import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Bell, Search, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NotificationList } from "@/components/dashboard/notification-list";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
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
    <header className="border-b bg-card">
      <div className="flex h-16 items-center px-6">
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            {segments.length > 0 && (
              <Breadcrumb className="flex items-center text-sm text-muted-foreground">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  {segments.map((segment, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        <BreadcrumbLink 
                          href={segment.href}
                          className={cn(
                            index === segments.length - 1 ? "font-medium text-foreground" : ""
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
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] lg:w-[280px] pl-8 rounded-full bg-background"
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-destructive text-xs font-medium text-white flex items-center justify-center">
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
            
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}