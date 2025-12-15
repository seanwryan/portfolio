import ChatInterface from '@/components/ChatInterface'
import { Mail, MapPin, Phone, Linkedin, Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            About Me
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Data Scientist & Full-Stack Developer with expertise in AI, LLMs, and production applications.
          </p>
        </div>

        {/* Contact Info */}
        <div className="mb-12 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-foreground/70">
              <MapPin size={20} />
              <span>Rocky Hill, NJ (Open to Relocation)</span>
            </div>
            <div className="flex items-center gap-3 text-foreground/70">
              <Phone size={20} />
              <a href="tel:+16092739328" className="hover:text-foreground transition-colors">
                +1 (609) 273-9328
              </a>
            </div>
            <div className="flex items-center gap-3 text-foreground/70">
              <Mail size={20} />
              <a href="mailto:seanwryan17@gmail.com" className="hover:text-foreground transition-colors">
                seanwryan17@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-foreground/70">
              <Linkedin size={20} />
              <Link 
                href="https://www.linkedin.com/in/seanwryan17" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors flex items-center gap-1"
              >
                LinkedIn
                <ExternalLink size={14} />
              </Link>
            </div>
            <div className="flex items-center gap-3 text-foreground/70">
              <Github size={20} />
              <Link 
                href="https://github.com/seanwryan" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors flex items-center gap-1"
              >
                GitHub
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-12 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Education</h2>
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-foreground">Boston University</h3>
              <span className="text-muted-foreground text-sm">05/2024</span>
            </div>
            <p className="text-muted-foreground mb-2">Bachelor of Science in Data Science</p>
            <p className="text-sm text-muted-foreground">Focus Areas: Statistical Data Analysis, Machine Learning & AI, Algorithms, Data Visualization, Business Analytics</p>
          </div>
        </div>

        {/* Professional Experience */}
        <div className="mb-12 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Professional Experience</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Math & English Trainer</h3>
                  <p className="text-muted-foreground">Seriously Addictive Mathematics | Montgomery, NJ</p>
                </div>
                <span className="text-sm text-muted-foreground">07/2025 – Present</span>
              </div>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Instruct K-8 students in logic and problem-solving using Singapore Math, tailoring methods to individual learning styles.</li>
                <li>Analyze performance data to track progress and organize weekly lesson plans.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Software Engineer for AI Training Data</h3>
                  <p className="text-muted-foreground">G2i, Inc. | Remote, United States</p>
                </div>
                <span className="text-sm text-muted-foreground">09/2024 - 06/2025</span>
              </div>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Optimized LLM performance via RLHF (Reinforcement Learning from Human Feedback) on AI-generated code snippets.</li>
                <li>Evaluated code quality and logic for fine-tuning datasets, focusing on UI components and complex algorithms.</li>
                <li>Authored technical explanations and corrections to improve model reasoning capabilities in software development.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Junior Developer</h3>
                  <p className="text-muted-foreground">MISTRAS Group Inc. | West Windsor, NJ</p>
                </div>
                <span className="text-sm text-muted-foreground">05/2023 – 06/2024</span>
              </div>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Digitized field operations by transitioning paper reporting to digital workflows, improving client data accessibility.</li>
                <li>Built dynamic Power BI dashboards connected to SQL Server to visualize real-time inspection results.</li>
                <li>Managed data pipelines using Novacura Flow Studio to ensure seamless integration between collection and visualization.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="mb-12 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Languages</h3>
              <p className="text-sm text-muted-foreground">Python, TypeScript, JavaScript, SQL, HTML/CSS</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Frameworks & Libraries</h3>
              <p className="text-sm text-muted-foreground">Next.js 16, React, Node.js, Tailwind CSS, Pandas, Streamlit, Prisma, React-PDF</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">AI & Machine Learning</h3>
              <p className="text-sm text-muted-foreground">OpenAI API, Google Gemini, Claude-Sonnet 4.5, Vercel AI SDK, RLHF, Prompt Engineering</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Data & Infrastructure</h3>
              <p className="text-sm text-muted-foreground">PostgreSQL (Supabase), Redis, Docker, Power BI, Tableau, Clerk Auth, Vercel Blob</p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4 text-center">Chat with my Resume</h2>
          <p className="text-center text-muted-foreground mb-6">
            Ask me anything about my background, experience, and projects.
          </p>
          <ChatInterface />
        </div>
      </div>
    </main>
  )
}

