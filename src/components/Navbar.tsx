'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar, Plus, User, LogOut, Sparkles } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { NotificationCenter } from './NotificationCenter'

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
          ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EventFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/events" icon={Calendar}>Events</NavLink>
            {user && (
              <NavLink href="/events/create" icon={Plus}>Create Event</NavLink>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <NotificationCenter />
                <Link href="/profile">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium"
                  >
                    <User className="w-4 h-4" />
                    <span>{profile?.name || 'Profile'}</span>
                  </motion.div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={signOut}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-gray-600" />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/auth/login" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link href="/auth/register">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Sign Up
                  </motion.div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-white/90 backdrop-blur-lg rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <MobileNavLink href="/events" icon={Calendar}>Events</MobileNavLink>
                {user && (
                  <MobileNavLink href="/events/create" icon={Plus}>Create Event</MobileNavLink>
                )}
                
                {user ? (
                  <>
                    <MobileNavLink href="/profile" icon={User}>Profile</MobileNavLink>
                    <button
                      onClick={signOut}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <MobileNavLink href="/auth/login">Login</MobileNavLink>
                    <MobileNavLink href="/auth/register" primary>Sign Up</MobileNavLink>
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

function NavLink({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon?: any }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -2 }}
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span>{children}</span>
      </motion.div>
    </Link>
  )
}

function MobileNavLink({ href, children, icon: Icon, primary = false }: { 
  href?: string; 
  children: React.ReactNode; 
  icon?: unknown; 
  primary?: boolean 
}) {
  const content = (
    <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
      primary 
        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
    }`}>
      {Icon && <Icon className="w-5 h-5" />}
      <span className="font-medium">{children}</span>
    </div>
  )

  return href ? <Link href={href}>{content}</Link> : content
}