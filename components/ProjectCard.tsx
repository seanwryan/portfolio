'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Star, GitFork } from 'lucide-react'
import Link from 'next/link'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  link: string
  stars?: number
  forks?: number
}

export default function ProjectCard({ title, description, tags, link, stars, forks }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-foreground pr-2">{title}</h3>
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/60 hover:text-foreground transition-colors shrink-0"
          aria-label={`View ${title}`}
        >
          <ExternalLink size={20} />
        </Link>
      </div>
      
      <p className="text-foreground/70 mb-4 leading-relaxed flex-grow">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs font-mono bg-background text-foreground/70 rounded border border-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>

      {(stars !== undefined || forks !== undefined) && (
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-gray-100">
          {stars !== undefined && (
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-foreground/20 stroke-foreground/60" />
              <span>{stars}</span>
            </div>
          )}
          {forks !== undefined && (
            <div className="flex items-center gap-1">
              <GitFork size={16} className="stroke-foreground/60" />
              <span>{forks}</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

