'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PixelStar {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  twinkle: boolean
}

export function PixelBackground() {
  const [stars, setStars] = useState<PixelStar[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Generate pixel stars
    const generateStars = () => {
      const colors = ['#00ff41', '#ff6b35', '#00d4ff', '#bf00ff', '#ffcc02', '#39ff14', '#ff1493']
      const newStars: PixelStar[] = []
      
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 2 + 0.5,
          twinkle: Math.random() > 0.5
        })
      }
      
      setStars(newStars)
    }

    generateStars()
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Animated Pixel Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
          }}
          animate={{
            opacity: star.twinkle ? [0.3, 1, 0.3] : 0.7,
            scale: star.twinkle ? [0.8, 1.2, 0.8] : 1,
            y: [0, -10, 0],
          }}
          transition={{
            duration: star.speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
      
      {/* Floating Pixel Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-pixel-primary opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Retro Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pixel-bg/5 to-pixel-bg/20" />
      
      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-pixel-primary animate-pixel-glow" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-pixel-secondary animate-pixel-glow" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-pixel-accent animate-pixel-glow" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-pixel-blue animate-pixel-glow" />
      
      {/* Animated Scan Line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pixel-primary to-transparent opacity-50"
        animate={{
          y: [0, window?.innerHeight || 800],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}