import { useState } from "react";
import { Zap, TrendingUp, Globe2, ShieldCheck } from "lucide-react";
import worldMap from "@/assets/world-map.png";
import { useI18n } from "@/lib/i18n";
import { home } from "@/data/home";
import { requestContact } from "@/lib/contact-prefill";
import { useReveal } from "@/hooks/use-reveal";
import { PixCheckoutModal } from "../PixCheckoutModal";
import { Button } from "@/components/ui/button";

const icons = [Zap, TrendingUp, Globe2, ShieldCheck];

export function Hero() {
  const { locale } = useI18n();
  const [openPixModal, setOpenPixModal] = useState(false);
  const c = home[locale];
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative min-h-[min(900px,100svh)] overflow-x-clip pt-24 pb-14 sm:pt-32 sm:pb-20 lg:flex lg:items-center lg:pt-36 lg:pb-24">
      <img
        src={worldMap}
        alt=""
        aria-hidden="true"
        width={1920}
        height={960}
        loading="eager"
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.35] object-cover object-[62%_45%] opacity-25 invert contrast-125 saturate-0 mix-blend-screen sm:scale-[1.15] sm:object-center lg:scale-100"
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
        <div className="grid w-full items-stretch gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] xl:gap-8">
        <div className="cp-reveal glass-panel w-full min-w-0 rounded-xl p-5 shadow-[0_30px_80px_-50px_color-mix(in_oklab,var(--color-brand)_70%,transparent)] sm:p-8 lg:p-10 xl:p-12">
          <p className="label-mono text-gradient-brand text-[0.7rem] font-semibold break-words sm:text-xs">{c.hero.eyebrow}</p>
          <h1 className="font-display mt-3 max-w-4xl text-[clamp(1.9rem,7.2vw,2.75rem)] leading-[1.08] font-extrabold text-pretty break-words hyphens-auto text-ink sm:mt-5 sm:text-[clamp(2.5rem,5vw,3.5rem)] lg:text-[clamp(3rem,4.2vw,4.5rem)]">
            <span className="block">{c.hero.headline1}</span>
            <span className="text-gradient-brand block">{c.hero.headline2}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-slateink sm:mt-6 sm:text-lg lg:max-w-none lg:text-xl">{c.hero.sub}</p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              type="button"
              onClick={() => setOpenPixModal(true)}
              size="lg"
              className="btn-lift h-12 w-full bg-success px-5 font-semibold text-primary-foreground shadow-lg hover:bg-success/90 sm:w-auto sm:px-6"
            >
              <span>⚡ {c.hero.testPix}</span>
            </Button>
            <Button
              type="button"
              onClick={() => requestContact()}
              size="lg"
              className="btn-lift gradient-brand h-12 w-full px-5 font-semibold text-primary-foreground sm:w-auto sm:px-6"
            >
              {c.hero.primary}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => requestContact({ message: c.hero.secondary })} className="btn-lift h-12 w-full bg-paper/70 font-semibold sm:w-auto">
              {c.hero.secondary}
            </Button>
          </div>

          <p className="mt-3 text-xs text-slateink">⚠ {c.hero.sandbox}</p>

          <PixCheckoutModal open={openPixModal} onOpenChange={setOpenPixModal} />

          <p className="mt-6 flex items-start gap-2 text-sm text-slateink">
            <span className="cp-status-dot h-2 w-2 shrink-0 rounded-full bg-success" />
            <span className="min-w-0">{c.hero.status}</span>
          </p>
        </div>

        <aside className="cp-reveal hidden min-w-0 flex-col justify-center rounded-xl border border-ink/10 bg-onyx p-7 text-ink shadow-[0_30px_80px_-50px_color-mix(in_oklab,var(--color-brand)_70%,transparent)] lg:flex xl:p-9">
          <p className="label-mono text-gradient-brand text-xs font-semibold">{c.heroAside.title}</p>
          <dl className="mt-6 space-y-3">
            {c.heroAside.steps.map((step, index) => (
              <div key={step.code} className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-b border-ink/10 pb-4 last:border-0 last:pb-0">
                <dt className="label-mono pt-0.5 text-brand-light">{step.code}</dt>
                <dd>
                  <p className="font-display text-sm font-bold text-ink">{step.title}</p>
                  <p className="mt-1 text-sm leading-snug text-ink/55">{step.text}</p>
                  {index < c.heroAside.steps.length - 1 ? <span aria-hidden="true" className="absolute -bottom-1 left-3 h-2 w-px bg-brand/60" /> : null}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-7 border-t border-ink/10 pt-5 text-sm leading-relaxed text-ink/65">{c.heroAside.note}</p>
        </aside>
        </div>

        <ul className="mt-8 grid w-full gap-3 min-[420px]:grid-cols-2 sm:mt-10 sm:gap-4 lg:grid-cols-4">
          {c.bullets.map((b, i) => {
            const Icon = icons[i] ?? Zap;
            return (
              <li
                key={b.title}
                className="min-w-0 border-t border-ink/15 bg-paper/45 p-4 backdrop-blur-sm sm:p-5"
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
