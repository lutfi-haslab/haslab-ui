"use client";

import { useState } from "react";
import { 
  Users, 
  ArrowUpRight, 
  MousePointerClick, 
  Layers, 
  Globe, 
  ExternalLink,
  MoreHorizontal,
  Download,
  CalendarDays,
  ChevronDown,
  Info,
  Filter
} from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MetricCard } from "@/components/dashboard/metric-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SalesChart } from "@/components/dashboard/charts/sales-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Analytics data
const pageViewData = [
  { page: "/products", views: 12453, prevViews: 10234, bounce: "32%" },
  { page: "/pricing", views: 8532, prevViews: 7652, bounce: "28%" },
  { page: "/blog", views: 6423, prevViews: 5893, bounce: "45%" },
  { page: "/features", views: 5321, prevViews: 4932, bounce: "39%" },
  { page: "/about", views: 4221, prevViews: 3754, bounce: "41%" },
];

const referrerData = [
  { source: "Google", visits: 8543, prevVisits: 7865, conversion: "4.3%" },
  { source: "Direct", visits: 6254, prevVisits: 5432, conversion: "3.7%" },
  { source: "Facebook", visits: 3862, prevVisits: 3254, conversion: "2.8%" },
  { source: "Twitter", visits: 2731, prevVisits: 2156, conversion: "2.1%" },
  { source: "LinkedIn", visits: 1875, prevVisits: 1643, conversion: "3.4%" },
];

const deviceData = [
  { type: "Desktop", percentage: 58, color: "bg-chart-1" },
  { type: "Mobile", percentage: 34, color: "bg-chart-2" },
  { type: "Tablet", percentage: 8, color: "bg-chart-3" },
];

const countryData = [
  { country: "United States", visitors: 8543, percentage: 32.5 },
  { country: "United Kingdom", visitors: 3254, percentage: 12.4 },
  { country: "Germany", visitors: 2876, percentage: 10.9 },
  { country: "France", visitors: 2154, percentage: 8.2 },
  { country: "Canada", visitors: 1876, percentage: 7.1 },
  { country: "Japan", visitors: 1654, percentage: 6.3 },
  { country: "Australia", visitors: 1432, percentage: 5.5 },
  { country: "Other", visitors: 4498, percentage: 17.1 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30d");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p className="text-muted-foreground">
            Detailed insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              Last 30 days
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 px-0">
              <Download className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Button size="sm" className="h-8">
            View Reports
          </Button>
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Analytics Overview</AlertTitle>
        <AlertDescription>
          Showing data for the last 30 days compared to the previous period. All metrics are updated daily at midnight UTC.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Visitors"
          value="28,345"
          icon={<Users className="h-4 w-4" />}
          change={8.2}
          description="vs. previous period"
          trendType="up"
        />
        <MetricCard
          title="Bounce Rate"
          value="42.3%"
          icon={<ArrowUpRight className="h-4 w-4" />}
          change={-2.1}
          description="vs. previous period"
          trendType="up"
        />
        <MetricCard
          title="Page Views"
          value="142,568"
          icon={<Layers className="h-4 w-4" />}
          change={12.5}
          description="vs. previous period"
          trendType="up"
        />
        <MetricCard
          title="Avg. Session"
          value="3m 12s"
          icon={<MousePointerClick className="h-4 w-4" />}
          change={0.8}
          description="vs. previous period"
          trendType="up"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>
                Visitor trends across all channels
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[350px] pt-3">
              <SalesChart />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle>Traffic by Device</CardTitle>
            <CardDescription>
              Device breakdown of total visitors
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-1">
            <div className="space-y-6">
              {deviceData.map((device) => (
                <div key={device.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${device.color}`} />
                      <span className="text-sm font-medium">
                        {device.type}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {device.percentage}%
                    </span>
                  </div>
                  <Progress value={device.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardHeader className="pb-3 pt-6">
            <CardTitle>Traffic by Browser</CardTitle>
            <CardDescription>
              Browser usage among visitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Chrome</span>
                <span className="text-sm text-muted-foreground">64.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Safari</span>
                <span className="text-sm text-muted-foreground">19.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Firefox</span>
                <span className="text-sm text-muted-foreground">8.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Edge</span>
                <span className="text-sm text-muted-foreground">4.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Other</span>
                <span className="text-sm text-muted-foreground">3.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>
                  Most visited pages by views
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">vs. Prev</TableHead>
                  <TableHead className="text-right">Bounce Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageViewData.map((page) => {
                  const changePercent = Math.round(((page.views - page.prevViews) / page.prevViews) * 100);
                  const isPositive = changePercent > 0;
                  
                  return (
                    <TableRow key={page.page}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>{page.page}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{page.views.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className={isPositive ? "text-emerald-500" : "text-rose-500"}>
                          {isPositive ? "+" : ""}{changePercent}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{page.bounce}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 p-3">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <a href="#" className="flex items-center justify-center gap-1">
                View all pages
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>
                  Top referrers by visitor count
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Visits</TableHead>
                  <TableHead className="text-right">vs. Prev</TableHead>
                  <TableHead className="text-right">Conv. Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrerData.map((referrer) => {
                  const changePercent = Math.round(((referrer.visits - referrer.prevVisits) / referrer.prevVisits) * 100);
                  const isPositive = changePercent > 0;
                  
                  return (
                    <TableRow key={referrer.source}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                          <span>{referrer.source}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{referrer.visits.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className={isPositive ? "text-emerald-500" : "text-rose-500"}>
                          {isPositive ? "+" : ""}{changePercent}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{referrer.conversion}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 p-3">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <a href="#" className="flex items-center justify-center gap-1">
                View all sources
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Geographic Insights</CardTitle>
          <CardDescription>
            Visitor distribution by country
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>Visitors</TableHead>
                <TableHead>% of Total</TableHead>
                <TableHead>Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {countryData.map((country, index) => {
                // Simulate some random changes
                const changes = [5.2, -2.1, 7.8, 3.4, -1.6, 8.3, 2.1, 0.3];
                const change = changes[index];
                const isPositive = change > 0;
                
                return (
                  <TableRow key={country.country}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {country.country}
                        {index === 0 && (
                          <Badge variant="outline" className="ml-2">
                            Top
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{country.visitors.toLocaleString()}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="cursor-default">
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={country.percentage} 
                                className="h-2 w-[100px]"
                              />
                              <span>{country.percentage.toFixed(1)}%</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{country.percentage.toFixed(1)}% of total visitors</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <span className={isPositive ? "text-emerald-500" : "text-rose-500"}>
                        {isPositive ? "+" : ""}{change}%
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}