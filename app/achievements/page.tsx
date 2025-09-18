"use client"

import { Navigation } from "@/components/navigation"
import { AchievementCard } from "@/components/achievement-card"
import { StreakCounter } from "@/components/streak-counter"
import { PointsDisplay } from "@/components/points-display"
import { LevelProgress } from "@/components/level-progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Target, Award, Crown } from "lucide-react"

// Mock gamification data
const mockGameData = {
  totalPoints: 2450,
  currentLevel: 8,
  nextLevelPoints: 2800,
  currentStreak: 12,
  longestStreak: 28,
  achievements: [
    {
      id: 1,
      title: "First Steps",
      description: "Log your first meal",
      icon: "🥗",
      unlocked: true,
      unlockedDate: "2024-01-15",
      points: 50,
      category: "milestone",
    },
    {
      id: 2,
      title: "Streak Master",
      description: "Maintain a 7-day logging streak",
      icon: "🔥",
      unlocked: true,
      unlockedDate: "2024-01-22",
      points: 200,
      category: "streak",
    },
    {
      id: 3,
      title: "Nutrition Scholar",
      description: "Achieve 10 meals with 80+ nutrition score",
      icon: "🎓",
      unlocked: true,
      unlockedDate: "2024-02-01",
      points: 300,
      category: "nutrition",
    },
    {
      id: 4,
      title: "Veggie Lover",
      description: "Log 20 meals with vegetables",
      icon: "🥬",
      unlocked: true,
      unlockedDate: "2024-02-10",
      points: 150,
      category: "nutrition",
    },
    {
      id: 5,
      title: "Protein Power",
      description: "Meet protein goals for 14 consecutive days",
      icon: "💪",
      unlocked: false,
      progress: 8,
      total: 14,
      points: 250,
      category: "nutrition",
    },
    {
      id: 6,
      title: "Century Club",
      description: "Log 100 meals",
      icon: "💯",
      unlocked: false,
      progress: 67,
      total: 100,
      points: 500,
      category: "milestone",
    },
    {
      id: 7,
      title: "Perfect Week",
      description: "Score 90+ on all meals for a week",
      icon: "⭐",
      unlocked: false,
      progress: 0,
      total: 7,
      points: 400,
      category: "nutrition",
    },
    {
      id: 8,
      title: "Consistency King",
      description: "Maintain a 30-day streak",
      icon: "👑",
      unlocked: false,
      progress: 12,
      total: 30,
      points: 600,
      category: "streak",
    },
  ],
  recentActivity: [
    { action: "Earned 'Veggie Lover' badge", points: 150, date: "2 days ago" },
    { action: "Completed 10-day streak", points: 100, date: "3 days ago" },
    { action: "Perfect nutrition score meal", points: 25, date: "5 days ago" },
  ],
}

export default function AchievementsPage() {
  const unlockedAchievements = mockGameData.achievements.filter((a) => a.unlocked)
  const lockedAchievements = mockGameData.achievements.filter((a) => !a.unlocked)

  const achievementsByCategory = {
    milestone: mockGameData.achievements.filter((a) => a.category === "milestone"),
    nutrition: mockGameData.achievements.filter((a) => a.category === "nutrition"),
    streak: mockGameData.achievements.filter((a) => a.category === "streak"),
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Achievements & Progress</h1>
          <p className="text-lg text-muted-foreground">Track your nutrition journey and unlock rewards</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <PointsDisplay points={mockGameData.totalPoints} />
          <LevelProgress
            currentLevel={mockGameData.currentLevel}
            currentPoints={mockGameData.totalPoints}
            nextLevelPoints={mockGameData.nextLevelPoints}
          />
          <StreakCounter currentStreak={mockGameData.currentStreak} longestStreak={mockGameData.longestStreak} />
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unlockedAchievements.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockGameData.achievements.length - unlockedAchievements.length} more to unlock
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="milestone">Milestones</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="streak">Streaks</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Unlocked Achievements ({unlockedAchievements.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {unlockedAchievements.map((achievement) => (
                      <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-muted-foreground" />
                    In Progress ({lockedAchievements.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lockedAchievements.map((achievement) => (
                      <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              {Object.entries(achievementsByCategory).map(([category, achievements]) => (
                <TabsContent key={category} value={category} className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockGameData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          +{activity.points} pts
                        </Badge>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Next Level Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Next Level Rewards
                </CardTitle>
                <CardDescription>Level {mockGameData.currentLevel + 1} unlocks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <div className="text-lg">🏆</div>
                  <span className="text-sm">Nutrition Expert badge</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <div className="text-lg">⚡</div>
                  <span className="text-sm">Bonus point multiplier</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <div className="text-lg">🎯</div>
                  <span className="text-sm">Custom goal setting</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
