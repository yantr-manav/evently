// package.json
{
  "name": "event-platform",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.3",
    "react": "^18",
    "react-dom": "^18",
    "@supabase/supabase-js": "^2.38.4"
  },
  "devDependencies": {
    "eslint": "^8",
    "eslint-config-next": "14.0.3"
  }
}

// app/layout.js
import './globals.css'

export const metadata = {
  title: 'Event Platform',
  description: 'RSVP to amazing events in your city',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-blue-600">EventPlatform</h1>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}

// app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

// app/page.js
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">
        Welcome to EventPlatform
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover amazing events in your city and connect with like-minded people. 
        RSVP to events and never miss out on great opportunities.
      </p>
      <Link 
        href="/events" 
        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold inline-block transition-colors"
      >
        Browse Events
      </Link>
      
      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl mb-4">📅</div>
          <h3 className="text-xl font-semibold mb-2">Discover Events</h3>
          <p className="text-gray-600">Find tech meetups, workshops, and networking events in your area</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl mb-4">✅</div>
          <h3 className="text-xl font-semibold mb-2">Easy RSVP</h3>
          <p className="text-gray-600">Simple one-click RSVP system with Yes, No, or Maybe options</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold mb-2">Network</h3>
          <p className="text-gray-600">Connect with fellow professionals and expand your network</p>
        </div>
      </div>
    </div>
  )
}

// app/events/page.js
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import EventCard from '../../components/EventCard'

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          users!events_created_by_fkey(name, email),
          rsvps(status)
        `)
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true })

      if (error) throw error
      
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
      setError('Failed to load events. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchEvents}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Upcoming Events</h1>
        <p className="text-gray-600">{events.length} events found</p>
      </div>
      
      {events.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">No upcoming events found.</p>
          <p className="text-gray-500 mt-2">Check back later for new events!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

// app/events/[id]/page.js
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import RSVPButton from '../../../components/RSVPButton'
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

// components/EventCard.js
import Link from 'next/link'

export default function EventCard({ event }) {
  const yesCount = event.rsvps.filter(r => r.status === 'Yes').length
  const maybeCount = event.rsvps.filter(r => r.status === 'Maybe').length

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{event.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
      
      <div className="space-y-2 text-sm text-gray-500 mb-4">
        <p className="flex items-center">
          <span className="mr-2">📅</span>
          {new Date(event.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
        <p className="flex items-center">
          <span className="mr-2">📍</span>
          {event.city}
        </p>
        <p className="flex items-center">
          <span className="mr-2">👤</span>
          Created by {event.users.name}
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          <span className="text-green-600 font-semibold">{yesCount}</span> attending
          {maybeCount > 0 && (
            <span className="ml-2">
              <span className="text-yellow-600 font-semibold">{maybeCount}</span> maybe
            </span>
          )}
        </div>
      </div>

      <Link 
        href={`/events/${event.id}`}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-center block"
      >
        View Details & RSVP
      </Link>
    </div>
  )
}

// components/RSVPButton.js
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function RSVPButton({ eventId, onRSVPChange }) {
  const [currentRSVP, setCurrentRSVP] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Check if user email is stored in localStorage
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) {
      setUserEmail(storedEmail)
      checkExistingRSVP(storedEmail)
    } else {
      setShowEmailInput(true)
    }
  }, [eventId])

  async function checkExistingRSVP(email) {
    try {
      // First get user by email
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single()

      if (userError || !user) return

      // Then check for existing RSVP
      const { data: rsvp, error: rsvpError } = await supabase
        .from('rsvps')
        .select('status')
        .eq('user_id', user.id)
        .eq('event_id', eventId)
        .single()

      if (rsvpError || !rsvp) return

      setCurrentRSVP(rsvp.status)
    } catch (error) {
      console.error('Error checking existing RSVP:', error)
    }
  }

  async function handleRSVP(status) {
    if (!userEmail) {
      setMessage('Please enter your email address')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      // First, find or create user
      let { data: user, error: userError } = await supabase
        .from('users')
        .select('id, name')
        .eq('email', userEmail)
        .single()

      if (userError && userError.code === 'PGRST116') {
        // User doesn't exist, create new user
        const userName = userEmail.split('@')[0] // Simple name from email
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({ name: userName, email: userEmail })
          .select('id, name')
          .single()

        if (createError) throw createError
        user = newUser
      } else if (userError) {
        throw userError
      }

      // Check if RSVP already exists
      const { data: existingRSVP, error: checkError } = await supabase
        .from('rsvps')
        .select('id')
        .eq('user_id', user.id)
        .eq('event_id', eventId)
        .single()

      if (existingRSVP) {
        // Update existing RSVP
        const { error: updateError } = await supabase
          .from('rsvps')
          .update({ status })
          .eq('id', existingRSVP.id)

        if (updateError) throw updateError
      } else {
        // Create new RSVP
        const { error: insertError } = await supabase
          .from('rsvps')
          .insert({
            user_id: user.id,
            event_id: eventId,
            status
          })

        if (insertError) throw insertError
      }

      setCurrentRSVP(status)
      localStorage.setItem('userEmail', userEmail)
      setShowEmailInput(false)
      setMessage(`Successfully updated RSVP to "${status}"`)
      
      // Refresh the event data
      if (onRSVPChange) {
        onRSVPChange()
      }

    } catch (error) {
      console.error('Error updating RSVP:', error)
      setMessage('Failed to update RSVP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const buttonClass = (status) => {
    const baseClass = "px-4 py-2 rounded font-semibold transition-colors "
    if (currentRSVP === status) {
      switch (status) {
        case 'Yes': return baseClass + "bg-green-500 text-white"
        case 'Maybe': return baseClass + "bg-yellow-500 text-white"
        case 'No': return baseClass + "bg-red-500 text-white"
      }
    }
    return baseClass + "bg-gray-200 text-gray-700 hover:bg-gray-300"
  }

  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">RSVP to this event</h3>
      
      {showEmailInput && (
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your email to RSVP:
          </label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      )}

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => handleRSVP('Yes')}
          disabled={loading}
          className={buttonClass('Yes')}
        >
          ✅ Yes, I'll attend
        </button>
        <button
          onClick={() => handleRSVP('Maybe')}
          disabled={loading}
          className={buttonClass('Maybe')}
        >
          🤔 Maybe
        </button>
        <button
          onClick={() => handleRSVP('No')}
          disabled={loading}
          className={buttonClass('No')}
        >
          ❌ Can't attend
        </button>
      </div>

      {loading && (
        <div className="text-blue-600">
          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          Updating RSVP...
        </div>
      )}

      {message && (
        <p className={`text-sm ${message.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      {userEmail && !showEmailInput && (
        <div className="mt-4 text-sm text-gray-600">
          RSVPing as: {userEmail}
          <button
            onClick={() => {
              localStorage.removeItem('userEmail')
              setUserEmail('')
              setShowEmailInput(true)
              setCurrentRSVP(null)
            }}
            className="ml-2 text-blue-500 hover:underline"
          >
            Change email
          </button>
        </div>
      )}
    </div>
  )
}

// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

// README.md
# Event Platform - PixaBeam Assessment

A modern event management platform built with Next.js and Supabase.

## Features

- 📅 Browse upcoming events
- ✅ Simple RSVP system (Yes/Maybe/No)
- 👤 User management with email-based authentication
- 📱 Responsive design for all devices
- ⚡ Real-time RSVP counts
- 🔄 Live event updates

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database, API, Authentication)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd event-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key
   - Run the database setup SQL (provided in assessment documentation)

4. **Environment Variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses three main tables:

- **Users**: Store user information (id, name, email, created_at)
- **Events**: Store event details with foreign key to creator
- **RSVPs**: Many-to-many relationship between users and events

## Key Features Implemented

### Event Listing
- Displays all upcoming events
- Shows RSVP counts for each event
- Responsive grid layout

### Event Details
- Comprehensive event information
- Real-time attendee list
- RSVP functionality

### RSVP System
- Email-based user identification
- Three status options: Yes, Maybe, No
- Prevents duplicate RSVPs
- Updates counts in real-time

## Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Database Security
- Row Level Security (RLS) enabled on all tables
- Proper foreign key constraints
- Input validation and sanitization

## API Endpoints Used

The application uses Supabase's auto-generated REST API:

- `GET /events` - Fetch upcoming events with creator and RSVP data
- `GET /events/:id` - Fetch specific event details
- `POST/PUT /rsvps` - Create or update user RSVP
- `POST /users` - Create new users

## Performance Optimizations

- Database indexing on frequently queried columns
- Efficient JOIN queries to minimize API calls
- Client-side state management
- Responsive images and lazy loading

## Future Enhancements

- User authentication with Supabase Auth
- Event creation interface
- Email notifications
- Event categories and filtering
- Calendar integration
- Social sharing features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for the PixaBeam assessment and is for demonstration purposes.

---

**Created by**: [Your Name]  
**Assessment for**: PixaBeam Database Management Role  
**Date**: August 30, 2025