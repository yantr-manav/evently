'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CosmicStar {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  twinkle: boolean
  layer: number
}

interface Nebula {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
}

export function PixelBackground() {
  const [stars, setStars] = useState<CosmicStar[]>([])
  const [nebulas, setNebulas] = useState<Nebula[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Generate cosmic stars with parallax layers
    const generateStars = () => {
      const colors = ['#ffffff', '#e94560', '#00d4ff', '#7209b7', '#f39c12', '#ff6b35']
      const newStars: CosmicStar[] = []
      
      for (let i = 0; i < 200; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 3 + 1,
          twinkle: Math.random() > 0.3,
          layer: Math.floor(Math.random() * 3) + 1 // 1-3 layers for parallax
        })
      }
      
      setStars(newStars)
    }

    // Generate nebula clouds
    const generateNebulas = () => {
      const nebulaColors = ['rgba(114, 9, 183, 0.3)', 'rgba(233, 69, 96, 0.2)', 'rgba(0, 212, 255, 0.15)', 'rgba(243, 156, 18, 0.2)']
      const newNebulas: Nebula[] = []
      
      for (let i = 0; i < 8; i++) {
        newNebulas.push({
          id: i,
          x: Math.random() * 120 - 10, // Allow overflow for better effect
          y: Math.random() * 120 - 10,
          size: Math.random() * 300 + 200,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          opacity: Math.random() * 0.4 + 0.1
        })
      }
      
      setNebulas(newNebulas)
    }

    generateStars()
    generateNebulas()
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep Space Gradient Background */}
      <div className="absolute inset-0 bg-cosmic-gradient" />
      
      {/* Animated Nebula Clouds */}
      {nebulas.map((nebula) => (
        <motion.div
          key={`nebula-${nebula.id}`}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: `${nebula.size}px`,
            height: `${nebula.size}px`,
            background: `radial-gradient(circle, ${nebula.color} 0%, transparent 70%)`,
            opacity: nebula.opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [nebula.opacity, nebula.opacity * 1.5, nebula.opacity],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
      
      {/* Parallax Star Layers */}
      {[1, 2, 3].map((layer) => (
        <div key={`layer-${layer}`} className="absolute inset-0">
          {stars
            .filter(star => star.layer === layer)
            .map((star) => (
              <motion.div
                key={`star-${star.id}`}
                className="absolute rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  backgroundColor: star.color,
                  boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
                }}
                animate={{
                  opacity: star.twinkle ? [0.2, 1, 0.2] : 0.8,
                  scale: star.twinkle ? [0.8, 1.4, 0.8] : 1,
                  y: [0, -2000], // Parallax scrolling effect
                }}
                transition={{
                  opacity: {
                    duration: star.speed,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 3
                  },
                  scale: {
                    duration: star.speed,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 3
                  },
                  y: {
                    duration: 50 / layer, // Faster for closer layers
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 10
                  }
                }}
              />
            ))}
        </div>
      ))}
      
      {/* Shooting Stars */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`comet-${i}`}
            className="absolute w-1 h-1 bg-cosmic-starry rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              boxShadow: '0 0 20px #e94560, 0 0 40px #e94560',
            }}
            animate={{
              x: [0, 300],
              y: [0, 200],
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 8 + Math.random() * 5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      {/* Cosmic Dust Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-0.5 h-0.5 bg-cosmic-stardust opacity-30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Cosmic Energy Waves */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(114, 9, 183, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(233, 69, 96, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Corner Constellation Markers */}
      <div className="absolute top-8 left-8 w-12 h-12">
        <motion.div
          className="w-full h-full border-l-2 border-t-2 border-cosmic-starry"
          animate={{
            boxShadow: [
              '0 0 10px rgba(233, 69, 96, 0.5)',
              '0 0 20px rgba(233, 69, 96, 0.8)',
              '0 0 10px rgba(233, 69, 96, 0.5)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
      
      <div className="absolute top-8 right-8 w-12 h-12">
        <motion.div
          className="w-full h-full border-r-2 border-t-2 border-cosmic-plasma"
          animate={{
            boxShadow: [
              '0 0 10px rgba(0, 212, 255, 0.5)',
              '0 0 20px rgba(0, 212, 255, 0.8)',
              '0 0 10px rgba(0, 212, 255, 0.5)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </div>
      
      <div className="absolute bottom-8 left-8 w-12 h-12">
        <motion.div
          className="w-full h-full border-l-2 border-b-2 border-cosmic-aurora"
          animate={{
            boxShadow: [
              '0 0 10px rgba(114, 9, 183, 0.5)',
              '0 0 20px rgba(114, 9, 183, 0.8)',
              '0 0 10px rgba(114, 9, 183, 0.5)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        />
      </div>
      
      <div className="absolute bottom-8 right-8 w-12 h-12">
        <motion.div
          className="w-full h-full border-r-2 border-b-2 border-cosmic-comet"
          animate={{
            boxShadow: [
              '0 0 10px rgba(255, 107, 53, 0.5)',
              '0 0 20px rgba(255, 107, 53, 0.8)',
              '0 0 10px rgba(255, 107, 53, 0.5)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 3 }}
        />
      </div>
      
      {/* Scanning Beam Effect */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-starry to-transparent opacity-60"
        animate={{
          y: [0, window?.innerHeight || 800],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}