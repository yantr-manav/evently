interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

class CacheManager {
  private cache = new Map<string, CacheItem<any>>()
  private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    const now = Date.now()
    const isExpired = now - item.timestamp > item.ttl

    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  has(key: string): boolean {
    const item = this.cache.get(key)
    
    if (!item) {
      return false
    }

    const now = Date.now()
    const isExpired = now - item.timestamp > item.ttl

    if (isExpired) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Get all keys matching a pattern
  getKeys(pattern?: string): string[] {
    const keys = Array.from(this.cache.keys())
    
    if (!pattern) {
      return keys
    }

    return keys.filter(key => key.includes(pattern))
  }

  // Invalidate cache entries by pattern
  invalidatePattern(pattern: string): void {
    const keysToDelete = this.getKeys(pattern)
    keysToDelete.forEach(key => this.delete(key))
  }

  // Get cache statistics
  getStats() {
    const now = Date.now()
    let validEntries = 0
    let expiredEntries = 0

    this.cache.forEach((item) => {
      const isExpired = now - item.timestamp > item.ttl
      if (isExpired) {
        expiredEntries++
      } else {
        validEntries++
      }
    })

    return {
      totalEntries: this.cache.size,
      validEntries,
      expiredEntries,
      hitRate: validEntries / (validEntries + expiredEntries) || 0
    }
  }

  // Cleanup expired entries
  cleanup(): void {
    const now = Date.now()
    const keysToDelete: string[] = []

    this.cache.forEach((item, key) => {
      const isExpired = now - item.timestamp > item.ttl
      if (isExpired) {
        keysToDelete.push(key)
      }
    })

    keysToDelete.forEach(key => this.cache.delete(key))
  }
}

// Create singleton instance
export const cache = new CacheManager()

// Auto cleanup every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    cache.cleanup()
  }, 10 * 60 * 1000)
}

// Cache keys constants
export const CACHE_KEYS = {
  EVENTS: 'events',
  EVENT_DETAIL: (id: string) => `event_${id}`,
  USER_PROFILE: (id: string) => `profile_${id}`,
  USER_EVENTS: (id: string) => `user_events_${id}`,
  EVENT_ATTENDEES: (id: string) => `attendees_${id}`,
  CATEGORIES: 'categories',
  SEARCH_RESULTS: (query: string) => `search_${query}`,
} as const

// Cache TTL constants (in milliseconds)
export const CACHE_TTL = {
  SHORT: 2 * 60 * 1000,      // 2 minutes
  MEDIUM: 5 * 60 * 1000,     // 5 minutes
  LONG: 15 * 60 * 1000,      // 15 minutes
  VERY_LONG: 60 * 60 * 1000, // 1 hour
} as const