import {ClerkProvider} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Preloader } from "@/components/site/Preloader";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sync — Discord Music Bot | 2,000+ Servers",
  description:
    "Sync plays Spotify, YouTube, Apple Music and Deezer in your Discord voice channel. Queues, filters, playlists and button controls. Free forever.",
  metadataBase: new URL("https://ankitdey.dev"),
  openGraph: {
    title: "Sync — Music for your Discord, without the drama",
    description:
      "Multi-platform playback, queues, filters and playlists. Trusted in 2,000+ servers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-zinc-950 dark:bg-black dark:text-white">
        <ClerkProvider appearance={{ theme: dark }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Preloader />
            <SiteNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}