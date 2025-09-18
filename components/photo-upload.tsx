"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, Upload, X, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PhotoUploadProps {
  onImageUpload: (imageUrl: string) => void
  onReset: () => void
}

export function PhotoUpload({ onImageUpload, onReset }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0])
      }
    },
    [onImageUpload],
  )

  const handleFile = useCallback(
    (file: File) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string
          setUploadedImage(imageUrl)
          onImageUpload(imageUrl)
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageUpload],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0])
      }
    },
    [handleFile],
  )

  const handleReset = useCallback(() => {
    setUploadedImage(null)
    onReset()
  }, [onReset])

  // Simulate camera capture
  const handleCameraCapture = useCallback(() => {
    // In a real app, this would open the camera
    // For demo, we'll use a placeholder image
    const placeholderImage = "/healthy-meal-with-chicken-rice-and-vegetables.jpg"
    setUploadedImage(placeholderImage)
    onImageUpload(placeholderImage)
  }, [onImageUpload])

  if (uploadedImage) {
    return (
      <div className="space-y-4">
        <Card className="relative overflow-hidden border-2 border-emerald-200 shadow-lg">
          <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded meal" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <Button variant="destructive" size="sm" className="absolute top-3 right-3 shadow-lg" onClick={handleReset}>
            <X className="w-4 h-4" />
          </Button>
        </Card>
        <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
          <p className="text-emerald-700 font-medium">
            ✨ Image uploaded successfully! Analysis will begin automatically.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card
        className={cn(
          "border-2 border-dashed transition-all duration-300 cursor-pointer",
          dragActive
            ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg scale-105"
            : "border-emerald-200 hover:border-emerald-300 hover:bg-gradient-to-br hover:from-emerald-50/50 hover:to-teal-50/50",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ImageIcon className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-emerald-700 mb-3">Drop your meal photo here</h3>
          <p className="text-emerald-600 mb-6 text-lg">or click to browse files</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          onClick={handleCameraCapture}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg transform hover:scale-105 transition-all duration-200"
          size="lg"
        >
          <Camera className="w-5 h-5 mr-2" />
          Take Photo
        </Button>
        <Button
          variant="outline"
          className="w-full border-2 border-emerald-200 text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 shadow-lg transform hover:scale-105 transition-all duration-200 bg-transparent"
          size="lg"
          onClick={() => document.querySelector('input[type="file"]')?.click()}
        >
          <Upload className="w-5 h-5 mr-2" />
          Upload Image
        </Button>
      </div>

      <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
        <div className="text-sm text-emerald-600 space-y-1">
          <p className="font-medium">📸 Supported formats: JPG, PNG, WebP</p>
          <p>📏 Maximum file size: 10MB</p>
        </div>
      </div>
    </div>
  )
}
