"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MenuIcon } from "@/components/ui/icons-menu";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string; external?: boolean };

const PLAIN_LINKS: NavLink[] = [
  { href: "/#commands", label: "Commands" },
  { href: "/#compare", label: "Compare" },
  { href: "/#faq", label: "FAQ" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support", external: true },
];

const MOBILE_LINKS: NavLink[] = [
  { href: "/#features", label: "Features" },
  { href: "/#commands", label: "Commands" },
  { href: "/#compare", label: "Compare" },
  { href: "/#faq", label: "FAQ" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support server", external: true },
];

/** Pill navbar with a local (no-portal) mobile dropdown so the
 *  hamburger -> X morph is never covered by an overlay. */
export function SiteNav() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#0a0a0a] px-4">
      <nav
        aria-label="Primary"
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-full bg-transparent py-2 pl-4 pr-2 transition-all"
        )}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Sync Music home">
          <Image
            src="/sync-logo.svg"
            alt="Sync logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
          <span className="text-sm font-semibold tracking-tight whitespace-nowrap">
            Sync Music
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              {PLAIN_LINKS.map((l) => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "rounded-full bg-transparent text-zinc-600 hover:text-zinc-950 dark:text-white dark:hover:text-white"
                    )}
                  >
                    {l.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex shrink-0 items-center gap-2">
            <Show when="signed-in">
              <UserButton />
            </Show>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button variant="ghost" className="hidden rounded-full sm:inline-flex">
                  Sign in
                </Button>
              </SignInButton>
            </Show>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <MenuIcon size={16} animate={open ? "default" : undefined} />
            </Button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white/95 p-2 shadow-xl backdrop-blur-sm md:hidden dark:border-zinc-800 dark:bg-[#0a0a0a]/95"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {MOBILE_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  {l.label}
                </Link>
              ))}
              <Show when="signed-out">
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Sign in
                </Link>
              </Show>
              <div className="p-2">
                <a
                  href="/invite"
                  target="_blank"
                  rel="noreferrer"
                  className="hd-btn hd-btn-primary w-full"
                >
                  Add to Discord
                  <ArrowUpRight className="h-[15px] w-[15px]" aria-hidden />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
