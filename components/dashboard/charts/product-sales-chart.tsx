import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Food", value: 20 },
  { name: "Books", value: 10 },
  { name: "Other", value: 10 },
];

export function ProductSalesChart() {
  const colors = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-secondary)',
    'var(--color-success)',
    'var(--color-warning)',
  ];

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
          {data.map((_, index) => {
            return (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            );
          })}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'var(--color-card)',
            borderColor: 'var(--color-border)',
            borderRadius: '0.5rem',
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.18)',
            color: 'var(--color-foreground)',
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
              color: 'var(--color-foreground)',
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