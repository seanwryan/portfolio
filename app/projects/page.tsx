import ProjectCard from '@/components/ProjectCard'

const mockProjects = [
  {
    title: 'Neural Architecture Search',
    description: 'Automated deep learning model optimization using evolutionary algorithms and reinforcement learning. Achieved 15% improvement in model efficiency.',
    tags: ['Python', 'PyTorch', 'TensorFlow', 'RL'],
    link: '#'
  },
  {
    title: 'Real-Time ML Pipeline',
    description: 'End-to-end machine learning infrastructure for processing 10M+ events daily with sub-100ms latency. Built with microservices architecture.',
    tags: ['Kubernetes', 'Kafka', 'FastAPI', 'PostgreSQL'],
    link: '#'
  },
  {
    title: 'AI-Powered Analytics Dashboard',
    description: 'Interactive data visualization platform with predictive analytics. Features real-time data streaming and custom ML model integration.',
    tags: ['React', 'Next.js', 'D3.js', 'Python'],
    link: '#'
  }
]

export default function Projects() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">Projects</h1>
          <p className="text-foreground/70 text-lg">Selected work in AI and full-stack development</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

