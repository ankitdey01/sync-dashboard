import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FAQS } from "@/lib/data";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-zinc-200 bg-zinc-50 py-16 sm:py-24 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="Asked in every support thread."
          body="Setup takes under a minute. If anything else comes up, the support server answers fast."
        />
        <Accordion defaultValue={["item-0"]}>
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
