"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Globe, Music2, ListMusic, Zap, MousePointerClick } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

function Equalizer() {
  return (
    <div className="flex h-full items-center justify-center gap-1.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="w-2 rounded-full bg-zinc-950 dark:bg-white"
          initial={{ height: 12 }}
          animate={{ height: [12, 44, 20, 52, 16, 36, 12] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function LayoutAnimation() {
  const [layout, setLayout] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const layouts = ["grid-cols-2", "grid-cols-3", "grid-cols-1"];

  return (
    <div className="flex h-full items-center justify-center">
      <motion.div
        className={`grid ${layouts[layout]} h-full w-full max-w-[140px] gap-1.5`}
        layout
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-5 w-full rounded-md bg-zinc-950/10 dark:bg-white/20"
            layout
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function SpeedIndicator() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="relative flex h-10 w-full items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              className="h-8 w-24 rounded bg-zinc-950/10 dark:bg-white/10"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              exit={{ opacity: 0, y: -20, position: "absolute" }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ) : (
            <motion.span
              key="text"
              initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              className="font-sans text-3xl font-medium text-zinc-950 md:text-4xl dark:text-white"
            >
              1s
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <span className="text-sm text-zinc-500 dark:text-zinc-400">First track</span>
      <div className="h-1.5 w-full max-w-[120px] overflow-hidden rounded-full bg-zinc-950/10 dark:bg-white/10">
        <motion.div
          className="h-full rounded-full bg-zinc-950 dark:bg-white"
          initial={{ width: 0 }}
          animate={{ width: loading ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
        />
      </div>
    </div>
  );
}

function ModSafe() {
  const [shields, setShields] = useState([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShields((prev) => {
        const nextIndex = prev.findIndex((s) => !s.active);
        if (nextIndex === -1) {
          return prev.map(() => ({ id: Math.random(), active: false }));
        }
        return prev.map((s, i) => (i === nextIndex ? { ...s, active: true } : s));
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full items-center justify-center gap-2">
      {shields.map((shield) => (
        <motion.div
          key={shield.id}
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${
            shield.active ? "bg-zinc-950/10 dark:bg-white/20" : "bg-zinc-950/5 dark:bg-white/5"
          }`}
          animate={{ scale: shield.active ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Lock className={`h-5 w-5 ${shield.active ? "text-zinc-950 dark:text-white" : "text-zinc-400 dark:text-zinc-600"}`} />
        </motion.div>
      ))}
    </div>
  );
}

function GlobalNetwork() {
  const [pulses] = useState([0, 1, 2, 3, 4]);

  return (
    <div className="relative flex h-full items-center justify-center">
      <Globe className="z-10 h-16 w-16 text-zinc-900/80 dark:text-white/80" />
      {pulses.map((pulse) => (
        <motion.div
          key={pulse}
          className="absolute h-16 w-16 rounded-full border-2 border-zinc-900/20 dark:border-white/30"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: pulse * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

const cell =
  "bg-white border border-zinc-200 rounded-xl p-8 flex flex-col hover:border-zinc-300 transition-colors overflow-hidden dark:bg-[#0a0a0a] dark:border-zinc-800 dark:hover:border-zinc-700";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay },
});

export function BentoFeatures() {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 sm:py-24">
      <SectionHeading
        eyebrow="Why Sync"
        title="Everything a music channel needs. Nothing it doesn't."
        body="Playback, queues, filters and playlists,  the behaviors your members will use daily."
      />

      <div className="mt-10 grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-6">
        <motion.div className={`md:col-span-2 md:row-span-2 ${cell}`} {...reveal()}>
          <div className="flex-1">
            <Equalizer />
          </div>
          <div className="mt-4">
            <h3 className="flex items-center gap-2 text-xl font-medium text-zinc-950 dark:text-white">
              <Music2 className="h-5 w-5" /> Any source, one command
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Paste a link or just type a song name.</p>
          </div>
        </motion.div>

        <motion.div className={`md:col-span-2 ${cell}`} {...reveal(0.1)}>
          <div className="flex-1">
            <LayoutAnimation />
          </div>
          <div className="mt-4">
            <h3 className="flex items-center gap-2 text-xl font-medium text-zinc-950 dark:text-white">
              <ListMusic className="h-5 w-5" /> Queues that behave
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Reorder, loop, replay,  it survives it all.</p>
          </div>
        </motion.div>

        <motion.div className={`md:col-span-2 md:row-span-2 ${cell}`} {...reveal(0.2)}>
          <div className="flex flex-1 items-center justify-center">
            <div className="relative">
              <GlobalNetwork />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="flex items-center gap-2 text-xl font-medium text-zinc-950 dark:text-white">
              <Globe className="h-5 w-5" /> Always-on regions
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Close to your voice channel, wherever it is.</p>
          </div>
        </motion.div>

        <motion.div className={`md:col-span-2 ${cell}`} {...reveal(0.3)}>
          <div className="flex-1">
            <SpeedIndicator />
          </div>
          <div className="mt-4">
            <h3 className="flex items-center gap-2 text-xl font-medium text-zinc-950 dark:text-white">
              <Zap className="h-5 w-5" /> Instant
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">First track in seconds, no setup.</p>
          </div>
        </motion.div>

        <motion.div className={`md:col-span-3 ${cell}`} {...reveal(0.4)}>
          <div className="flex-1">
            <ModSafe />
          </div>
          <div className="mt-4">
            <h3 className="flex items-center gap-2 text-xl font-medium text-zinc-950 dark:text-white">
              <Lock className="h-5 w-5" /> Mod-safe
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Mods decide who skips, clears and filters.</p>
          </div>
        </motion.div>

        <motion.div className={`md:col-span-3 ${cell}`} {...reveal(0.5)}>
          <div className="flex flex-1 items-center justify-center">
            <MousePointerClick className="h-16 w-16 text-zinc-950 dark:text-white" />
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-medium text-zinc-950 dark:text-white">Button controls</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Pause, skip and volume, right under Now Playing.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
