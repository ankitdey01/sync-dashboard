import {ClerkProvider} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fontsource/nebula-sans/400.css";
import "@fontsource/nebula-sans/500.css";
import "@fontsource/nebula-sans/600.css";
import "@fontsource/nebula-sans/700.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Preloader } from "@/components/site/Preloader";
import { SiteNav } from "@/components/site/SiteNav";
import { TapedFooter } from "@/components/ui/footer-taped-design";
import { AppErrorBoundary } from "@/components/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sync, Discord Music Bot | 1,400+ Servers",
  description:
    "Sync plays Spotify, YouTube, Apple Music and Deezer in your Discord voice channel. Queues, filters, playlists and button controls. Free forever.",
  metadataBase: new URL("https://syncmusic.vercel.app"),
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Sync, Music for your Discord, without the drama",
    description:
      "Multi-platform playback, queues, filters and playlists. Trusted in 1,400+ servers.",
    type: "website",
    url: "/",
    siteName: "Sync Music",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sync — Music for your Discord, without the drama",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sync, Music for your Discord, without the drama",
    description:
      "Multi-platform playback, queues, filters and playlists. Trusted in 1,400+ servers.",
    images: ["/og-image.png"],
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
      <body className="flex min-h-full flex-col bg-white text-zinc-950 dark:bg-[#0a0a0a] dark:text-white">
        <AppErrorBoundary>
        <ClerkProvider appearance={{ theme: dark }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
          <Preloader />
          <SiteNav />
          <main className="flex-1">{children}</main>
          <TapedFooter />
          </ThemeProvider>
        </ClerkProvider>
        </AppErrorBoundary>
      </body>
    </html>
  );
}