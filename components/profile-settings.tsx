"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { User, Edit, X } from "lucide-react"
import { useState } from "react"

interface ProfileData {
  name: string
  email: string
  joinDate: string
  avatar: string
  age: number
  height: string
  weight: string
  activityLevel: string
  dietaryPreferences: string[]
}

interface ProfileSettingsProps {
  profile: ProfileData
}

export function ProfileSettings({ profile }: ProfileSettingsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)

  const handleSave = () => {
    // In a real app, this would save to a backend
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const removeDietaryPreference = (pref: string) => {
    setEditedProfile({
      ...editedProfile,
      dietaryPreferences: editedProfile.dietaryPreferences.filter((p) => p !== pref),
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </span>
            {!isEditing && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </CardTitle>
          <CardDescription>Your basic profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={editedProfile.age}
                    onChange={(e) => setEditedProfile({ ...editedProfile, age: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={editedProfile.height}
                    onChange={(e) => setEditedProfile({ ...editedProfile, height: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave}>Save Changes</Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                  <p className="font-medium">{profile.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="font-medium">{profile.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Age</Label>
                  <p className="font-medium">{profile.age} years</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Height</Label>
                  <p className="font-medium">{profile.height}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Health Information */}
      <Card>
        <CardHeader>
          <CardTitle>Health Information</CardTitle>
          <CardDescription>Physical stats and activity level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Weight</Label>
              <p className="font-medium">{profile.weight}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Activity Level</Label>
              <p className="font-medium">{profile.activityLevel}</p>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-muted-foreground mb-2 block">Dietary Preferences</Label>
            <div className="flex flex-wrap gap-2">
              {profile.dietaryPreferences.map((pref) => (
                <Badge key={pref} variant="outline" className="flex items-center gap-1">
                  {pref}
                  {isEditing && (
                    <button onClick={() => removeDietaryPreference(pref)} className="ml-1 hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
