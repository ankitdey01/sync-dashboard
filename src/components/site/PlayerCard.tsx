import {
  Pause,
  SkipForward,
  SkipBack,
  Repeat,
  Volume2,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/** Flat Now-Playing mock: what a user actually sees in Discord. */
export function PlayerCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-zinc-800 dark:bg-black dark:shadow-none">
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2.5 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-600 opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-600" />
          </span>
          <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-white">
            Now playing · Midnight Café
          </p>
        </div>
        <p className="font-mono text-xs text-zinc-400 dark:text-white0">2:14 / 3:47</p>
      </div>

      <div className="flex items-center gap-4 px-4 py-4">
        <Avatar className="size-12 bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-900">
          <AvatarFallback className="bg-zinc-950 text-sm font-bold text-white dark:bg-zinc-50 dark:text-zinc-900">
            ♪
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            Blinding Lights — After Hours
          </p>
          <p className="truncate text-xs text-zinc-500 dark:text-white">
            Requested by ankit · Spotify · 320kbps
          </p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-black">
            <div className="h-full w-[58%] rounded-full bg-zinc-950 dark:bg-zinc-50" />
          </div>
        </div>
        <Button variant="ghost" size="icon" aria-label="Like this track">
          <Heart className="h-4 w-4 text-zinc-400 dark:text-white" />
        </Button>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-4 py-2.5 dark:border-zinc-800 dark:bg-black/60">
        <ButtonGroup aria-label="Playback controls">
          <Button variant="ghost" size="icon" aria-label="Previous track">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button size="icon" aria-label="Pause">
            <Pause className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Next track">
            <SkipForward className="h-4 w-4" />
          </Button>
        </ButtonGroup>
        <div className="flex items-center gap-3 text-zinc-500 dark:text-white">
          <span className="flex items-center gap-1 text-xs font-medium">
            <Repeat className="h-3.5 w-3.5" /> queue
          </span>
          <span className="flex items-center gap-1 text-xs font-medium">
            <Volume2 className="h-3.5 w-3.5" /> 80%
          </span>
        </div>
      </div>
    </div>
  );
}
