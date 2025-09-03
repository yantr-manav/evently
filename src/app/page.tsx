'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PixelIcon } from '@/components/PixelIcon'

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Pixel Art Logo */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="w-24 h-24 mx-auto bg-pixel-primary animate-pixel-glow" 
                     style={{
                       clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
                     }}>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-pixel-bg text-2xl font-bold">🎮</span>
                </div>
              </div>
            </motion.div>
            
            {/* Animated Title */}
            <div className="mb-8">
              <motion.h1 
                className="text-4xl md:text-7xl font-bold mb-4 text-pixel-primary drop-shadow-pixel"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      '0 0 10px #00ff41',
                      '0 0 20px #00ff41, 0 0 30px #00ff41',
                      '0 0 10px #00ff41'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="pixel-font"
                >
                  PIXEL
                </motion.span>
                <motion.span
                  animate={{ 
                    color: ['#ff6b35', '#00d4ff', '#bf00ff', '#ffcc02', '#ff6b35']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="pixel-font ml-4"
                >
                  EVENTS
                </motion.span>
              </motion.h1>
              
              <motion.div
                initial={{ width: 0 }}
                animate={heroInView ? { width: '100%' } : {}}
                transition={{ duration: 2, delay: 0.5 }}
                className="h-1 bg-gradient-to-r from-pixel-primary via-pixel-secondary to-pixel-accent mx-auto max-w-md mb-6"
              />
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-pixel-primary/80 mb-8 max-w-3xl mx-auto leading-relaxed retro-font"
            >
              &gt; LEVEL UP YOUR SOCIAL LIFE! <br />
              &gt; DISCOVER EPIC EVENTS IN PIXEL-PERFECT STYLE <br />
              &gt; CONNECT WITH FELLOW GAMERS & CREATORS
            </motion.p>
            
            {/* Pixel Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/events">
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(0, 255, 65, 0.6)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-pixel-primary text-pixel-bg px-8 py-4 font-bold text-lg transition-all duration-300 border-4 border-pixel-primary hover:bg-transparent hover:text-pixel-primary pixel-font"
                  style={{
                    clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)'
                  }}
                >
                  <PixelIcon type="controller" className="inline mr-2" />
                  START GAME
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline ml-2"
                  >
                    &gt;&gt;
                  </motion.div>
                </motion.div>
              </Link>
              
              <Link href="/auth/register">
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(255, 107, 53, 0.6)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pixel-secondary text-pixel-bg px-8 py-4 font-bold text-lg transition-all duration-300 border-4 border-pixel-secondary hover:bg-transparent hover:text-pixel-secondary pixel-font"
                  style={{
                    clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)'
                  }}
                >
                  <PixelIcon type="user" className="inline mr-2" />
                  JOIN GUILD
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Retro Gaming Style */}
      <section ref={statsRef} className="py-16 bg-pixel-bg/50 border-y-4 border-pixel-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: '10K+', label: 'PLAYERS', icon: '👥', color: 'pixel-primary' },
              { number: '500+', label: 'EVENTS/MONTH', icon: '📅', color: 'pixel-secondary' },
              { number: '50+', label: 'CITIES', icon: '🏙️', color: 'pixel-accent' },
              { number: '98%', label: 'HIGH SCORE', icon: '⭐', color: 'pixel-warning' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0]
                  }}
                  className={`w-16 h-16 bg-${stat.color} mx-auto mb-4 flex items-center justify-center text-2xl animate-pixel-bounce border-4 border-${stat.color}`}
                  style={{
                    clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)'
                  }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    textShadow: [
                      '0 0 5px currentColor',
                      '0 0 15px currentColor',
                      '0 0 5px currentColor'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className={`text-3xl font-bold text-${stat.color} mb-2 pixel-font`}
                >
                  {stat.number}
                </motion.div>
                <p className={`text-${stat.color}/80 font-medium pixel-font text-sm`}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section - Game Level Style */}
      <section ref={featuresRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-pixel-primary pixel-font drop-shadow-pixel">
              GAME FEATURES
            </h2>
            <motion.div
              animate={{ width: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="h-1 bg-pixel-primary mx-auto max-w-xs mb-6"
            />
            <p className="text-xl text-pixel-primary/80 max-w-2xl mx-auto retro-font">
              &gt; UNLOCK EPIC SOCIAL EXPERIENCES
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '🎯',
                title: 'SMART DISCOVERY',
                description: 'AI-POWERED EVENT MATCHING SYSTEM FINDS YOUR PERFECT SOCIAL QUESTS',
                color: 'pixel-blue',
                level: 'LVL 1'
              },
              {
                icon: '⚡',
                title: 'INSTANT RSVP',
                description: 'ONE-CLICK REGISTRATION WITH REAL-TIME PARTY TRACKING',
                color: 'pixel-purple',
                level: 'LVL 2'
              },
              {
                icon: '🤝',
                title: 'GUILD SYSTEM',
                description: 'CONNECT WITH FELLOW ADVENTURERS AND BUILD YOUR NETWORK',
                color: 'pixel-orange',
                level: 'LVL 3'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  boxShadow: `0 0 30px rgba(0, 255, 65, 0.3)`
                }}
                className="group bg-pixel-bg/80 backdrop-blur-sm p-8 border-4 border-pixel-primary/30 hover:border-pixel-primary transition-all duration-300 relative overflow-hidden"
                style={{
                  clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
                }}
              >
                {/* Level Badge */}
                <div className={`absolute top-4 right-4 bg-${feature.color} text-pixel-bg px-3 py-1 text-xs font-bold pixel-font`}>
                  {feature.level}
                </div>
                
                <motion.div
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: 1.2
                  }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-${feature.color} flex items-center justify-center mb-6 text-3xl border-4 border-${feature.color} animate-pixel-float`}
                  style={{
                    clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)'
                  }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold mb-4 text-pixel-primary pixel-font group-hover:animate-pixel-glow">
                  {feature.title}
                </h3>
                
                <p className="text-pixel-primary/80 leading-relaxed retro-font text-sm">
                  {feature.description}
                </p>

                {/* Animated Border Effect */}
                <motion.div
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: index * 0.5 
                  }}
                  className={`absolute inset-0 border-2 border-${feature.color} pointer-events-none`}
                  style={{
                    clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Boss Battle Style */}
      <section className="py-20 bg-gradient-to-r from-pixel-bg via-pixel-accent/20 to-pixel-bg relative overflow-hidden border-y-4 border-pixel-primary">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-pixel-primary mb-6 pixel-font drop-shadow-pixel"
              animate={{
                textShadow: [
                  '0 0 10px #00ff41',
                  '0 0 20px #00ff41, 0 0 30px #00ff41',
                  '0 0 10px #00ff41'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              READY TO PLAY?
            </motion.h2>
            
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl text-pixel-primary/80 mb-8 max-w-2xl mx-auto retro-font"
            >
              &gt; JOIN THE ULTIMATE SOCIAL GAMING EXPERIENCE <br />
              &gt; PRESS START TO BEGIN YOUR ADVENTURE
            </motion.p>
            
            <Link href="/auth/register">
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 40px rgba(0, 255, 65, 0.8)'
                }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="inline-flex items-center space-x-4 bg-pixel-primary text-pixel-bg px-12 py-6 font-bold text-xl transition-all duration-300 border-4 border-pixel-primary hover:bg-transparent hover:text-pixel-primary pixel-font animate-pixel-glow"
                style={{
                  clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
                }}
              >
                <PixelIcon type="start" className="text-2xl" />
                <span>PRESS START</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="retro-blink"
                >
                  ▶
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}