"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Grainient from "@/components/site/Grainient";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { INVITE_URL } from "@/lib/data";

export function FinalCta() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-20">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 px-6 py-14 text-center sm:px-12 dark:border-zinc-800 dark:bg-black">
        <div className="absolute inset-0" aria-hidden>
          <Grainient
            color1="#d4d4d8"
            color2="#52525b"
            color3="#09090b"
            timeSpeed={reducedMotion ? 0 : 0.25}
            warpStrength={0.8}
            warpFrequency={4.0}
            warpSpeed={reducedMotion ? 0 : 2.0}
            grainAmount={0.08}
            contrast={1.2}
            saturation={0.8}
            zoom={1.0}
          />
        </div>
        <div className="relative">
          <Image
            src="/sync-logo.svg"
            alt="Sync"
            width={48}
            height={48}
            className="mx-auto h-12 w-12 rounded-full"
          />
          <h2 className="mx-auto mt-5 max-w-md text-2xl font-semibold tracking-tight text-white text-balance sm:text-3xl">
            Your voice channel is quiet. Fix that tonight.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white">
            Join 2,000+ servers. One invite, one /play, music in seconds.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200"
            >
              <a href={INVITE_URL} target="_blank" rel="noreferrer">
                Add Sync to Discord <ArrowUpRight className="h-4 w-4" data-icon="inline-end" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-zinc-700 bg-transparent text-white hover:bg-zinc-900 hover:text-white"
            >
              <a href="#commands">Browse commands first</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
