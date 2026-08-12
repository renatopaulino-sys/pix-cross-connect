import { useEffect, useRef } from "react";

/** Adds `is-visible` to `.cp-reveal` children once they enter the viewport. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reveal = (el: HTMLElement) => el.classList.add("is-visible");
    const collect = () => Array.from(root.querySelectorAll<HTMLElement>(".cp-reveal"));

    if (typeof IntersectionObserver === "undefined") {
      collect().forEach(reveal);
      return;
    }

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

    const observeAll = () => {
      collect().forEach((el) => {
        if (el.classList.contains("is-visible")) return;
        observer.observe(el);
        // Already on screen (e.g. after a language switch re-render)? show now.
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.4 && r.bottom > -window.innerHeight * 0.4) reveal(el);
      });
    };

    observeAll();

    // New nodes appear whenever content re-renders (locale switch), so keep watching.
    const mutation = new MutationObserver(() => observeAll());
    mutation.observe(root, { childList: true, subtree: true });

    // Fail-safe: if the observer never fires (hash jumps, restored scroll,
    // instant navigation), never leave content stuck at opacity 0.
    const fallback = window.setTimeout(() => {
      collect().forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.4) reveal(el);
      });
    }, 300);

    // Last resort: never leave anything invisible.
    const hardFallback = window.setTimeout(() => collect().forEach(reveal), 2500);

    const onHash = () => collect().forEach(reveal);
    window.addEventListener("hashchange", onHash);

    return () => {
      observer.disconnect();
      mutation.disconnect();
      window.clearTimeout(fallback);
      window.clearTimeout(hardFallback);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return ref;
}
