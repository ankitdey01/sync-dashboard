"use client";

import { motion } from "framer-motion";
import { Server, Zap, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

/**
 * TacticalGlobe3D equivalent — deliberately flat.
 * A dotted world suggestion + node health rows. No 3D lib, no glow,
 * keeps the page fast and the aesthetic clean per brief.
 */
const NODES = [
  { name: "eu-west · Frankfurt", load: "32%", ping: "18ms", ok: true },
  { name: "us-east · Virginia", load: "41%", ping: "24ms", ok: true },
  { name: "ap-south · Mumbai", load: "27%", ping: "21ms", ok: true },
];

export function GlobeStats() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Network"
            title="Close to your voice channel, wherever it is."
            body="Dedicated Lavalink nodes in three regions, picked automatically per guild. /ping shows you the live numbers — Sync doesn't ask you to take stability on faith."
          />
          <ul className="mt-8 space-y-3">
            {NODES.map((n, i) => (
              <motion.li
                key={n.name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-black"
              >
                <span className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-600 opacity-40" />
                    <span className="relative h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                  <span className="font-mono text-sm font-medium">{n.name}</span>
                </span>
                <span className="font-mono text-xs text-zinc-500 tabular-nums dark:text-white">
                  load {n.load} · {n.ping}
                </span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600 dark:text-white">
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4" /> Auto region routing
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> Isolated per-guild queues
            </span>
            <span className="flex items-center gap-1.5">
              <Server className="h-4 w-4" /> TypeScript + discord.js v14
            </span>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-black"
          aria-hidden
        >
          <div className="dot-grid absolute inset-0 opacity-70" />
          <div className="relative mx-auto aspect-square max-w-sm text-zinc-950 dark:text-white">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <g strokeWidth="1" fill="none" className="text-zinc-300 dark:text-zinc-700" stroke="currentColor">
                <ellipse cx="100" cy="100" rx="78" ry="30" />
                <ellipse cx="100" cy="100" rx="30" ry="78" />
                <ellipse cx="100" cy="100" rx="60" ry="78" />
                <line x1="22" y1="100" x2="178" y2="100" />
              </g>
              {[
                [62, 66],
                [104, 52],
                [138, 84],
                [84, 112],
                [120, 128],
                [58, 132],
              ].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="5" fill="currentColor" />
                  <circle cx={x} cy={y} r="9" fill="none" stroke="currentColor" strokeOpacity="0.2" />
                </g>
              ))}
            </svg>
          </div>
          <p className="relative mt-4 text-center font-mono text-xs text-zinc-500 dark:text-white">
            Illustrative status — run /ping in Discord for live numbers
          </p>
        </div>
      </div>
    </section>
  );
}
