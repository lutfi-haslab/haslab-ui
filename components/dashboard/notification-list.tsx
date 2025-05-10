"use client";

import { useState } from "react";
import { Bell, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New Order Received",
    description: "You have received a new order (#ORD-12345)",
    time: "2 minutes ago",
    read: false,
    type: "info"
  },
  {
    id: "2",
    title: "Payment Successful",
    description: "Payment for order #ORD-12342 was successful",
    time: "2 hours ago",
    read: false,
    type: "success"
  },
  {
    id: "3",
    title: "Storage Warning",
    description: "Your storage usage is at 85% capacity",
    time: "1 day ago",
    read: false,
    type: "warning"
  },
  {
    id: "4",
    title: "System Update",
    description: "System update completed successfully",
    time: "2 days ago",
    read: true,
    type: "info"
  },
  {
    id: "5",
    title: "New Feature Available",
    description: "Check out the new analytics dashboard",
    time: "1 week ago",
    read: true,
    type: "info"
  }
];

interface NotificationListProps {
  onNotificationRead?: () => void;
}

export function NotificationList({ onNotificationRead }: NotificationListProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
    
    if (onNotificationRead) {
      onNotificationRead();
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    // Calculate unread count for callback
    const unreadCount = notifications.filter(n => !n.read).length;
    
    // Call onNotificationRead for each unread notification
    for (let i = 0; i < unreadCount; i++) {
      if (onNotificationRead) {
        onNotificationRead();
      }
    }
  };

  const getTypeStyles = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "bg-primary/10 text-primary";
      case "warning":
        return "bg-warning/10 text-warning";
      case "success":
        return "bg-success/10 text-success";
      case "error":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="h-full flex flex-col">
      <div className="px-1 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>
      
      <Separator />
      
      <div className="flex-1 overflow-auto py-2">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Bell className="h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="font-medium">No notifications</h3>
            <p className="text-sm text-muted-foreground">
              You don't have any notifications at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={cn(
                  "p-4 flex items-start gap-4 transition-colors",
                  notification.read ? "bg-background" : "bg-muted/50"
                )}
              >
                <div className={cn(
                  "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
                  getTypeStyles(notification.type)
                )}>
                  <Bell className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm">
                      {notification.title}
                    </h4>
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={() => markAsRead(notification.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Separator />
      
      <div className="p-4">
        <Button variant="outline" className="w-full" asChild>
          <a href="/dashboard/notifications">View all notifications</a>
        </Button>
      </div>
    </div>
  );
}