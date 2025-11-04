import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShowTracker - Track Your Favorite Shows & Movies",
  description: "Track watched and upcoming TV shows and movies, get personalized recommendations",
  manifest: "/manifest.json",
  themeColor: "#141414",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-dark-200 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
