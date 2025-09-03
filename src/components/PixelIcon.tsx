'use client'

import { motion } from 'framer-motion'

interface PixelIconProps {
  type: 'controller' | 'user' | 'start' | 'heart' | 'star' | 'coin' | 'trophy' | 'sword' | 'shield'
  className?: string
  animate?: boolean
}

export function PixelIcon({ type, className = '', animate = true }: PixelIconProps) {
  const icons = {
    controller: '🎮',
    user: '👤',
    start: '▶️',
    heart: '❤️',
    star: '⭐',
    coin: '🪙',
    trophy: '🏆',
    sword: '⚔️',
    shield: '🛡️'
  }

  const animations = {
    controller: {
      rotate: [0, -10, 10, 0],
      scale: [1, 1.1, 1]
    },
    user: {
      y: [0, -2, 0],
      scale: [1, 1.05, 1]
    },
    start: {
      x: [0, 2, 0],
      scale: [1, 1.2, 1]
    },
    heart: {
      scale: [1, 1.3, 1],
      rotate: [0, 5, -5, 0]
    },
    star: {
      rotate: [0, 360],
      scale: [1, 1.2, 1]
    },
    coin: {
      rotateY: [0, 180, 360],
      scale: [1, 1.1, 1]
    },
    trophy: {
      y: [0, -3, 0],
      rotate: [0, 2, -2, 0]
    },
    sword: {
      rotate: [0, 15, -15, 0],
      x: [0, 1, -1, 0]
    },
    shield: {
      scale: [1, 1.1, 1],
      rotate: [0, -5, 5, 0]
    }
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      animate={animate ? animations[type] : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {icons[type]}
    </motion.span>
  )
}