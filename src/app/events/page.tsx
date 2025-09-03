'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEventStore } from '@/store/eventStore'
import { useAuthStore } from '@/store/authStore'
import { EventRecommendations } from '@/components/EventRecommendations'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { PixelIcon } from '@/components/PixelIcon'

const categories = ['ALL', 'WORKSHOP', 'NETWORKING', 'MEETUP', 'CONFERENCE', 'SEMINAR']

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [sortBy, setSortBy] = useState('date')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const { 
    events, 
    loading, 
    fetchEvents, 
    getFilteredEvents,
    setSelectedCategory: setStoreCategory,
    setSearchQuery: setStoreQuery 
  } = useEventStore()
  const { user } = useAuthStore()

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  useEffect(() => {
    setStoreCategory(selectedCategory.toLowerCase())
    setStoreQuery(searchQuery)
  }, [selectedCategory, searchQuery, setStoreCategory, setStoreQuery])

  const filteredEvents = getFilteredEvents()

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'popularity':
        return (b.attendee_count || 0) - (a.attendee_count || 0)
      case 'name':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-pixel-bg">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-16 h-16 bg-pixel-primary border-4 border-pixel-primary animate-pixel-glow"
          style={{
            clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)'
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-pixel-bg text-2xl">
            🎮
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-pixel-bg">
      <div className="container mx-auto px-4">
        {/* Retro Gaming Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 text-pixel-primary pixel-font drop-shadow-pixel"
            animate={{
              textShadow: [
                '0 0 10px #00ff41',
                '0 0 20px #00ff41, 0 0 30px #00ff41',
                '0 0 10px #00ff41'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            LEVEL SELECT
          </motion.h1>
          <motion.div
            animate={{ width: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="h-1 bg-pixel-primary mx-auto max-w-md mb-6"
          />
          <p className="text-lg text-pixel-primary/80 max-w-2xl mx-auto retro-font">
            &gt; CHOOSE YOUR ADVENTURE <br />
            &gt; SELECT EVENT QUEST TO BEGIN
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Gaming Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Console */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-pixel-bg/80 backdrop-blur-sm border-4 border-pixel-primary p-6"
              style={{
                clipPath: 'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)'
              }}
            >
              <h3 className="text-lg font-bold mb-4 text-pixel-primary pixel-font flex items-center space-x-2">
                <span>🔍</span>
                <span>SEARCH</span>
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ENTER QUEST NAME..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-pixel-bg border-2 border-pixel-primary text-pixel-primary placeholder-pixel-primary/50 font-mono focus:outline-none focus:border-pixel-secondary transition-colors"
                  style={{
                    clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                  }}
                />
              </div>
            </motion.div>

            {/* Category Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-pixel-bg/80 backdrop-blur-sm border-4 border-pixel-secondary p-6"
              style={{
                clipPath: 'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)'
              }}
            >
              <h3 className="text-lg font-bold mb-4 text-pixel-secondary pixel-font flex items-center space-x-2">
                <span>📂</span>
                <span>CATEGORIES</span>
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 15px rgba(0, 255, 65, 0.5)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 font-bold pixel-font transition-all border-2 ${
                      selectedCategory === category
                        ? 'bg-pixel-primary text-pixel-bg border-pixel-primary animate-pixel-glow'
                        : 'bg-transparent text-pixel-primary border-pixel-primary/30 hover:border-pixel-primary'
                    }`}
                    style={{
                      clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                    }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Sort Options */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-pixel-bg/80 backdrop-blur-sm border-4 border-pixel-accent p-6"
              style={{
                clipPath: 'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)'
              }}
            >
              <h3 className="text-lg font-bold mb-4 text-pixel-accent pixel-font flex items-center space-x-2">
                <span>📊</span>
                <span>SORT BY</span>
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-pixel-bg border-2 border-pixel-accent text-pixel-accent font-mono focus:outline-none focus:border-pixel-secondary transition-colors"
                style={{
                  clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                }}
              >
                <option value="date">DATE</option>
                <option value="popularity">POPULARITY</option>
                <option value="name">NAME</option>
              </select>
            </motion.div>

            {/* AI Recommendations */}
            {user && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <EventRecommendations />
              </motion.div>
            )}
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-3">
            {/* Action Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center mb-8 bg-pixel-bg/50 border-4 border-pixel-primary p-4"
              style={{
                clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
              }}
            >
              <div>
                <h2 className="text-2xl font-bold text-pixel-primary pixel-font">
                  {filteredEvents.length} QUESTS AVAILABLE
                </h2>
                <p className="text-pixel-primary/80 retro-font">
                  {selectedCategory !== 'ALL' && `CATEGORY: ${selectedCategory}`}
                  {searchQuery && ` | SEARCH: "${searchQuery}"`}
                </p>
              </div>
              
              {user && (
                <Link href="/events/create">
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 25px rgba(255, 107, 53, 0.6)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-pixel-secondary text-pixel-bg px-6 py-3 font-bold pixel-font border-2 border-pixel-secondary hover:bg-transparent hover:text-pixel-secondary transition-all"
                    style={{
                      clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)'
                    }}
                  >
                    <span>➕</span>
                    <span>CREATE QUEST</span>
                  </motion.div>
                </Link>
              )}
            </motion.div>

            {/* Events Grid - Game Level Cards */}
            <div ref={ref} className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {sortedEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.02,
                      boxShadow: '0 0 30px rgba(0, 255, 65, 0.4)'
                    }}
                    className="group"
                  >
                    <Link href={`/events/${event.id}`}>
                      <div 
                        className="bg-pixel-bg/90 backdrop-blur-sm border-4 border-pixel-primary/50 hover:border-pixel-primary transition-all duration-300 overflow-hidden group-hover:animate-pixel-glow"
                        style={{
                          clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
                        }}
                      >
                        {/* Level Header */}
                        <div className="relative bg-gradient-to-r from-pixel-primary/20 to-pixel-secondary/20 p-4 border-b-2 border-pixel-primary/30">
                          <div className="flex justify-between items-center">
                            <div className={`px-3 py-1 text-xs font-bold pixel-font border-2 ${
                              event.category === 'Workshop' ? 'bg-pixel-blue text-pixel-bg border-pixel-blue' :
                              event.category === 'Networking' ? 'bg-pixel-green text-pixel-bg border-pixel-green' :
                              event.category === 'Meetup' ? 'bg-pixel-purple text-pixel-bg border-pixel-purple' :
                              event.category === 'Conference' ? 'bg-pixel-orange text-pixel-bg border-pixel-orange' :
                              'bg-pixel-primary text-pixel-bg border-pixel-primary'
                            }`}>
                              {event.category?.toUpperCase()}
                            </div>
                            <div className="bg-pixel-bg/80 px-2 py-1 text-xs font-bold pixel-font text-pixel-primary border border-pixel-primary">
                              LVL {Math.floor(Math.random() * 10) + 1}
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mt-3">
                            <div className="flex justify-between text-xs pixel-font text-pixel-primary/80 mb-1">
                              <span>PLAYERS</span>
                              <span>{event.attendee_count || 0}/{event.max_attendees}</span>
                            </div>
                            <div className="w-full bg-pixel-bg border-2 border-pixel-primary/30 h-2">
                              <motion.div 
                                className="h-full bg-pixel-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.round(((event.attendee_count || 0) / event.max_attendees) * 100)}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-lg font-bold mb-3 text-pixel-primary pixel-font group-hover:animate-pixel-glow line-clamp-2">
                            {event.title?.toUpperCase()}
                          </h3>
                          
                          <div className="space-y-2 text-pixel-primary/80 mb-4 retro-font text-sm">
                            <div className="flex items-center space-x-2">
                              <span>📅</span>
                              <span>
                                {new Date(event.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                }).toUpperCase()}
                              </span>
                              <span className="ml-2">⏰</span>
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>📍</span>
                              <span className="truncate">{event.location?.toUpperCase()}</span>
                            </div>
                          </div>

                          {/* Player Avatars */}
                          <div className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                              {[1, 2, 3].map((i) => (
                                <motion.div
                                  key={i}
                                  animate={{ 
                                    rotate: [0, 5, -5, 0],
                                    scale: [1, 1.1, 1]
                                  }}
                                  transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    delay: i * 0.2 
                                  }}
                                  className="w-8 h-8 bg-pixel-primary border-2 border-pixel-bg flex items-center justify-center text-pixel-bg text-xs font-bold"
                                  style={{
                                    clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)'
                                  }}
                                >
                                  P{i}
                                </motion.div>
                              ))}
                              {(event.attendee_count || 0) > 3 && (
                                <div className="w-8 h-8 bg-pixel-secondary border-2 border-pixel-bg flex items-center justify-center text-pixel-bg text-xs font-bold">
                                  +{(event.attendee_count || 0) - 3}
                                </div>
                              )}
                            </div>
                            
                            <motion.div
                              animate={{ 
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{ 
                                duration: 3, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="text-pixel-secondary text-xl"
                            >
                              ⭐
                            </motion.div>
                          </div>

                          {/* Action Button */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="mt-4 w-full bg-pixel-primary text-pixel-bg py-2 text-center font-bold pixel-font border-2 border-pixel-primary hover:bg-transparent hover:text-pixel-primary transition-all"
                            style={{
                              clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                            }}
                          >
                            ENTER QUEST &gt;&gt;
                          </motion.div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Events Found */}
            {sortedEvents.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-pixel-bg/50 border-4 border-pixel-primary/30"
                style={{
                  clipPath: 'polygon(30px 0%, 100% 0%, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0% 100%, 0% 30px)'
                }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🎮
                </motion.div>
                <h3 className="text-xl font-bold text-pixel-primary pixel-font mb-2">NO QUESTS FOUND</h3>
                <p className="text-pixel-primary/80 mb-6 retro-font">
                  &gt; ADJUST SEARCH PARAMETERS <br />
                  &gt; OR CREATE NEW ADVENTURE
                </p>
                {user && (
                  <Link href="/events/create">
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 25px rgba(0, 255, 65, 0.6)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center space-x-2 bg-pixel-primary text-pixel-bg px-8 py-4 font-bold pixel-font border-2 border-pixel-primary hover:bg-transparent hover:text-pixel-primary transition-all"
                      style={{
                        clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)'
                      }}
                    >
                      <span>➕</span>
                      <span>CREATE FIRST QUEST</span>
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}