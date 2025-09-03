-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  address TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Workshop', 'Networking', 'Meetup', 'Conference', 'Seminar', 'Other')),
  max_attendees INTEGER NOT NULL CHECK (max_attendees > 0),
  organizer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RSVPs table
CREATE TABLE rsvps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('going', 'maybe', 'not_going')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Create notifications table
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('event_reminder', 'new_event', 'rsvp_update', 'event_update')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_tags table for better categorization
CREATE TABLE event_tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, tag)
);

-- Create user_interests table for recommendations
CREATE TABLE user_interests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  interest TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, interest)
);

-- Create event_comments table
CREATE TABLE event_comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_rsvps_event ON rsvps(event_id);
CREATE INDEX idx_rsvps_user ON rsvps(user_id);
CREATE INDEX idx_rsvps_status ON rsvps(status);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_event_tags_event ON event_tags(event_id);
CREATE INDEX idx_event_tags_tag ON event_tags(tag);
CREATE INDEX idx_user_interests_user ON user_interests(user_id);
CREATE INDEX idx_event_comments_event ON event_comments(event_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rsvps_updated_at BEFORE UPDATE ON rsvps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_event_comments_updated_at BEFORE UPDATE ON event_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create RLS (Row Level Security) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Events policies
CREATE POLICY "Anyone can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create events" ON events FOR INSERT WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "Organizers can update their events" ON events FOR UPDATE USING (auth.uid() = organizer_id);
CREATE POLICY "Organizers can delete their events" ON events FOR DELETE USING (auth.uid() = organizer_id);

-- RSVPs policies
CREATE POLICY "Users can view all RSVPs" ON rsvps FOR SELECT USING (true);
CREATE POLICY "Users can manage their own RSVPs" ON rsvps FOR ALL USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Event tags policies
CREATE POLICY "Anyone can view event tags" ON event_tags FOR SELECT USING (true);
CREATE POLICY "Event organizers can manage tags" ON event_tags FOR ALL USING (
  EXISTS (
    SELECT 1 FROM events 
    WHERE events.id = event_tags.event_id 
    AND events.organizer_id = auth.uid()
  )
);

-- User interests policies
CREATE POLICY "Users can manage their own interests" ON user_interests FOR ALL USING (auth.uid() = user_id);

-- Event comments policies
CREATE POLICY "Anyone can view comments" ON event_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON event_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON event_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON event_comments FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', 'New User'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data
INSERT INTO profiles (id, email, name, bio, location) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'john@example.com', 'John Doe', 'Full-stack developer passionate about React and Node.js', 'San Francisco, CA'),
  ('550e8400-e29b-41d4-a716-446655440001', 'jane@example.com', 'Jane Smith', 'UX Designer and event organizer', 'New York, NY'),
  ('550e8400-e29b-41d4-a716-446655440002', 'mike@example.com', 'Mike Johnson', 'AI researcher and tech enthusiast', 'Austin, TX');

INSERT INTO events (id, title, description, date, time, location, address, category, max_attendees, organizer_id, image_url) VALUES
  ('650e8400-e29b-41d4-a716-446655440000', 'React Next.js Workshop', 'Join us for an intensive hands-on workshop covering the latest features in React and Next.js. We''ll build a complete application from scratch, covering server components, app router, and deployment strategies.', '2025-01-15', '18:00', 'Tech Hub Downtown', '123 Innovation Street, Downtown', 'Workshop', 60, '550e8400-e29b-41d4-a716-446655440000', 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop'),
  ('650e8400-e29b-41d4-a716-446655440001', 'Startup Networking Night', 'Connect with fellow entrepreneurs, investors, and startup enthusiasts. Great opportunity to share ideas, find co-founders, and build your network in the startup ecosystem.', '2025-01-20', '19:00', 'Innovation Center', '456 Startup Avenue, Tech District', 'Networking', 100, '550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop'),
  ('650e8400-e29b-41d4-a716-446655440002', 'AI & Machine Learning Meetup', 'Explore the latest trends in artificial intelligence and machine learning. Featuring talks from industry experts and hands-on demos of cutting-edge AI tools.', '2025-01-25', '17:30', 'University Campus', '789 Research Drive, University District', 'Meetup', 50, '550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop');

INSERT INTO rsvps (event_id, user_id, status) VALUES
  ('650e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'going'),
  ('650e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440002', 'maybe'),
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'going'),
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'going');