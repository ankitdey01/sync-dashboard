/** Live bot stats from the private Stats API (see deploy/WEBSITE-HANDOFF.md).
 *  Server-only: never import from a client component. The API key must
 *  never reach the browser. All three endpoints are cached for 1 hour.
 *  Every failure degrades to null so the UI can render static fallbacks. */
import "server-only";

import type { BotStats, TopServer } from "@/lib/stats-shared";

async function get<T>(path: string): Promise<T | null> {
  const base = process.env.STATS_API_URL;
  const key = process.env.STATS_API_KEY;
  if (!base || !key) return null;
  try {
    const res = await fetch(`${base}${path}`, {
      headers: { Authorization: `Bearer ${key}` },
      // Never let a slow/hanging API stall page render: fall back instead.
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function isTopServer(s: unknown): s is TopServer {
  if (typeof s !== "object" || s === null) return false;
  const o = s as Record<string, unknown>;
  return (
    typeof o.name === "string" &&
    (typeof o.icon === "string" || o.icon === null) &&
    typeof o.memberCount === "number"
  );
}

/** Icons render as <img src>. Only allow https hosts so a compromised
 *  API can't inject javascript:/http: URLs — the call site falls back
 *  to the Sync logo when icon is null. */
function sanitizeIcon(icon: string | null): string | null {
  return icon?.startsWith("https://") ? icon : null;
}

export async function getBotStats(): Promise<BotStats> {
  const [servers, members, top] = await Promise.all([
    get<{ serverCount: unknown }>("/api/server/count"),
    get<{ memberCount: unknown }>("/api/member/count"),
    get<{ servers: unknown }>("/api/server/top"),
  ]);

  return {
    serverCount:
      typeof servers?.serverCount === "number" ? servers.serverCount : null,
    memberCount:
      typeof members?.memberCount === "number" ? members.memberCount : null,
    top:
      Array.isArray(top?.servers)
        ? top.servers
            .filter(isTopServer)
            .map((s) => ({ ...s, icon: sanitizeIcon(s.icon) }))
        : [],
  };
}
