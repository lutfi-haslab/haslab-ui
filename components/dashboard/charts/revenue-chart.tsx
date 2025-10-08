import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Legend
} from "recharts";

const data = [
  { month: "Jan", "This Year": 4000, "Last Year": 2400 },
  { month: "Feb", "This Year": 5000, "Last Year": 3398 },
  { month: "Mar", "This Year": 8780, "Last Year": 5800 },
  { month: "Apr", "This Year": 7890, "Last Year": 6908 },
  { month: "May", "This Year": 9000, "Last Year": 8800 },
  { month: "Jun", "This Year": 8108, "Last Year": 7800 },
  { month: "Jul", "This Year": 11000, "Last Year": 9300 },
  { month: "Aug", "This Year": 12780, "Last Year": 10908 },
  { month: "Sep", "This Year": 10890, "Last Year": 9800 },
  { month: "Oct", "This Year": 9880, "Last Year": 8308 },
  { month: "Nov", "This Year": 13000, "Last Year": 11000 },
  { month: "Dec", "This Year": 15500, "Last Year": 13100 },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
        <XAxis 
          dataKey="month" 
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          style={{ 
            fontSize: '12px',
            fill: 'var(--color-muted-foreground)'
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
            fill: 'var(--color-muted-foreground)'
          }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'var(--color-card)',
            borderColor: 'var(--color-border)',
            borderRadius: '0.5rem',
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.18)',
            color: 'var(--color-foreground)',
          }}
          formatter={(value) => [`$${value.toLocaleString()}`, '']}
        />
        <Legend 
          verticalAlign="top" 
          height={36} 
          iconType="circle" 
          iconSize={8}
          formatter={(value) => (
            <span style={{ fontSize: '12px', color: 'var(--color-foreground)' }}>
              {value}
            </span>
          )}
        />
        <Bar 
          dataKey="This Year" 
          fill="var(--color-primary)" 
          radius={[4, 4, 0, 0]} 
          barSize={20}
        />
        <Bar 
          dataKey="Last Year" 
          fill="var(--color-accent)" 
          radius={[4, 4, 0, 0]} 
          barSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}