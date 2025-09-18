import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, BarChart3, Trophy, Zap, Shield, Users, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex text-yellow-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-white">Trusted by 10,000+ users</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-balance">
            Smart Food Analysis with <span className="text-yellow-300">Nutrisnap</span>
          </h1>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto text-pretty">
            Upload photos of your meals and get instant nutrition analysis, personalized insights, and gamified tracking
            to help you make healthier food choices every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50" asChild>
              <Link href="/auth/signup">
                <Camera className="w-5 h-5 mr-2" />
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for Healthy Eating</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform makes nutrition tracking effortless and engaging
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">AI Food Recognition</CardTitle>
                <CardDescription className="text-gray-600">
                  Simply take a photo and our AI instantly identifies all foods in your meal
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Detailed Nutrition Analysis</CardTitle>
                <CardDescription className="text-gray-600">
                  Get comprehensive breakdowns of calories, macros, vitamins, and minerals
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-yellow-200 hover:shadow-xl hover:shadow-yellow-100/50 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Gamified Progress</CardTitle>
                <CardDescription className="text-gray-600">
                  Earn points, unlock badges, and maintain streaks for healthy eating habits
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-200 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Smart Recommendations</CardTitle>
                <CardDescription className="text-gray-600">
                  Get personalized suggestions for healthier alternatives and meal improvements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-red-200 hover:shadow-xl hover:shadow-red-100/50 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Privacy First</CardTitle>
                <CardDescription className="text-gray-600">
                  Your food photos and health data are processed securely and kept private
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-teal-200 hover:shadow-xl hover:shadow-teal-100/50 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Cultural Foods Support</CardTitle>
                <CardDescription className="text-gray-600">
                  Recognizes local and international cuisines from around the world
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-teal-600 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600"></div>
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Transform Your Nutrition Journey?</h2>
          <p className="text-lg text-teal-100 mb-8">
            Join thousands of users who are already making healthier choices with Nutrisnap
          </p>
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50" asChild>
            <Link href="/auth/signup">
              <Camera className="w-5 h-5 mr-2" />
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-200 py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">Nutrisnap</span>
          </div>
          <p className="text-gray-600">Making healthy eating accessible and enjoyable for everyone</p>
        </div>
      </footer>
    </div>
  )
}
