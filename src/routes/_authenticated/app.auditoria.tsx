import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listAuditLogs } from "@/lib/panel.functions";
import { PageHeader } from "@/components/panel/PanelLayout";

export const Route = createFileRoute("/_authenticated/app/auditoria")({
  component: AuditPage,
});

type AuditLog = {
  id: string;
  actor_email: string | null;
  actor_user_id: string;
  action: string;
  entity_type: string;
  entity_label: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
};

const ACTION_LABELS: Record<string, { label: string; className: string }> = {
  "kyc.approved": { label: "KYC aprovado", className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  "kyc.rejected": { label: "KYC rejeitado", className: "bg-red-500/15 text-red-600 dark:text-red-400" },
  "routing_rule.created": { label: "Regra criada", className: "bg-primary/15 text-primary" },
  "routing_rule.updated": { label: "Regra atualizada", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  "routing_rule.deleted": { label: "Regra removida", className: "bg-red-500/15 text-red-600 dark:text-red-400" },
};

function AuditPage() {
  const fetchLogs = useServerFn(listAuditLogs);
  const logs = useQuery({ queryKey: ["audit-logs"], queryFn: () => fetchLogs() });

  if (logs.isError) {
    return (
      <div>
        <PageHeader title="Log de Auditoria" />
        <p className="text-sm text-muted-foreground">
          Sua conta não tem permissão de administrador para ver esta área.
        </p>
      </div>
    );
  }

  const rows = (logs.data ?? []) as AuditLog[];

  return (
    <div>
      <PageHeader
        title="Log de Auditoria"
        subtitle="Decisões de KYC e alterações nas regras de roteamento, com autor e data."
      />

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Quando</th>
              <th className="px-4 py-3">Quem</th>
              <th className="px-4 py-3">Ação</th>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((log) => {
              const meta = ACTION_LABELS[log.action] ?? {
                label: log.action,
                className: "bg-muted text-muted-foreground",
              };
              return (
                <tr key={log.id} className="border-b border-border/50 align-top last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {new Date(log.created_at).toLocaleString("pt-BR")}
                  </td>
                  <td className="px-4 py-3">{log.actor_email ?? log.actor_user_id}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.className}`}>
                      {meta.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{log.entity_label ?? "—"}</td>
                  <td className="px-4 py-3">
                    <pre className="max-w-md overflow-x-auto whitespace-pre-wrap font-mono text-xs text-muted-foreground">
                      {JSON.stringify(log.details ?? {}, null, 0)}
                    </pre>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                  Nenhum evento registrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
