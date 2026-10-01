import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

export function SectionShell({
  id, tone = "paper", children, className = "",
}: {
  id?: string;
  tone?: "paper" | "sand" | "ink";
  children: ReactNode;
  className?: string;
}) {
  const ref = useReveal<HTMLElement>();
  const bg =
    tone === "sand" ? "bg-sand" : tone === "ink" ? "bg-onyx text-ink" : "bg-background";

  return (
    <section
      id={id}
      ref={ref}
      className={`border-t border-border ${bg} py-16 sm:py-20 lg:py-28 ${className}`}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHead({
  label, title, intro, align = "left",
}: {
  label: string; title: string; intro?: string; align?: "left" | "center";
}) {
  return (
    <div className={`cp-reveal max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="label-mono text-gradient-brand font-semibold">{label}</p>
      <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-slateink">{intro}</p> : null}
    </div>
  );
}

export function Badge({ live, liveLabel, soonLabel }: { live: boolean; liveLabel: string; soonLabel: string }) {
  return live ? (
    <span className="label-mono inline-flex items-center gap-1.5 rounded-full bg-success/12 px-2.5 py-1 font-semibold text-success">
      <span className="cp-status-dot h-1.5 w-1.5 rounded-full bg-success" />
      {liveLabel}
    </span>
  ) : (
    <span className="label-mono inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-2.5 py-1 font-semibold text-warning">
      <span className="h-1.5 w-1.5 rounded-full bg-warning" />
      {soonLabel}
    </span>
  );
}

export type StatusKind = "available" | "on_request" | "soon";

export function StatusPill({ status, label }: { status: StatusKind; label: string }) {
  if (status === "available") return <Badge live liveLabel={label} soonLabel={label} />;
  return (
    <span
      className={
        "label-mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-semibold " +
        (status === "on_request" ? "border-brand/40 bg-brand/10 text-ink" : "border-border bg-sand text-slateink")
      }
    >
      <span className={"h-1.5 w-1.5 rounded-full " + (status === "on_request" ? "bg-brand" : "bg-slateink/60")} />
      {label}
    </span>
  );
}
