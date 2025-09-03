'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { PixelIcon } from '@/components/PixelIcon'

// Mock user data
const userData = {
  name: 'PIXEL_WARRIOR',
  email: 'pixel.warrior@domain.com',
  bio: 'LEGENDARY QUEST MASTER | LEVEL 42 DEVELOPER | SPECIALIZES IN REACT & NODE.JS DUNGEONS',
  location: 'SAN FRANCISCO DIGITAL REALM',
  joinDate: '2024-03-15',
  eventsAttended: 12,
  eventsCreated: 3,
  level: 42,
  experience: 8750,
  nextLevelExp: 10000,
  achievements: ['FIRST_QUEST', 'NETWORK_MASTER', 'CODE_WARRIOR', 'EVENT_CREATOR']
}

// Mock events data
const myEvents = [
  {
    id: 1,
    title: 'REACT NEXT.JS WORKSHOP QUEST',
    date: '2025-01-15',
    status: 'going',
    type: 'attending',
    difficulty: 'MEDIUM',
    reward: 150
  },
  {
    id: 2,
    title: 'STARTUP NETWORKING RAID',
    date: '2025-01-20',
    status: 'maybe',
    type: 'attending',
    difficulty: 'EASY',
    reward: 100
  },
  {
    id: 3,
    title: 'JAVASCRIPT FUNDAMENTALS DUNGEON',
    date: '2024-12-10',
    status: 'completed',
    type: 'created',
    difficulty: 'HARD',
    reward: 300
  }
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTa
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h1 className="text-xl font-bold text-gray-800">{userData.name}</h1>
              <p className="text-gray-600">{userData.email}</p>
            </div>

            {!isEditing ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Bio</h3>
                  <p className="text-gray-600 text-sm">{userData.bio}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Location</h3>
                  <p className="text-gray-600 text-sm">📍 {userData.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Member Since</h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(userData.joinDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{userData.eventsAttended}</div>
                  <div className="text-sm text-gray-600">Events Attended</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{userData.eventsCreated}</div>
                  <div className="text-sm text-gray-600">Events Created</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Events */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Events</h2>
            
            <div className="mb-6">
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                  All Events
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Attending
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Created
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {myEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Link href={`/events/${event.id}`} className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                        {event.title}
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">
                        📅 {new Date(event.date).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          event.type === 'created' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {event.type === 'created' ? 'Created by you' : 'Attending'}
                        </span>
                        {event.status === 'going' && (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                            ✅ Going
                          </span>
                        )}
                        {event.status === 'maybe' && (
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                            ❓ Maybe
                          </span>
                        )}
                        {event.status === 'completed' && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                            ✓ Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link 
                href="/events"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Browse more events →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}