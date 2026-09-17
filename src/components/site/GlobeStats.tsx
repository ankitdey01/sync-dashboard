"use client";

import dynamic from "next/dynamic";
import { useMemo, type CSSProperties } from "react";
import { ShieldCheck, Timer } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

import type { COBEOptions } from "cobe";

// cobe pulls WebGL onto the page — this section sits below the fold,
// so split it out of the initial bundle and render on the client only.
const Globe = dynamic(
  () => import("@/components/ui/globe").then((mod) => mod.Globe),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="aspect-square w-full animate-pulse rounded-full bg-zinc-200/50 dark:bg-zinc-800/50"
      />
    ),
  }
);

const REGIONS = [
  { id: "mumbai", label: "Mumbai", location: [19.07, 72.87] as [number, number] },
  { id: "delhi", label: "Delhi", location: [28.61, 77.2] as [number, number] },
  { id: "bengaluru", label: "Bengaluru", location: [12.97, 77.59] as [number, number] },
  { id: "new-york", label: "New York", location: [40.71, -74.0] as [number, number] },
  { id: "california", label: "California", location: [34.05, -118.24] as [number, number] },
  { id: "toronto", label: "Toronto", location: [43.65, -79.38] as [number, number] },
  { id: "sydney", label: "Sydney", location: [-33.87, 151.21] as [number, number] },
  { id: "dubai", label: "Dubai", location: [25.2, 55.27] as [number, number] },
  { id: "singapore", label: "Singapore", location: [1.35, 103.82] as [number, number] },
];

/**
 * TacticalGlobe3D equivalent,  deliberately flat.
 * Hardcoded listener locations around the world. No live data,
 * keeps the page fast and the aesthetic clean per brief.
 */

export function GlobeStats() {
  const globeConfig = useMemo<COBEOptions>(
    () => ({
      width: 800,
      height: 800,
      devicePixelRatio: 2,
      phi: 0,
      theta: 0.25,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.15, 0.15, 0.16],
      glowColor: [1, 1, 1],
      markers: REGIONS.map((r) => ({
        location: r.location,
        size: 0.06,
        id: r.id,
      })),
      arcs: [
        { from: REGIONS[0].location, to: REGIONS[8].location },
        { from: REGIONS[1].location, to: REGIONS[7].location },
        { from: REGIONS[3].location, to: REGIONS[5].location },
        { from: REGIONS[4].location, to: REGIONS[6].location },
      ],
      arcColor: [0.3, 0.3, 0.32],
      arcWidth: 0.5,
      arcHeight: 0.3,
    }),
    []
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Community"
            title="Listeners all around the world."
            body="Sync plays in voice channels across India, the US, Canada, Australia, the Gulf, and Southeast Asia. One invite, music in seconds."
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <li
                key={r.id}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-[#0a0a0a] dark:text-white"
              >
                {r.label}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600 dark:text-white">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> Isolated per-guild queues
            </span>
            <span className="flex items-center gap-1.5">
              <Timer className="h-4 w-4" /> Set up in under a minute
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-[#0a0a0a]">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <Globe config={globeConfig} />
            {REGIONS.map((r) => (
              <div
                key={r.id}
                aria-hidden
                className="pointer-events-none absolute bottom-[anchor(top)] left-[anchor(center)] z-10 mb-2 -translate-x-1/2 rounded-md border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold whitespace-nowrap text-zinc-900 opacity-0 shadow-sm transition-opacity duration-300"
                style={
                  {
                    positionAnchor: `--cobe-${r.id}`,
                    opacity: `var(--cobe-visible-${r.id}, 0)`,
                  } as CSSProperties
                }
              >
                {r.label}
              </div>
            ))}
          </div>
          <p className="relative mt-4 text-center font-mono text-xs text-zinc-500 dark:text-white">
            drag to spin
          </p>
        </div>
      </div>
    </section>
  );
}
