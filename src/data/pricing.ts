import type { Locale } from "./content";

export type L = Record<Locale, string>;
const s = (x: string): L => ({ pt: x, en: x });
const b = (pt: string, en: string): L => ({ pt, en });

/** When false, Pricing shows only "Pay-in from X%" cards + general fees and a request button. */
export const showFullPricing = true;

export type RateRow = { method: L; providers: L; rate: L };
export type PricingCountry = {
  code: string;
  flag: string;
  name: L;
  currency: string;
  from: string;
  payin: RateRow[];
  payout: RateRow[] | null;
  minFee: L | null;
  notes: L;
};

const cards = b("Cartões locais de débito e crédito", "Local debit & credit cards");
const bank = b("Transferência bancária", "Bank transfer");
const cash = b("Dinheiro", "Cash");
const wallets = b("Carteiras digitais", "E-wallets");
const none = s("—");

export const pricingCountries: PricingCountry[] = [
  {
    code: "BR", flag: "🇧🇷", name: b("Brasil", "Brazil"), currency: "BRL", from: "7.3%",
    payin: [{ method: cards, providers: s("Visa, Mastercard, Elo, Amex"), rate: s("7.3%") }],
    payout: null, minFee: null,
    notes: b("Preço do Pix sob consulta.", "Pix pricing on request."),
  },
  {
    code: "MX", flag: "🇲🇽", name: b("México", "Mexico"), currency: "MXN", from: "5%",
    payin: [
      { method: cards, providers: s("Visa, Mastercard, Amex"), rate: s("7.5%") },
      { method: bank, providers: s("SPEI, CoDi, Dimo"), rate: s("5%") },
      { method: s("OXXO Pay"), providers: s("OXXO"), rate: s("8%") },
      { method: cash, providers: b("7Eleven, Walmart, Circle K, Soriana e mais 10+", "7Eleven, Walmart, Circle K, Soriana and 10+ more"), rate: s("6.5%") },
    ],
    payout: [{ method: b("Transferência SPEI", "SPEI bank transfer"), providers: b("De 1 a 200.000 MXN", "From 1 to 200,000 MXN"), rate: s("5%") }],
    minFee: b("4 MXN (dinheiro na 7Eleven e outras lojas: 10 MXN)", "4 MXN (cash at 7Eleven and other stores: 10 MXN)"),
    notes: b(
      "IVA de 16% incide sobre a taxa de processamento. Cartões para apostas esportivas e gaming estão sujeitos a KYC adicional. Métodos em dinheiro não estão disponíveis para forex e cripto, exceto OXXO Pay.",
      "VAT of 16% applies to the processing fee. Cards for sports betting and gaming are subject to additional KYC. Cash methods are not available for forex and crypto, except OXXO Pay.",
    ),
  },
  {
    code: "AR", flag: "🇦🇷", name: s("Argentina"), currency: "ARS", from: "6%",
    payin: [
      { method: cards, providers: s("Visa, Mastercard, Maestro, Amex, Naranja X, Cabal"), rate: s("7.5%") },
      { method: b("Depósito bancário / Debin", "Bank deposit / Debin"), providers: s("Debin"), rate: s("6%") },
      { method: b("QR code interoperável", "Interoperable QR code"), providers: none, rate: s("6%") },
    ],
    payout: [{ method: bank, providers: b("De ARS 1 a 2.500.000", "From ARS 1 to 2,500,000"), rate: s("6% + USD 2") }],
    minFee: null,
    notes: b(
      "IVA de 21% incide sobre a taxa de processamento. Um imposto local de 0,6% incide sobre o valor do depósito. Apostas esportivas e gaming exigem licença local.",
      "VAT of 21% applies to the processing fee. A local tax of 0.6% applies to the deposit amount. Sports betting and gaming require a local license.",
    ),
  },
  {
    code: "CO", flag: "🇨🇴", name: b("Colômbia", "Colombia"), currency: "COP", from: "6%",
    payin: [
      { method: cards, providers: s("Visa, Mastercard, Amex, Diners"), rate: s("7.3%") },
      { method: s("PSE & Bre-B"), providers: s("PSE, Bre-B"), rate: s("6%") },
      { method: s("Transfiya"), providers: s("Transfiya"), rate: s("6%") },
      { method: cash, providers: s("Efecty, Bancolombia"), rate: s("7%") },
      { method: wallets, providers: s("Nequi, Tpaga"), rate: s("7%") },
    ],
    payout: [{ method: b("Transferência ACH", "ACH bank transfer"), providers: b("De 1 a 3.000.000 COP", "From 1 to 3,000,000 COP"), rate: s("6%") }],
    minFee: s("2,000 COP"),
    notes: b(
      "IVA de 19% incide sobre a taxa de processamento. GMF de 0,4% incide sobre o valor do pedido. Alguns métodos para gaming exigem licença COLJUEGOS ou KYC adicional.",
      "VAT of 19% applies to the processing fee. GMF of 0.4% applies to the order amount. Some gaming methods require a COLJUEGOS license or additional KYC.",
    ),
  },
  {
    code: "CL", flag: "🇨🇱", name: s("Chile"), currency: "CLP", from: "6%",
    payin: [
      { method: b("Cartões locais de débito e crédito / WebPay", "Local debit & credit cards / WebPay"), providers: s("WebPay"), rate: s("7%") },
      { method: b("Transferência bancária direta", "Direct bank transfer"), providers: b("Banco Estado, Banco de Chile, BCI, Santander, Itaú e outros", "Banco Estado, Banco de Chile, BCI, Santander, Itaú and more"), rate: s("6%") },
      { method: s("Khipu"), providers: s("Khipu"), rate: s("6%") },
      { method: b("Carteira MACH", "MACH e-wallet"), providers: s("MACH"), rate: s("7.8%") },
    ],
    payout: [{ method: bank, providers: b("Sem limite máximo", "No maximum limit"), rate: s("6%") }],
    minFee: b("200 CLP no pay-in, 350 CLP no payout", "200 CLP pay-in, 350 CLP payout"),
    notes: b(
      "IVA de 19% incide sobre a taxa de processamento. Merchants de forex devem possuir licença CMF. Merchants de gaming estão sujeitos a KYC adicional.",
      "VAT of 19% applies to the processing fee. Forex merchants should hold a CMF license. Gaming merchants are subject to additional KYC.",
    ),
  },
  {
    code: "PE", flag: "🇵🇪", name: s("Peru"), currency: "PEN", from: "6.3%",
    payin: [
      { method: cards, providers: s("Visa, Mastercard, Amex, Diners"), rate: s("7.5%") },
      { method: b("Pagamento instantâneo por QR (CCE)", "QR instant payment (CCE)"), providers: s("CCE"), rate: s("6.3%") },
      { method: bank, providers: s("BCP, BBVA, Interbank, Scotiabank"), rate: s("6.3%") },
      { method: cash, providers: b("Agentes bancários, Kasnet, Tambo", "Bank agents, Kasnet, Tambo"), rate: s("6.3%") },
      { method: wallets, providers: b("Yape, Plin, Tunki e outras", "Yape, Plin, Tunki and more"), rate: s("6.8%") },
    ],
    payout: [{ method: bank, providers: b("Sem limite máximo", "No maximum limit"), rate: s("5.8%") }],
    minFee: s("4 PEN"),
    notes: b(
      "IVA de 18% incide sobre a taxa de processamento. Merchants de gaming e PSPs devem estar registrados no MINCETUR.",
      "VAT of 18% applies to the processing fee. Gaming merchants and PSPs must be registered with MINCETUR.",
    ),
  },
  {
    code: "EC", flag: "🇪🇨", name: b("Equador", "Ecuador"), currency: "USD", from: "7%",
    payin: [
      { method: cards, providers: none, rate: s("8.5%") },
      { method: cash, providers: b("Western Union, Tía, Farmacias 911 e mais 15+", "Western Union, Tía, Farmacias 911 and 15+ more"), rate: s("7%") },
      { method: bank, providers: s("Banco Guayaquil, Banco Pichincha"), rate: s("7%") },
      { method: b("Carteira Deuna", "Deuna e-wallet"), providers: s("Deuna"), rate: s("7%") },
    ],
    payout: [{ method: bank, providers: b("Sem limite máximo", "No maximum limit"), rate: s("5.8%") }],
    minFee: s("USD 1"),
    notes: b(
      "IVA de 15% incide sobre a taxa de processamento. Retenção de 5% incide sobre cada pagamento. Indisponível para apostas esportivas e gaming.",
      "VAT of 15% applies to the processing fee. A 5% withholding tax applies to each payment. Not available for sports betting and gaming.",
    ),
  },
  {
    code: "CR", flag: "🇨🇷", name: s("Costa Rica"), currency: "CRC", from: "7%",
    payin: [
      { method: cards, providers: none, rate: s("8.5%") },
      { method: bank, providers: s("Banco Nacional"), rate: s("7%") },
      { method: cash, providers: s("Banco Nacional, Payser, Puntos hey"), rate: s("7%") },
    ],
    payout: [{ method: bank, providers: none, rate: s("7%") }],
    minFee: s("USD 1"),
    notes: b(
      "IVA de 13% incide sobre a taxa de processamento. Indisponível para forex e cripto.",
      "VAT of 13% applies to the processing fee. Not available for forex and crypto.",
    ),
  },
  {
    code: "GT", flag: "🇬🇹", name: s("Guatemala"), currency: "GTQ", from: "8.5%",
    payin: [{ method: cash, providers: s("Akisi, Super24"), rate: s("8.5%") }],
    payout: null, minFee: s("USD 1"),
    notes: b(
      "IVA de 12% incide sobre a taxa de processamento. Indisponível para forex e cripto.",
      "VAT of 12% applies to the processing fee. Not available for forex and crypto.",
    ),
  },
  {
    code: "PA", flag: "🇵🇦", name: b("Panamá", "Panama"), currency: "USD", from: "8.5%",
    payin: [{ method: cash, providers: s("Super Xtra, Punto Pago"), rate: s("8.5%") }],
    payout: null, minFee: s("USD 1"),
    notes: b(
      "IVA de 7% incide sobre a taxa de processamento. Indisponível para forex e cripto.",
      "VAT of 7% applies to the processing fee. Not available for forex and crypto.",
    ),
  },
  {
    code: "UY", flag: "🇺🇾", name: s("Uruguai"), currency: "UYU", from: "7%",
    payin: [
      { method: bank, providers: b("BROU, Itaú, Santander, BBVA, HSBC e outros", "BROU, Itaú, Santander, BBVA, HSBC and more"), rate: s("7%") },
      { method: b("Dinheiro nos pontos Redpagos", "Cash at Redpagos physical points"), providers: s("Redpagos"), rate: s("7%") },
    ],
    payout: [{ method: bank, providers: none, rate: s("6.5%") }],
    minFee: s("USD 1"),
    notes: b(
      "IVA de 22% incide sobre a taxa de processamento. Indisponível para apostas esportivas e gaming.",
      "VAT of 22% applies to the processing fee. Not available for sports betting and gaming.",
    ),
  },
  {
    code: "BO", flag: "🇧🇴", name: s("Bolívia"), currency: "BOB", from: "7.5%",
    payin: [
      { method: cards, providers: none, rate: s("8.5%") },
      { method: b("Pagamento instantâneo por QR", "QR instant payment"), providers: none, rate: s("7.5%") },
    ],
    payout: [{ method: bank, providers: none, rate: s("6.5%") }],
    minFee: s("USD 1"),
    notes: b(
      "IVA de 13% incide sobre a taxa de processamento. Indisponível para apostas esportivas e gaming.",
      "VAT of 13% applies to the processing fee. Not available for sports betting and gaming.",
    ),
  },
];
// English names for two that share spelling in PT only
pricingCountries.find((c) => c.code === "UY")!.name = b("Uruguai", "Uruguay");
pricingCountries.find((c) => c.code === "BO")!.name = b("Bolívia", "Bolivia");

