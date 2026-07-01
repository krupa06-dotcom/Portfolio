import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash — used for seed/placeholder images
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Supabase Storage — swap your project ref in here
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Keep flexible for any CDN you add later
      {
        protocol: "https",
        hostname: "*.supabase.in",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // ISR revalidation is set per-page via `export const revalidate`
  // No global default needed — each route controls its own TTL.

};

export default nextConfig;
