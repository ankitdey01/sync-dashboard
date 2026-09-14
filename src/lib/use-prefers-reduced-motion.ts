import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/** Lint-safe reduced-motion hook (no setState-in-effect). */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
}
