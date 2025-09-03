# EventFlow - Modern Event Discovery Platform

A beautiful, feature-rich event platform built with Next.js 15, Supabase, and modern UI/UX design principles.

## ✨ Features

### 🎯 Core Features
- **Event Discovery**: Browse and search events with advanced filtering
- **Smart Recommendations**: AI-powered event suggestions based on user preferences
- **Real-time RSVP**: Instant event registration with live attendance tracking
- **User Profiles**: Comprehensive user management with event history
- **Event Creation**: Easy-to-use event creation with rich details

### 🤖 AI & Intelligence
- **Intelligent Chatbot**: 24/7 assistant to help users navigate the platform
- **Personalized Recommendations**: Machine learning-based event matching
- **Smart Notifications**: Real-time updates about events and RSVPs
- **Advanced Search**: Semantic search with auto-suggestions

### 🎨 Modern UI/UX
- **Stunning Animations**: Framer Motion powered smooth transitions
- **Responsive Design**: Perfect experience on all devices
- **Dark/Light Themes**: Adaptive design with beautiful gradients
- **Micro-interactions**: Delightful user interactions throughout
- **Glass Morphism**: Modern backdrop blur effects

### 🔧 Technical Features
- **Authentication**: Secure user auth with Supabase
- **Real-time Updates**: Live data synchronization
- **Caching System**: Intelligent caching for optimal performance
- **Progressive Web App**: Installable with offline capabilities
- **SEO Optimized**: Server-side rendering with Next.js 15

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eventflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
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

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── auth/              # Authentication pages
│   ├── events/            # Event-related pages
│   ├── profile/           # User profile pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── Navbar.tsx         # Navigation component
│   ├── Chatbot.tsx        # AI chatbot
│   ├── NotificationCenter.tsx
│   └── EventRecommendations.tsx
├── lib/                   # Utility libraries
│   ├── supabase.ts        # Supabase client
│   └── cache.ts           # Caching system
├── store/                 # State management
│   ├── authStore.ts       # Authentication state
│   └── eventStore.ts      # Event state
└── styles/                # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Blue to Purple gradient (`from-blue-500 to-purple-500`)
- **Secondary**: Various accent colors for categories
- **Background**: Subtle gradients with glass morphism effects

### Typography
- **Font**: Inter for body text, JetBrains Mono for code
- **Hierarchy**: Clear typographic scale with proper contrast

### Components
- **Buttons**: Gradient backgrounds with hover animations
- **Cards**: Glass morphism with subtle shadows
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with backdrop blur

## 🔧 Key Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **State Management**: Zustand
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📱 Features Deep Dive

### AI Chatbot
The intelligent chatbot helps users:
- Find relevant events
- Get platform guidance
- Answer common questions
- Provide personalized recommendations

### Smart Recommendations
AI-powered system that considers:
- User location and preferences
- Event popularity and ratings
- Past attendance history
- Social connections

### Real-time Notifications
Stay updated with:
- Event reminders
- RSVP confirmations
- New event alerts
- Social interactions

### Advanced Caching
Optimized performance through:
- In-memory caching with TTL
- Smart cache invalidation
- Background data refresh
- Offline-first approach

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed on any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the amazing backend-as-a-service
- **Vercel** for Next.js and deployment platform
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for beautiful animations
- **Lucide** for the icon library

## 📞 Support

For support, email support@eventflow.com or join our Discord community.

---

Built with ❤️ by the EventFlow team