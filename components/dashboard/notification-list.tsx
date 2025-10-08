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
        return "bg-info/15 text-info";
      case "warning":
        return "bg-warning/15 text-warning";
      case "success":
        return "bg-success/15 text-success";
      case "error":
        return "bg-destructive/15 text-destructive";
      default:
        return "bg-info/15 text-info";
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-2 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Stay in the loop</p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="default" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <Separator className="bg-border/40" />

      <div className="flex-1 overflow-auto py-3">
        {notifications.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <Bell className="mb-2 h-10 w-10 text-muted-foreground" />
            <h3 className="text-base font-semibold text-foreground">No notifications</h3>
            <p className="text-sm text-muted-foreground">
              You don't have any notifications at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-2 px-1">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={cn(
                  "flex items-start gap-4 rounded-2xl border border-border/40 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-sm",
                  notification.read 
                    ? "bg-card/90" 
                    : "bg-primary/10 shadow-glow-sm"
                )}
              >
                <div className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
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
                        className="h-6 w-6 text-muted-foreground hover:text-foreground" 
                        onClick={() => markAsRead(notification.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/80">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Separator className="bg-border/40" />
      
      <div className="p-4">
        <Button variant="outline" className="w-full" asChild>
          <a href="/dashboard/notifications">View all notifications</a>
        </Button>
      </div>
    </div>
  );
}