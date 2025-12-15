'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const MOCK_RESPONSE = "I'm a mock AI assistant. This is a placeholder response that simulates a chat interaction. In a real implementation, this would connect to an AI service to provide intelligent responses."

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I can help you learn more about my background and experience. What would you like to know?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate thinking delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: MOCK_RESPONSE,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="relative mx-auto h-[600px] w-full max-w-3xl">
      {/* Glass morphism container */}
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl">
        {/* Subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

        {/* Messages area */}
        <ScrollArea className="h-[calc(100%-80px)] p-6">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn("flex items-start gap-3", message.role === "user" && "flex-row-reverse")}
              >
                {/* Avatar */}
                <Avatar className="h-8 w-8 shrink-0 ring-2 ring-white/10">
                  <AvatarFallback
                    className={cn(
                      message.role === "assistant"
                        ? "bg-gradient-to-br from-accent to-accent/60 text-accent-foreground"
                        : "bg-gradient-to-br from-chart-1 to-chart-1/60 text-white",
                    )}
                  >
                    {message.role === "assistant" ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>

                {/* Message bubble */}
                <div
                  className={cn(
                    "group relative max-w-[75%] rounded-2xl px-4 py-3 backdrop-blur-sm",
                    message.role === "assistant"
                      ? "rounded-tl-sm border border-accent/20 bg-accent/10 text-foreground"
                      : "rounded-tr-sm border border-chart-1/30 bg-chart-1/20 text-foreground",
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="mt-1 block text-[10px] text-muted-foreground/60">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3"
              >
                <Avatar className="h-8 w-8 shrink-0 ring-2 ring-white/10">
                  <AvatarFallback className="bg-gradient-to-br from-accent to-accent/60 text-accent-foreground">
                    <Sparkles className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-2xl rounded-tl-sm border border-accent/20 bg-accent/10 px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Input area */}
        <div className="absolute bottom-0 w-full border-t border-white/10 bg-black/20 p-4 backdrop-blur-sm">
          <div className="flex items-end gap-2">
            <div className="relative flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="max-h-32 min-h-[44px] w-full resize-none rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                rows={1}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={() => handleSend()}
              size="icon"
              disabled={!input.trim() || isLoading}
              className="h-11 w-11 shrink-0 rounded-xl bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent/90 hover:shadow-accent/30"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

