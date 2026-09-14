"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/** ScrollRevealText equivalent: word-by-word opacity reveal, ink only. */
export function RevealText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={cn(className)} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.12 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: i * 0.04 }}
          className="inline-block"
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
