import { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change?: number;
  description?: string;
  trendType?: "up" | "down" | "neutral";
  variant?: "default" | "muted" | "accent";
}

export function MetricCard({
  title,
  value,
  icon,
  change,
  description,
  trendType = "neutral",
  variant = "default",
}: MetricCardProps) {
  const getTrendColor = () => {
    if (trendType === "up") return "text-emerald-500";
    if (trendType === "down") return "text-rose-500";
    return "text-gray-500";
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "muted":
        return "bg-muted";
      case "accent":
        return "bg-accent";
      default:
        return "bg-card";
    }
  };

  return (
    <Card className={cn("transition-all hover:shadow-md", getVariantStyles())}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(change !== undefined || description) && (
          <div className="flex items-center pt-1">
            {change !== undefined && (
              <div className="flex items-center">
                {trendType === "up" ? (
                  <ArrowUp className={cn("mr-1 h-3 w-3", getTrendColor())} />
                ) : trendType === "down" ? (
                  <ArrowDown className={cn("mr-1 h-3 w-3", getTrendColor())} />
                ) : null}
                <span className={cn("text-xs font-medium", getTrendColor())}>
                  {change > 0 ? "+" : ""}
                  {change.toFixed(1)}%
                </span>
              </div>
            )}
            {description && (
              <span className="text-xs text-muted-foreground ml-1">
                {description}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}