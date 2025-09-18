"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, Plus, TrendingUp } from "lucide-react"

interface MoodEntry {
  date: string
  mood: "happy" | "neutral" | "stressed" | "sad" | "energetic"
  energy: number
  notes: string
}

interface MoodTrackerProps {
  moodData: MoodEntry[]
}

export function MoodTracker({ moodData }: MoodTrackerProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEntry, setNewEntry] = useState({
    mood: "neutral" as MoodEntry["mood"],
    energy: 5,
    notes: "",
  })

  const moodEmojis = {
    happy: "😊",
    neutral: "😐",
    stressed: "😰",
    sad: "😢",
    energetic: "⚡",
  }

  const moodColors = {
    happy: "bg-green-100 text-green-800",
    neutral: "bg-gray-100 text-gray-800",
    stressed: "bg-red-100 text-red-800",
    sad: "bg-blue-100 text-blue-800",
    energetic: "bg-yellow-100 text-yellow-800",
  }

  const handleAddEntry = () => {
    // In a real app, this would save to a backend
    setShowAddForm(false)
    setNewEntry({ mood: "neutral", energy: 5, notes: "" })
  }

  const averageEnergy = moodData.reduce((sum, entry) => sum + entry.energy, 0) / moodData.length

  return (
    <div className="space-y-6">
      {/* Mood Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Mood & Energy Tracking
            </span>
            <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Entry
            </Button>
          </CardTitle>
          <CardDescription>Track how your mood correlates with your eating habits</CardDescription>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="mb-6 p-4 border border-border rounded-lg space-y-4">
              <h4 className="font-medium">Add Today's Mood</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>How are you feeling?</Label>
                  <div className="flex gap-2">
                    {Object.entries(moodEmojis).map(([mood, emoji]) => (
                      <Button
                        key={mood}
                        variant={newEntry.mood === mood ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewEntry({ ...newEntry, mood: mood as MoodEntry["mood"] })}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Energy Level (1-10)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={newEntry.energy}
                    onChange={(e) => setNewEntry({ ...newEntry, energy: Number.parseInt(e.target.value) || 5 })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes (optional)</Label>
                <Textarea
                  placeholder="How did your meals affect your mood today?"
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddEntry}>Save Entry</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">{averageEnergy.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Average Energy</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">{moodData.length}</div>
              <div className="text-sm text-muted-foreground">Days Tracked</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl">
                {moodEmojis[moodData.filter((entry) => entry.mood === "happy").length > 0 ? "happy" : "neutral"]}
              </div>
              <div className="text-sm text-muted-foreground">Most Common</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recent Mood Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moodData.map((entry, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                <div className="text-2xl">{moodEmojis[entry.mood]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={moodColors[entry.mood]}>{entry.mood}</Badge>
                    <span className="text-sm text-muted-foreground">{entry.date}</span>
                    <Badge variant="outline">Energy: {entry.energy}/10</Badge>
                  </div>
                  {entry.notes && <p className="text-sm text-muted-foreground">{entry.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
