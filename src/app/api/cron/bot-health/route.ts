// Vercel Cron target: polls the music bot's public /health endpoint every
// 5 minutes and posts to Discord only when the bot is unreachable.
// Triggered by Vercel's scheduler (see vercel.json), never by visitors.

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // Bouncer: only Vercel Cron (which attaches CRON_SECRET automatically)
  // may trigger this. Strangers get a 401 and no check runs.
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const healthUrl = process.env.BOT_HEALTH_URL;
  const alertWebhook = process.env.BOT_ALERT_WEBHOOK_URL;
  if (!healthUrl) {
    console.warn("[bot-health] BOT_HEALTH_URL missing");
    return Response.json(
      { checked: false, reason: "BOT_HEALTH_URL not configured" },
      { status: 500 }
    );
  }

  let online = false;
  let detail = "";
  try {
    const res = await fetch(healthUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (res.ok) {
      const body = (await res.json()) as { status?: string };
      online = body.status === "ok";
    }
    detail = `HTTP ${res.status}`;
  } catch (err) {
    detail = err instanceof Error ? err.message : "fetch failed";
  }

  let alert = "not-sent";
  if (!online) {
    if (!alertWebhook) {
      alert = "skipped (BOT_ALERT_WEBHOOK_URL unset)";
      console.warn("[bot-health] bot offline but alert webhook unset - notification skipped");
    } else {
      const ping = process.env.ALERT_USER_ID ? `<@${process.env.ALERT_USER_ID}>` : "";
      try {
        const alertRes = await fetch(alertWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...(ping ? { content: ping } : {}),
            embeds: [
              {
                title: "🔴 Music bot offline",
                description: `Health check failed at <t:${Math.floor(Date.now() / 1000)}:F>.\n${detail}`,
                color: 0xff0000,
              },
            ],
          }),
          signal: AbortSignal.timeout(10_000),
        });
        if (!alertRes.ok) {
          alert = `failed (HTTP ${alertRes.status})`;
          console.error(`[bot-health] Discord alert rejected: HTTP ${alertRes.status}`);
        } else {
          alert = "sent";
        }
      } catch (err) {
        alert = `failed (${err instanceof Error ? err.message : "network error"})`;
        console.error("[bot-health] Discord alert error:", err instanceof Error ? err.message : err);
      }
    }
  }

  return Response.json({ online, detail, alert });
}
