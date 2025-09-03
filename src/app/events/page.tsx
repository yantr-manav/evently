'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Plus, Calendar, MapPin, Users, Clock, Sparkles, TrendingUp } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useEventStore } from '@/store/eventStore'
import { useAuthStore } from '@/store/authStore'
import { EventRecommendations } from '@/components/EventRecommendations'
import { LoadingSpinner } from '@/components/LoadingSpinner'

const categories = ['All', 'Workshop', 'Networking', 'Meetup', 'Conference', 'Seminar']

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
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
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Discover Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find amazing events happening in your city and connect with like-minded people
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Search className="w-5 h-5 text-blue-500" />
                <span>Search Events</span>
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Filter className="w-5 h-5 text-purple-500" />
                <span>Categories</span>
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-xl transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Sort */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>Sort By</span>
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Date</option>
                <option value="popularity">Popularity</option>
                <option value="name">Name</option>
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

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Action Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center mb-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {filteredEvents.length} Events Found
                </h2>
                <p className="text-gray-600">
                  {selectedCategory !== 'All' && `in ${selectedCategory}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
              
              {user && (
                <Link href="/events/create">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create Event</span>
                  </motion.div>
                </Link>
              )}
            </motion.div>

            {/* Events Grid */}
            <div ref={ref} className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {sortedEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Link href={`/events/${event.id}`}>
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group-hover:border-blue-300">
                        <div className="relative">
                          <img 
                            src={event.image_url || `https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop`} 
                            alt={event.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                              event.category === 'Workshop' ? 'bg-blue-100 text-blue-700' :
                              event.category === 'Networking' ? 'bg-green-100 text-green-700' :
                              event.category === 'Meetup' ? 'bg-purple-100 text-purple-700' :
                              event.category === 'Conference' ? 'bg-orange-100 text-orange-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {event.category}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                              {Math.round(((event.attendee_count || 0) / event.max_attendees) * 100)}% full
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {event.title}
                          </h3>
                          
                          <div className="space-y-2 text-gray-600 mb-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">
                                {new Date(event.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                              <Clock className="w-4 h-4 text-purple-500 ml-2" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-green-500" />
                              <span className="text-sm truncate">{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-orange-500" />
                              <span className="text-sm">
                                {event.attendee_count || 0}/{event.max_attendees} attending
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                              {[1, 2, 3].map((i) => (
                                <div
                                  key={i}
                                  className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                                >
                                  {String.fromCharCode(65 + i)}
                                </div>
                              ))}
                              {(event.attendee_count || 0) > 3 && (
                                <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium">
                                  +{(event.attendee_count || 0) - 3}
                                </div>
                              )}
                            </div>
                            
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="text-blue-600 group-hover:text-purple-600 transition-colors"
                            >
                              <Sparkles className="w-5 h-5" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {sortedEvents.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search criteria or create a new event!
                </p>
                {user && (
                  <Link href="/events/create">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Create First Event</span>
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