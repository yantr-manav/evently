// app/events/[id]/page.js
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import RSVPButton from '../../../../components/RSVPButton'
import Link from 'next/link'

export default function EventDetailPage({ params }) {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (params.id) {
      fetchEvent()
    }
  }, [params.id])

  async function fetchEvent() {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          users!events_created_by_fkey(name, email),
          rsvps(id, status, users(name, email))
        `)
        .eq('id', params.id)
        .single()

      if (error) throw error
      
      setEvent(data)
    } catch (error) {
      console.error('Error fetching event:', error)
      setError('Event not found or failed to load.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event...</p>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The event you are looking for does not exist.'}</p>
          <Link href="/events" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  const yesRSVPs = event.rsvps.filter(r => r.status === 'Yes')
  const maybeRSVPs = event.rsvps.filter(r => r.status === 'Maybe')
  const noRSVPs = event.rsvps.filter(r => r.status === 'No')

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/events" className="text-blue-500 hover:underline mb-6 inline-block">
        ← Back to Events
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{event.title}</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Event Details</h2>
              <div className="space-y-3">
                <p className="flex items-center text-gray-600">
                  <span className="mr-2">📅</span>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="mr-2">📍</span>
                  {event.city}
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="mr-2">👤</span>
                  Created by {event.users.name} ({event.users.email})
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">RSVP Status</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-600">✅ Attending:</span>
                  <span className="font-semibold">{yesRSVPs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-600">🤔 Maybe:</span>
                  <span className="font-semibold">{maybeRSVPs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600">❌ Not Attending:</span>
                  <span className="font-semibold">{noRSVPs.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          <div className="mb-8">
            <RSVPButton eventId={event.id} onRSVPChange={fetchEvent} />
          </div>

          {yesRSVPs.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Attendees ({yesRSVPs.length})</h2>
              <div className="grid gap-2">
                {yesRSVPs.map((rsvp, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                      {rsvp.users.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{rsvp.users.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}