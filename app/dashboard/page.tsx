"use client"

import { Navigation } from "@/components/navigation"
import { DashboardStats } from "@/components/dashboard-stats"
import { NutritionChart } from "@/components/nutrition-chart"
import { MealHistory } from "@/components/meal-history"
import { WeeklyProgress } from "@/components/weekly-progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Target, Calendar, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockDashboardData = {
  todayStats: {
    calories: 1850,
    caloriesGoal: 2000,
    protein: 95,
    proteinGoal: 120,
    carbs: 180,
    carbsGoal: 200,
    fat: 65,
    fatGoal: 70,
  },
  weeklyData: [
    { day: "Mon", calories: 1950, score: 82 },
    { day: "Tue", calories: 1800, score: 78 },
    { day: "Wed", calories: 2100, score: 85 },
    { day: "Thu", calories: 1750, score: 75 },
    { day: "Fri", calories: 1850, score: 80 },
    { day: "Sat", calories: 2200, score: 88 },
    { day: "Sun", calories: 1900, score: 83 },
  ],
  recentMeals: [
    {
      id: 1,
      name: "Grilled Salmon Bowl",
      time: "2 hours ago",
      calories: 520,
      score: 92,
      image: "/placeholder.svg?height=60&width=60&text=Salmon",
    },
    {
      id: 2,
      name: "Greek Yogurt Parfait",
      time: "5 hours ago",
      calories: 280,
      score: 85,
      image: "/placeholder.svg?height=60&width=60&text=Yogurt",
    },
    {
      id: 3,
      name: "Quinoa Salad",
      time: "Yesterday",
      calories: 380,
      score: 88,
      image: "/placeholder.svg?height=60&width=60&text=Salad",
    },
  ],
  insights: [
    "You're 150 calories under your daily goal. Consider a healthy snack!",
    "Great protein intake today! You're 79% towards your goal.",
    "Your nutrition scores have improved 12% this week.",
  ],
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Nutrition Dashboard</h1>
            <p className="text-muted-foreground">Track your daily nutrition and progress</p>
          </div>
          <Button asChild>
            <Link href="/analyze">
              <Plus className="w-4 h-4 mr-2" />
              Add Meal
            </Link>
          </Button>
        </div>

        {/* Today's Stats */}
        <DashboardStats data={mockDashboardData.todayStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Weekly Progress
                </CardTitle>
                <CardDescription>Your nutrition scores and calorie intake over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <WeeklyProgress data={mockDashboardData.weeklyData} />
              </CardContent>
            </Card>

            {/* Nutrition Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Today's Nutrition Breakdown
                </CardTitle>
                <CardDescription>Macronutrient distribution for today</CardDescription>
              </CardHeader>
              <CardContent>
                <NutritionChart data={mockDashboardData.todayStats} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Meals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MealHistory meals={mockDashboardData.recentMeals} />
              </CardContent>
            </Card>

            {/* Daily Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Daily Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockDashboardData.insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">{insight}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/analyze">
                    <Plus className="w-4 h-4 mr-2" />
                    Log New Meal
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/profile">
                    <Target className="w-4 h-4 mr-2" />
                    Update Goals
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/achievements">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Achievements
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
