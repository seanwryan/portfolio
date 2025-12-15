'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Star, GitFork, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface GitHubProject {
  id: number
  name: string
  displayTitle?: string
  description: string
  url: string
  homepage?: string
  language: string | null
  topics: string[]
  stars: number
  forks: number
  updatedAt: string
}

export default function Projects() {
  const [projects, setProjects] = useState<GitHubProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/github')
        if (!response.ok) throw new Error('Failed to fetch projects')
        const data = await response.json()
        setProjects(data.projects || [])
      } catch (err) {
        setError('Failed to load projects. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Map language names to more readable tech stack
  const getTechTags = (project: GitHubProject): string[] => {
    const tags: string[] = []
    
    // Add language if available
    if (project.language) {
      tags.push(project.language)
    }
    
    // Add topics (these are often tech stack related)
    project.topics.forEach(topic => {
      if (!tags.includes(topic)) {
        tags.push(topic)
      }
    })
    
    // Limit to 5 tags
    return tags.slice(0, 5)
  }

  // Get featured project (first one) and rest
  const featuredProject = projects.length > 0 ? projects[0] : null
  const otherProjects = projects.slice(1)

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-32">
          <div className="text-muted-foreground">Loading projects...</div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-32">
          <div className="text-destructive">{error}</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-background to-muted/20 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-6 border-accent/20 bg-accent/5 text-accent">
              Portfolio
            </Badge>
            <h1 className="mb-6 text-balance font-sans text-5xl font-bold tracking-tight text-foreground md:text-7xl">
              Featured Projects
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              A curated collection of production-grade AI systems, machine learning pipelines, and full-stack
              applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Project Hero */}
      {featuredProject && (
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:shadow-accent/5"
            >
              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Content side */}
                <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
                  <div>
                    <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent">
                      Featured
                    </Badge>
                    <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
                      {featuredProject.displayTitle || featuredProject.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h2>
                    <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
                      {featuredProject.description || 'No description available'}
                    </p>

                    {/* Tags */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {getTechTags(featuredProject).map((tag) => (
                        <Badge key={tag} variant="outline" className="border-border/50 bg-muted/50 font-mono text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="mb-6 flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-medium">{featuredProject.stars.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <GitFork className="h-4 w-4" />
                        <span className="font-medium">{featuredProject.forks.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Button asChild size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                        <a href={featuredProject.url} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          View on GitHub
                        </a>
                      </Button>
                      {featuredProject.homepage && (
                        <Button asChild size="lg" variant="outline" className="gap-2 bg-transparent">
                          <a href={featuredProject.homepage} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      {otherProjects.length > 0 && (
        <section className="px-6 pb-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="mb-4 text-3xl font-bold text-foreground">More Projects</h2>
              <p className="text-lg text-muted-foreground">
                Additional machine learning systems and AI applications from my portfolio.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Link href={project.homepage || project.url} target="_blank" rel="noopener noreferrer">
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5">
                      {/* Hover gradient effect */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Content */}
                      <div className="relative flex h-full flex-col">
                        <div className="mb-4 flex items-start justify-between">
                          <h3 className="text-balance text-xl font-bold text-foreground group-hover:text-accent">
                            {project.displayTitle || project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h3>
                          <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                        </div>

                        <p className="mb-6 flex-grow text-pretty text-sm leading-relaxed text-muted-foreground">
                          {project.description || 'No description available'}
                        </p>

                        {/* Tags */}
                        <div className="mb-4 flex flex-wrap gap-1.5">
                          {getTechTags(project).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="border-border/30 bg-muted/50 font-mono text-[10px] font-medium"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 border-t border-border/30 pt-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-muted-foreground/50 text-muted-foreground/50" />
                            <span className="font-medium">{project.stars}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="h-3 w-3" />
                            <span className="font-medium">{project.forks}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-border/50 bg-muted/20 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Interested in collaborating?
            </h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              I'm always open to discussing new projects, innovative ideas, or opportunities to be part of your vision.
            </p>
            <Button asChild size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/about">
                <ArrowUpRight className="h-4 w-4" />
                Get in Touch
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

