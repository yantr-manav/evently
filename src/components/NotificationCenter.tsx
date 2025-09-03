'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, Calendar, Users, Star, Clock } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

interface Notification {
  id: string
  type: 'event_reminder' | 'new_event' | 'rsvp_update' | 'event_update'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) {
      // Simulate real-time notifications
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'event_reminder',
          title: 'Event Reminder',
          message: 'React Next.js Workshop starts in 2 hours',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          read: false,
          actionUrl: '/events/1'
        },
        {
          id: '2',
          type: 'new_event',
          title: 'New Event Available',
          message: 'AI & Machine Learning Meetup has been added to your area',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          read: false,
          actionUrl: '/events/3'
        },
        {
          id: '3',
          type: 'rsvp_update',
          title: 'RSVP Confirmed',
          message: 'Your RSVP for Startup Networking Night has been confirmed',
          timestamp: new Date(Date.now() - 60 * 60 * 1000),
          read: true,
          actionUrl: '/events/2'
        }
      ]

      setNotifications(mockNotifications)

      // Simulate new notifications coming in
      const interval = setInterval(() => {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'new_event',
          title: 'New Event Match',
          message: 'We found a new event that matches your interests!',
          timestamp: new Date(),
          read: false,
          actionUrl: '/events'
        }

        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]) // Keep only 10 notifications
      }, 30000) // New notification every 30 seconds

      return () => clearInterval(interval)
    }
  }, [user])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'event_reminder':
        return <Clock className="w-4 h-4 text-orange-500" />
      case 'new_event':
        return <Calendar className="w-4 h-4 text-blue-500" />
      case 'rsvp_update':
        return <Users className="w-4 h-4 text-green-500" />
      case 'event_update':
        return <Star className="w-4 h-4 text-purple-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  if (!user) return null

  return (
    <>
      {/* Notification Bell */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Notifications</h2>
                    <p className="text-white/80 text-sm">
                      {unreadCount} unread notifications
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                
                {unreadCount > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={markAllAsRead}
                    className="mt-3 text-sm text-white/80 hover:text-white underline"
                  >
                    Mark all as read
                  </motion.button>
                )}
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Bell className="w-12 h-12 mb-4 opacity-50" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-3">
                    <AnimatePresence>
                      {notifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 300 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            notification.read
                              ? 'bg-gray-50 border-gray-200'
                              : 'bg-blue-50 border-blue-200 shadow-sm'
                          }`}
                          onClick={() => {
                            markAsRead(notification.id)
                            if (notification.actionUrl) {
                              window.location.href = notification.actionUrl
                            }
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <h4 className={`text-sm font-medium ${
                                  notification.read ? 'text-gray-700' : 'text-gray-900'
                                }`}>
                                  {notification.title}
                                </h4>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeNotification(notification.id)
                                  }}
                                  className="text-gray-400 hover:text-gray-600 ml-2"
                                >
                                  <X className="w-4 h-4" />
                                </motion.button>
                              </div>
                              
                              <p className={`text-sm mt-1 ${
                                notification.read ? 'text-gray-500' : 'text-gray-700'
                              }`}>
                                {notification.message}
                              </p>
                              
                              <p className="text-xs text-gray-400 mt-2">
                                {formatTimestamp(notification.timestamp)}
                              </p>
                            </div>
                          </div>
                          
                          {!notification.read && (
                            <div className="absolute top-4 right-12 w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}