'use client'

import { useEffect, useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import { motion } from 'framer-motion'

interface GitHubProject {
  id: number
  name: string
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

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">Projects</h1>
          <p className="text-foreground/70 text-lg">
            Selected work from my GitHub. Building AI-powered applications and full-stack solutions.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-muted-foreground">Loading projects...</div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-destructive">{error}</div>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-muted-foreground">No projects found.</div>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                description={project.description || 'No description available'}
                tags={getTechTags(project)}
                link={project.homepage || project.url}
                stars={project.stars}
                forks={project.forks}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

