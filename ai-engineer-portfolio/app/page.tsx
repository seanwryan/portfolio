import { Hero } from "@/components/hero"
import { ChatWindow } from "@/components/chat-window"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <section className="relative min-h-screen bg-background px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">Interactive AI Chat</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Experience a futuristic chat interface with glass morphism effects and distinctive message styling.
            </p>
          </div>
          <ChatWindow />
        </div>
      </section>
    </main>
  )
}
