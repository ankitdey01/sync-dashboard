import { PLATFORMS } from "@/lib/data";

/**
 * WavyTicker equivalent — straightened per the clean rule.
 * The single motion element on the page. Server proof below it
 * is static type (Geist: secondary info in muted text, no chrome).
 */
export function Ticker() {
  const row = [...PLATFORMS, ...PLATFORMS];
  return (
    <section aria-label="Supported platforms" className="border-y border-zinc-200 bg-zinc-50 py-3.5 dark:border-zinc-800 dark:bg-black">
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-8 pr-8">
          {row.map((p, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="text-sm font-semibold tracking-wide text-zinc-700 uppercase dark:text-white">
                {p}
              </span>
              <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Static social proof. One quiet line replaces the second marquee. */
export function ServerProof() {
  return (
    <section aria-label="Communities using Sync" className="py-16 sm:py-20">
      <p className="mx-auto max-w-2xl px-5 text-center text-sm leading-7 text-zinc-500 dark:text-white">
        In rotation at{" "}
        <span className="font-medium text-zinc-900 dark:text-white">
          Pixel Lounge, Midnight Café, Study Together
        </span>{" "}
        — and 2,000+ more servers.
      </p>
    </section>
  );
}
