import ShinyText from "@/components/site/ShinyText";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

/** Static social proof. One quiet line. */
export function ServerProof() {
  return (
    <section aria-label="Communities using Sync" className="py-4 sm:py-6">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 px-5">
        <AvatarGroup className="shrink-0">
          {["A", "B", "C"].map((k) => (
            <Avatar key={k} className="size-6">
              <AvatarImage src="/sync-logo.svg" alt="Sync server" />
              <AvatarFallback>SY</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount className="size-6 text-[10px]">+1.4k</AvatarGroupCount>
        </AvatarGroup>
        <p className="text-center text-xs leading-6 text-zinc-500 sm:whitespace-nowrap dark:text-white">
          <ShinyText
            text="In rotation at Pixel Lounge, Midnight Café, Study Together, and 1,400+ more servers."
            color="var(--shiny-base)"
            shineColor="var(--shiny-shine)"
            speed={3}
            spread={120}
            direction="left"
            pauseOnHover
          />
        </p>
      </div>
    </section>
  );
}
