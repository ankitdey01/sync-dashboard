"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { RevealText } from "@/components/site/RevealText";
import { PlayerCard } from "@/components/site/PlayerCard";
import PixelBlast from "@/components/site/PixelBlast";
import { AnimatedNumber } from "@/components/motion-primitives/animated-number";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { INVITE_URL, STATS } from "@/lib/data";

/** Hero: PixelBlast field in the dot tones + ScrollReveal headline + player mock. */
const STAT_NOTES: Record<string, string> = {
  "Active servers": "Guilds with Sync in a voice channel right now",
  "Music platforms": "YouTube, Spotify, Apple Music, Deezer, Facebook",
  "Slash commands": "Music, filters, playlists and utilities",
  "Lavalink uptime": "Dedicated nodes across 3 regions",
};

/** Animated server count: holds 0, springs to 2,000 once in view. */
function ServerCount() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setValue(2000), 400);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <AnimatedNumber value={value} springOptions={{ bounce: 0, duration: 2000 }} />
      <span>+</span>
    </span>
  );
}export function Hero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      <div className="dot-grid-fade absolute inset-0" aria-hidden>
        <PixelBlast
          variant="square"
          pixelSize={3}
          color="#565656"
          patternScale={2}
          patternDensity={1}
          enableRipples
          rippleSpeed={0.3}
          rippleThickness={0.1}
          rippleIntensityScale={1}
          speed={reducedMotion ? 0 : 0.5}
          transparent
          edgeFade={0.5}
        />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="outline" className="gap-1.5 bg-white py-1 pr-3 pl-1.5 dark:bg-black">
              <span className="rounded-full bg-zinc-950 px-2 py-0.5 text-[10px] font-bold text-white dark:bg-zinc-50 dark:text-zinc-900">
                NEW
              </span>
              <span className="font-medium text-zinc-600 dark:text-white">
                Playlist system & Spotify support is live
              </span>
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.05]"
          >
            <RevealText text="Music for your Discord, without the drama." />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="mt-5 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg dark:text-white"
          >
            Sync plays from Spotify, YouTube and Apple Music in seconds.
            Trusted in 2,000+ servers with queues, filters and playlists
            your members already know how to use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <Button asChild size="lg" className="w-full rounded-full sm:w-auto">
              <a href={INVITE_URL} target="_blank" rel="noreferrer">
                Add to Discord <ArrowUpRight className="h-4 w-4" data-icon="inline-end" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-full sm:w-auto"
            >
              <Link href="#commands">
                <Terminal className="h-4 w-4" data-icon="inline-start" /> See commands
              </Link>
            </Button>
          </motion.div>

          <p className="mt-4 font-mono text-xs text-zinc-400 dark:text-white0">
            /play midnight city — no signup, free forever
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
          className="mx-auto mt-12 max-w-xl"
        >
          <PlayerCard />
        </motion.div>

        {/* Geist rule: metrics as quiet type with hairline dividers — no boxes, no fills. */}
        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-y-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <HoverCard key={s.label}>
              <HoverCardTrigger asChild>
                <div className="cursor-help px-4 text-center sm:border-l sm:border-zinc-200 sm:first:border-l-0 dark:sm:border-zinc-800">
                  <dd className="text-3xl font-semibold tracking-tight tabular-nums">
                    {s.label === "Active servers" ? <ServerCount /> : s.value}
                  </dd>
                  <dt className="mt-1.5 block text-xs font-medium text-zinc-500 dark:text-white">
                    {s.label}
                  </dt>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto text-xs">
                {STAT_NOTES[s.label]}
              </HoverCardContent>
            </HoverCard>
          ))}
        </dl>
      </div>
    </section>
  );
}
