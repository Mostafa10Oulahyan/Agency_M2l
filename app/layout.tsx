import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://m2l.studio"),
  title: {
    default: "M²L — Create Anything. Dominate Every Platform.",
    template: "%s · M²L",
  },
  description:
    "M²L is an AI-powered creative agency producing studio-quality videos, posters, images and marketing assets for every digital platform. Create. Design. Animate. Launch. Dominate.",
  keywords: [
    "AI creative agency",
    "AI video production",
    "AI product photography",
    "social media content",
    "marketing campaigns",
    "motion design",
    "branding",
  ],
  authors: [{ name: "M²L" }],
  openGraph: {
    title: "M²L — Create Anything. Dominate Every Platform.",
    description:
      "Premium AI-generated content for creators, brands, startups and businesses.",
    type: "website",
    locale: "en_US",
    siteName: "M²L",
  },
  twitter: {
    card: "summary_large_image",
    title: "M²L — Create Anything. Dominate Every Platform.",
    description:
      "Premium AI-generated content for creators, brands, startups and businesses.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="grain">{children}</body>
    </html>
  );
}
