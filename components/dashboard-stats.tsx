"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Flame, Zap, Wheat, Droplets } from "lucide-react"

interface DashboardStatsProps {
  data: {
    calories: number
    caloriesGoal: number
    protein: number
    proteinGoal: number
    carbs: number
    carbsGoal: number
    fat: number
    fatGoal: number
  }
}

export function DashboardStats({ data }: DashboardStatsProps) {
  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100
    if (percentage >= 90) return "bg-green-500"
    if (percentage >= 70) return "bg-yellow-500"
    return "bg-primary"
  }

  const stats = [
    {
      title: "Calories",
      current: data.calories,
      goal: data.caloriesGoal,
      unit: "kcal",
      icon: Flame,
      color: "text-orange-500",
    },
    {
      title: "Protein",
      current: data.protein,
      goal: data.proteinGoal,
      unit: "g",
      icon: Zap,
      color: "text-blue-500",
    },
    {
      title: "Carbs",
      current: data.carbs,
      goal: data.carbsGoal,
      unit: "g",
      icon: Wheat,
      color: "text-yellow-500",
    },
    {
      title: "Fat",
      current: data.fat,
      goal: data.fatGoal,
      unit: "g",
      icon: Droplets,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const percentage = Math.round((stat.current / stat.goal) * 100)
        const Icon = stat.icon

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2 mb-2">
                <div className="text-2xl font-bold">
                  {stat.current}
                  <span className="text-sm font-normal text-muted-foreground">/{stat.goal}</span>
                </div>
                <span className="text-xs text-muted-foreground">{stat.unit}</span>
              </div>
              <Progress value={percentage} className="h-2 mb-2" />
              <div className="flex justify-between items-center">
                <Badge variant={percentage >= 90 ? "default" : percentage >= 70 ? "secondary" : "outline"}>
                  {percentage}%
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {stat.goal - stat.current > 0 ? `${stat.goal - stat.current}${stat.unit} left` : "Goal reached!"}
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
