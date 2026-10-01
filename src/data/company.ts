// Single source of truth for legal entity data. Edit here only.
export const company = {
  brand: "CruziaPay",
  legalName: "CRUZIAPAY LTDA",
  cnpj: "69.333.124/0001-95",
  address: "Rua João Huss, 1331, Gleba Fazenda Palhano, Londrina, PR, CEP 86050-490, Brazil",
  addressPt: "Rua João Huss, 1331, Gleba Fazenda Palhano, Londrina, PR, CEP 86050-490, Brasil",
  emails: {
    commercial: "comercial@cruziapay.com.br",
    compliance: "compliance@cruziapay.com.br",
    privacy: "privacidade@cruziapay.com.br",
  },
  hours: {
    en: "Monday to Friday, 9am to 6pm (BRT)",
    pt: "Segunda a sexta, das 9h às 18h (BRT)",
  },
  dpo: "Filipe Gomez",
  siteUrl: "https://www.cruziapay.com",
} as const;
