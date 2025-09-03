export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About EventPlatform</h1>
        <p className="text-xl text-gray-600">
          Connecting communities through amazing events
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            EventPlatform was created to bridge the gap between event organizers and attendees. 
            We believe that great events bring people together, foster learning, and build stronger communities.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you're looking to attend a tech meetup, organize a workshop, or network with 
            like-minded professionals, EventPlatform makes it simple and accessible.
          </p>
        </div>
        <div className="bg-blue-50 p-8 rounded-lg">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Goal</h3>
            <p className="text-gray-600">
              To make event discovery and participation as seamless as possible for everyone.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center">
          <div className="text-3xl mb-4">🌟</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Events</h3>
          <p className="text-gray-600">
            Curated selection of high-quality events across various categories and interests.
          </p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Community First</h3>
          <p className="text-gray-600">
            Building meaningful connections and fostering collaboration within communities.
          </p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy to Use</h3>
          <p className="text-gray-600">
            Simple, intuitive platform that makes event management and attendance effortless.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Community</h2>
        <p className="text-gray-600 mb-6">
          Ready to discover amazing events or share your own? Join thousands of users who are 
          already connecting through EventPlatform.
        </p>
        <div className="space-x-4">
          <a 
            href="/events"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Browse Events
          </a>
          <a 
            href="/auth/register"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  )
}