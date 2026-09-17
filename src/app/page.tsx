import { Hero } from "@/components/site/Hero";
import { ServerProof } from "@/components/site/Marquees";
import { BentoFeatures } from "@/components/ui/bento-grid-01";
import { Commands } from "@/components/site/Commands";
import { GlobeStats } from "@/components/site/GlobeStats";
import { Compare } from "@/components/site/Compare";
import { Pricing } from "@/components/site/Pricing";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { getBotStats } from "@/lib/stats";

export default async function Home() {
  const stats = await getBotStats();
  return (
    <>
      <Hero stats={stats} />
      <ServerProof />
      <BentoFeatures />
      <Commands />
      <GlobeStats />
      <Compare />
      <Pricing />
      <Faq />
      <div className="pt-16 sm:pt-24">
        <FinalCta />
      </div>
    </>
  );
}
