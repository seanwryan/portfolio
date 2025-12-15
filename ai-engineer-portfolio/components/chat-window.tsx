"use client"

import type React from "react"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Send, Sparkles, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "ai"
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "ai",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: "2",
    role: "user",
    content: "Can you explain how neural networks work?",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: "3",
    role: "ai",
    content:
      "Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) organized in layers that process and transform data to recognize patterns and make predictions.",
    timestamp: new Date(Date.now() - 30000),
  },
]

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInput("")

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "This is a demo response. In a real application, this would connect to an AI model.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
              <div
                key={message.id}
                className={cn("flex items-start gap-3", message.role === "user" && "flex-row-reverse")}
              >
                {/* Avatar */}
                <Avatar className="h-8 w-8 shrink-0 ring-2 ring-white/10">
                  <AvatarFallback
                    className={cn(
                      message.role === "ai"
                        ? "bg-gradient-to-br from-accent to-accent/60 text-accent-foreground"
                        : "bg-gradient-to-br from-chart-1 to-chart-1/60 text-white",
                    )}
                  >
                    {message.role === "ai" ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>

                {/* Message bubble */}
                <div
                  className={cn(
                    "group relative max-w-[75%] rounded-2xl px-4 py-3 backdrop-blur-sm",
                    message.role === "ai"
                      ? "rounded-tl-sm border border-accent/20 bg-accent/10 text-foreground"
                      : "rounded-tr-sm border border-chart-1/30 bg-chart-1/20 text-foreground",
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="mt-1 block text-[10px] text-muted-foreground/60">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
              />
            </div>
            <Button
              onClick={handleSend}
              size="icon"
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
