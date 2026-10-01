import type { L } from "./pricing";

export type IgamingStatus = "on_request" | "review" | "unavailable";

export const igamingMarkets: { market: L; status: IgamingStatus; requirement: L }[] = [
  { market: { pt: "Brasil", en: "Brazil" }, status: "on_request", requirement: { pt: "Autorização do Ministério da Fazenda (SPA)", en: "Authorization from the Ministry of Finance (SPA)" } },
  { market: { pt: "México", en: "Mexico" }, status: "on_request", requirement: { pt: "Licença local, KYC adicional para cartões", en: "Local license, additional KYC for cards" } },
  { market: { pt: "Argentina", en: "Argentina" }, status: "on_request", requirement: { pt: "Licença provincial obrigatória", en: "Provincial license required" } },
  { market: { pt: "Colômbia", en: "Colombia" }, status: "on_request", requirement: { pt: "Licença COLJUEGOS para métodos locais", en: "COLJUEGOS license for local methods" } },
  { market: { pt: "Chile", en: "Chile" }, status: "on_request", requirement: { pt: "Análise de KYC adicional", en: "Additional KYC review" } },
  { market: { pt: "Peru", en: "Peru" }, status: "on_request", requirement: { pt: "Registro no MINCETUR", en: "MINCETUR registration" } },
  { market: { pt: "Costa Rica, Guatemala, Panamá", en: "Costa Rica, Guatemala, Panama" }, status: "review", requirement: { pt: "Sujeito a análise de compliance", en: "Subject to compliance review" } },
  { market: { pt: "Equador, Uruguai, Bolívia", en: "Ecuador, Uruguay, Bolivia" }, status: "unavailable", requirement: { pt: "—", en: "—" } },
];
