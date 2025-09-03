import Link from 'next/link'
import { notFound } from 'next/navigation'

// Mock data - replace with actual data fetching
const getEvent = (id: string) => {
  const events = [
    {
      id: 1,
      title: "React Next.js Workshop",
      date: "2025-01-15",
      time: "18:00",
      location: "Tech Hub Downtown",
      address: "123 Innovation Street, Downtown",
      attendees: 45,
      maxAttendees: 60,
      category: "Workshop",
      description: "Join us for an intensive hands-on workshop covering the latest features in React and Next.js. We'll build a complete application from scratch, covering server components, app router, and deployment strategies.",
      organizer: "Tech Community Hub",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop",
      agenda: [
        "18:00 - Welcome & Networking",
        "18:30 - Introduction to Next.js 15",
        "19:00 - Building with Server Components",
        "20:00 - Break",
        "20:15 - Deployment & Best Practices",
        "21:00 - Q&A Session"
      ]
    }
  ]
  
  return events.find(event => event.id === parseInt(id))
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = getEvent(params.id)
  
  if (!event) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/events"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Events
      </Link>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-64 md:h-80 object-cover"
        />
        
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {event.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>
              
              <div className="space-y-3 text-gray-600 mb-6">
                <p className="flex items-center gap-2">
                  <span>📅</span>
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {event.time}
                </p>
                <p className="flex items-center gap-2">
                  <span>📍</span>
                  {event.location}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <span>🏢</span>
                  {event.address}
                </p>
                <p className="flex items-center gap-2">
                  <span>👥</span>
                  {event.attendees} of {event.maxAttendees} spots filled
                </p>
                <p className="flex items-center gap-2">
                  <span>👤</span>
                  Organized by {event.organizer}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">About This Event</h2>
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Agenda</h2>
                <ul className="space-y-2">
                  {event.agenda.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:w-80">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Attendance</span>
                    <span className="text-sm font-medium">
                      {Math.round((event.attendees / event.maxAttendees) * 100)}% full
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                    ✅ Going
                  </button>
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                    ❓ Maybe
                  </button>
                  <button className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                    ❌ Can't Go
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg font-medium transition-colors">
                    Share Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}