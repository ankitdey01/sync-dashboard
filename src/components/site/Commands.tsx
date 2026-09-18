"use client";

import { useState } from "react";
import {
  Check,
  Command as CommandIcon,
  Copy,
  ListMusic,
  Play,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SectionHeading } from "@/components/site/SectionHeading";
import { COMMAND_GROUPS } from "@/lib/data";
import { cn } from "@/lib/utils";

function GroupIcon({ id, className }: { id: string; className?: string }) {
  if (id === "music") return <Play aria-hidden="true" className={className} />;
  if (id === "filter")
    return <SlidersHorizontal aria-hidden="true" className={className} />;
  if (id === "playlist")
    return <ListMusic aria-hidden="true" className={className} />;
  return <CommandIcon aria-hidden="true" className={className} />;
}

export function Commands() {
  const [active, setActive] = useState(COMMAND_GROUPS[0].id);
  const [copied, setCopied] = useState<string | null>(null);

  const total = COMMAND_GROUPS.reduce((n, g) => n + g.commands.length, 0);

  const current =
    COMMAND_GROUPS.find((g) => g.id === active) ?? COMMAND_GROUPS[0];

  const copy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = name;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(name);
    window.setTimeout(() => {
      setCopied((prev) => (prev === name ? null : prev));
    }, 1400);
  };

  return (
    <section
      id="commands"
      className="hd-section scroll-mt-24 py-16 sm:py-24 dark:bg-[#0a0a0a]"
    >
      <div className="hd-container w-full">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Commands"
              title="Forty commands you'll actually remember."
              body="Slash-first, grouped the way Discord groups intent. Tap any row to copy it straight into your server."
            />
            <Badge variant="secondary" className="shrink-0">
              {total} slash commands
            </Badge>
          </div>
        </div>

        {/* Live region for copy announcements */}
        <p aria-live="polite" className="sr-only">
          {copied ? `${copied} copied to clipboard.` : ""}
        </p>

        {/* Mobile: breadcrumb trail + chip scroller + panel.
            Plain buttons drive a single panel — avoids the fixed-height
            Tabs container clipping the chips and the visible scrollbar. */}
        <div className="mt-6 md:hidden">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#commands">Commands</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {current.label} · {current.commands.length}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="relative -mx-4 mt-3 px-4">
            <div
              role="group"
              aria-label="Command groups"
              className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {COMMAND_GROUPS.map((g) => {
                const isActive = active === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setActive(g.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex flex-none snap-start items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
                      isActive
                        ? "border-zinc-950 bg-white text-zinc-950 shadow-xs dark:border-zinc-50 dark:bg-[#0a0a0a] dark:text-white"
                        : "border-zinc-200 text-zinc-500 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                    )}
                  >
                    <GroupIcon id={g.id} className="size-4" />
                    {g.label}
                    <Badge variant="secondary" className="-me-1">
                      {g.commands.length}
                    </Badge>
                  </button>
                );
              })}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-zinc-50 to-transparent dark:from-[#0a0a0a]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-zinc-50 to-transparent dark:from-[#0a0a0a]"
            />
          </div>

          <div className="mt-3">
            <GroupCard
              groupId={current.id}
              copied={copied}
              onCopy={copy}
            />
          </div>
        </div>

        {/* Desktop: sidebar rail + panel — Workflow_navigation echo */}
        <div className="mt-8 hidden gap-10 md:grid md:grid-cols-[260px_minmax(0,1fr)]">
          <nav
            aria-label="Command groups"
            className="sticky top-24 flex flex-col self-start"
          >
            <p className="px-4 pb-3 text-[28.7px] font-medium tracking-[-1.05px] text-[#e7e7e7]">
              From first /play
              <span className="block text-[#949494]">to full queue.</span>
            </p>
            {COMMAND_GROUPS.map((g) => {
              const isActive = active === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActive(g.id)}
                  aria-current={isActive ? "true" : undefined}
                  data-active={isActive}
                  className={cn(
                    "hd-rail group flex w-full items-start gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                    isActive && "bg-white/[0.02]"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[3px] border",
                      isActive
                        ? "border-[rgba(231,231,231,0.25)] bg-[#e7e7e7] text-[#242424]"
                        : "border-[rgba(231,231,231,0.1)] bg-transparent text-[#777] group-hover:text-[#e4e4e4]"
                    )}
                  >
                    <GroupIcon id={g.id} className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-[17px] leading-[23.8px] font-normal">{g.label}</span>
                      <Badge variant="secondary" className="rounded-[2px]">{g.commands.length}</Badge>
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-[18.2px] text-[#999]">
                      {g.blurb}
                    </span>
                  </span>
                </button>
              );
            })}

            <div className="mt-3 rounded-[3px] border border-dashed border-[rgba(231,231,231,0.15)] p-3">
              <p className="text-xs leading-5 text-[#949494]">
                Tip: tap any command to copy it. Paste straight into Discord.
              </p>
            </div>
          </nav>

          <div key={current.id}>
            <GroupCard groupId={current.id} copied={copied} onCopy={copy} />
          </div>
        </div>

        {/* Mobile hint */}
        <p className="mt-4 text-center text-xs text-muted-foreground md:hidden">
          Tap any command to copy it into Discord.
        </p>
      </div>
    </section>
  );
}

