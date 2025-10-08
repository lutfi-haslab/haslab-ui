import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Food", value: 20 },
  { name: "Books", value: 10 },
  { name: "Other", value: 10 },
];

export function ProductSalesChart() {
  return (
    <ResponsiveContainer width="100%" height={190}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={35}
          outerRadius={60}
          paddingAngle={1}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={`hsl(var(--chart-${(index % 5) + 1}))`} 
            />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
          formatter={(value) => [`${value}%`, '']}
        />
        <Legend 
          iconType="circle" 
          iconSize={8}
          layout="vertical"
          verticalAlign="middle"
          align="right"
          formatter={(value) => (
            <span style={{ 
              fontSize: '12px', 
              color: 'hsl(var(--foreground))',
              marginLeft: '8px'
            }}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}