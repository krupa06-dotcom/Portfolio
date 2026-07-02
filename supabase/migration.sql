-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Experiences table (internships + hackathons)
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  type TEXT NOT NULL CHECK (type IN ('internship', 'hackathon')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Messages table (contact form submissions)
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row-Level Security (optional — read-only for anon)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads on projects and experiences
CREATE POLICY "Allow anonymous read projects"
  ON projects FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous read experiences"
  ON experiences FOR SELECT TO anon USING (true);

-- Allow anonymous inserts to messages
CREATE POLICY "Allow anonymous insert messages"
  ON messages FOR INSERT TO anon WITH CHECK (true);

-- Seed data: internships
INSERT INTO experiences (role, company, description, start_date, end_date, type)
VALUES
  (
    'UI/UX Designer',
    'Droid Web Solutions',
    'Designed and prototyped user interfaces for client web applications. Collaborated with developers to ensure pixel-perfect implementation.',
    '2024-06-01',
    '2024-08-31',
    'internship'
  ),
  (
    'Python Developer Intern',
    'Shree Drashti Infotech LLP',
    'Built backend automation scripts and contributed to internal tooling using Python. Worked with SQL databases and REST APIs.',
    '2023-12-01',
    '2024-03-31',
    'internship'
  );

-- Seed data: projects
INSERT INTO projects (title, description, url, image_url, tags, featured)
VALUES
  (
    'Smiles NGO',
    'NGO website — donation/awareness platform built with Next.js and integrated payment gateway.',
    'https://smiles-ngo.vercel.app/',
    'https://smiles-ngo.vercel.app/og-image.jpg',
    ARRAY['NEXT.JS', 'NODE', 'STRIPE'],
    true
  ),
  (
    'Sherdil Amritsar Kulche & Punjabi Dhaba',
    'Restaurant/catering business website with menu management, online ordering, and location info.',
    'https://sherdil-dhaba.vercel.app/',
    'https://sherdil-dhaba.vercel.app/og-image.jpg',
    ARRAY['REACT', 'NODE', 'MONGODB'],
    true
  ),
  (
    'Prakarsh',
    'College fest / university initiative website — event scheduling, registration, and live updates.',
    'https://www.prakarsh.org/',
    'https://www.prakarsh.org/og-image.jpg',
    ARRAY['NEXT.JS', 'SUPABASE', 'TAILWIND'],
    true
  );
