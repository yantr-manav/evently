import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  address: string
  category: string
  max_attendees: number
  organizer_id: string
  image_url: string | null
  created_at: string
  updated_at: string
  attendee_count?: number
  user_rsvp?: string | null
}

interface EventState {
  events: Event[]
  loading: boolean
  selectedCategory: string
  searchQuery: string
  fetchEvents: () => Promise<void>
  createEvent: (eventData: any) => Promise<{ error?: string }>
  updateRSVP: (eventId: string, status: 'going' | 'maybe' | 'not_going') => Promise<{ error?: string }>
  setSelectedCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  getFilteredEvents: () => Event[]
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  loading: false,
  selectedCategory: 'all',
  searchQuery: '',

  fetchEvents: async () => {
    set({ loading: true })
    try {
      const { data: events, error } = await supabase
        .from('events')
        .select(`
          *,
          rsvps!inner(status)
        `)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })

      if (error) throw error

      // Process events to add attendee counts and user RSVP status
      const processedEvents = events?.map(event => ({
        ...event,
        attendee_count: event.rsvps?.filter((rsvp: any) => rsvp.status === 'going').length || 0,
        user_rsvp: null // Will be set when user is logged in
      })) || []

      set({ events: processedEvents, loading: false })
    } catch (error) {
      console.error('Error fetching events:', error)
      set({ loading: false })
    }
  },

  createEvent: async (eventData: any) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single()

      if (error) return { error: error.message }

      // Refresh events
      get().fetchEvents()
      return {}
    } catch (error) {
      return { error: 'An unexpected error occurred' }
    }
  },

  updateRSVP: async (eventId: string, status: 'going' | 'maybe' | 'not_going') => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return { error: 'Not authenticated' }

      const { error } = await supabase
        .from('rsvps')
        .upsert({
          event_id: eventId,
          user_id: user.id,
          status,
          updated_at: new Date().toISOString()
        })

      if (error) return { error: error.message }

      // Refresh events
      get().fetchEvents()
      return {}
    } catch (error) {
      return { error: 'An unexpected error occurred' }
    }
  },

  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category })
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
  },

  getFilteredEvents: () => {
    const { events, selectedCategory, searchQuery } = get()
    
    return events.filter(event => {
      const matchesCategory = selectedCategory === 'all' || event.category.toLowerCase() === selectedCategory.toLowerCase()
      const matchesSearch = searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesCategory && matchesSearch
    })
  },
}))