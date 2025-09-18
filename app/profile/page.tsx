"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ProfileSettings } from "@/components/profile-settings"
import { NutritionGoals } from "@/components/nutrition-goals"
import { MoodTracker } from "@/components/mood-tracker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, Heart, Calendar, TrendingUp, Settings } from "lucide-react"

// Mock user data
const mockUserData = {
  profile: {
    name: "Aditya Chaubey",
    email: "aditya09@gmail.com",
    joinDate: "January 2024",
    avatar: "/placeholder.svg?height=80&width=80&text=AC",
    age: 19,
    height: "5'11\"",
    weight: "140 lbs",
    activityLevel: "Moderately Active",
    dietaryPreferences: ["Vegetarian", "Gluten-Free"],
  },
  goals: {
    calories: 2000,
    protein: 120,
    carbs: 200,
    fat: 70,
    fiber: 25,
    water: 8, // glasses
  },
  stats: {
    totalMeals: 156,
    averageScore: 82,
    streakDays: 12,
    favoriteFood: "Quinoa Bowl",
  },
  moodData: [
    { date: "2024-01-15", mood: "happy", energy: 8, notes: "Great workout today!" },
    { date: "2024-01-14", mood: "neutral", energy: 6, notes: "Busy day at work" },
    { date: "2024-01-13", mood: "happy", energy: 9, notes: "Tried new healthy recipe" },
    { date: "2024-01-12", mood: "stressed", energy: 4, notes: "Long meeting day" },
    { date: "2024-01-11", mood: "happy", energy: 7, notes: "Good balance today" },
  ],
  recentHistory: [
    {
      date: "Today",
      meals: [
        { name: "Avocado Toast", time: "8:30 AM", calories: 320, score: 85 },
        { name: "Quinoa Salad", time: "12:45 PM", calories: 450, score: 92 },
        { name: "Grilled Salmon", time: "7:15 PM", calories: 380, score: 88 },
      ],
    },
    {
      date: "Yesterday",
      meals: [
        { name: "Greek Yogurt Parfait", time: "8:00 AM", calories: 280, score: 80 },
        { name: "Chicken Wrap", time: "1:00 PM", calories: 420, score: 75 },
        { name: "Vegetable Stir Fry", time: "6:30 PM", calories: 350, score: 90 },
      ],
    },
    {
      date: "2 days ago",
      meals: [
        { name: "Smoothie Bowl", time: "9:00 AM", calories: 340, score: 88 },
        { name: "Buddha Bowl", time: "12:30 PM", calories: 480, score: 95 },
        { name: "Lentil Soup", time: "7:00 PM", calories: 290, score: 85 },
      ],
    },
  ],
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <img
            src={mockUserData.profile.avatar || "/placeholder.svg"}
            alt={mockUserData.profile.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">{mockUserData.profile.name}</h1>
            <p className="text-muted-foreground mb-3">{mockUserData.profile.email}</p>
            <div className="flex flex-wrap gap-2">
              {mockUserData.profile.dietaryPreferences.map((pref) => (
                <Badge key={pref} variant="outline">
                  {pref}
                </Badge>
              ))}
              <Badge variant="secondary">Member since {mockUserData.profile.joinDate}</Badge>
            </div>
          </div>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUserData.stats.totalMeals}</div>
              <p className="text-xs text-muted-foreground">Logged and analyzed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUserData.stats.averageScore}</div>
              <p className="text-xs text-muted-foreground">Nutrition quality</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Target className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUserData.stats.streakDays}</div>
              <p className="text-xs text-muted-foreground">Days logging meals</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorite Food</CardTitle>
              <Heart className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{mockUserData.stats.favoriteFood}</div>
              <p className="text-xs text-muted-foreground">Most logged meal</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
            <TabsTrigger value="history">Meal History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <ProfileSettings profile={mockUserData.profile} />
          </TabsContent>

          <TabsContent value="goals" className="space-y-6 mt-6">
            <NutritionGoals goals={mockUserData.goals} />
          </TabsContent>

          <TabsContent value="mood" className="space-y-6 mt-6">
            <MoodTracker moodData={mockUserData.moodData} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6 mt-6">
            <div className="space-y-6">
              {mockUserData.recentHistory.map((day, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{day.date}</CardTitle>
                    <CardDescription>
                      {day.meals.length} meals • {day.meals.reduce((sum, meal) => sum + meal.calories, 0)} total
                      calories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {day.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">{meal.name}</p>
                            <p className="text-sm text-muted-foreground">{meal.time}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{meal.calories} cal</span>
                            <Badge variant={meal.score >= 80 ? "default" : meal.score >= 60 ? "secondary" : "outline"}>
                              {meal.score}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
