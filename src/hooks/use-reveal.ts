import { useEffect, useRef } from "react";

/** Adds `is-visible` to `.cp-reveal` children once they enter the viewport. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(".cp-reveal"));
    if (targets.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const reveal = (el: HTMLElement) => el.classList.add("is-visible");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px 10% 0px", threshold: 0.01 },
    );

    targets.forEach((el) => observer.observe(el));

    // Fail-safe: if the observer never fires (hash jumps, restored scroll,
    // instant navigation), never leave content stuck at opacity 0.
    const fallback = window.setTimeout(() => {
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.4) reveal(el);
      });
    }, 300);

    // Last resort: never leave anything invisible.
    const hardFallback = window.setTimeout(() => targets.forEach(reveal), 2500);

    const onHash = () => targets.forEach(reveal);
    window.addEventListener("hashchange", onHash);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      window.clearTimeout(hardFallback);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return ref;
}
