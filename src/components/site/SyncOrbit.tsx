import {
  AudioLines,
  ListMusic,
  Play,
  SkipForward,
  SlidersHorizontal,
} from "lucide-react";
import CommunityOrbit, {
  type OrbitItem,
  type OrbitStat,
  type OrbitTag,
} from "@/components/ui/builders-community-hero";
import { formatMemberCount, type BotStats, type TopServer } from "@/lib/stats-shared";

const SYNC_LOGO = "/sync-logo.svg";

function QueueAvatar() {
  return (
    <span className="flex h-[22px] w-[22px] items-center justify-center overflow-hidden rounded-full bg-[#f5f5f5]">
      <img
        src={SYNC_LOGO}
        alt="Sync logo"
        draggable={false}
        className="h-full w-full object-cover"
      />
    </span>
  );
}

function orbitItems(top: TopServer[] | undefined): OrbitItem[] {
  // Real top-server icons over the logo fallback (first 3 servers).
  const iconAt = (i: number) => top?.[i]?.icon ?? SYNC_LOGO;
  const altAt = (i: number) => top?.[i]?.name ?? "Sync logo";
  return [
  // Outer ring, left to right.
  { kind: "status", ring: "outer", angle: 132, label: "Now Playing" },
  { kind: "card", ring: "outer", angle: 112.6, emoji: "🎵", badge: 12 },
  {
    kind: "pill",
    ring: "outer",
    angle: 90,
    icon: <QueueAvatar />,
    label: "8 in queue",
  },
  { kind: "pill", ring: "outer", angle: 67.6, icon: "⭐", label: "4.9" },
  {
    kind: "avatar",
    ring: "outer",
    angle: 50.9,
    src: iconAt(0),
    alt: altAt(0),
    color: "#e5e7eb",
  },
  {
    kind: "pill",
    ring: "outer",
    angle: 35.2,
    icon: <AudioLines size={13} strokeWidth={2} />,
    label: "320kbps",
  },
  // Inner ring, left to right.
  {
    kind: "avatar",
    ring: "inner",
    angle: 137.2,
    src: iconAt(1),
    alt: altAt(1),
    color: "#f5f5f5",
  },
  { kind: "pill", ring: "inner", angle: 116.6, icon: "🔥", label: "Live" },
  {
    kind: "avatar",
    ring: "inner",
    angle: 90,
    src: iconAt(2),
    alt: altAt(2),
    color: "#e5e7eb",
    size: 48,
  },
  { kind: "card", ring: "inner", angle: 63.3, emoji: "🎧" },
  { kind: "check", ring: "inner", angle: 41.8 },
  ];
}

const FALLBACK_STATS: OrbitStat[] = [
  { value: "1,400+", label: "Active servers" },
  { value: "5", label: "Music sources" },
  { value: "40+", label: "Slash commands" },
  { value: "100K+", label: "Users" },
];

function liveStats(stats: BotStats | undefined): OrbitStat[] {
  if (!stats) return FALLBACK_STATS;
  return [
    {
      // Exact server count from the API (no "+" — it is exact, not an estimate).
      value:
        stats.serverCount != null
          ? stats.serverCount.toLocaleString("en-US")
          : "1,400+",
      label: "Active servers",
    },
    { value: "5", label: "Music sources" },
    { value: "40+", label: "Slash commands" },
    {
      // Member count rounded down to 10K buckets: 100K+, 110K+, ...
      value:
        stats.memberCount != null
          ? formatMemberCount(stats.memberCount)
          : "100K+",
      label: "Users",
    },
  ];
}

const tags: OrbitTag[] = [
  { icon: <Play strokeWidth={2} />, label: "/play", href: "/#commands" },
  { icon: <ListMusic strokeWidth={2} />, label: "/queue", href: "/#commands" },
  {
    icon: <SkipForward strokeWidth={2} />,
    label: "/skip",
    href: "/#commands",
  },
  {
    icon: <SlidersHorizontal strokeWidth={2} />,
    label: "/filters",
    href: "/#commands",
  },
];

/** Community orbit personalized for Sync: listeners, queue and live status. */
export function SyncOrbit({ stats }: { stats?: BotStats }) {
  return (
    <CommunityOrbit
      items={orbitItems(stats?.top)}
      stats={liveStats(stats)}
      headline={
        <>
          From silence to sing-along
          <br className="hidden sm:block" /> in seconds.
        </>
      }
      tags={tags}
    />
  );
}
