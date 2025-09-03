'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

const botResponses = {
  greeting: [
    "GREETINGS, PLAYER! 🤖 I'M YOUR PIXELEVENTS AI GUIDE. HOW CAN I ASSIST YOUR QUEST TODAY?",
    "HELLO ADVENTURER! WELCOME TO THE PIXELEVENTS UNIVERSE! READY TO DISCOVER EPIC QUESTS?",
    "HEY THERE, GAMER! 🎮 I'M YOUR DIGITAL COMPANION. WHAT ADVENTURE SHALL WE EMBARK ON?"
  ],
  events: [
    "QUEST DISCOVERY MODE ACTIVATED! 🎯 CHECK THE LEVEL SELECT SCREEN OR TELL ME WHAT TYPE OF ADVENTURE YOU SEEK!",
    "SEARCHING EVENT DATABASE... 💾 WHAT CATEGORY INTERESTS YOU? WORKSHOPS, NETWORKING RAIDS, CONFERENCES, OR MEETUP DUNGEONS?",
    "EXCELLENT CHOICE! 🏆 YOU CAN FILTER QUESTS BY CATEGORY, DATE, OR LOCATION. WHAT'S YOUR PREFERRED GAME MODE?"
  ],
  create: [
    "QUEST CREATION UNLOCKED! 🛠️ HEAD TO THE 'CREATE QUEST' TERMINAL AND I'LL GUIDE YOU THROUGH THE SETUP PROCESS!",
    "READY TO BECOME A QUEST MASTER? 👑 THE CREATE EVENT INTERFACE HAS ALL THE TOOLS YOU NEED TO BUILD EPIC ADVENTURES!",
    "TIME TO DESIGN YOUR OWN LEVEL! 🎨 CLICK 'CREATE QUEST' AND LET'S BUILD SOMETHING LEGENDARY TOGETHER!"
  ],
  rsvp: [
    "PARTY REGISTRATION IS SIMPLE! 🎪 JUST SELECT ANY QUEST AND CHOOSE YOUR STATUS: GOING, MAYBE, OR CAN'T ATTEND!",
    "JOINING ADVENTURES IS EASY! ⚡ EACH QUEST PAGE HAS RSVP BUTTONS - ONE CLICK AND YOU'RE IN THE PARTY!",
    "MANAGING YOUR PARTY STATUS IS A BREEZE! 🌟 VISIT ANY QUEST PAGE AND UPDATE YOUR PARTICIPATION LEVEL!"
  ],
  profile: [
    "YOUR PLAYER PROFILE IS YOUR COMMAND CENTER! 🏠 CHECK THE TOP MENU TO VIEW YOUR STATS AND QUEST HISTORY!",
    "PROFILE MANAGEMENT ACTIVATED! 📊 SEE YOUR ADVENTURE LOG, UPDATE YOUR INFO, AND TRACK YOUR ACHIEVEMENTS!",
    "YOUR PLAYER HUB AWAITS! 🎮 MANAGE YOUR PROFILE, VIEW COMPLETED QUESTS, AND CUSTOMIZE YOUR SETTINGS!"
  ],
  help: [
    "I'M YOUR DIGITAL GUIDE! 🤖 ASK ME ABOUT QUEST DISCOVERY, EVENT CREATION, PARTY MANAGEMENT, OR ANY PIXELEVENTS FEATURES!",
    "ASSISTANCE PROTOCOL ENGAGED! 💡 I CAN HELP WITH QUESTS, ACCOUNT MANAGEMENT, OR JUST CHAT ABOUT YOUR GAMING ADVENTURES!",
    "I'M HERE TO LEVEL UP YOUR EXPERIENCE! 🚀 FEEL FREE TO ASK ABOUT FEATURES, QUESTS, OR HOW TO MAXIMIZE YOUR PIXELEVENTS JOURNEY!"
  ]
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when first opened
      setTimeout(() => {
        addBotMessage(getRandomResponse('greeting'))
      }, 500)
    }
  }, [isOpen, messages.length])

  const getRandomResponse = (category: keyof typeof botResponses) => {
    const responses = botResponses[category]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const addBotMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
  }

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
  }

  const getBotResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return getRandomResponse('greeting')
    } else if (message.includes('event') && (message.includes('find') || message.includes('search') || message.includes('look'))) {
      return getRandomResponse('events')
    } else if (message.includes('create') || message.includes('organize') || message.includes('host')) {
      return getRandomResponse('create')
    } else if (message.includes('rsvp') || message.includes('attend') || message.includes('going')) {
      return getRandomResponse('rsvp')
    } else if (message.includes('profile') || message.includes('account')) {
      return getRandomResponse('profile')
    } else if (message.includes('help') || message.includes('how') || message.includes('what')) {
      return getRandomResponse('help')
    } else {
      return "INTERESTING INPUT! 🤔 I CAN ASSIST WITH QUEST DISCOVERY, EVENT CREATION, PARTY MANAGEMENT, AND PROFILE CUSTOMIZATION. WHAT WOULD YOU LIKE TO EXPLORE?"
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false)
      addBotMessage(getBotResponse(inputValue))
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Pixel Chat Button */}
      <motion.button
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 0 25px rgba(0, 255, 65, 0.6)'
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-pixel-primary border-4 border-pixel-primary animate-pixel-glow flex items-center justify-center text-pixel-bg transition-all duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)'
        }}
      >
        <span className="text-2xl">🤖</span>
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-pixel-primary border-4 border-pixel-primary"
          style={{
            clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)'
          }}
        />
      </motion.button>

      {/* Retro Chat Terminal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-pixel-bg border-4 border-pixel-primary flex flex-col overflow-hidden"
            style={{
              clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
            }}
          >
            {/* Terminal Header */}
            <div className="bg-gradient-to-r from-pixel-primary/20 to-pixel-secondary/20 p-4 flex items-center justify-between border-b-2 border-pixel-primary/30">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-8 h-8 bg-pixel-primary border-2 border-pixel-primary flex items-center justify-center"
                  style={{
                    clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)'
                  }}
                >
                  <span className="text-pixel-bg text-sm">🤖</span>
                </motion.div>
                <div>
                  <h3 className="text-pixel-primary font-bold pixel-font">AI GUIDE v3.0</h3>
                  <p className="text-pixel-primary/80 text-xs retro-font">ALWAYS ONLINE</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pixel-success animate-pixel-pulse"></div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-pixel-primary hover:text-pixel-error transition-colors"
                >
                  <span className="text-lg">✕</span>
                </motion.button>
              </div>
            </div>

            {/* Messages Terminal */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-pixel-bg/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${
                    message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                  }`}>
                    <div className={`w-8 h-8 border-2 flex items-center justify-center ${
                      message.isBot 
                        ? 'bg-pixel-primary border-pixel-primary text-pixel-bg' 
                        : 'bg-pixel-secondary border-pixel-secondary text-pixel-bg'
                    }`}
                    style={{
                      clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)'
                    }}>
                      {message.isBot ? '🤖' : '👤'}
                    </div>
                    <div className={`px-4 py-2 border-2 ${
                      message.isBot
                        ? 'bg-pixel-bg/80 border-pixel-primary text-pixel-primary'
                        : 'bg-pixel-secondary/20 border-pixel-secondary text-pixel-primary'
                    }`}
                    style={{
                      clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                    }}>
                      <p className="text-sm font-mono leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-pixel-primary border-2 border-pixel-primary flex items-center justify-center text-pixel-bg"
                         style={{
                           clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)'
                         }}>
                      🤖
                    </div>
                    <div className="bg-pixel-bg/80 border-2 border-pixel-primary px-4 py-2"
                         style={{
                           clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                         }}>
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-pixel-primary"
                        />
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-pixel-primary"
                        />
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-pixel-primary"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Terminal */}
            <div className="p-4 border-t-2 border-pixel-primary/30 bg-pixel-bg/80">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="TYPE YOUR MESSAGE..."
                  className="flex-1 px-4 py-2 bg-pixel-bg border-2 border-pixel-primary text-pixel-primary placeholder-pixel-primary/50 font-mono focus:outline-none focus:border-pixel-secondary transition-colors"
                  style={{
                    clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)'
                  }}
                />
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 15px rgba(0, 255, 65, 0.5)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 bg-pixel-primary border-2 border-pixel-primary flex items-center justify-center text-pixel-bg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{
                    clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)'
                  }}
                >
                  <span className="text-lg">▶</span>
                </motion.button>
              </div>
            </div>

            {/* Animated Border Effect */}
            <motion.div
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.98, 1.02, 0.98]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 border-2 border-pixel-primary pointer-events-none"
              style={{
                clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}