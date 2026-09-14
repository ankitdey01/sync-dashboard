"use client";

import { useState } from "react";
import { Copy, Check, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/site/SectionHeading";
import { COMMAND_GROUPS } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * TOC + Clothesline-Gallery equivalent:
 * sticky table of contents (left) + command gallery (right).
 * Mobile falls back to shadcn Tabs.
 */
export function Commands() {
  const [active, setActive] = useState(COMMAND_GROUPS[0].id);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(name);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      /* clipboard unavailable */
    }
  };

  const current =
    COMMAND_GROUPS.find((g) => g.id === active) ?? COMMAND_GROUPS[0];

  return (
    <section id="commands" className="scroll-mt-24 border-y border-zinc-200 bg-zinc-50 py-16 sm:py-24 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeading
          eyebrow="Commands"
          title="Forty commands you'll actually remember."
          body="Slash-first, grouped the way Discord groups intent. Hover any row to copy it straight into your server."
        />

        {/* Mobile: tabs */}
        <div className="mt-8 md:hidden">
          <Tabs value={active} onValueChange={setActive}>
            <TabsList className="w-full justify-start overflow-x-auto">
              {COMMAND_GROUPS.map((g) => (
                <TabsTrigger key={g.id} value={g.id} className="dark:text-white">
                  {g.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {COMMAND_GROUPS.map((g) => (
              <TabsContent key={g.id} value={g.id}>
                <CommandList
                  groupId={g.id}
                  copied={copied}
                  onCopy={copy}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Desktop: TOC + gallery */}
        <div className="mt-10 hidden gap-8 md:grid md:grid-cols-[220px_1fr]">
          <nav aria-label="Command groups" className="sticky top-24 self-start">
            <ol className="space-y-1 border-l border-zinc-200 dark:border-zinc-800">
              {COMMAND_GROUPS.map((g) => (
                <li key={g.id}>
                  <Button
                    variant="ghost"
                    onClick={() => setActive(g.id)}
                    className={cn(
                      "block h-auto w-full justify-start rounded-none border-l-2 -ml-px py-2 pr-2 pl-4 text-left text-sm transition-colors",
                      active === g.id
                        ? "border-zinc-950 font-semibold text-zinc-950 dark:border-zinc-50 dark:text-white"
                        : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-white dark:hover:text-white"
                    )}
                  >
                    {g.label}
                    <span className="block text-xs font-normal text-zinc-400 dark:text-white">
                      {g.blurb}
                    </span>
                  </Button>
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-black">
              <p className="text-xs font-semibold tracking-wide uppercase text-zinc-500 dark:text-white">
                Try it tonight
              </p>
              <p className="mt-1.5 font-mono text-xs leading-5 text-zinc-700 dark:text-white">
                /play lofi beats
                <br />
                /filter nightcore
                <br />
                /playlist play study
              </p>
            </div>
          </nav>

          <div
            key={current.id}
            className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black"
          >
            <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
              <h3 className="text-sm font-semibold">{current.label}</h3>
              <p className="text-xs text-zinc-500 dark:text-white">{current.blurb}</p>
            </div>
            <CommandList
              groupId={current.id}
              copied={copied}
              onCopy={copy}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CommandList({
  groupId,
  copied,
  onCopy,
}: {
  groupId: string;
  copied: string | null;
  onCopy: (name: string) => void;
}) {
  const group = COMMAND_GROUPS.find((g) => g.id === groupId)!;
  return (
    <TooltipProvider>
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
      {group.commands.map((c) => (
        <li key={c.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => onCopy(c.name)}
                className="group h-auto w-full justify-between rounded-none px-5 py-3.5 text-left font-normal hover:bg-zinc-50 dark:hover:bg-white/5"
              >
            <span className="flex min-w-0 items-center gap-3">
              <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-zinc-300 dark:text-white" />
              <span>
                <span className="block font-mono text-sm font-medium text-zinc-900 dark:text-white">
                  {c.name}
                </span>
                <span className="block truncate text-xs text-zinc-500 dark:text-white">
                  {c.desc}
                </span>
              </span>
            </span>
            <span className="shrink-0 text-zinc-300 group-hover:text-zinc-600 dark:text-white dark:group-hover:text-white">
              {copied === c.name ? (
                <Check className="h-4 w-4 text-zinc-900 dark:text-white" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Click to copy</TooltipContent>
          </Tooltip>
        </li>
      ))}
      </ul>
    </TooltipProvider>
  );
}
