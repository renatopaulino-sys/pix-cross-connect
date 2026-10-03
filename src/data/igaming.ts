import type { L } from "./pricing";

export type IgamingStatus = "suspended";

export const igamingMarkets: { market: L; status: IgamingStatus; requirement: L }[] = [
  { market: { pt: "Brasil", en: "Brazil" }, status: "suspended", requirement: { pt: "Autorização do Ministério da Fazenda (SPA)", en: "Authorization from the Ministry of Finance (SPA)" } },
  { market: { pt: "México", en: "Mexico" }, status: "suspended", requirement: { pt: "Licença local, KYC adicional para cartões", en: "Local license, additional KYC for cards" } },
  { market: { pt: "Argentina", en: "Argentina" }, status: "suspended", requirement: { pt: "Licença provincial obrigatória", en: "Provincial license required" } },
  { market: { pt: "Colômbia", en: "Colombia" }, status: "suspended", requirement: { pt: "Licença COLJUEGOS para métodos locais", en: "COLJUEGOS license for local methods" } },
  { market: { pt: "Chile", en: "Chile" }, status: "suspended", requirement: { pt: "Análise de KYC adicional", en: "Additional KYC review" } },
  { market: { pt: "Peru", en: "Peru" }, status: "suspended", requirement: { pt: "Registro no MINCETUR", en: "MINCETUR registration" } },
  { market: { pt: "Costa Rica, Guatemala, Panamá", en: "Costa Rica, Guatemala, Panama" }, status: "suspended", requirement: { pt: "Sujeito a análise de compliance", en: "Subject to compliance review" } },
  { market: { pt: "Equador, Uruguai, Bolívia", en: "Ecuador, Uruguay, Bolivia" }, status: "suspended", requirement: { pt: "Sujeito a análise regulatória", en: "Subject to regulatory review" } },
];
