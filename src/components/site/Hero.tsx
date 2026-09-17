"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { RevealText } from "@/components/site/RevealText";
import { SyncOrbit } from "@/components/site/SyncOrbit";
import PixelBlast from "@/components/site/PixelBlast";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { type BotStats } from "@/lib/stats-shared";

/** Hero: PixelBlast field + ScrollReveal headline + community orbit. */
export function Hero({ stats }: { stats?: BotStats }) {
  const reducedMotion = usePrefersReducedMotion();
  const blastColor = "#52525b";

  // Exact server count from the API (no "+" — it is exact, not an estimate).
  const serverLabel =
    stats?.serverCount != null
      ? stats.serverCount.toLocaleString("en-US")
      : "1,400+";
  // Real top-server icons over the logo fallback (always 3 avatars).
  const avatars = [0, 1, 2].map((i) => {
    const s = stats?.top?.[i];
    return s
      ? { key: `${s.name}-${i}`, src: s.icon ?? "/sync-logo.svg", alt: s.name }
      : {
          key: `fallback-${i}`,
          src: "/sync-logo.svg",
          alt: "Sync server",
        };
  });

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-36">
      <div className="dot-grid-fade absolute inset-x-0 top-32 bottom-0" aria-hidden>
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color={blastColor}
          patternScale={3}
          patternDensity={1.6}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={reducedMotion ? 0 : 0.6}
          edgeFade={0.08}
          transparent
        />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-2.5"
          >
            <p className="text-xs text-zinc-500 dark:text-white">
              Trusted by{" "}
              <span className="font-semibold text-zinc-900 dark:text-white">
                {serverLabel}
              </span>{" "}
              servers
            </p>
            <AvatarGroup>
              {avatars.map((a) => (
                <Avatar key={a.key} className="size-[22px]">
                  <AvatarImage src={a.src} alt={a.alt} />
                  <AvatarFallback>SY</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
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
            className="mt-5 max-w-xl text-base leading-7 text-zinc-950 sm:text-lg dark:text-white"
          >
            Sync plays your music in seconds.
            Trusted in 1,400+ servers with queues, filters and playlists
            your members already know how to use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="relative z-10 mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <a
              href="/invite"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 text-sm font-medium whitespace-nowrap text-white transition-all select-none hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 sm:w-auto dark:bg-zinc-200 dark:text-zinc-950 dark:hover:bg-white"
            >
              Add to Discord
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 w-full rounded-full border-2 px-7 backdrop-blur-[2px] sm:w-auto dark:bg-[#0a0a0a] dark:hover:bg-zinc-900"
            >
              <Link href="/support" target="_blank" rel="noreferrer">
                <span className="flex w-full items-center justify-center gap-2">
                  <MessageCircle className="h-4 w-4" /> Support Server
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
          className="mx-auto -mt-6"
        >
          <SyncOrbit stats={stats} />
        </motion.div>
      </div>
    </section>
  );
}
