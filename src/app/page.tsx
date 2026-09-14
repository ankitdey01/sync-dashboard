import { Hero } from "@/components/site/Hero";
import { Ticker, ServerProof } from "@/components/site/Marquees";
import { Features } from "@/components/site/Features";
import { Commands } from "@/components/site/Commands";
import { GlobeStats } from "@/components/site/GlobeStats";
import { Compare } from "@/components/site/Compare";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <ServerProof />
      <Features />
      <Commands />
      <GlobeStats />
      <Compare />
      <Faq />
      <div className="pt-16 sm:pt-24">
        <FinalCta />
      </div>
    </>
  );
}
