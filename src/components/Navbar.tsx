'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { NotificationCenter } from './NotificationCenter'
import { PixelIcon } from './PixelIcon'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, profile, signOut } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-pixel-bg/90 backdrop-blur-lg border-b-4 border-pixel-primary shadow-lg' 
          : 'bg-pixel-bg/50 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Pixel Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ 
                rotate: 360,
                scale: 1.1
              }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-pixel-primary flex items-center justify-center animate-pixel-glow border-2 border-pixel-primary"
              style={{
                clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)'
              }}
            >
              <span className="text-pixel-bg text-lg">🎮</span>
            </motion.div>
            <motion.span 
              className="text-2xl font-bold text-pixel-primary pixel-font drop-shadow-pixel group-hover:animate-pixel-glow"
              whileHover={{
                textShadow: '0 0 20px #00ff41'
              }}
            >
              PIXEL<span className="text-pixel-secondary">EVENTS</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <PixelNavLink href="/events">
              <PixelIcon type="controller" className="mr-2" />
              EVENTS
            </PixelNavLink>
            
            {user && (
              <PixelNavLink href="/events/create">
                <span className="mr-2">➕</span>
                CREATE
              </PixelNavLink>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <NotificationCenter />
                
                <Link href="/profile">
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-pixel-primary text-pixel-bg font-bold pixel-font border-2 border-pixel-primary hover:bg-transparent hover:text-pixel-primary transition-all"
                    style={{
                      clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                    }}
                  >
                    <PixelIcon type="user" animate={false} />
                    <span>{profile?.name?.toUpperCase() || 'PLAYER'}</span>
                  </motion.div>
                </Link>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(255, 7, 58, 0.5)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={signOut}
                  className="px-4 py-2 bg-pixel-error text-pixel-bg font-bold pixel-font border-2 border-pixel-error hover:bg-transparent hover:text-pixel-error transition-all"
                  style={{
                    clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                  }}
                >
                  QUIT
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      textShadow: '0 0 10px #00ff41'
                    }}
                    className="text-pixel-primary hover:text-pixel-secondary font-bold pixel-font transition-colors"
                  >
                    LOGIN
                  </motion.div>
                </Link>
                
                <Link href="/auth/register">
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 20px rgba(255, 107, 53, 0.5)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-pixel-secondary text-pixel-bg font-bold pixel-font border-2 border-pixel-secondary hover:bg-transparent hover:text-pixel-secondary transition-all animate-pixel-glow"
                    style={{
                      clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                    }}
                  >
                    JOIN GAME
                  </motion.div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 bg-pixel-primary text-pixel-bg border-2 border-pixel-primary hover:bg-transparent hover:text-pixel-primary transition-all"
            style={{
              clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)'
            }}
          >
            {isOpen ? '✕' : '☰'}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-pixel-bg/95 backdrop-blur-lg border-4 border-pixel-primary overflow-hidden"
              style={{
                clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
              }}
            >
              <div className="p-6 space-y-4">
                <MobilePixelNavLink href="/events">
                  <PixelIcon type="controller" className="mr-2" />
                  EVENTS
                </MobilePixelNavLink>
                
                {user && (
                  <MobilePixelNavLink href="/events/create">
                    <span className="mr-2">➕</span>
                    CREATE EVENT
                  </MobilePixelNavLink>
                )}
                
                {user ? (
                  <>
                    <MobilePixelNavLink href="/profile">
                      <PixelIcon type="user" className="mr-2" />
                      PROFILE
                    </MobilePixelNavLink>
                    <button
                      onClick={signOut}
                      className="w-full flex items-center px-4 py-3 bg-pixel-error text-pixel-bg font-bold pixel-font border-2 border-pixel-error hover:bg-transparent hover:text-pixel-error transition-all"
                      style={{
                        clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)'
                      }}
                    >
                      <span className="mr-2">🚪</span>
                      QUIT GAME
                    </button>
                  </>
                ) : (
                  <>
                    <MobilePixelNavLink href="/auth/login">
                      <span className="mr-2">🔑</span>
                      LOGIN
                    </MobilePixelNavLink>
                    <MobilePixelNavLink href="/auth/register" primary>
                      <span className="mr-2">⭐</span>
                      JOIN GAME
                    </MobilePixelNavLink>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

function PixelNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ 
          y: -2,
          textShadow: '0 0 10px currentColor'
        }}
        className="flex items-center text-pixel-primary hover:text-pixel-secondary font-bold pixel-font transition-colors text-sm"
      >
        {children}
      </motion.div>
    </Link>
  )
}

function MobilePixelNavLink({ 
  href, 
  children, 
  primary = false 
}: { 
  href?: string; 
  children: React.ReactNode; 
  primary?: boolean 
}) {
  const content = (
    <div 
      className={`flex items-center px-4 py-3 font-bold pixel-font transition-all border-2 ${
        primary 
          ? 'bg-pixel-secondary text-pixel-bg border-pixel-secondary hover:bg-transparent hover:text-pixel-secondary' 
          : 'bg-pixel-primary text-pixel-bg border-pixel-primary hover:bg-transparent hover:text-pixel-primary'
      }`}
      style={{
        clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)'
      }}
    >
      {children}
    </div>
  )

  return href ? <Link href={href}>{content}</Link> : content
}