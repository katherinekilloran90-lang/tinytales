import type { Metadata, Viewport } from "next";
import "./globals.css";

// Note: we deliberately use a system font stack (defined in globals.css)
// instead of next/font/google. That keeps the production build fully
// self-contained — it never needs to reach fonts.googleapis.com at build
// time, which makes builds faster and more reliable in locked-down CI/build
// environments. Swap in next/font/google (e.g. Baloo 2 + Nunito) if you'd
// like custom webfonts and your build environment has open internet access.

export const metadata: Metadata = {
  title: "Story Spark — Magical AI Storybooks for Kids",
  description:
    "Create a one-of-a-kind, illustrated children's story in minutes. Enter an idea, pick a style, and Story Spark writes and paints an original storybook.",
};

export const viewport: Viewport = {
  themeColor: "#2b2360",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
