"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp } from "lucide-react"

interface LevelProgressProps {
  currentLevel: number
  currentPoints: number
  nextLevelPoints: number
}

export function LevelProgress({ currentLevel, currentPoints, nextLevelPoints }: LevelProgressProps) {
  const previousLevelPoints = Math.max(0, nextLevelPoints - 350) // Assuming 350 points per level
  const levelProgress = ((currentPoints - previousLevelPoints) / (nextLevelPoints - previousLevelPoints)) * 100
  const pointsToNext = nextLevelPoints - currentPoints

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Level Progress</CardTitle>
        <TrendingUp className="w-4 h-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold flex items-baseline gap-1">Level {currentLevel}</div>
        <div className="mt-2 space-y-2">
          <Progress value={levelProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {pointsToNext} points to Level {currentLevel + 1}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
