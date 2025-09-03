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