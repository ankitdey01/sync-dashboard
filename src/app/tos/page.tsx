"use client";

import { useEffect, useState } from "react";
import { LineNav, type LineNavItem } from "@/components/line-nav";

const ITEMS: LineNavItem[] = [
  { title: "The service", href: "#service" },
  { title: "Fair use", href: "#fair-use" },
  { title: "Availability", href: "#availability" },
  { title: "Voting & perks", href: "#voting" },
  { title: "Termination", href: "#termination" },
  { title: "Contact", href: "#contact" },
];

const SECTIONS = [
  {
    id: "service",
    title: "The service",
    body: "Sync is a free Discord music bot. Invite it to your server, join a voice channel, and play audio from supported sources with slash commands. The core,  playback, queues, filters and playlists,  is free and stays free.",
  },
  {
    id: "fair-use",
    title: "Fair use",
    body: "Don't use Sync to blast audio at abusive volumes, evade server moderators, or infringe copyright. Server moderators control who can skip, clear the queue, or change filters,  their rules win. Abuse (spam, API abuse, harassment via playback) gets your server blocked.",
  },
  {
    id: "availability",
    title: "Availability",
    body: "Sync runs on dedicated audio nodes and we aim to keep music playing around the clock, but it's provided as-is with no uptime guarantee. Sources change their rules, nodes restart, Discord has outages,  playback can pause and we can't promise otherwise.",
  },
  {
    id: "voting",
    title: "Voting & perks",
    body: "Voting for Sync on Top.gg unlocks priority queue handling on busy nodes. Votes are handled by Top.gg; perks apply automatically and carry no cash value, no refunds, and no guarantee of faster playback.",
  },
  {
    id: "termination",
    title: "Termination",
    body: "Remove the bot from your server any time,  that's the whole offboarding flow. We may restrict or block servers that abuse the service, with or without warning, as described under Fair use.",
  },
  {
    id: "contact",
    title: "Contact",
    body: "Questions about these terms? Reach us through the support server linked in the footer, or at ankitdey.dev. These terms may change; continued use after changes means you accept them.",
  },
];

export default function TosPage() {
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
          Terms of Service
        </h1>
        <p className="mt-3 max-w-xl leading-7 text-zinc-600 dark:text-white">
          The short, plain-language rules for using Sync. Last updated
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
