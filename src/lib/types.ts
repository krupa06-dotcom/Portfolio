export type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  image_url: string;
  featured: boolean;
  created_at: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  description: string;
  start_date: string;
  end_date: string | null;
  type: "internship" | "hackathon";
  created_at: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};
