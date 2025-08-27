'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Clock, User, ArrowLeft, Github } from 'lucide-react'
import Link from 'next/link'

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('latest')

  // Mock data - this will be replaced with actual API data
  const articles = [
    {
      id: 1,
      title: "Understanding Modern JavaScript Patterns",
      excerpt: "Explore the latest JavaScript patterns and best practices for building scalable applications.",
      category: "JavaScript",
      author: "John Doe",
      readTime: "5 min read",
      date: "2024-01-15",
      tags: ["JavaScript", "ES6+", "Patterns"],
      difficulty: "Intermediate"
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      excerpt: "Master React Hooks with practical examples and advanced techniques for state management.",
      category: "React",
      author: "Jane Smith",
      readTime: "8 min read",
      date: "2024-01-12",
      tags: ["React", "Hooks", "State Management"],
      difficulty: "Advanced"
    },
    {
      id: 3,
      title: "TypeScript for Beginners",
      excerpt: "Learn TypeScript from scratch and understand how it can improve your JavaScript development.",
      category: "TypeScript",
      author: "Mike Johnson",
      readTime: "12 min read",
      date: "2024-01-10",
      tags: ["TypeScript", "Beginner", "JavaScript"],
      difficulty: "Beginner"
    },
    {
      id: 4,
      title: "Building REST APIs with Node.js",
      excerpt: "Create robust REST APIs using Node.js, Express, and modern best practices.",
      category: "Node.js",
      author: "Sarah Wilson",
      readTime: "10 min read",
      date: "2024-01-08",
      tags: ["Node.js", "API", "Express"],
      difficulty: "Intermediate"
    },
    {
      id: 5,
      title: "CSS Grid Layout Mastery",
      excerpt: "Master CSS Grid Layout and create responsive, flexible layouts with ease.",
      category: "CSS",
      author: "David Brown",
      readTime: "7 min read",
      date: "2024-01-05",
      tags: ["CSS", "Grid", "Layout"],
      difficulty: "Intermediate"
    },
    {
      id: 6,
      title: "Python Data Science Essentials",
      excerpt: "Essential Python libraries and techniques for data science and machine learning.",
      category: "Python",
      author: "Emily Davis",
      readTime: "15 min read",
      date: "2024-01-03",
      tags: ["Python", "Data Science", "Machine Learning"],
      difficulty: "Advanced"
    }
  ]

  const categories = ['all', 'JavaScript', 'React', 'TypeScript', 'Node.js', 'CSS', 'Python']

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-figtree">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold font-figtree">All Articles</h1>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-figtree"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 font-figtree">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.slice(1).map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 font-figtree">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">By Title</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-montserrat">
              {sortedArticles.length} articles found
            </span>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full flex flex-col border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="font-figtree">
                      {article.category}
                    </Badge>
                    <Badge 
                      variant={article.difficulty === 'Beginner' ? 'default' : article.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                      className="font-figtree"
                    >
                      {article.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-figtree line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 font-montserrat line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs font-figtree">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span className="font-montserrat">{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="font-montserrat">{article.readTime}</span>
                    </div>
                  </div>

                  <div className="mt-auto space-y-2">
                    <Button className="w-full font-figtree" asChild>
                      <Link href={`/articles/${article.id}`}>
                        Read Article
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full font-figtree" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View Source Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {sortedArticles.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground font-montserrat">No articles found matching your criteria.</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}