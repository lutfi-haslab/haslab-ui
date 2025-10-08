import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";

interface RecentSale {
  id: string;
  name: string;
  email: string;
  amount: number;
  date: Date;
  status: "completed" | "pending" | "failed" | "refunded";
  avatarSrc?: string;
  avatarFallback: string;
}

const recentSales: RecentSale[] = [
  {
    id: "INV-001",
    name: "Emma Wilson",
    email: "emma@example.com",
    amount: 249.99,
    date: new Date(2023, 5, 2),
    status: "completed",
    avatarSrc: "",
    avatarFallback: "EW",
  },
  {
    id: "INV-002",
    name: "Jackson Lee",
    email: "jackson@example.com",
    amount: 349.99,
    date: new Date(2023, 5, 1),
    status: "completed",
    avatarSrc: "",
    avatarFallback: "JL",
  },
  {
    id: "INV-003",
    name: "Olivia Martinez",
    email: "olivia@example.com",
    amount: 549.99,
    date: new Date(2023, 4, 28),
    status: "pending",
    avatarSrc: "",
    avatarFallback: "OM",
  },
  {
    id: "INV-004",
    name: "Ethan Johnson",
    email: "ethan@example.com",
    amount: 149.99,
    date: new Date(2023, 4, 25),
    status: "completed",
    avatarSrc: "",
    avatarFallback: "EJ",
  },
  {
    id: "INV-005",
    name: "Sophia Brown",
    email: "sophia@example.com",
    amount: 189.99,
    date: new Date(2023, 4, 22),
    status: "refunded",
    avatarSrc: "",
    avatarFallback: "SB",
  },
];

interface RecentSalesCardProps {
  className?: string;
}

export function RecentSalesCard({ className }: RecentSalesCardProps) {
  const getStatusStyles = (status: RecentSale["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400";
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400";
      case "failed":
        return "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400";
      case "refunded":
        return "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400";
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            Latest transactions from your customers
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentSales.map((sale) => (
            <div key={sale.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={sale.avatarSrc} alt={sale.name} />
                  <AvatarFallback>{sale.avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{sale.name}</p>
                  <p className="text-xs text-muted-foreground">{sale.email}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-medium">
                  {formatCurrency(sale.amount)}
                </p>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={cn("px-2 py-0.5 text-xs font-medium", getStatusStyles(sale.status))}
                  >
                    {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(sale.date, "MMM d")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}