"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Target, Edit, Save, X } from "lucide-react"

interface Goals {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  water: number
}

interface NutritionGoalsProps {
  goals: Goals
}

export function NutritionGoals({ goals }: NutritionGoalsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedGoals, setEditedGoals] = useState(goals)

  // Mock current progress (in a real app, this would come from today's meals)
  const currentProgress = {
    calories: 1650,
    protein: 85,
    carbs: 160,
    fat: 55,
    fiber: 18,
    water: 6,
  }

  const handleSave = () => {
    // In a real app, this would save to a backend
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedGoals(goals)
    setIsEditing(false)
  }

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100)
  }

  const goalItems = [
    { key: "calories", label: "Calories", unit: "kcal", icon: "🔥" },
    { key: "protein", label: "Protein", unit: "g", icon: "💪" },
    { key: "carbs", label: "Carbohydrates", unit: "g", icon: "🌾" },
    { key: "fat", label: "Fat", unit: "g", icon: "🥑" },
    { key: "fiber", label: "Fiber", unit: "g", icon: "🥬" },
    { key: "water", label: "Water", unit: "glasses", icon: "💧" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Nutrition Goals
          </span>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Goals
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </CardTitle>
        <CardDescription>Set your daily nutrition targets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goalItems.map((item) => {
            const current = currentProgress[item.key as keyof typeof currentProgress]
            const goal = isEditing ? editedGoals[item.key as keyof Goals] : goals[item.key as keyof Goals]
            const progress = getProgressPercentage(current, goal)

            return (
              <div key={item.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </Label>
                  {isEditing && (
                    <Input
                      type="number"
                      value={editedGoals[item.key as keyof Goals]}
                      onChange={(e) =>
                        setEditedGoals({
                          ...editedGoals,
                          [item.key]: Number.parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-20 h-8 text-sm"
                    />
                  )}
                </div>

                {!isEditing && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {current} / {goal} {item.unit}
                      </span>
                      <span className="font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </>
                )}
              </div>
            )
          })}
        </div>

        {!isEditing && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Today's Progress Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Calories:</span>
                <span className="ml-2 font-medium">
                  {Math.round(getProgressPercentage(currentProgress.calories, goals.calories))}% complete
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Protein:</span>
                <span className="ml-2 font-medium">
                  {Math.round(getProgressPercentage(currentProgress.protein, goals.protein))}% complete
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Hydration:</span>
                <span className="ml-2 font-medium">
                  {Math.round(getProgressPercentage(currentProgress.water, goals.water))}% complete
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
