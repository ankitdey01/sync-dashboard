/** Shared bot-stats shapes + formatting. Safe to import from client
 *  components — this module never touches the Stats API or its key.
 *  Server-only fetching lives in `@/lib/stats`. */

export type TopServer = {
  name: string;
  icon: string | null;
  memberCount: number;
};

export type BotStats = {
  serverCount: number | null;
  memberCount: number | null;
  top: TopServer[];
};

/** Round down to the nearest 10K and render like "100K+", "110K+".
 *  Below 10K there is no K+ bucket, so render the exact number. */
export function formatMemberCount(n: number): string {
  if (n >= 10_000) return `${Math.floor(n / 10_000) * 10}K+`;
  return n.toLocaleString("en-US");
}
