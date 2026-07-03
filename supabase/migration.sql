-- projects (shown on Home + /projects)
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  url text not null,
  cover_image_url text,
  tags text[],
  is_featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- experience (internships)
create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  description text,
  start_date date,
  end_date date,
  sort_order int default 0
);

-- hackathons
create table if not exists hackathons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  result text,
  date date,
  url text,
  sort_order int default 0
);

-- messages (contact form)
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now(),
  is_read boolean default false
);

-- profile (single row — bio, resume, headshot)
create table if not exists profile (
  id int primary key default 1,
  bio text,
  headshot_url text,
  resume_url text,
  skills text[],
  constraint single_row check (id = 1)
);

-- Row-Level Security
alter table projects enable row level security;
alter table experience enable row level security;
alter table hackathons enable row level security;
alter table messages enable row level security;
alter table profile enable row level security;

-- Public select on projects, experience, hackathons, profile
create policy "Public select projects" on projects for select to anon using (true);
create policy "Public select experience" on experience for select to anon using (true);
create policy "Public select hackathons" on hackathons for select to anon using (true);
create policy "Public select profile" on profile for select to anon using (true);

-- Public insert-only on messages (no public select/update/delete)
create policy "Public insert messages" on messages for insert to anon with check (true);

-- Seed data: experience (internships)
insert into experience (role, company, description, start_date, end_date, sort_order) values
  (
    'UI/UX Designer',
    'Droid Web Solutions',
    'Designed and prototyped user interfaces for client web applications. Collaborated with developers to ensure pixel-perfect implementation.',
    '2024-06-01',
    '2024-08-31',
    1
  ),
  (
    'Python Developer Intern',
    'Shree Drashti Infotech LLP',
    'Built backend automation scripts and contributed to internal tooling using Python. Worked with SQL databases and REST APIs.',
    '2023-12-01',
    '2024-03-31',
    2
  );

-- Seed data: projects
insert into projects (title, description, url, cover_image_url, tags, is_featured, sort_order) values
  (
    'Smiles NGO',
    'NGO website — donation/awareness platform built with Next.js and integrated payment gateway.',
    'https://smiles-ngo.vercel.app/',
    'https://smiles-ngo.vercel.app/og-image.jpg',
    array['NEXT.JS', 'NODE', 'STRIPE'],
    true,
    1
  ),
  (
    'Sherdil Amritsar Kulche & Punjabi Dhaba',
    'Restaurant/catering business website with menu management, online ordering, and location info.',
    'https://sherdil-dhaba.vercel.app/',
    'https://sherdil-dhaba.vercel.app/og-image.jpg',
    array['REACT', 'NODE', 'MONGODB'],
    true,
    2
  ),
  (
    'Prakarsh',
    'College fest / university initiative website — event scheduling, registration, and live updates.',
    'https://www.prakarsh.org/',
    'https://www.prakarsh.org/og-image.jpg',
    array['NEXT.JS', 'SUPABASE', 'TAILWIND'],
    true,
    3
  );

-- Seed profile
insert into profile (id, bio, skills) values (
  1,
  'Full-stack developer and UI/UX designer who builds end-to-end products.',
  array['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Next.js', 'SQL', 'PHP']
) on conflict (id) do nothing;
