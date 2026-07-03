export type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  cover_image_url: string | null;
  tags: string[];
  is_featured: boolean;
  sort_order: number;
  created_at: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  sort_order: number;
};

export type Hackathon = {
  id: string;
  name: string;
  result: string | null;
  date: string | null;
  url: string | null;
  sort_order: number;
};

export type Profile = {
  id: number;
  bio: string | null;
  headshot_url: string | null;
  resume_url: string | null;
  skills: string[];
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
};
