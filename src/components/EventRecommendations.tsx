'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp, Clock, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { useEventStore } from '@/store/eventStore'

interface RecommendedEvent {
  id: string
  title: string
  date: string
  time: string
  location: string
  category: string
  attendees: number
  maxAttendees: number
  matchScore: number
  reasons: string[]
}

export function EventRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendedEvent[]>([])
  const [loading, setLoading] = useState(true)
  const { user, profile } = useAuthStore()
  const { events } = useEventStore()

  useEffect(() => {
    if (user && events.length > 0) {
      generateRecommendations()
    }
  }, [user, events])

  const generateRecommendations = async () => {
    setLoading(true)
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simple recommendation algorithm based on user preferences
    const userInterests = profile?.bio?.toLowerCase() || ''
    const userLocation = profile?.location || ''
    
    const scoredEvents = events.map(event => {
      let score = 0
      const reasons: string[] = []
      
      // Location matching
      if (userLocation && event.location.toLowerCase().includes(userLocation.toLowerCase())) {
        score += 30
        reasons.push('Near your location')
      }
      
      // Interest matching
      if (userInterests.includes('tech') && event.category.toLowerCase().includes('tech')) {
        score += 25
        reasons.push('Matches your tech interests')
      }
      
      if (userInterests.includes('network') && event.category === 'Networking') {
        score += 25
        reasons.push('Great for networking')
      }
      
      // Popularity boost
      const attendanceRate = (event.attendee_count || 0) / event.max_attendees
      if (attendanceRate > 0.7) {
        score += 15
        reasons.push('Popular event')
      }
      
      // Time preference (weekends get slight boost)
      const eventDate = new Date(event.date)
      const dayOfWeek = eventDate.getDay()
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        score += 10
        reasons.push('Weekend event')
      }
      
      // Upcoming events get priority
      const daysUntilEvent = Math.ceil((eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      if (daysUntilEvent <= 7) {
        score += 20
        reasons.push('Coming up soon')
      }
      
      return {
        ...event,
        matchScore: score,
        reasons: reasons.slice(0, 2) // Limit to 2 reasons
      }
    })
    
    // Sort by score and take top 3
    const topRecommendations = scoredEvents
      .filter(event => event.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3)
      .map(event => ({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        category: event.category,
        attendees: event.attendee_count || 0,
        maxAttendees: event.max_attendees,
        matchScore: event.matchScore,
        reasons: event.reasons
      }))
    
    setRecommendations(topRecommendations)
    setLoading(false)
  }

  if (!user || loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
      >
        <div className="flex items-center space-x-2 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-purple-500" />
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-800">AI Recommendations</h3>
        </div>
        
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-800">AI Recommendations</h3>
        </div>
        <p className="text-gray-600">No recommendations available. Try updating your profile with interests!</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
    >
      <div className="flex items-center space-x-2 mb-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-5 h-5 text-purple-500" />
        </motion.div>
        <h3 className="text-lg font-semibold text-gray-800">Recommended for You</h3>
        <div className="flex items-center space-x-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
          <TrendingUp className="w-3 h-3" />
          <span>AI Powered</span>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {recommendations.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="group"
            >
              <Link href={`/events/${event.id}`}>
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 border border-blue-100 group-hover:border-blue-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {event.title}
                    </h4>
                    <div className="flex items-center space-x-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      <span>{event.matchScore}%</span>
                      <span>match</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{event.attendees}/{event.maxAttendees}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {event.reasons.map((reason, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={generateRecommendations}
        className="w-full mt-4 py-2 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
      >
        Refresh Recommendations
      </motion.button>
    </motion.div>
  )
}