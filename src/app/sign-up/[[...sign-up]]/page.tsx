import Image from "next/image";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100svh-68px)] flex-col items-center justify-center gap-6 bg-[#0a0a0a] px-4 py-16">
      <Link href="/" className="flex items-center gap-2.5" aria-label="Sync Music home">
        <Image
          src="/sync-logo.svg"
          alt="Sync logo"
          width={28}
          height={28}
          className="h-7 w-7 rounded-[3px]"
        />
        <span className="text-[15px] font-medium tracking-[-0.4px] text-[#e7e7e7]">
          Sync Music
        </span>
      </Link>
      <SignUp />
    </div>
  );
}
