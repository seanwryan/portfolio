'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center gap-1 px-4 py-3 rounded-full backdrop-blur-xl bg-white/70 border border-white/20 shadow-lg"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-foreground text-background'
                  : 'text-foreground/70 hover:text-foreground hover:bg-white/50'
              }`}
            >
              {item.name}
            </Link>
          )
        })}
      </motion.div>
    </nav>
  )
}

