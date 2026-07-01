-- ─────────────────────────────────────────────────────────────
-- Portfolio schema — run in the Supabase SQL editor
-- ─────────────────────────────────────────────────────────────

-- Projects table
create table if not exists projects (
  id               uuid        primary key default gen_random_uuid(),
  slug             text        unique not null,
  title            text        not null,
  category         text,
  year             int,
  summary          text,
  content          text,
  cover_image_url  text,
  gallery_urls     text[],
  is_featured      boolean     default false,
  sort_order       int         default 0,
  created_at       timestamptz default now()
);

-- About content (single row — id is always 1)
create table if not exists about_content (
  id           int  primary key default 1,
  bio          text,
  headshot_url text,
  resume_url   text,
  skills       text[]
);

-- Contact form submissions
create table if not exists messages (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  email      text        not null,
  message    text        not null,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────

alter table projects      enable row level security;
alter table about_content enable row level security;
alter table messages      enable row level security;

-- Public can read projects
create policy "projects_public_select"
  on projects for select using (true);

-- Public can read about_content
create policy "about_public_select"
  on about_content for select using (true);

-- Public can insert messages (contact form)
create policy "messages_public_insert"
  on messages for insert with check (true);

-- ─────────────────────────────────────────────────────────────
-- Storage bucket (run separately or via Supabase dashboard)
-- ─────────────────────────────────────────────────────────────
-- insert into storage.buckets (id, name, public)
-- values ('project-media', 'project-media', true)
-- on conflict do nothing;

-- ─────────────────────────────────────────────────────────────
-- Seed — 3 real projects
-- ─────────────────────────────────────────────────────────────

insert into projects
  (slug, title, category, year, summary, content, cover_image_url, gallery_urls, is_featured, sort_order)
values
(
  'sherdil-dhaba',
  'Sherdil Dhaba',
  'Web Design',
  2024,
  'A full-stack restaurant website for Sherdil Dhaba — menu, ambience, and online presence built to match the warmth of the food.',
  E'## Overview\n\nSherdil Dhaba needed a digital presence that felt as inviting as walking through their doors. The brief was clear: warm, bold, and easy to navigate for customers looking up the menu or finding the location.\n\n## Approach\n\nThe design leans into rich food photography and a strong typographic hierarchy to guide the visitor from landing to menu to contact without friction. The colour palette draws from deep ochres and earthy reds — colours that feel at home in a dhaba setting.\n\n## Stack\n\nBuilt with modern web technologies and deployed on Vercel for fast, reliable delivery. The site is fully responsive and optimised for mobile — the primary device for most restaurant look-ups.\n\n## Live Site\n\n[sherdil-dhaba.vercel.app](https://sherdil-dhaba.vercel.app)',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=80'
  ],
  true,
  1
),
(
  'smiles-ngo',
  'Smiles NGO',
  'Web Design',
  2024,
  'Website for a non-profit organisation — designed to communicate mission, build donor trust, and drive volunteer sign-ups.',
  E'## Overview\n\nSmiles NGO works to improve lives through community programmes and outreach. They needed a website that communicated their mission with clarity and warmth, while making it easy for donors and volunteers to take action.\n\n## Approach\n\nThe design prioritises trust and legibility. A clean, open layout keeps the focus on impact stories and the people behind the work. The call-to-action hierarchy is deliberately simple: understand the mission, see the impact, take action.\n\n## Considerations\n\nAccessibility was a priority throughout — high contrast ratios, keyboard-navigable flows, and readable type sizes ensure the site works for everyone. Performance was kept lean so it loads quickly on slower connections.\n\n## Live Site\n\n[smiles-ngo.vercel.app](https://smiles-ngo.vercel.app)',
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1400&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1400&q=80',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1400&q=80'
  ],
  true,
  2
),
(
  'prakarsh',
  'Prakarsh',
  'Web Design',
  2025,
  'Website for Prakarsh — a platform built to create visibility and impact for the work and people behind it.',
  E'## Overview\n\nPrakarsh required a website that represented their identity with confidence and clarity. The goal was a clean, professional presence that communicates what they do and why it matters.\n\n## Approach\n\nThe design is restrained and content-forward, letting the work speak without visual noise. Navigation is straightforward; information hierarchy guides the visitor naturally through the site.\n\n## Stack\n\nBuilt for performance and maintainability, deployed for reliability. Fully responsive across all screen sizes.\n\n## Live Site\n\n[prakarsh.org](https://www.prakarsh.org)',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80'
  ],
  true,
  3
);

-- ─────────────────────────────────────────────────────────────
-- Seed — about content
-- ─────────────────────────────────────────────────────────────

insert into about_content (id, bio, headshot_url, resume_url, skills)
values (
  1,
  E'I''m a full-stack developer and hackathon enthusiast building purposeful digital experiences — from restaurant websites to non-profit platforms to professional services.\n\nI work across the entire stack, taking projects from concept through to a live, polished product. My process is detail-oriented and communication-first: I believe the best results come from understanding the people a product is for, not just the brief.\n\nRecent work spans web design, full-stack development, and database architecture for clients in food & hospitality, the social sector, and professional services. I''ve also participated in multiple hackathons, building and shipping projects under tight deadlines.\n\nI care about craft — clean code, considered architecture, and sites that load fast and feel good to use.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  null,
  ARRAY[
    'HTML',
    'CSS',
    'JavaScript',
    'React.js',
    'Node.js',
    'Next.js',
    'PHP',
    'SQL',
    'Supabase'
  ]
)
on conflict (id) do update
  set bio          = excluded.bio,
      headshot_url = excluded.headshot_url,
      skills       = excluded.skills;
