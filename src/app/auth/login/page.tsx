'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'
import { PixelIcon } from '@/components/PixelIcon'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { signIn } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await signIn(formData.email, formData.password)
      
      if (error) {
        toast.error('ACCESS DENIED: ' + error.toUpperCase())
      } else {
        toast.success('PLAYER AUTHENTICATED! WELCOME BACK!')
        router.push('/events')
      }
    } catch (error) {
      toast.error('SYSTEM ERROR: CONNECTION FAILED')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24 bg-pixel-bg">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Retro Gaming Header */}
        <div className="text-center">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 bg-pixel-primary mx-auto animate-pixel-glow border-4 border-pixel-primary flex items-center justify-center"
                 style={{
                   clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)'
                 }}>
              <span className="text-pixel-bg text-2xl">🔑</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl font-bold text-pixel-primary pixel-font drop-shadow-pixel mb-4"
            animate={{
              textShadow: [
                '0 0 10px #00ff41',
                '0 0 20px #00ff41, 0 0 30px #00ff41',
                '0 0 10px #00ff41'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            PLAYER LOGIN
          </motion.h2>
          
          <motion.div
            animate={{ width: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="h-1 bg-pixel-primary mx-auto max-w-xs mb-4"
          />
          
          <p className="text-pixel-primary/80 retro-font">
            &gt; ENTER CREDENTIALS TO ACCESS SYSTEM <br />
            <span className="text-sm">
              NEW PLAYER? {' '}
              <Link href="/auth/register" className="text-pixel-secondary hover:text-pixel-warning transition-colors font-bold">
                CREATE ACCOUNT
              </Link>
            </span>
          </p>
        </div>
        
        {/* Login Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-pixel-bg/90 backdrop-blur-sm border-4 border-pixel-primary p-8 relative overflow-hidden"
          style={{
            clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
          }}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-pixel-primary/30">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-pixel-error animate-pixel-pulse"></div>
              <div className="w-3 h-3 bg-pixel-warning animate-pixel-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-pixel-success animate-pixel-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-pixel-primary/60 pixel-font text-xs">SECURE_LOGIN_v2.1</span>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-pixel-primary pixel-font mb-2">
                &gt; EMAIL_ADDRESS:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pixel-primary">📧</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-pixel-bg border-2 border-pixel-primary text-pixel-primary placeholder-pixel-primary/50 font-mono focus:outline-none focus:border-pixel-secondary transition-colors"
                  placeholder="PLAYER@DOMAIN.COM"
                  style={{
                    clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                  }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-pixel-primary pixel-font mb-2">
                &gt; PASSWORD:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pixel-primary">🔒</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-pixel-bg border-2 border-pixel-primary text-pixel-primary placeholder-pixel-primary/50 font-mono focus:outline-none focus:border-pixel-secondary transition-colors"
                  placeholder="••••••••••••"
                  style={{
                    clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                  }}
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pixel-primary hover:text-pixel-secondary transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </motion.button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-pixel-bg border-2 border-pixel-primary text-pixel-primary focus:ring-pixel-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-pixel-primary pixel-font">
                  SAVE_SESSION
                </label>
              </div>

              <Link href="/auth/forgot-password" className="text-sm font-bold text-pixel-secondary hover:text-pixel-warning transition-colors pixel-font">
                FORGOT_PASSWORD?
              </Link>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 25px rgba(0, 255, 65, 0.6)'
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-pixel-primary text-pixel-bg py-4 font-bold pixel-font border-2 border-pixel-primary hover:bg-transparent hover:text-pixel-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-pixel-glow"
              style={{
                clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)'
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-pixel-bg/30 border-t-pixel-bg"
                  />
                  <span>AUTHENTICATING...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <PixelIcon type="start" animate={false} />
                  <span>ACCESS SYSTEM</span>
                </div>
              )}
            </motion.button>

            {/* Alternative Login Methods */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-pixel-primary/30" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-pixel-bg text-pixel-primary/60 pixel-font">OR_CONNECT_VIA</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 15px rgba(255, 107, 53, 0.4)'
                  }}
                  className="w-full flex justify-center items-center py-3 px-4 border-2 border-pixel-secondary bg-transparent text-pixel-secondary font-bold pixel-font hover:bg-pixel-secondary hover:text-pixel-bg transition-all"
                  style={{
                    clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                  }}
                >
                  <span className="mr-2">🌐</span>
                  GOOGLE
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 15px rgba(191, 9, 183, 0.4)'
                  }}
                  className="w-full flex justify-center items-center py-3 px-4 border-2 border-pixel-accent bg-transparent text-pixel-accent font-bold pixel-font hover:bg-pixel-accent hover:text-pixel-bg transition-all"
                  style={{
                    clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                  }}
                >
                  <span className="mr-2">🐙</span>
                  GITHUB
                </motion.button>
              </div>
            </div>
          </form>

          {/* Animated Border Effect */}
          <motion.div
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 border-2 border-pixel-primary pointer-events-none"
            style={{
              clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
            }}
          />
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-pixel-bg/50 border-2 border-pixel-primary/30 px-4 py-2 inline-block"
               style={{
                 clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)'
               }}>
            <motion.span 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-pixel-primary/80 pixel-font text-xs"
            >
              SYSTEM_STATUS: ONLINE | SECURITY: ENABLED | VERSION: 2.1.0
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}