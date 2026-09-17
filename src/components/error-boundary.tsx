"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

/** Catches render-time crashes (auth, WebGL, third-party SDKs) so the
 *  page shows a recovery screen instead of a blank background. */
export class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("[sync] render crash:", error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center dark:bg-[#0a0a0a]">
          <Image
            src="/sync-logo.svg"
            alt="Sync"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full"
          />
          <h1 className="text-lg font-semibold text-zinc-950 dark:text-white">
            Sync didn&apos;t load
          </h1>
          <p className="max-w-sm text-sm leading-6 text-zinc-500 dark:text-white">
            Something blocked the page on this device,  usually the network
            or the login service. Reload to try again.
          </p>
          <Button
            className="rounded-full"
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
