"use client";

import { motion } from "framer-motion";
import {
  Play,
  ListMusic,
  SlidersHorizontal,
  FolderHeart,
  MousePointerClick,
  Activity,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FEATURES } from "@/lib/data";
import { SectionHeading } from "@/components/site/SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  Play,
  ListMusic,
  SlidersHorizontal,
  FolderHeart,
  MousePointerClick,
  Activity,
};

export function Features() {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 sm:py-24">
      <SectionHeading
        eyebrow="Why Sync"
        title="Everything a music channel needs. Nothing it doesn't."
        body="Six behaviors your members will use daily — built on discord.js v14 and a dedicated Lavalink cluster, so playback stays stable when the channel fills up."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Icon = ICONS[f.icon] ?? Play;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: (i % 3) * 0.07 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-black">
                    <Icon className="h-4.5 w-4.5 text-zinc-900 dark:text-white" />
                  </span>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                  <CardDescription className="leading-6 dark:text-white">{f.body}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
