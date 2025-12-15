"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, GitFork, ArrowUpRight } from "lucide-react"
import Link from "next/link"

// Sample project data - replace with your actual projects
const featuredProject = {
  title: "Neural Style Transfer Engine",
  description:
    "A production-grade deep learning system that applies artistic styles to images in real-time using optimized CNN architectures. Deployed with FastAPI and served 100K+ inference requests with 99.9% uptime.",
  tags: ["PyTorch", "FastAPI", "Docker", "AWS", "React"],
  link: "https://github.com/yourusername/neural-style-transfer",
  stars: 847,
  forks: 124,
  image: "/neural-network-abstract.png",
}

const projects = [
  {
    title: "LLM Fine-Tuning Framework",
    description:
      "Custom framework for efficient fine-tuning of large language models using LoRA and quantization techniques. Reduces training time by 60%.",
    tags: ["Python", "HuggingFace", "Transformers", "PEFT"],
    link: "https://github.com/yourusername/llm-finetuning",
    stars: 523,
    forks: 89,
  },
  {
    title: "Real-Time Anomaly Detection",
    description:
      "ML pipeline for detecting anomalies in time-series data streams. Processes 10M+ events per hour with sub-second latency.",
    tags: ["Python", "Kafka", "TimescaleDB", "scikit-learn"],
    link: "https://github.com/yourusername/anomaly-detection",
    stars: 412,
    forks: 67,
  },
  {
    title: "Multi-Modal Search Engine",
    description:
      "Semantic search engine combining text and image embeddings using CLIP. Enables natural language queries across visual content.",
    tags: ["Python", "OpenAI", "Pinecone", "Next.js"],
    link: "https://github.com/yourusername/multimodal-search",
    stars: 691,
    forks: 103,
  },
  {
    title: "AutoML Pipeline Builder",
    description:
      "No-code platform for building and deploying ML pipelines. Features automated feature engineering and hyperparameter optimization.",
    tags: ["Python", "Optuna", "MLflow", "FastAPI", "Vue.js"],
    link: "https://github.com/yourusername/automl-builder",
    stars: 338,
    forks: 52,
  },
  {
    title: "RAG Chatbot Framework",
    description:
      "Retrieval-augmented generation system with customizable knowledge bases. Built for enterprise documentation and customer support.",
    tags: ["LangChain", "Supabase", "OpenAI", "TypeScript"],
    link: "https://github.com/yourusername/rag-chatbot",
    stars: 756,
    forks: 134,
  },
  {
    title: "Computer Vision API",
    description:
      "RESTful API for object detection, segmentation, and classification. Supports batch processing and webhook notifications.",
    tags: ["YOLOv8", "FastAPI", "Redis", "PostgreSQL"],
    link: "https://github.com/yourusername/cv-api",
    stars: 289,
    forks: 41,
  },
]

export default function ProjectsPage() {
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
              {/* Image side */}
              <div className="relative h-[400px] overflow-hidden lg:h-auto">
                <img
                  src={featuredProject.image || "/placeholder.svg"}
                  alt={featuredProject.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent lg:bg-gradient-to-r" />
              </div>

              {/* Content side */}
              <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
                <div>
                  <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent">
                    Featured
                  </Badge>
                  <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
                    {featuredProject.title}
                  </h2>
                  <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
                    {featuredProject.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {featuredProject.tags.map((tag) => (
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
                      <a href={featuredProject.link} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        View on GitHub
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="gap-2 bg-transparent">
                      <a href={featuredProject.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
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
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5">
                    {/* Hover gradient effect */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Content */}
                    <div className="relative flex h-full flex-col">
                      <div className="mb-4 flex items-start justify-between">
                        <h3 className="text-balance text-xl font-bold text-foreground group-hover:text-accent">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </div>

                      <p className="mb-6 flex-grow text-pretty text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
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
              <Link href="/">
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
