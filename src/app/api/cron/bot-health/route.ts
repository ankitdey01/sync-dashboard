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
  if (!healthUrl || !alertWebhook) {
    console.warn("[bot-health] BOT_HEALTH_URL or BOT_ALERT_WEBHOOK_URL missing");
    return Response.json({ checked: false, reason: "webhook env not configured" });
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

  if (!online) {
    const ping = process.env.ALERT_USER_ID ? `<@${process.env.ALERT_USER_ID}>` : "";
    await fetch(alertWebhook, {
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
    }).catch(() => {});
  }

  return Response.json({ online, detail });
}
