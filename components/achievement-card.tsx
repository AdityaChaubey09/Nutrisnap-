"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lock, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedDate?: string
  progress?: number
  total?: number
  points: number
  category: string
}

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const progressPercentage =
    achievement.progress && achievement.total ? (achievement.progress / achievement.total) * 100 : 0

  return (
    <Card
      className={cn(
        "relative transition-all duration-200",
        achievement.unlocked
          ? "border-primary/50 bg-primary/5 hover:shadow-lg"
          : "border-border hover:border-primary/30",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn("text-2xl p-2 rounded-lg", achievement.unlocked ? "bg-primary/10" : "bg-muted grayscale")}
            >
              {achievement.unlocked ? achievement.icon : <Lock className="w-6 h-6 text-muted-foreground" />}
            </div>
            <div>
              <CardTitle className={cn("text-base", !achievement.unlocked && "text-muted-foreground")}>
                {achievement.title}
              </CardTitle>
              <CardDescription className="text-sm">{achievement.description}</CardDescription>
            </div>
          </div>
          {achievement.unlocked && <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Badge variant={achievement.unlocked ? "default" : "outline"} className="text-xs">
            {achievement.points} points
          </Badge>
          {achievement.unlocked && achievement.unlockedDate && (
            <span className="text-xs text-muted-foreground">Unlocked {achievement.unlockedDate}</span>
          )}
        </div>

        {!achievement.unlocked && achievement.progress !== undefined && achievement.total && (
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {achievement.progress}/{achievement.total}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
