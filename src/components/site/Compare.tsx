import { Check, Minus, X } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { COMPARISON_ROWS } from "@/lib/data";

/** ComparisonTable equivalent: shadcn-style flat table. */
export function Compare() {
  return (
    <section id="compare" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 sm:py-24">
      <SectionHeading
        eyebrow="Compare"
        title="The boring checklist that actually matters."
        body="Most music bots play audio. The difference is everything around it,  sources, controls, playlists and who pays for basics."
      />
      <div className="mt-10 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-[#0a0a0a]">
              <th className="px-5 py-3.5 font-medium text-zinc-500 dark:text-white">Capability</th>
              <th className="w-32 px-5 py-3.5 text-center font-semibold">Sync</th>
              <th className="w-32 px-5 py-3.5 text-center font-medium text-zinc-500 dark:text-white">
                Others
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white dark:divide-zinc-800 dark:bg-[#0a0a0a]">
            {COMPARISON_ROWS.map((r) => (
              <tr key={r.label} className="hover:bg-zinc-50/60 dark:hover:bg-white/5">
                <td className="px-5 py-3.5">{r.label}</td>
                <td className="px-5 py-3.5 text-center">
                  {r.sync ? (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-900">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <Minus className="mx-auto h-4 w-4 text-zinc-300 dark:text-white" />
                  )}
                </td>
                <td className="px-5 py-3.5 text-center">
                  {typeof r.others === "boolean" && r.others ? (
                    <Check className="mx-auto h-4 w-4 text-zinc-400 dark:text-white0" />
                  ) : r.label.startsWith("Paywalled") ? (
                    <X className="mx-auto h-4 w-4 text-zinc-400 dark:text-white0" />
                  ) : (
                    <Minus className="mx-auto h-4 w-4 text-zinc-200 dark:text-white" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-zinc-400 dark:text-white0">
        Based on publicly documented free tiers of leading Discord music bots, September 2026.
      </p>
    </section>
  );
}
