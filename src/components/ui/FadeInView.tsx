import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FadeInViewProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'none'
}

export function FadeInView({ children, className = '', delay = 0, direction = 'up' }: FadeInViewProps) {
  const yOffset = direction === 'up' ? 30 : direction === 'down' ? -30 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
