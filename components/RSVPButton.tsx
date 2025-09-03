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