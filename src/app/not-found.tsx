import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, House } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This track isn't in the queue. Head back home or get help in the support server.",
};

export default function NotFound() {
  return (
    <div className="hd-container flex flex-1 flex-col items-center justify-center py-24 text-center sm:py-32">
      <p className="text-[13px] tracking-[-0.4px] text-[#949494] uppercase">
        Error 404
      </p>
      <h1 className="hd-h1 mt-4 text-[38px] sm:text-[54.9px]">
        This track isn&apos;t in the queue.
      </h1>
      <p className="hd-body mt-4 max-w-[482px] text-[16px] sm:text-[17px]">
        The page you&apos;re looking for was skipped, removed, or never queued
        in the first place.
      </p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <Link href="/" className="hd-btn hd-btn-primary">
          Back to home
          <House className="h-[15px] w-[15px]" aria-hidden />
        </Link>
        <a
          href="/invite"
          target="_blank"
          rel="noreferrer"
          className="hd-btn hd-btn-ghost"
        >
          Add to Discord
          <ArrowUpRight className="h-[15px] w-[15px]" aria-hidden />
        </a>
      </div>
      <p className="mt-5 text-[12px] tracking-[-0.4px] text-[#949494]">
        Lost in the noise?{" "}
        <Link
          href="/support"
          target="_blank"
          rel="noreferrer"
          className="text-[#c4c4c4] hover:text-[#e7e7e7]"
        >
          Ask in the support server
        </Link>
      </p>
    </div>
  );
}