function GroupCard({
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
    <Card className="hd-card overflow-hidden !rounded-[4px] py-0 dark:bg-[#0a0a0a]">
      <CardHeader className="flex flex-row items-start gap-3 border-b border-[rgba(231,231,231,0.1)] px-4 py-4 sm:px-5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[3px] bg-[#e7e7e7] text-[#242424]">
          <GroupIcon id={group.id} className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <CardTitle className="flex flex-wrap items-center gap-2 text-[15px]">
            {group.label}
            <Badge variant="secondary">{group.commands.length}</Badge>
          </CardTitle>
          <CardDescription className="mt-0.5">{group.blurb}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <CommandRows copied={copied} onCopy={onCopy} groupId={group.id} />
      </CardContent>
    </Card>
  );
}

function CommandRows({
  groupId,
  commands,
  copied,
  onCopy,
}: {
  groupId: string;
  commands?: { name: string; desc: string }[];
  copied: string | null;
  onCopy: (name: string) => void;
}) {
  const group = COMMAND_GROUPS.find((g) => g.id === groupId)!;
  const list = commands ?? group.commands;

  return (
    <TooltipProvider delayDuration={250}>
      <ul className="divide-y divide-border">
        {list.map((c) => {
          const isCopied = copied === c.name;
          return (
            <li key={c.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onCopy(c.name)}
                    aria-label={`Copy ${c.name}`}
                    className="group flex min-h-[64px] w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors outline-none hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset active:bg-muted md:min-h-0 sm:px-5"
                  >
                    <span className="flex min-w-0 flex-1 items-start gap-3">
                      <code className="mt-0.5 shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] font-medium text-foreground group-hover:border-foreground/20">
                        {c.name}
                      </code>
                      <span className="min-w-0 flex-1 text-sm leading-5 text-pretty text-muted-foreground">
                        {c.desc}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors",
                        isCopied
                          ? "border-zinc-950 bg-zinc-950 text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                          : "border-transparent text-muted-foreground group-hover:border-border group-hover:bg-background group-hover:text-foreground"
                      )}
                    >
                      {isCopied ? (
                        <Check aria-hidden="true" className="size-4" />
                      ) : (
                        <Copy aria-hidden="true" className="size-4" />
                      )}
                      <span className="sr-only">
                        {isCopied ? "Copied" : "Copy"}
                      </span>
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  {isCopied ? "Copied!" : `Copy ${c.name}`}
                </TooltipContent>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </TooltipProvider>
  );
}
