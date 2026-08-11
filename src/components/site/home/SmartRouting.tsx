import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { home, acquirers } from "@/data/home";
import { SectionShell, SectionHead } from "./SectionShell";

export function SmartRouting() {
  const { locale } = useI18n();
  const c = home[locale];
  const [hovered, setHovered] = useState<string | null>(null);

  const nodes = acquirers.map((a, i) => ({
    ...a,
    x: 700,
    y: 35 + i * 52,
  }));

  const tooltip =
    hovered === "hub"
      ? { title: c.routing.hub, note: c.routing.hubNote }
      : hovered === "source"
        ? { title: c.routing.source, note: c.routing.sourceNote }
        : (() => {
            const node = acquirers.find((a) => a.id === hovered);
            return node ? { title: `${node.name} · ${node.market}`, note: node.note[locale] } : null;
          })();

  return (
    <SectionShell id="roteamento" tone="sand">
      <SectionHead label={c.routing.label} title={c.routing.title} intro={c.routing.intro} />

      <div className="mt-12 rounded-2xl border border-border bg-paper p-4 sm:p-8">
        <svg viewBox="0 0 800 350" className="h-auto w-full" role="img" aria-label={c.routing.title}>
          <defs>
            <linearGradient id="cp-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="800" y2="0">
              <stop offset="0%" stopColor="oklch(0.626 0.152 244)" />
              <stop offset="100%" stopColor="oklch(0.804 0.146 219.5)" />
            </linearGradient>
          </defs>

          <path
            d="M 130 175 H 360"
            fill="none"
            stroke="url(#cp-grad)"
            strokeWidth="2"
            className="cp-route-line"
          />

          {nodes.map((n, i) => (
            <path
              key={n.id}
              d={`M 440 175 C 540 175, 560 ${n.y}, ${n.x - 40} ${n.y}`}
              fill="none"
              stroke="url(#cp-grad)"
              strokeWidth={hovered === n.id ? 2.5 : 1.5}
              opacity={hovered && hovered !== n.id ? 0.25 : 0.8}
              className="cp-route-line"
              style={{ animationDelay: `${0.2 + i * 0.12}s` }}
            />
          ))}

          {/* source */}
          <g
            onMouseEnter={() => setHovered("source")}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <rect x="20" y="150" width="110" height="50" rx="12" fill="oklch(0.248 0 90)" />
            <text x="75" y="180" textAnchor="middle" fill="white" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600">
              {c.routing.source}
            </text>
          </g>

          {/* hub */}
          <g
            onMouseEnter={() => setHovered("hub")}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <rect x="360" y="140" width="80" height="70" rx="16" fill="url(#cp-grad)" />
            <text x="400" y="172" textAnchor="middle" fill="white" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="700">
              Cruzia
            </text>
            <text x="400" y="188" textAnchor="middle" fill="white" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="700">
              Pay
            </text>
          </g>

          {/* acquirer nodes */}
          {nodes.map((n) => (
            <g
              key={n.id}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <rect
                x={n.x - 40}
                y={n.y - 18}
                width="120"
                height="36"
                rx="10"
                fill="var(--color-paper)"
                stroke={hovered === n.id ? "oklch(0.626 0.152 244)" : "var(--color-border)"}
                strokeWidth={hovered === n.id ? 2 : 1}
              />
              <text
                x={n.x + 20}
                y={n.y + 4}
                textAnchor="middle"
                fill="var(--color-ink)"
                fontSize="12"
                fontFamily="Inter, sans-serif"
                fontWeight="600"
              >
                {n.name} · {n.market}
              </text>
            </g>
          ))}
        </svg>

        <div className="mt-4 min-h-14 rounded-xl border border-border bg-sand px-4 py-3">
          {tooltip ? (
            <>
              <p className="font-display text-sm font-bold text-ink">{tooltip.title}</p>
              <p className="text-sm text-slateink">{tooltip.note}</p>
            </>
          ) : (
            <p className="text-sm text-slateink">{c.routing.tooltipHint}</p>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
