export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  year: number | null;
  summary: string | null;
  content: string | null;
  cover_image_url: string | null;
  gallery_urls: string[] | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
};

export type AboutContent = {
  id: number;
  bio: string | null;
  headshot_url: string | null;
  resume_url: string | null;
  skills: string[] | null;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};
