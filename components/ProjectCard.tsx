'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  link: string
}

export default function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <Link
          href={link}
          className="text-foreground/60 hover:text-foreground transition-colors"
          aria-label={`View ${title}`}
        >
          <ExternalLink size={20} />
        </Link>
      </div>
      
      <p className="text-foreground/70 mb-4 leading-relaxed">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs font-mono bg-background text-foreground/70 rounded border border-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

