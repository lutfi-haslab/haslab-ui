"use client";

import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from "recharts";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const generateData = (days: number, trend: "up" | "down" | "stable" = "up", volatility = 0.2) => {
  const data = [];
  let value = 5000 + Math.random() * 3000;
  
  for (let i = 0; i < days; i++) {
    if (trend === "up") {
      value = value * (1 + (Math.random() * volatility / 10));
    } else if (trend === "down") {
      value = value * (1 - (Math.random() * volatility / 10));
    } else {
      value = value * (1 + (Math.random() * volatility / 5) - volatility / 10);
    }

    // Add some weekly patterns for realism
    if (i % 7 === 5 || i % 7 === 6) { // Weekends
      value = value * 0.85;
    }
    
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Math.round(value),
      profits: Math.round(value * 0.3),
      customers: Math.round(value / 50),
    });
  }
  
  return data;
};

const data30Days = generateData(30, "up", 0.3);
const data7Days = data30Days.slice(-7);
const data90Days = [
  ...generateData(60, "down", 0.25), 
  ...data30Days
];
const data1Year = [
  ...generateData(275, "stable", 0.4),
  ...data90Days
];

export function SalesChart() {
  const [activeData, setActiveData] = useState("30d");
  
  const getDataByTimeframe = () => {
    switch (activeData) {
      case "7d": return data7Days;
      case "30d": return data30Days;
      case "90d": return data90Days;
      case "1y": return data1Year;
      default: return data30Days;
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 pt-3">
        <Tabs 
          defaultValue="revenue" 
          className="w-full"
          onValueChange={() => {}}
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="profits">Profits</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>
            <TabsList>
              <TabsTrigger 
                value="7d" 
                onClick={() => setActiveData("7d")}
                data-state={activeData === "7d" ? "active" : "inactive"}
              >
                7D
              </TabsTrigger>
              <TabsTrigger 
                value="30d" 
                onClick={() => setActiveData("30d")}
                data-state={activeData === "30d" ? "active" : "inactive"}
              >
                30D
              </TabsTrigger>
              <TabsTrigger 
                value="90d" 
                onClick={() => setActiveData("90d")}
                data-state={activeData === "90d" ? "active" : "inactive"}
              >
                90D
              </TabsTrigger>
              <TabsTrigger 
                value="1y" 
                onClick={() => setActiveData("1y")}
                data-state={activeData === "1y" ? "active" : "inactive"}
              >
                1Y
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="revenue" className="mt-0">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={getDataByTimeframe()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => {
                    if (activeData === "1y") {
                      // For yearly data, show only first of each month
                      return value.includes("1") ? value : "";
                    }
                    if (activeData === "90d") {
                      // For 90 days data, show every ~15 days
                      return value.includes("1") || value.includes("15") ? value : "";
                    }
                    return value;
                  }}
                  style={{ 
                    fontSize: '12px',
                    fill: 'hsl(var(--muted-foreground))'
                  }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => {
                    if (value >= 1000) {
                      return `$${value / 1000}K`;
                    }
                    return `$${value}`;
                  }}
                  style={{ 
                    fontSize: '12px',
                    fill: 'hsl(var(--muted-foreground))'
                  }}
                />
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="hsl(var(--border))" 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="profits" className="mt-0">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={getDataByTimeframe()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProfits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  style={{ 
                    fontSize: '12px',
                    fill: 'hsl(var(--muted-foreground))'
                  }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => {
                    if (value >= 1000) {
                      return `$${value / 1000}K`;
                    }
                    return `$${value}`;
                  }}
                  style={{ 
                    fontSize: '12px',
                    fill: 'hsl(var(--muted-foreground))'
                  }}
                />
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="hsl(var(--border))" 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Profits']}
                />
                <Area 
                  type="monotone" 
                  dataKey="profits" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorProfits)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="customers" className="mt-0">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={getDataByTimeframe()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  style={{ 
                    fontSize: '12px',
                    fill: 'hsl(var(--muted-foreground))'
                  }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tickMargin={10}
                  style={{ 
                    fontSize: '12px',
                    fill: 'hsl(var(--muted-foreground))'
                  }}
                />
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="hsl(var(--border))" 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }}
                  formatter={(value) => [value.toLocaleString(), 'Customers']}
                />
                <Area 
                  type="monotone" 
                  dataKey="customers" 
                  stroke="hsl(var(--chart-4))" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCustomers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}