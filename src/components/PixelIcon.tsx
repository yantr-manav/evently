'use client'

import { motion } from 'framer-motion'

interface CosmicIconProps {
  type: 'rocket' | 'astronaut' | 'planet' | 'star' | 'galaxy' | 'satellite' | 'comet' | 'nebula' | 'wormhole'
  className?: string
  animate?: boolean
}

export function CosmicIcon({ type, className = '', animate = true }: CosmicIconProps) {
  const icons = {
    rocket: '🚀',
    astronaut: '👨‍🚀',
    planet: '🪐',
    star: '⭐',
    galaxy: '🌌',
    satellite: '🛰️',
    comet: '☄️',
    nebula: '🌠',
    wormhole: '🕳️'
  }

  const animations = {
    rocket: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1]
    },
    astronaut: {
      y: [0, -5, 0],
      rotate: [0, 2, -2, 0],
      scale: [1, 1.05, 1]
    },
    planet: {
      rotate: [0, 360],
      scale: [1, 1.1, 1]
    },
    star: {
      scale: [1, 1.3, 1],
      rotate: [0, 180, 360],
      filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
    },
    galaxy: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(360deg)']
    },
    satellite: {
      y: [0, -8, 0],
      x: [0, 3, 0],
      rotate: [0, 10, -10, 0]
    },
    comet: {
      x: [0, 15, 0],
      y: [0, -5, 0],
      scale: [1, 1.2, 1],
      filter: ['brightness(1)', 'brightness(1.8)', 'brightness(1)']
    },
    nebula: {
      scale: [1, 1.4, 1],
      rotate: [0, 45, -45, 0],
      filter: ['hue-rotate(0deg)', 'hue-rotate(120deg)', 'hue-rotate(240deg)', 'hue-rotate(360deg)']
    },
    wormhole: {
      scale: [1, 0.8, 1.2, 1],
      rotate: [0, 180, 360],
      filter: ['brightness(1)', 'brightness(0.5)', 'brightness(1.5)', 'brightness(1)']
    }
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      animate={animate ? animations[type] : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {icons[type]}
    </motion.span>
  )
}

// Alias for backward compatibility
export const PixelIcon = CosmicIcon