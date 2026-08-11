import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  LayoutDashboard,
  FileCheck2,
  Settings,
  Users,
  Route as RouteIcon,
  LogOut,
  ArrowLeftRight,
  Menu,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/profile";
import { cn } from "@/lib/utils";
import mark from "@/assets/cruziapay-mark.png.asset.json";

const merchantNav = [
  { to: "/app", label: "Início / Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/onboarding", label: "Onboarding (KYC)", icon: FileCheck2 },
  { to: "/app/configuracoes", label: "Configurações", icon: Settings },
] as const;

const adminNav = [
  { to: "/app/clientes", label: "Gestão de Clientes / KYC", icon: Users },
  { to: "/app/roteamento", label: "Roteamento Inteligente", icon: RouteIcon },
] as const;

export function PanelLayout({ children }: { children: ReactNode }) {
  const { mode, toggle } = useProfile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const items = mode === "admin" ? adminNav : merchantNav;

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-card transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Link to="/" className="flex items-center gap-2 border-b border-border px-5 py-4">
          <img src={mark.url} alt="CruziaPay" className="h-8 w-auto" />
          <span className="font-display text-lg font-bold text-foreground">CruziaPay</span>
        </Link>

        <div className="px-5 pt-5">
          <p className="label-mono text-xs uppercase text-muted-foreground">
            {mode === "admin" ? "Back-office" : "Cliente"}
          </p>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {items.map((item) => {
            const active = "exact" in item && item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-primary/10 font-semibold text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-border p-3">
          <button
            type="button"
            onClick={() => {
              toggle();
              navigate({ to: mode === "admin" ? "/app" : "/app/clientes" });
            }}
            className="group flex w-full items-center gap-3 rounded-xl border border-border bg-gradient-to-r from-primary/10 to-transparent px-3 py-2.5 text-left text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:from-primary/20"
          >
            <ArrowLeftRight className="h-4 w-4 text-primary transition-transform group-hover:rotate-180" />
            <span className="flex-1">
              Alternar Perfil:{" "}
              <span className={cn(mode === "merchant" && "font-bold text-primary")}>Cliente</span> /{" "}
              <span className={cn(mode === "admin" && "font-bold text-primary")}>Admin</span>
            </span>
          </button>
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} aria-hidden />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border px-5 py-3 lg:hidden">
          <button type="button" onClick={() => setOpen(true)} aria-label="Abrir menu">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-display font-bold">Painel</span>
        </header>
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl font-bold text-foreground lg:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function StatusPill({ status }: { status: string | null | undefined }) {
  const map: Record<string, { label: string; className: string }> = {
    pending: { label: "Pendente", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
    approved: { label: "Aprovado", className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
    cleared: { label: "Liberado", className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
    rejected: { label: "Rejeitado", className: "bg-red-500/15 text-red-600 dark:text-red-400" },
    settled: { label: "Liquidado", className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
    failed: { label: "Falhou", className: "bg-red-500/15 text-red-600 dark:text-red-400" },
  };
  const s = map[status ?? "pending"] ?? { label: status ?? "—", className: "bg-muted text-muted-foreground" };
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", s.className)}>{s.label}</span>
  );
}