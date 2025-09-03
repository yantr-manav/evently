'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Clock, X, Users } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useEventStore } from '@/store/eventStore'
import toast from 'react-hot-toast'

interface RSVPButtonProps {
  eventId: string
  currentStatus?: 'going' | 'maybe' | 'not_going' | null
  attendeeCount?: number
  maxAttendees?: number
}

export function RSVPButton({ eventId, currentStatus, attendeeCount = 0, maxAttendees = 0 }: RSVPButtonProps) {
  const [loading, setLoading] = useState(false)
  const { user } = useAuthStore()
  const { updateRSVP } = useEventStore()

  const handleRSVP = async (status: 'going' | 'maybe' | 'not_going') => {
    if (!user) {
      toast.error('Please sign in to RSVP')
      return
    }

    setLoading(true)
    try {
      const { error } = await updateRSVP(eventId, status)
      
      if (error) {
        toast.error(error)
      } else {
        const statusText = status === 'going' ? 'Going' : status === 'maybe' ? 'Maybe' : 'Not Going'
        toast.success(`RSVP updated to ${statusText}`)
      }
    } catch (error) {
      toast.error('Failed to update RSVP')
    } finally {
      setLoading(false)
    }
  }

  const getButtonStyle = (status: 'going' | 'maybe' | 'not_going') => {
    const isActive = currentStatus === status
    const baseClasses = "flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
    
    if (isActive) {
      switch (status) {
        case 'going':
          return `${baseClasses} bg-green-500 text-white shadow-lg`
        case 'maybe':
          return `${baseClasses} bg-yellow-500 text-white shadow-lg`
        case 'not_going':
          return `${baseClasses} bg-red-500 text-white shadow-lg`
      }
    }
    
    return `${baseClasses} bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300`
  }

  const getIcon = (status: 'going' | 'maybe' | 'not_going') => {
    switch (status) {
      case 'going':
        return <Check className="w-5 h-5" />
      case 'maybe':
        return <Clock className="w-5 h-5" />
      case 'not_going':
        return <X className="w-5 h-5" />
    }
  }

  const getLabel = (status: 'going' | 'maybe' | 'not_going') => {
    switch (status) {
      case 'going':
        return 'Going'
      case 'maybe':
        return 'Maybe'
      case 'not_going':
        return "Can't Go"
    }
  }

  if (!user) {
    return (
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <p className="text-gray-600 text-center">
          Please sign in to RSVP to this event
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">RSVP Status</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{attendeeCount}/{maxAttendees} attending</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(['going', 'maybe', 'not_going'] as const).map((status) => (
          <motion.button
            key={status}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRSVP(status)}
            disabled={loading}
            className={getButtonStyle(status)}
          >
            {getIcon(status)}
            <span>{getLabel(status)}</span>
          </motion.button>
        ))}
      </div>

      {loading && (
        <div className="mt-4 flex items-center justify-center space-x-2 text-blue-600">
          <div className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-sm">Updating RSVP...</span>
        </div>
      )}

      {currentStatus && (
        <div className="mt-4 text-center text-sm text-gray-600">
          Your current status: <span className="font-semibold">{getLabel(currentStatus)}</span>
        </div>
      )}
    </div>
  )
}