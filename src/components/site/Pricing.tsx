import { CircleCheck, Users, Briefcase, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as PricingCard from "@/components/ui/pricing-card";
import { SectionHeading } from "@/components/site/SectionHeading";

type Plan = {
  icon: React.ReactNode;
  name: string;
  description: string;
  price: string;
  badge?: string;
  live: boolean;
  ctaVariant: "default" | "secondary";
  features: string[];
};

const PLANS: Plan[] = [
  {
    icon: <Users />,
    name: "Free",
    description: "Everything Sync does today",
    price: "Free",
    badge: "Current",
    live: true,
    ctaVariant: "secondary",
    features: [
      "Multi-platform playback",
      "Queues, loop & filters",
      "Personal playlists",
      "Button controls",
      "Now Playing embeds",
      "Unlimited servers",
    ],
  },
  {
    icon: <Briefcase />,
    name: "Pro",
    description: "For servers that live in voice",
    price: "Soon",
    badge: "Coming soon",
    live: false,
    ctaVariant: "default",
    features: [
      "Everything in Free",
      "Priority queue on busy nodes",
      "Exclusive audio filters",
      "Longer playlists",
      "Early access features",
    ],
  },
  {
    icon: <Building />,
    name: "Pro Plus",
    description: "For communities built on music",
    price: "Soon",
    badge: "Coming soon",
    live: false,
    ctaVariant: "secondary",
    features: [
      "Everything in Pro",
      "Dedicated node priority",
      "Custom bot status text",
      "Server-wide presets",
      "Direct support line",
    ],
  },
];

export function Pricing() {
  return (
    <section id="premium" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 sm:py-24">
      <SectionHeading
        eyebrow="Premium"
        title="Free forever. Pro when you're ready."
        body="Everything below ships today on the free plan. Pro and Pro Plus are on the way,  same bot, more headroom."
      />
      <div className="mt-10 grid justify-items-center gap-2 md:grid-cols-3">
        {PLANS.map((plan) => (
          <PricingCard.Card key={plan.name}>
            <PricingCard.Header>
              <PricingCard.Plan>
                <PricingCard.PlanName>
                  {plan.icon}
                  <span>{plan.name}</span>
                </PricingCard.PlanName>
                {plan.badge && <PricingCard.Badge>{plan.badge}</PricingCard.Badge>}
              </PricingCard.Plan>
              <PricingCard.Price>
                <PricingCard.MainPrice>{plan.price}</PricingCard.MainPrice>
              </PricingCard.Price>
              {plan.live ? (
                <Button asChild variant={plan.ctaVariant} className="w-full font-semibold">
                  <a href="/invite" target="_blank" rel="noreferrer">
                    Add to Discord
                  </a>
                </Button>
              ) : (
                <Button disabled variant={plan.ctaVariant} className="w-full font-semibold">
                  Coming soon
                </Button>
              )}
            </PricingCard.Header>

            <PricingCard.Body>
              <PricingCard.Description>{plan.description}</PricingCard.Description>
              <PricingCard.List>
                {plan.features.map((item) => (
                  <PricingCard.ListItem key={item}>
                    <CircleCheck
                      className="text-foreground h-4 w-4"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </PricingCard.ListItem>
                ))}
              </PricingCard.List>
            </PricingCard.Body>
          </PricingCard.Card>
        ))}
      </div>
    </section>
  );
}
