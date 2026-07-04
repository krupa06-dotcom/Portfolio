import type { Metadata } from "next";
import CinematicBackground from "@/components/CinematicBackground";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krupa Parmar — Full-Stack Developer & UI/UX Designer",
  description:
    "Full-stack developer and hackathon participant who builds end-to-end products — from UI design to backend logic.",
  openGraph: {
    title: "Krupa Parmar — Full-Stack Developer & UI/UX Designer",
    description:
      "Full-stack developer and hackathon participant who builds end-to-end products.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <CinematicBackground />
        <Nav />
        <main className="flex-1">
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
