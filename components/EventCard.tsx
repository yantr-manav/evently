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
