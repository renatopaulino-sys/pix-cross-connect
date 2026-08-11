import { useI18n } from "@/lib/i18n";
import worldMap from "@/assets/world-map.png";

export function Hero() {
  const { t } = useI18n();
  const headlineLines = t.hero.headline.split(/(?<=\.)\s+/);

  return (
    <section className="relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32">
      <img
        src={worldMap}
        alt=""
        aria-hidden="true"
        width={1920}
        height={960}
        loading="eager"
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.6] object-cover object-[58%_42%] opacity-45 contrast-125 saturate-0 mix-blend-multiply sm:scale-[1.15] sm:object-center lg:scale-100 dark:opacity-35 dark:invert dark:mix-blend-screen"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/55 to-background"
      />
      <div className="relative container-site">
        <div className="max-w-3xl">
          <p className="label-mono text-slateink">Cross-border · LATAM</p>
          <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold text-ink sm:text-5xl lg:text-6xl">
            {headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slateink">{t.hero.sub}</p>


          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contato"
              className="rounded-lg bg-cobalt px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t.hero.primary}
            </a>
            <a
              href="#desenvolvedores"
              className="rounded-lg border border-border px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-sand"
            >
              {t.hero.secondary}
            </a>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-slateink">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="cp-status-dot absolute inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            {t.hero.status}
          </p>
        </div>

        <CrossingDiagram
          buyer={t.hero.nodeBuyer}
          gateway={t.hero.nodeGateway}
          account={t.hero.nodeAccount}
        />
      </div>
    </section>
  );
}

function CrossingDiagram({
  buyer,
  gateway,
  account,
}: {
  buyer: string;
  gateway: string;
  account: string;
}) {
  const path = "M 40 120 C 200 120, 240 40, 400 40 S 600 120, 760 120";

  return (
    <div className="relative mt-16 lg:mt-20">
      <svg
        viewBox="0 0 800 170"
        className="relative h-auto w-full"
        role="img"
        aria-label={`${buyer} → ${gateway} → ${account}`}
      >
        <path
          d="M 40 120 C 180 60, 300 150, 400 90 S 620 30, 760 120"
          fill="none"
          stroke="oklch(0.733 0.113 183)"
          strokeWidth="1"
          strokeDasharray="2 6"
          opacity="0.5"
        />
        <path
          d="M 40 120 C 220 20, 520 160, 760 120"
          fill="none"
          stroke="oklch(0.472 0.216 267)"
          strokeWidth="1"
          strokeDasharray="2 6"
          opacity="0.35"
        />

        <path d={path} fill="none" stroke="oklch(0.885 0.008 250)" strokeWidth="1" strokeDasharray="3 5" />
        <path d={path} fill="none" stroke="oklch(0.733 0.113 183)" strokeWidth="2" className="cp-route-line" />
        <path
          d={path}
          fill="none"
          stroke="oklch(0.733 0.113 183)"
          strokeWidth="4"
          strokeLinecap="round"
          className="cp-route-pulse"
        />

        <circle cx="40" cy="120" r="5" fill="oklch(0.244 0.049 250)" />
        <circle cx="400" cy="40" r="7" fill="oklch(0.472 0.216 267)" />
        <circle cx="760" cy="120" r="5" fill="oklch(0.244 0.049 250)" />

        <text x="40" y="148" fill="oklch(0.475 0.014 249)" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
          {buyer.toUpperCase()}
        </text>
        <text x="400" y="24" textAnchor="middle" fill="oklch(0.244 0.049 250)" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
          {gateway.toUpperCase()}
        </text>
        <text x="760" y="148" textAnchor="end" fill="oklch(0.475 0.014 249)" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
          {account.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
