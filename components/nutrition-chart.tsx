"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface NutritionChartProps {
  data: {
    protein: number
    carbs: number
    fat: number
  }
}

export function NutritionChart({ data }: NutritionChartProps) {
  const chartData = [
    { name: "Protein", value: data.protein * 4, color: "#dc2626" }, // Bright red for protein
    { name: "Carbs", value: data.carbs * 4, color: "#2563eb" }, // Bright blue for carbs
    { name: "Fat", value: data.fat * 9, color: "#ea580c" }, // Bright orange for fat
  ]

  const COLORS = ["#dc2626", "#2563eb", "#ea580c"]

  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="14"
        fontWeight="600"
        className="drop-shadow-lg"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            innerRadius={60}
            outerRadius={120}
            paddingAngle={3}
            dataKey="value"
            stroke="#fff"
            strokeWidth={3}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className="hover:opacity-80 transition-opacity duration-200"
                stroke="#ffffff"
                strokeWidth={3}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `${Math.round((value / total) * 100)}% (${Math.round(value)} cal)`,
              name,
            ]}
            contentStyle={{
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              padding: "12px 16px",
            }}
            labelStyle={{
              color: "#374151",
              fontWeight: "600",
              marginBottom: "4px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => (
              <span
                style={{
                  color: chartData.find((item) => item.name === value)?.color || "#000",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
                className="mx-2"
              >
                {value}: {Math.round((entry.payload.value / total) * 100)}%
              </span>
            )}
            wrapperStyle={{
              paddingTop: "20px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
