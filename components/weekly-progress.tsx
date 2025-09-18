"use client"

import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from "recharts"

interface WeeklyProgressProps {
  data: Array<{
    day: string
    calories: number
    score: number
  }>
}

export function WeeklyProgress({ data }: WeeklyProgressProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="day" className="text-muted-foreground" />
          <YAxis yAxisId="left" className="text-muted-foreground" />
          <YAxis yAxisId="right" orientation="right" className="text-muted-foreground" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Bar yAxisId="left" dataKey="calories" fill="url(#caloriesGradient)" radius={[4, 4, 0, 0]} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="score"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
          />
          <defs>
            <linearGradient id="caloriesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
