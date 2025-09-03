'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useEventStore } from '@/store/eventStore'

export function Providers({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore(state => state.initialize)
  const fetchEvents = useEventStore(state => state.fetchEvents)

  useEffect(() => {
    initialize()
    fetchEvents()
  }, [initialize, fetchEvents])

  return <>{children}</>
}