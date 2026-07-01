import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageTransitionWrapper } from "@/components/PageTransitionWrapper";

/*
 * FONTS
 * ─────
 * Canela (display serif): NOT loaded via next/font because no .woff2 files
 * are present yet. The CSS variable --font-canela falls back to Georgia
 * (declared in globals.css) until you drop Canela-Light.woff2 and
 * Canela-LightItalic.woff2 into public/fonts/ and restore the localFont
 * block below.
 *
 *   import localFont from "next/font/local";
 *   const canela = localFont({
 *     src: [
 *       { path: "../public/fonts/Canela-Light.woff2", weight: "300", style: "normal" },
 *       { path: "../public/fonts/Canela-LightItalic.woff2", weight: "300", style: "italic" },
 *     ],
 *     variable: "--font-canela",
 *     display: "swap",
 *     fallback: ["Georgia", "serif"],
 *   });
 *   // then add canela.variable to <html className>
 *
 * Neue Montreal → Plus Jakarta Sans (Google Fonts, geometric grotesque).
 * Manrope       → available directly via Google Fonts.
 */

const montreal = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montreal",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KP — Creative Portfolio",
    template: "%s — KP",
  },
  description:
    "A portfolio of full-stack development, web design, and digital projects by KP.",
  openGraph: {
    title: "KP — Developer Portfolio",
    description:
      "A portfolio of full-stack development and web design projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montreal.variable} ${manrope.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased">
        <Nav />
        <PageTransitionWrapper>
          <main className="flex-1">{children}</main>
        </PageTransitionWrapper>
        <Footer />
      </body>
    </html>
  );
}
