"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { INVITE_URL } from "@/lib/data";

const FEATURE_LINKS = [
  { href: "#features", title: "Playback", desc: "Multi-platform Lavalink audio" },
  { href: "#commands", title: "Commands", desc: "40+ slash commands, grouped" },
  { href: "#compare", title: "Compare", desc: "Sync vs generic music bots" },
  { href: "#faq", title: "FAQ", desc: "Setup, sources and voting" },
];

/** Pill-Dropdown-Nav + HamburgerMenu equivalent, built on shadcn primitives. */
export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className="flex max-w-full items-center gap-4 rounded-full border border-zinc-200 bg-white/90 py-2 pl-4 pr-2 shadow-[0_1px_2px_rgba(0,0,0,0.06)] backdrop-blur sm:gap-6 dark:border-zinc-800 dark:bg-black/90"
      >
        <Link href="#top" className="flex items-center gap-2.5">
          <Image
            src="/sync-logo.svg"
            alt="Sync logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
          <span className="text-sm font-semibold tracking-tight">Sync</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-full px-3 text-zinc-600 hover:text-zinc-950 dark:text-white dark:hover:bg-white/5 dark:hover:text-white"
              >
                Product <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-72 rounded-xl p-1.5">
              {FEATURE_LINKS.map((l) => (
                <DropdownMenuItem key={l.title} asChild className="cursor-pointer">
                  <Link
                    href={l.href}
                    className="flex flex-col items-start gap-0.5 rounded-lg px-3 py-2.5"
                  >
                    <span className="text-sm font-medium">{l.title}</span>
                    <span className="text-xs text-zinc-500 dark:text-white">
                      {l.desc}
                    </span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {[
            { href: "#commands", label: "Commands" },
            { href: "#compare", label: "Compare" },
            { href: "#faq", label: "FAQ" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-white dark:hover:bg-white/5 dark:hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" className="hidden rounded-full sm:inline-flex">
                Sign in
              </Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <span className="hidden sm:inline-flex">
              <UserButton />
            </span>
          </Show>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              aria-label="Menu"
              className="inset-x-4 top-20 rounded-2xl border p-2 shadow-xl"
            >
              <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile">
                {[
                  { href: "#features", label: "Features" },
                  { href: "#commands", label: "Commands" },
                  { href: "#compare", label: "Compare" },
                  { href: "#faq", label: "FAQ" },
                ].map((l) => (
                  <SheetClose asChild key={l.href}>
                    <Link
                      href={l.href}
                      className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-white/5"
                    >
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
                <Show when="signed-out">
                  <SheetClose asChild>
                    <Link
                      href="/sign-in"
                      className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-white/5"
                    >
                      Sign in
                    </Link>
                  </SheetClose>
                </Show>
                <div className="p-2">
                  <Button asChild className="w-full rounded-xl">
                    <a href={INVITE_URL} target="_blank" rel="noreferrer">
                      Add to Discord <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
