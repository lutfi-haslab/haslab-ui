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
    if (trendType === "up") return "text-success";
    if (trendType === "down") return "text-destructive";
    return "text-muted-foreground";
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "muted":
        return "bg-muted/60";
      case "accent":
        return "bg-gradient-to-br from-primary/12 via-primary/8 to-secondary/12";
      default:
        return "";
    }
  };

  return (
    <Card className={cn("transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-md", getVariantStyles())}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/60 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold text-foreground">{value}</div>
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
              <span className="ml-2 text-xs text-muted-foreground/80">
                {description}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}