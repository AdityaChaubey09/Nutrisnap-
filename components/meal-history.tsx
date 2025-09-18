"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

interface Meal {
  id: number
  name: string
  time: string
  calories: number
  score: number
  image: string
}

interface MealHistoryProps {
  meals: Meal[]
}

export function MealHistory({ meals }: MealHistoryProps) {
  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <div key={meal.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <img src={meal.image || "/placeholder.svg"} alt={meal.name} className="w-12 h-12 rounded-lg object-cover" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{meal.name}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-muted-foreground">{meal.time}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{meal.calories} cal</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={getScoreBadgeVariant(meal.score)} className="text-xs">
              {meal.score}
            </Badge>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
