import { Zap, TrendingUp, Globe2, ShieldCheck } from "lucide-react";
import worldMap from "@/assets/world-map.png";
import { useI18n } from "@/lib/i18n";
import { home } from "@/data/home";
import { requestContact } from "@/lib/contact-prefill";
import { useReveal } from "@/hooks/use-reveal";

const icons = [Zap, TrendingUp, Globe2, ShieldCheck];

export function Hero() {
  const { locale } = useI18n();
  const c = home[locale];
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28">
      <img
        src={worldMap}
        alt=""
        aria-hidden="true"
        width={1920}
        height={960}
        loading="eager"
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.6] object-cover object-[58%_42%] opacity-45 contrast-150 saturate-0 mix-blend-multiply sm:scale-[1.15] sm:object-center lg:scale-100 dark:opacity-50 dark:invert dark:mix-blend-screen"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_10%,color-mix(in_oklab,var(--color-brand)_22%,transparent),transparent_70%),radial-gradient(60%_50%_at_85%_20%,color-mix(in_oklab,var(--color-brand-light)_20%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background"
      />

      <div className="relative container-site">
        <div className="cp-reveal glass-panel max-w-3xl rounded-3xl p-6 shadow-[0_30px_80px_-50px_color-mix(in_oklab,var(--color-brand)_70%,transparent)] sm:p-10">
          <p className="label-mono text-gradient-brand font-semibold">{c.hero.eyebrow}</p>
          <h1 className="font-display mt-4 text-[clamp(1.9rem,8vw,2.5rem)] leading-[1.08] font-extrabold tracking-tight text-balance text-ink sm:mt-5 sm:text-5xl lg:text-6xl">
            <span className="block">{c.hero.headline1}</span>
            <span className="text-gradient-brand block">{c.hero.headline2}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slateink sm:mt-6 sm:text-lg">{c.hero.sub}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => requestContact()}
              className="btn-lift gradient-brand w-full rounded-xl px-6 py-3.5 text-center text-sm font-semibold text-white sm:w-auto"
            >
              {c.hero.primary}
            </button>
            <a
              href="#desenvolvedores"
              className="btn-lift w-full rounded-xl border border-border bg-paper/70 px-6 py-3.5 text-center text-sm font-semibold text-ink sm:w-auto"
            >
              {c.hero.secondary}
            </a>
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm text-slateink">
            <span className="cp-status-dot h-2 w-2 shrink-0 rounded-full bg-success" />
            <span className="min-w-0">{c.hero.status}</span>
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {c.bullets.map((b, i) => {
            const Icon = icons[i] ?? Zap;
            return (
              <li
                key={b.title}
                className="min-w-0 rounded-2xl border border-border bg-paper/80 p-5 backdrop-blur-sm"
              >
                <Icon className="h-5 w-5 text-brand" strokeWidth={1.6} />
                <p className="font-display mt-3 text-sm font-bold text-ink">{b.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slateink">{b.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
