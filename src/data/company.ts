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
  whatsapp: {
    phone: "5514998202287",
    messagePt: "Olá! Vim pelo site do CruziaPay e quero falar com o time comercial.",
    messageEn: "Hi! I'm coming from the CruziaPay website and would like to talk to the sales team.",
    labelPt: "Fale com o time comercial no WhatsApp",
    labelEn: "Talk to our sales team on WhatsApp",
  },
  dpo: "Filipe Gomez",
  siteUrl: "https://www.cruziapay.com",
} as const;
