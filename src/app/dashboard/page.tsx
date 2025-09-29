"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/src/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/src/components/navbar"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Progress } from "@/src/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

import {
  MessageCircle,
  Globe,
  Upload,
  BarChart3,
  Activity,
  Waves,
  Database,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Thermometer,
  Droplets,
  Crown,
  Zap,
  FileText,
  Video,
  Mail,
  Info,
} from "lucide-react"

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalQueries: 0,
    chatSessions: 0,
    dataUploads: 0,
    lastActivity: new Date().toISOString(),
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Load user stats from localStorage
    const savedHistory = localStorage.getItem("ocean-platform-chat-history")
    if (savedHistory) {
      const history = JSON.parse(savedHistory)
      setStats((prev) => ({
        ...prev,
        totalQueries: history.queryCount || 0,
        chatSessions: Math.ceil((history.queryCount || 0) / 5),
      }))
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const quickActions = [
    {
      title: "Start Chat",
      description: "Ask questions about ocean data",
      icon: MessageCircle,
      href: "/chat",
      color: "bg-blue-500",
    },
    {
      title: "Explore Globe",
      description: "Interactive 3D visualization",
      icon: Globe,
      href: "/globe",
      color: "bg-green-500",
    },
    {
      title: "Upload Data",
      description: "Analyze your ocean datasets",
      icon: Upload,
      href: "/upload",
      color: "bg-purple-500",
    },
    {
      title: "View Analytics",
      description: "Data insights and trends",
      icon: BarChart3,
      href: "/analytics",
      color: "bg-orange-500",
    },
  ]

  const navigationCards = [
    {
      title: "Float Types",
      description: "Learn about different ARGO float types",
      icon: Waves,
      href: "/float-types",
      badge: "Educational",
    },
    {
      title: "Video Library",
      description: "Ocean research videos and tutorials",
      icon: Video,
      href: "/videos",
      badge: "Media",
    },
    {
      title: "About Us",
      description: "Learn about our research mission",
      icon: Info,
      href: "/about",
      badge: "Info",
    },
    {
      title: "Contact",
      description: "Get in touch with our team",
      icon: Mail,
      href: "/contact",
      badge: "Support",
    },
  ]

  const recentActivity = [
    {
      action: "Started chat session",
      time: "2 hours ago",
      icon: MessageCircle,
      color: "text-blue-500",
    },
    {
      action: "Explored temperature data",
      time: "5 hours ago",
      icon: Thermometer,
      color: "text-red-500",
    },
    {
      action: "Viewed salinity profiles",
      time: "1 day ago",
      icon: Droplets,
      color: "text-cyan-500",
    },
    {
      action: "Accessed globe visualization",
      time: "2 days ago",
      icon: Globe,
      color: "text-green-500",
    },
  ]

  const oceanStats = [
    {
      label: "Active ARGO Floats",
      value: "4,127",
      change: "+23 this week",
      icon: Activity,
      color: "text-green-600",
    },
    {
      label: "Ocean Regions Covered",
      value: "180",
      change: "Global coverage",
      icon: MapPin,
      color: "text-blue-600",
    },
    {
      label: "Data Profiles",
      value: "2.1M+",
      change: "+15K daily",
      icon: Database,
      color: "text-purple-600",
    },
    {
      label: "Research Partners",
      value: "95",
      change: "Worldwide",
      icon: Users,
      color: "text-orange-600",
    },
  ]

  const getUserTypeInfo = () => {
    switch (user.type) {
      case "premium":
        return {
          title: "Premium User",
          description: "Unlimited queries and advanced features",
          icon: Crown,
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          features: ["Unlimited queries", "Advanced analytics", "Priority support", "Export data"],
        }
      case "normal":
        return {
          title: "Standard User",
          description: "Full access to ocean data exploration",
          icon: Zap,
          color: "bg-blue-100 text-blue-800 border-blue-200",
          features: ["100 queries/month", "Chat history", "Basic analytics", "Community support"],
        }
      case "guest":
        return {
          title: "Guest User",
          description: "Limited access to explore features",
          icon: Users,
          color: "bg-gray-100 text-gray-800 border-gray-200",
          features: ["5 queries total", "No history saved", "Basic features only"],
        }
      default:
        return null
    }
  }

  const userTypeInfo = getUserTypeInfo()

  return (
    <div className="min-h-screen bg-[#061420]">
      <Navbar />

      <div className="flex justify-center items-center">
        <div className="container max-w-7xl py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                  <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
                  <p className="text-muted-foreground">
                    Explore ocean data and discover insights from ARGO floats worldwide
                  </p>
                </div>

                {userTypeInfo && (
                  <Badge className={`${userTypeInfo.color} px-4 py-2`}>
                    <userTypeInfo.icon className="w-4 h-4 mr-2" />
                    {userTypeInfo.title}
                  </Badge>
                )}
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="explore">Explore</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <Link href={action.href}>
                        <CardHeader className="pb-3">
                          <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                            <action.icon className="w-6 h-6 text-white" />
                          </div>
                          <CardTitle className="text-lg">{action.title}</CardTitle>
                          <CardDescription>{action.description}</CardDescription>
                        </CardHeader>
                      </Link>
                    </Card>
                  ))}
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {oceanStats.map((stat, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className={`text-xs ${stat.color}`}>{stat.change}</p>
                          </div>
                          <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Your Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Queries</span>
                        <span className="font-semibold">{stats.totalQueries}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Chat Sessions</span>
                        <span className="font-semibold">{stats.chatSessions}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Data Uploads</span>
                        <span className="font-semibold">{stats.dataUploads}</span>
                      </div>

                      {user.type !== "premium" && (
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              {user.type === "guest" ? "Queries Used" : "Monthly Queries"}
                            </span>
                            <span className="text-sm font-medium">
                              {stats.totalQueries}/{user.type === "guest" ? "5" : "100"}
                            </span>
                          </div>
                          <Progress
                            value={(stats.totalQueries / (user.type === "guest" ? 5 : 100)) * 100}
                            className="h-2"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Recent Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm font-medium text-blue-800">Temperature Trends</p>
                          <p className="text-xs text-blue-600">North Atlantic warming detected</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm font-medium text-green-800">New Float Deployment</p>
                          <p className="text-xs text-green-600">15 floats added this week</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <p className="text-sm font-medium text-purple-800">BGC Data Update</p>
                          <p className="text-xs text-purple-600">Oxygen levels analyzed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {userTypeInfo && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <userTypeInfo.icon className="w-5 h-5" />
                          Account Features
                        </CardTitle>
                        <CardDescription>{userTypeInfo.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {userTypeInfo.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {user.type === "normal" && (
                          <div className="mt-4 pt-4 border-t">
                            <Button size="sm" className="w-full bg-yellow-300 text-black" asChild>
                              <Link href="/upgrade">
                                <Crown className="w-4 h-4 mr-2" />
                                Upgrade to Premium
                              </Link>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>Your latest interactions with the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                          <activity.icon className={`w-5 h-5 ${activity.color}`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="explore" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {navigationCards.map((card, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <Link href={card.href}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <card.icon className="w-8 h-8 text-blue-400" />
                            <Badge variant="secondary">{card.badge}</Badge>
                          </div>
                          <CardTitle>{card.title}</CardTitle>
                          <CardDescription>{card.description}</CardDescription>
                        </CardHeader>
                      </Link>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="account" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Manage your profile and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Name</p>
                        <p className="text-sm text-muted-foreground">{user.name}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Account Type</p>
                        <Badge className={userTypeInfo?.color}>{userTypeInfo?.title}</Badge>
                      </div>
                      <div className="pt-4">
                        <Button asChild>
                          <Link href="/profile">Edit Profile</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Settings</CardTitle>
                      <CardDescription>Configure your experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/settings">
                          <FileText className="w-4 h-4 mr-2" />
                          Preferences
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/settings">
                          <Database className="w-4 h-4 mr-2" />
                          Data Management
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/settings">
                          <Users className="w-4 h-4 mr-2" />
                          Privacy Settings
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}






