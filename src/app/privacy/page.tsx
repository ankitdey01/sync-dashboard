"use client";

import { useEffect, useState } from "react";
import { LineNav, type LineNavItem } from "@/components/line-nav";

const ITEMS: LineNavItem[] = [
  { title: "What we collect", href: "#collect" },
  { title: "How we use it", href: "#use" },
  { title: "Storage", href: "#storage" },
  { title: "Your rights", href: "#rights" },
  { title: "Contact", href: "#contact" },
];

const SECTIONS = [
  {
    id: "collect",
    title: "What we collect",
    body: "To play music, Sync necessarily sees Discord identifiers: your user ID, server ID, voice channel activity, and what you play,  current track, queue contents, saved playlists, filter settings, and listening stats. If you sign in on this site with Discord, we receive your basic Discord profile.",
  },
  {
    id: "use",
    title: "How we use it",
    body: "Your data runs the bot and nothing else: queues, playlists, preferences, and abuse prevention. We don't sell data, don't show ads, and don't share identifiers with third parties except the infrastructure that hosts the service.",
  },
  {
    id: "storage",
    title: "Storage",
    body: "Playlists, settings and stats live in our database for as long as you use Sync. Queue and playback state is temporary and clears when the bot leaves voice. Logs are kept short-term for debugging and then dropped.",
  },
  {
    id: "rights",
    title: "Your rights",
    body: "Want your playlists, stats or profile wiped? Ask in the support server or at ankitdey.dev and we'll delete what we hold. Removing the bot stops new collection immediately; stored personal data goes on request.",
  },
  {
    id: "contact",
    title: "Contact",
    body: "Privacy questions go through the support server linked in the footer, or ankitdey.dev. If this policy changes materially, we'll say so where you'll see it.",
  },
];

export default function PrivacyPage() {
  const [activeHref, setActiveHref] = useState(ITEMS[0].href);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ITEMS.forEach((item) => {
      const el = document.getElementById(item.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pt-32 pb-20 sm:pt-40">
      <div>
        <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase dark:text-white">
          Legal
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 max-w-xl leading-7 text-zinc-600 dark:text-white">
          What Sync collects, why, and how to delete it. Last updated
          September 2026.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr]">
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <LineNav
              items={ITEMS}
              activeHref={activeHref}
              scrollActiveIntoView={false}
              onItemClick={(item) => setActiveHref(item.href)}
            />
          </div>
        </div>
        <div>
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 pb-10">
              <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
              <p className="mt-3 leading-7 text-zinc-600 dark:text-white">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
