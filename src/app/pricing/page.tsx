import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { Pricing } from "@/components/site/Pricing";
import { FinalCta } from "@/components/site/FinalCta";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Sync is free to start, with Pro and Pro Plus on the way. Compare every feature and get answers on billing, voting, and upgrades.",
};

const MATRIX: { feature: string; free: boolean; pro: boolean; plus: boolean }[] = [
  { feature: "Multi-platform playback", free: true, pro: true, plus: true },
  { feature: "Queues, loop & filters", free: true, pro: true, plus: true },
  { feature: "Personal playlists", free: true, pro: true, plus: true },
  { feature: "Button controls", free: true, pro: true, plus: true },
  { feature: "Now Playing embeds", free: true, pro: true, plus: true },
  { feature: "Unlimited servers", free: true, pro: true, plus: true },
  { feature: "Priority queue on busy nodes", free: false, pro: true, plus: true },
  { feature: "Exclusive audio filters", free: false, pro: true, plus: true },
  { feature: "Longer playlists", free: false, pro: true, plus: true },
  { feature: "Early access features", free: false, pro: true, plus: true },
  { feature: "Dedicated node priority", free: false, pro: false, plus: true },
  { feature: "Custom bot status text", free: false, pro: false, plus: true },
  { feature: "Server-wide presets", free: false, pro: false, plus: true },
  { feature: "Direct support line", free: false, pro: false, plus: true },
];

const PRICING_FAQS = [
  {
    q: "Is Sync really free?",
    a: "Yes. Everything Sync does today, playback, queues, filters, playlists, button controls, is free with no server limit. Pro and Pro Plus add headroom for heavy servers when they launch.",
  },
  {
    q: "When do Pro and Pro Plus launch?",
    a: "They are on the way and don't have a date yet. The free plan isn't going anywhere, and anything you build now, queues, playlists, settings, carries over. Watch the support server for launch news.",
  },
  {
    q: "What does voting on Top.gg unlock?",
    a: "Votes remove your daily free-play limits, so the music never stops. Playback, queues, filters, and playlists stay free for everyone; priority queue handling on packed nodes arrives with the paid plans.",
  },
  {
    q: "Will my setup carry over if I upgrade later?",
    a: "Yes. Pro and Pro Plus are the same bot with more priority and features switched on. No re-invite, no lost playlists, no reconfiguration.",
  },
  {
    q: "Can I cancel a paid plan anytime?",
    a: "When billing launches, plans will be cancel-anytime and you keep paid features until the end of the billing period. Downgrading drops you back to the full free plan, nothing gets deleted.",
  },
  {
    q: "Do you offer refunds?",
    a: "If Pro isn't working for your server, reach out through the support server within a reasonable window and we'll make it right. Details will be published with launch-day billing terms.",
  },
];

function MatrixCell({ included, label }: { included: boolean; label: string }) {
  return included ? (
    <span className="inline-flex items-center justify-center">
      <Check className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{label} included</span>
    </span>
  ) : (
    <span className="inline-flex items-center justify-center text-muted-foreground">
      <Minus className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{label} not included</span>
    </span>
  );
}

export default function PricingPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-5 pt-28 sm:pt-32">
        <SectionHeading
          eyebrow="Pricing"
          title="Pricing for every server."
          body="Start free and stay free as long as you like. When your voice channels outgrow the free lane, Pro and Pro Plus add priority and headroom."
        />
      </div>

      <Pricing fullLink={false} showHeading={false} />

      <section
        id="compare-plans"
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 pb-16 sm:pb-24"
      >
        <SectionHeading
          eyebrow="Compare"
          title="Every feature, side by side."
          body="Pro and Pro Plus are still on the way, this is what each tier will unlock at launch."
        />
        <div className="mt-10 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-[#0a0a0a]">
                <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                  Feature
                </th>
                <th scope="col" className="px-4 py-3 text-center font-medium">
                  Free
                </th>
                <th scope="col" className="px-4 py-3 text-center font-medium">
                  Pro
                </th>
                <th scope="col" className="px-4 py-3 text-center font-medium">
                  Pro Plus
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {MATRIX.map((row) => (
                <tr key={row.feature} className="hover:bg-zinc-50/60 dark:hover:bg-white/5">
                  <th scope="row" className="px-4 py-3 font-normal sm:px-5">
                    {row.feature}
                  </th>
                  <td className="px-4 py-3 text-center">
                    <MatrixCell included={row.free} label="Free" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <MatrixCell included={row.pro} label="Pro" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <MatrixCell included={row.plus} label="Pro Plus" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="pricing-faq" className="scroll-mt-24 border-t border-zinc-200 bg-zinc-50 py-16 sm:py-24 dark:border-zinc-800 dark:bg-[#0a0a0a]">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Pricing questions, answered."
            body="Billing hasn't launched yet, so here's exactly where things stand, no fine print."
          />
          <Accordion defaultValue={["item-0"]}>
            {PRICING_FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <div className="pt-16 sm:pt-24">
        <FinalCta />
      </div>
    </>
  );
}
