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
    <section ref={ref} className="relative overflow-x-clip pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28">
      <img
        src={worldMap}
        alt=""
        aria-hidden="true"
        width={1920}
        height={960}
        loading="eager"
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.25] object-cover object-[62%_45%] opacity-40 contrast-150 saturate-0 mix-blend-multiply sm:scale-[1.15] sm:object-center lg:scale-100 dark:opacity-50 dark:invert dark:mix-blend-screen"
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
        <div className="cp-reveal glass-panel max-w-3xl rounded-2xl p-5 shadow-[0_30px_80px_-50px_color-mix(in_oklab,var(--color-brand)_70%,transparent)] sm:rounded-3xl sm:p-8 lg:p-10">
          <p className="label-mono text-gradient-brand text-[0.7rem] font-semibold break-words sm:text-xs">{c.hero.eyebrow}</p>
          <h1 className="font-display mt-3 text-[clamp(1.65rem,7.2vw,2.5rem)] leading-[1.1] font-extrabold tracking-tight text-pretty break-words hyphens-auto text-ink sm:mt-5 sm:text-[clamp(2.25rem,5vw,3rem)] lg:text-6xl">
            <span className="block">{c.hero.headline1}</span>
            <span className="text-gradient-brand block">{c.hero.headline2}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-slateink sm:mt-6 sm:text-lg">{c.hero.sub}</p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => requestContact()}
              className="btn-lift gradient-brand w-full rounded-xl px-5 py-3.5 text-center text-sm font-semibold text-white sm:w-auto sm:px-6"
            >
              {c.hero.primary}
            </button>
            <a
              href="#desenvolvedores"
              className="btn-lift w-full rounded-xl border border-border bg-paper/70 px-5 py-3.5 text-center text-sm font-semibold text-ink sm:w-auto sm:px-6"
            >
              {c.hero.secondary}
            </a>
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm text-slateink">
            <span className="cp-status-dot h-2 w-2 shrink-0 rounded-full bg-success" />
            <span className="min-w-0">{c.hero.status}</span>
          </p>
        </div>

        <ul className="mt-8 grid gap-3 min-[420px]:grid-cols-2 sm:mt-10 sm:gap-4 lg:grid-cols-4">
          {c.bullets.map((b, i) => {
            const Icon = icons[i] ?? Zap;
            return (
              <li
                key={b.title}
                className="min-w-0 rounded-2xl border border-border bg-paper/80 p-4 backdrop-blur-sm sm:p-5"
              >
                <Icon className="h-5 w-5 text-brand" strokeWidth={1.6} />
                <p className="font-display mt-3 text-sm font-bold break-words text-ink">{b.title}</p>
                <p className="mt-1 text-[0.85rem] leading-relaxed break-words text-slateink sm:text-sm">{b.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
