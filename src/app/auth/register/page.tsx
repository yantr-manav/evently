'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'
import { PixelIcon } from '@/components/PixelIcon'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  
  const { signUp } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('PASSWORD MISMATCH ERROR!')
      return
    }

    if (!agreedToTerms) {
      toast.error('TERMS AGREEMENT REQUIRED!')
      return
    }

    setLoading(true)

    try {
      const { error } = await signUp(formData.email, formData.password, formData.name)
      
      if (error) {
        toast.error('REGISTRATION FAILED: ' + error.toUpperCase())
      } else {
        toast.success('PLAYER CREATED! CHECK EMAIL FOR VERIFICATION!')
        router.push('/auth/login')
      }
    } catch (error) {
      toast.error('SYSTEM ERROR: REGISTRATION FAILED')
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

  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const strength = passwordStrength(formData.password)

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24 bg-pixel-bg">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Character Creation Header */}
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
            <div className="w-16 h-16 bg-pixel-secondary mx-auto animate-pixel-glow border-4 border-pixel-secondary flex items-center justify-center"
                 style={{
                   clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)'
                 }}>
              <span className="text-pixel-bg text-2xl">👤</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl font-bold text-pixel-secondary pixel-font drop-shadow-pixel mb-4"
            animate={{
              textShadow: [
                '0 0 10px #ff6b35',
                '0 0 20px #ff6b35, 0 0 30px #ff6b35',
                '0 0 10px #ff6b35'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            CREATE PLAYER
          </motion.h2>
          
          <motion.div
            animate={{ width: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="h-1 bg-pixel-secondary mx-auto max-w-xs mb-4"
          />
          
          <p className="text-pixel-primary/80 retro-font">
            &gt; INITIALIZE NEW PLAYER PROFILE <br />
            <span className="text-sm">
              EXISTING PLAYER? {' '}
              <Link href="/auth/login" className="text-pixel-accent hover:text-pixel-warning transition-colors font-bold">
                ACCESS ACCOUNT
              </Link>
            </span>
          </p>
        </div>
        
        {/* Character Creation Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-pixel-bg/90 backdrop-blur-sm border-4 border-pixel-secondary p-8 relative overflow-hidden"
          style={{
            clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
          }}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-pixel-secondary/30">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-pixel-success animate-pixel-pulse"></div>
              <div className="w-3 h-3 bg-pixel-warning animate-pixel-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-pixel-error animate-pixel-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-pixel-primary/60 pixel-font text-xs">CHAR_CREATOR_v1.0</span>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Player Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-pixel-secondary pixel-font mb-2">
                &gt; PLAYER_NAME:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pixel-secondary">👤</span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-pixel-bg border-2 border-pixel-secondary text-pixel-primary placeholder-pixel-primary/50 font-mono focus:outline-none focus:border-pixel-accent transition-colors"
                  placeholder="ENTER_PLAYER_NAME"
                  style={{
                    clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-pixel-secondary pixel-font mb-2">
                &gt; EMAIL_ADDRESS:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pixel-secondary">📧</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-pixel-bg border-2 border-pixel-secondary text-pixel-primary placeholder-pixel-primary/50 font-mono focus:outline-none focus:border-pixel-accent transition-colors"
                  placeholder="PLAYER@DOMAIN.COM"
                  style={{
                    clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-pixel-secondary pixel-font mb-2">
                &gt; PASSWORD:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pixel-secondary">🔒</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-pixel-bg border-2 border-pixel-secondary text-pixel-primary placeholder-pixel-primary/50 font-mono focus:outline-none focus:border-pixel-accent transition-colors"
                  placeholder="CREATE_SECURE_PASSWORD"
                  style={{
                    clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                  }}
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pixel-secondary hover:text-pixel-accent transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </motion.button>
              </div>
              
              {/* Password Strength Meter */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs pixel-font text-pixel-primary/80">SECURITY_LEVEL:</span>
                    <span className="text-xs pixel-font text-pixel-primary">
                      {strength <= 2 ? 'WEAK' : strength <= 3 ? 'MEDIUM' : 'STRONG'}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 ${
                          strength >= level
                            ? strength <= 2 ? 'bg-pixel-error' : strength <= 3 ? 'bg-pixel-warning' : 'bg-pixel-success'
                            : 'bg-pixel-bg border border-pixel-primary/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-pixel-secondary pixel-font mb-2">
                &gt; CONFIRM_PASSWORD:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pixel-secondary">🔐</span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-pixel-bg border-2 border-pixel-secondary text-pixel-primary placeholder-pixel-primary/50 font-mono focus:outline-none focus:border-pixel-accent transition-colors"
                  placeholder="REPEAT_PASSWORD"
                  style={{
                    clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                  }}
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pixel-secondary hover:text-pixel-accent transition-colors"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </motion.button>
              </div>
              
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center space-x-2">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <span className="text-pixel-success">✓</span>
                      <span className="text-sm pixel-font text-pixel-success">PASSWORDS_MATCH</span>
                    </>
                  ) : (
                    <>
                      <span className="text-pixel-error">✗</span>
                      <span className="text-sm pixel-font text-pixel-error">PASSWORD_MISMATCH</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-4 w-4 bg-pixel-bg border-2 border-pixel-secondary text-pixel-secondary focus:ring-pixel-secondary mt-1"
              />
              <label htmlFor="terms" className="block text-sm pixel-font text-pixel-primary">
                I AGREE TO THE{' '}
                <Link href="/terms" className="text-pixel-accent hover:text-pixel-warning underline">
                  TERMS_OF_SERVICE
                </Link>{' '}
                AND{' '}
                <Link href="/privacy" className="text-pixel-accent hover:text-pixel-warning underline">
                  PRIVACY_POLICY
                </Link>
              </label>
            </div>

            {/* Create Player Button */}
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 25px rgba(255, 107, 53, 0.6)'
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !agreedToTerms}
              className="w-full bg-pixel-secondary text-pixel-bg py-4 font-bold pixel-font border-2 border-pixel-secondary hover:bg-transparent hover:text-pixel-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-pixel-glow"
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
                  <span>CREATING_PLAYER...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <PixelIcon type="user" animate={false} />
                  <span>CREATE_PLAYER</span>
                </div>
              )}
            </motion.button>

            {/* Alternative Registration Methods */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-pixel-secondary/30" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-pixel-bg text-pixel-primary/60 pixel-font">OR_QUICK_REGISTER</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 15px rgba(0, 212, 255, 0.4)'
                  }}
                  className="w-full flex justify-center items-center py-3 px-4 border-2 border-pixel-blue bg-transparent text-pixel-blue font-bold pixel-font hover:bg-pixel-blue hover:text-pixel-bg transition-all"
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
                  className="w-full flex justify-center items-center py-3 px-4 border-2 border-pixel-purple bg-transparent text-pixel-purple font-bold pixel-font hover:bg-pixel-purple hover:text-pixel-bg transition-all"
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
            className="absolute inset-0 border-2 border-pixel-secondary pointer-events-none"
            style={{
              clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
            }}
          />
        </motion.div>

        {/* Character Stats Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-pixel-bg/50 border-2 border-pixel-secondary/30 px-4 py-2 inline-block"
               style={{
                 clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)'
               }}>
            <motion.span 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-pixel-primary/80 pixel-font text-xs"
            >
              PLAYER_STATS: LVL_1 | EXP: 0 | QUESTS: 0 | STATUS: READY
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}