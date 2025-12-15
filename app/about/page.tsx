import ChatInterface from '@/components/ChatInterface'

export default function About() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Chat with my Resume
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Ask me anything about my background, experience, and projects.
          </p>
        </div>
        <ChatInterface />
      </div>
    </main>
  )
}