export const accountFees: { label: L; value: L }[] = [
  { label: b("Taxa de setup", "Setup fee"), value: b("Isenta", "Waived") },
  { label: b("Taxa de controle de risco", "Risk control fee"), value: b("USD 0,30 por transação de cartão aprovada", "USD 0.30 per approved card transaction") },
  { label: b("Reembolso", "Refund"), value: b("USD 5 por transação reembolsada", "USD 5 per refunded transaction") },
  { label: s("Chargeback"), value: b("USD 25 por chargeback", "USD 25 per chargeback") },
  { label: b("Liquidação internacional (SWIFT, USD/EUR)", "International settlement (SWIFT, USD/EUR)"), value: b("USD 150 por liquidação", "USD 150 per settlement") },
  { label: b("Outras moedas de liquidação", "Other settlement currencies"), value: b("+2% + USD 150 por liquidação", "+2% + USD 150 per settlement") },
  { label: b("FX para liquidação em BRL", "FX for BRL settlement"), value: s("2%") },
  { label: b("FX para liquidação cross-border", "FX for cross-border settlement"), value: s("3.5%") },
  { label: b("FX do saldo de pay-in para conta de payout", "FX from pay-in balance to payout account"), value: s("3%") },
  { label: b("Frequência de liquidação", "Settlement frequency"), value: b("Semanal, quinzenal ou mensal", "Weekly, biweekly or monthly") },
  { label: b("Reserva rotativa", "Rolling reserve"), value: b("10% retidos por 120 dias", "10% held for 120 days") },
];
