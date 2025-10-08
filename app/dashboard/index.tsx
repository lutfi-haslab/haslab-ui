import { useState } from "react";
import {
  DollarSign,
  Users,
  ShoppingCart,
  CreditCard,
  ClipboardList,
  Package,
  BarChart3,
  PieChart,
  ArrowUpRight,
  SlidersHorizontal,
  CalendarIcon,
  ChevronDown
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RecentSalesCard } from "@/components/dashboard/recent-sales-card";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SalesChart } from "@/components/dashboard/charts/sales-chart";
import { RevenueChart } from "@/components/dashboard/charts/revenue-chart";
import { ProductSalesChart } from "@/components/dashboard/charts/product-sales-chart";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/dashboard/')({ 
component: DashboardPage, 
}) 

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-semibold text-foreground">Welcome back, John</h2>
          <p className="text-sm text-muted-foreground">
            Here's an overview of your business performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start gap-2 text-left font-normal"
              >
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="hover:bg-muted/60">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Dashboard Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Show all metrics</DropdownMenuItem>
              <DropdownMenuItem>Hide less important</DropdownMenuItem>
              <DropdownMenuItem>Customize layout</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Export data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(38452)}
          icon={<DollarSign className="h-4 w-4" />}
          change={12.5}
          description="vs. last period"
          trendType="up"
        />
        <MetricCard
          title="Active Users"
          value={formatNumber(2784)}
          icon={<Users className="h-4 w-4" />}
          change={5.2}
          description="vs. last period"
          trendType="up"
        />
        <MetricCard
          title="New Orders"
          value={formatNumber(324)}
          icon={<ShoppingCart className="h-4 w-4" />}
          change={-2.5}
          description="vs. last period"
          trendType="down"
        />
        <MetricCard
          title="Conversion Rate"
          value="3.2%"
          icon={<ArrowUpRight className="h-4 w-4" />}
          change={0.8}
          description="vs. last period"
          trendType="up"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-5 hover:-translate-y-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Revenue trends across different time periods
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select 
                defaultValue={selectedTimeframe}
                onValueChange={setSelectedTimeframe}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last quarter</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="hover:bg-muted/60">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Skeleton className="h-[300px] w-full" />
              </div>
            ) : (
              <SalesChart />
            )}
          </CardContent>
        </Card>

        <div className="lg:col-span-2 grid gap-4">
          <Card className="hover:-translate-y-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Product Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[190px] w-full" />
              ) : (
                <ProductSalesChart />
              )}
            </CardContent>
          </Card>
          <Card className="hover:-translate-y-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Order Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">
                  Completed
                </span>
                <span className="text-xl font-bold">592</span>
                <span className="flex items-center text-xs text-success">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +6.8%
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">
                  Pending
                </span>
                <span className="text-xl font-bold">86</span>
                <span className="flex items-center text-xs text-destructive">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +2.5%
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">
                  Failed
                </span>
                <span className="text-xl font-bold">14</span>
                <span className="flex items-center text-xs text-success">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  -3.2%
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">
                  Canceled
                </span>
                <span className="text-xl font-bold">23</span>
                <span className="text-xs text-muted-foreground flex items-center">
                  0%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <TabsList className="bg-muted/40">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hover:bg-muted/60">
              Export
            </Button>
            <Button size="sm" className="gap-1">
              View All
            </Button>
          </div>
        </div>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,324</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sales
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(54232)}</div>
                <p className="text-xs text-muted-foreground">
                  +5.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Products
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">432</div>
                <p className="text-xs text-muted-foreground">
                  +8 added this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Reports
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">
                  2 pending approvals
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            <Card className="lg:col-span-7">
              <CardHeader>
                <CardTitle>Revenue Report</CardTitle>
                <CardDescription>
                  Monthly revenue breakdown with year-over-year comparison
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <RevenueChart />
              </CardContent>
            </Card>
            <RecentSalesCard className="lg:col-span-5" />
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="h-[300px] flex items-center justify-center text-muted-foreground">
          Analytics content coming soon...
        </TabsContent>
        
        <TabsContent value="reports" className="h-[300px] flex items-center justify-center text-muted-foreground">
          Reports content coming soon...
        </TabsContent>
        
        <TabsContent value="notifications" className="h-[300px] flex items-center justify-center text-muted-foreground">
          Notifications content coming soon...
        </TabsContent>
      </Tabs>
    </div>
  );
}