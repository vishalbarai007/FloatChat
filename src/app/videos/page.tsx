"use client"
import { useState } from "react"
import { Navbar } from "@/src/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"

import { Play, Search, Clock, Eye, Calendar, Video, Waves, Microscope, Globe, BookOpen, Users, Zap } from "lucide-react"

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")

  const videoCategories = [
    { id: "all", name: "All Videos", icon: Video },
    { id: "floats", name: "Float Operations", icon: Waves },
    { id: "research", name: "Research", icon: Microscope },
    { id: "global", name: "Global Impact", icon: Globe },
    { id: "tutorials", name: "Tutorials", icon: BookOpen },
    { id: "interviews", name: "Interviews", icon: Users },
  ]

  const featuredVideos = [
    {
      id: "1",
      title: "How ARGO Floats Work: A Complete Overview",
      description: "Comprehensive introduction to ARGO float technology and their role in ocean observation",
      thumbnail: "/ocean-research-vessel-with-argo-float-deployment.jpg",
      duration: "12:45",
      views: "45.2K",
      uploadDate: "2024-01-15",
      category: "floats",
      featured: true,
    },
    {
      id: "2",
      title: "Deep Ocean Discoveries: BGC-Argo Insights",
      description: "Latest findings from biogeochemical floats revealing ocean health patterns",
      thumbnail: "/underwater-ocean-research-with-marine-life.jpg",
      duration: "18:30",
      views: "32.1K",
      uploadDate: "2024-01-10",
      category: "research",
      featured: true,
    },
    {
      id: "3",
      title: "Climate Change and Ocean Temperature Trends",
      description: "How ARGO data reveals global warming impacts on ocean temperatures",
      thumbnail: "/ocean-temperature-visualization-with-data-charts.jpg",
      duration: "15:22",
      views: "67.8K",
      uploadDate: "2024-01-05",
      category: "global",
      featured: true,
    },
  ]

  const allVideos = [
    ...featuredVideos,
    {
      id: "4",
      title: "Float Deployment Process: From Ship to Sea",
      description: "Step-by-step guide to deploying ARGO floats from research vessels",
      thumbnail: "/scientists-deploying-argo-float-from-research-ship.jpg",
      duration: "8:15",
      views: "28.5K",
      uploadDate: "2023-12-20",
      category: "floats",
      featured: false,
    },
    {
      id: "5",
      title: "Data Analysis Tutorial: Working with ARGO Datasets",
      description: "Learn how to analyze and visualize ARGO float data using Python",
      thumbnail: "/computer-screen-showing-ocean-data-analysis.jpg",
      duration: "25:10",
      views: "19.3K",
      uploadDate: "2023-12-15",
      category: "tutorials",
      featured: false,
    },
    {
      id: "6",
      title: "Interview: Leading Oceanographer on Climate Research",
      description: "Dr. Sarah Johnson discusses the future of ocean observation",
      thumbnail: "/oceanographer-scientist-in-laboratory-interview.jpg",
      duration: "22:45",
      views: "15.7K",
      uploadDate: "2023-12-10",
      category: "interviews",
      featured: false,
    },
    {
      id: "7",
      title: "Salinity Patterns: What ARGO Data Reveals",
      description: "Understanding global ocean salinity changes through ARGO measurements",
      thumbnail: "/ocean-salinity-map-visualization.jpg",
      duration: "14:30",
      views: "22.1K",
      uploadDate: "2023-12-05",
      category: "research",
      featured: false,
    },
    {
      id: "8",
      title: "The Global ARGO Network: International Collaboration",
      description: "How 30+ countries work together to monitor our oceans",
      thumbnail: "/world-map-showing-argo-float-locations.jpg",
      duration: "16:20",
      views: "31.4K",
      uploadDate: "2023-11-30",
      category: "global",
      featured: false,
    },
  ]

  const filteredVideos = allVideos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory
    const matchesDuration =
      selectedDuration === "all" ||
      (selectedDuration === "short" && Number.parseInt(video.duration) < 10) ||
      (selectedDuration === "medium" &&
        Number.parseInt(video.duration) >= 10 &&
        Number.parseInt(video.duration) < 20) ||
      (selectedDuration === "long" && Number.parseInt(video.duration) >= 20)

    return matchesSearch && matchesCategory && matchesDuration
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatViews = (views: string) => {
    return views
  }

  return (
    <div className="min-h-screen bg-[#061420]">
      <Navbar />

      <div className="flex items-center justify-center ">
        <div className="container max-w-7xl py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Ocean Research Videos</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our collection of educational videos about ARGO floats, ocean research, and marine science
                discoveries
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {videoCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <category.icon className="w-4 h-4" />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Lengths</SelectItem>
                    <SelectItem value="short">Under 10 min</SelectItem>
                    <SelectItem value="medium">10-20 min</SelectItem>
                    <SelectItem value="long">Over 20 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="featured" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="all">All Videos ({filteredVideos.length})</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>

              <TabsContent value="featured" className="space-y-6">
                {/* Hero Video */}
                <Card className="overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative group cursor-pointer">
                      <img
                        src={featuredVideos[0].thumbnail || "/placeholder.svg"}
                        alt={featuredVideos[0].title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-gray-800 ml-1" />
                        </div>
                      </div>
                      <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                        <Zap className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-8">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">{featuredVideos[0].title}</h2>
                          <p className="text-muted-foreground">{featuredVideos[0].description}</p>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {featuredVideos[0].duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {featuredVideos[0].views} views
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(featuredVideos[0].uploadDate)}
                          </div>
                        </div>

                        <Button size="lg" className="w-full md:w-auto">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>

                {/* Other Featured Videos */}
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredVideos.slice(1).map((video) => (
                    <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="relative group">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                            <Play className="w-5 h-5 text-gray-800 ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                          {video.duration}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{formatViews(video.views)} views</span>
                          <span>{formatDate(video.uploadDate)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="all" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video) => (
                    <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="relative group">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                            <Play className="w-5 h-5 text-gray-800 ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                          {video.duration}
                        </div>
                        {video.featured && (
                          <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs">Featured</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{formatViews(video.views)} views</span>
                          <span>{formatDate(video.uploadDate)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredVideos.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">No videos found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="categories" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videoCategories.slice(1).map((category) => {
                    const categoryVideos = allVideos.filter((video) => video.category === category.id)
                    return (
                      <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <category.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{category.name}</CardTitle>
                              <CardDescription>{categoryVideos.length} videos</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {categoryVideos.slice(0, 3).map((video) => (
                              <div key={video.id} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50">
                                <img
                                  src={video.thumbnail || "/placeholder.svg"}
                                  alt={video.title}
                                  className="w-16 h-10 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{video.title}</p>
                                  <p className="text-xs text-muted-foreground">{video.duration}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                            View All {category.name}
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
