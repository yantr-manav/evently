'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CosmicIcon } from '@/components/PixelIcon'

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen relative">
      {/* Hero Section - Space Launch */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Cosmic Logo */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <motion.div 
                  className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-cosmic-starry via-cosmic-magenta to-cosmic-plasma"
                  animate={{
                    boxShadow: [
                      '0 0 30px rgba(233, 69, 96, 0.5), 0 0 60px rgba(233, 69, 96, 0.3)',
                      '0 0 50px rgba(233, 69, 96, 0.8), 0 0 100px rgba(233, 69, 96, 0.5)',
                      '0 0 30px rgba(233, 69, 96, 0.5), 0 0 60px rgba(233, 69, 96, 0.3)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <CosmicIcon type="galaxy" className="text-6xl" />
                </div>
                
                {/* Orbiting Elements */}
                {[0, 120, 240].map((rotation, index) => (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 left-1/2 w-4 h-4"
                    animate={{
                      rotate: [rotation, rotation + 360],
                    }}
                    transition={{
                      duration: 8 + index * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      transformOrigin: '0 0',
                      transform: `translate(-50%, -50%) rotate(${rotation}deg) translateX(80px)`
                    }}
                  >
                    <div className="w-4 h-4 bg-cosmic-plasma rounded-full animate-twinkle" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Animated Title */}
            <div className="mb-8">
              <motion.h1 
                className="text-5xl md:text-8xl font-bold mb-6 font-space"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.span
                  animate={{ 
                    color: ['#e94560', '#00d4ff', '#7209b7', '#f39c12', '#e94560'],
                    textShadow: [
                      '0 0 20px rgba(233, 69, 96, 0.8)',
                      '0 0 30px rgba(0, 212, 255, 0.8)',
                      '0 0 25px rgba(114, 9, 183, 0.8)',
                      '0 0 35px rgba(243, 156, 18, 0.8)',
                      '0 0 20px rgba(233, 69, 96, 0.8)',
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="bg-gradient-to-r from-cosmic-starry via-cosmic-magenta to-cosmic-plasma bg-clip-text text-transparent"
                >
                  COSMIC
                </motion.span>
                <br />
                <motion.span
                  animate={{ 
                    color: ['#ffffff', '#e94560', '#00d4ff', '#ffffff'],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="text-cosmic-stardust"
                >
                  EVENTS
                </motion.span>
              </motion.h1>
              
              <motion.div
                initial={{ width: 0 }}
                animate={heroInView ? { width: '100%' } : {}}
                transition={{ duration: 2, delay: 0.8 }}
                className="h-1 bg-gradient-to-r from-cosmic-starry via-cosmic-magenta to-cosmic-plasma mx-auto max-w-2xl mb-8"
              />
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-cosmic-stardust/90 mb-12 max-w-4xl mx-auto leading-relaxed font-mono"
            >
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                &gt; EXPLORE THE UNIVERSE OF EVENTS
              </motion.span>
              <br />
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                &gt; DISCOVER STELLAR GATHERINGS ACROSS THE GALAXY
              </motion.span>
              <br />
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                &gt; CONNECT WITH FELLOW SPACE EXPLORERS
              </motion.span>
            </motion.p>
            
            {/* Cosmic Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-8 justify-center items-center"
            >
              <Link href="/events">
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 40px rgba(233, 69, 96, 0.8), 0 0 80px rgba(233, 69, 96, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-cosmic-starry to-cosmic-magenta text-cosmic-stardust px-10 py-5 font-bold text-xl transition-all duration-500 rounded-full border-2 border-cosmic-starry hover:border-cosmic-magenta font-space overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cosmic-magenta to-cosmic-plasma opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      background: [
                        'linear-gradient(45deg, #e94560, #f39c12)',
                        'linear-gradient(45deg, #f39c12, #00d4ff)',
                        'linear-gradient(45deg, #00d4ff, #7209b7)',
                        'linear-gradient(45deg, #7209b7, #e94560)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="relative z-10 flex items-center space-x-3">
                    <CosmicIcon type="rocket" className="text-2xl" />
                    <span>LAUNCH MISSION</span>
                    <motion.div
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
              
              <Link href="/auth/register">
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 40px rgba(0, 212, 255, 0.8), 0 0 80px rgba(0, 212, 255, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-cosmic-plasma text-cosmic-plasma hover:bg-cosmic-plasma hover:text-cosmic-midnight px-10 py-5 font-bold text-xl transition-all duration-500 rounded-full font-space"
                >
                  <div className="flex items-center space-x-3">
                    <CosmicIcon type="astronaut" className="text-2xl" />
                    <span>JOIN CREW</span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Space Station Dashboard */}
      <section ref={statsRef} className="py-20 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cosmic-nebula/20 via-cosmic-galaxy/30 to-cosmic-nebula/20"
          animate={{
            background: [
              'linear-gradient(90deg, rgba(83, 52, 131, 0.2), rgba(45, 27, 105, 0.3), rgba(83, 52, 131, 0.2))',
              'linear-gradient(90deg, rgba(45, 27, 105, 0.3), rgba(83, 52, 131, 0.2), rgba(45, 27, 105, 0.3))',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: '10K+', label: 'SPACE EXPLORERS', icon: 'astronaut', color: 'cosmic-starry' },
              { number: '500+', label: 'MISSIONS/MONTH', icon: 'rocket', color: 'cosmic-magenta' },
              { number: '50+', label: 'STAR SYSTEMS', icon: 'galaxy', color: 'cosmic-plasma' },
              { number: '98%', label: 'SUCCESS RATE', icon: 'star', color: 'cosmic-comet' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                animate={statsInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.2,
                    rotateY: 180
                  }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-cosmic-midnight to-cosmic-purple flex items-center justify-center text-3xl border-2 border-cosmic-stardust relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      `0 0 20px rgba(233, 69, 96, 0.5)`,
                      `0 0 40px rgba(233, 69, 96, 0.8)`,
                      `0 0 20px rgba(233, 69, 96, 0.5)`,
                    ]
                  }}
                  transition={{ 
                    boxShadow: { duration: 2, repeat: Infinity, delay: index * 0.5 }
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cosmic-starry/20 to-cosmic-magenta/20"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  <CosmicIcon type={stat.icon as any} className="relative z-10" />
                </motion.div>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    color: ['#e94560', '#00d4ff', '#f39c12', '#e94560']
                  }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity, delay: index * 0.3 },
                    color: { duration: 4, repeat: Infinity, delay: index * 0.5 }
                  }}
                  className="text-4xl font-bold mb-3 font-space"
                >
                  {stat.number}
                </motion.div>
                <p className="text-cosmic-stardust/80 font-medium font-mono text-sm tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section - Constellation Map */}
      <section ref={featuresRef} className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold mb-8 font-space bg-gradient-to-r from-cosmic-stardust via-cosmic-magenta to-cosmic-plasma bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              MISSION FEATURES
            </motion.h2>
            
            <motion.div
              animate={{ 
                width: ['0%', '100%', '0%'],
                background: [
                  'linear-gradient(90deg, #e94560, #f39c12)',
                  'linear-gradient(90deg, #f39c12, #00d4ff)',
                  'linear-gradient(90deg, #00d4ff, #e94560)',
                ]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="h-1 mx-auto max-w-md mb-8"
            />
            
            <p className="text-xl text-cosmic-stardust/80 max-w-3xl mx-auto font-mono">
              &gt; ADVANCED SPACE EXPLORATION TECHNOLOGY
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                icon: 'satellite',
                title: 'QUANTUM DISCOVERY',
                description: 'AI-POWERED EVENT DETECTION ACROSS MULTIPLE DIMENSIONS AND TIMELINES',
                constellation: 'ORION',
                color: 'from-cosmic-plasma to-cosmic-starry'
              },
              {
                icon: 'wormhole',
                title: 'INSTANT TRANSPORT',
                description: 'TELEPORTATION-SPEED RSVP WITH REAL-TIME QUANTUM ENTANGLEMENT',
                constellation: 'ANDROMEDA',
                color: 'from-cosmic-magenta to-cosmic-aurora'
              },
              {
                icon: 'nebula',
                title: 'COSMIC NETWORK',
                description: 'CONNECT WITH BEINGS ACROSS THE UNIVERSE AND BUILD GALACTIC ALLIANCES',
                constellation: 'CASSIOPEIA',
                color: 'from-cosmic-comet to-cosmic-plasma'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={featuresInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 1, delay: index * 0.3 }}
                whileHover={{ 
                  y: -20, 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: '0 20px 60px rgba(233, 69, 96, 0.4)'
                }}
                className="group relative bg-gradient-to-br from-cosmic-midnight/80 to-cosmic-purple/60 backdrop-blur-lg p-8 rounded-3xl border border-cosmic-stardust/20 hover:border-cosmic-starry/60 transition-all duration-500 overflow-hidden"
              >
                {/* Constellation Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cosmic-starry/20 to-cosmic-magenta/20 rounded-full border border-cosmic-stardust/30">
                  <span className="text-xs font-mono text-cosmic-stardust/80 tracking-wider">
                    {feature.constellation}
                  </span>
                </div>
                
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                
                <motion.div
                  whileHover={{ 
                    scale: 1.3,
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 1 }}
                  className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-cosmic-starry/20 to-cosmic-magenta/20 flex items-center justify-center text-4xl border-2 border-cosmic-stardust/30 relative"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(233, 69, 96, 0.3)',
                        '0 0 40px rgba(233, 69, 96, 0.6)',
                        '0 0 20px rgba(233, 69, 96, 0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.7 }}
                  />
                  <CosmicIcon type={feature.icon as any} />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-6 text-cosmic-stardust font-space group-hover:text-cosmic-starry transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-cosmic-stardust/80 leading-relaxed font-mono text-sm tracking-wide">
                  {feature.description}
                </p>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cosmic-stardust rounded-full opacity-0 group-hover:opacity-60"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Galactic Command Center */}
      <section className="py-24 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(114, 9, 183, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(233, 69, 96, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(233, 69, 96, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(243, 156, 18, 0.3) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(114, 9, 183, 0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold text-cosmic-stardust mb-8 font-space"
              animate={{
                textShadow: [
                  '0 0 30px rgba(233, 69, 96, 0.8)',
                  '0 0 50px rgba(0, 212, 255, 0.8)',
                  '0 0 40px rgba(243, 156, 18, 0.8)',
                  '0 0 30px rgba(233, 69, 96, 0.8)',
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              READY FOR LAUNCH?
            </motion.h2>
            
            <motion.p
              animate={{ 
                opacity: [0.8, 1, 0.8],
                y: [0, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-2xl text-cosmic-stardust/90 mb-12 max-w-3xl mx-auto font-mono leading-relaxed"
            >
              &gt; INITIATE SEQUENCE FOR GALACTIC EVENT EXPLORATION <br />
              &gt; ALL SYSTEMS READY FOR INTERSTELLAR ADVENTURE
            </motion.p>
            
            <Link href="/auth/register">
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 60px rgba(233, 69, 96, 1), 0 0 120px rgba(233, 69, 96, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="inline-flex items-center space-x-6 bg-gradient-to-r from-cosmic-starry via-cosmic-magenta to-cosmic-plasma text-cosmic-midnight px-16 py-8 font-bold text-2xl transition-all duration-500 rounded-full font-space relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cosmic-plasma via-cosmic-comet to-cosmic-starry opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <CosmicIcon type="rocket" className="text-3xl relative z-10" />
                <span className="relative z-10">INITIATE LAUNCH</span>
                <motion.span
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-3xl relative z-10"
                >
                  🚀
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}