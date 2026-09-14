import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { INVITE_URL, SUPPORT_URL, VOTE_URL, REPO_URL, AUTHOR_URL } from "@/lib/data";

/** Valora-Footer equivalent: flat columns, hairline rules, author credit. */
export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="#top" className="flex items-center gap-2.5">
              <Image
                src="/sync-logo.svg"
                alt="Sync logo"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm font-semibold">Sync</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-500 dark:text-white">
              The Discord music bot that stays out of the way.
              Open source, Lavalink-powered, kept simple on purpose.
            </p>
            <HoverCard>
              <HoverCardTrigger asChild>
                <p className="mt-4 cursor-help font-mono text-xs text-zinc-400 dark:text-white">
                  discord.js v14 · TypeScript · MongoDB
                </p>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto font-mono text-xs">
                erela.js Lavalink client · Mongoose ODM · Top.gg SDK
              </HoverCardContent>
            </HoverCard>
          </div>

          <nav aria-label="Product">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-white">Product</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="#features" className="text-zinc-600 hover:text-zinc-950 dark:text-white dark:hover:text-white">Features</Link></li>
              <li><Link href="#commands" className="text-zinc-600 hover:text-zinc-950 dark:text-white dark:hover:text-white">Commands</Link></li>
              <li><Link href="#compare" className="text-zinc-600 hover:text-zinc-950 dark:text-white dark:hover:text-white">Compare</Link></li>
              <li><Link href="#faq" className="text-zinc-600 hover:text-zinc-950 dark:text-white dark:hover:text-white">FAQ</Link></li>
            </ul>
          </nav>

          <nav aria-label="Bot">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-white">Bot</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href={INVITE_URL} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-zinc-950 dark:text-white dark:hover:text-white">Add to Discord</a></li>
              <li><a href={SUPPORT_URL} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-zinc-950 dark:text-white dark:hover:text-white">Support server</a></li>
              <li><a href={VOTE_URL} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-zinc-950 dark:text-white dark:hover:text-white">Vote on Top.gg</a></li>
              <li><a href={REPO_URL} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-zinc-950 dark:text-white dark:hover:text-white">GitHub</a></li>
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-white">Project</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href={`${REPO_URL}/blob/master/LICENSE`} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-zinc-950 dark:text-white dark:hover:text-white">GPL-3.0 license</a></li>
              <li><a href={REPO_URL} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-zinc-950 dark:text-white dark:hover:text-white">Contribute</a></li>
              <li><span className="text-zinc-600 dark:text-white">Status: all nodes operational</span></li>
            </ul>
          </nav>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-zinc-400 dark:text-white">
            © 2026 Sync Music Bot. Not affiliated with Discord Inc.
          </p>
          <p className="text-xs text-zinc-500 dark:text-white">
            Designed & built by{" "}
            <a
              href={AUTHOR_URL}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-zinc-900 underline-offset-4 hover:underline dark:text-white"
            >
              ankitdey.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
