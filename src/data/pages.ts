import { company } from "./company";
import type { Locale } from "./content";

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = { title: string; updated: string; intro?: string; sections: LegalSection[]; closing?: string };

const E = company.emails;
const entityEn = `${company.legalName}, CNPJ ${company.cnpj}, ${company.address}`;
const entityPt = `${company.legalName}, CNPJ ${company.cnpj}, ${company.addressPt}`;

export const legalDocs: Record<string, Record<Locale, LegalDoc>> = {
  terms: {
    en: {
      title: "Terms of use", updated: "Last updated: October 2026",
      intro: `These terms are entered into with ${entityEn}.`,
      sections: [
        { heading: "Purpose and acceptance", body: ["These terms govern access to the CruziaPay website and the use of its payment facilitation services. By using them you accept these terms."] },
        { heading: "Nature of the service", body: ["CruziaPay operates as a payment facilitator. Payment processing is carried out in partnership with institutions authorised in each market. CruziaPay is not a licensed financial or payment institution."] },
        { heading: "Onboarding and eligibility", body: ["Access depends on KYC, KYB and compliance approval. Businesses on our prohibited list are not accepted."] },
        { heading: "Pricing and settlement", body: ["Rates published on the website are indicative. Final terms, settlement windows and reserves are defined in the commercial agreement."] },
        { heading: "Suspension and termination", body: ["CruziaPay may suspend or terminate services in case of risk, breach of these terms or legal requirement."] },
        { heading: "Governing law", body: ["These terms are governed by Brazilian law, with jurisdiction in Londrina, PR."] },
      ],
      closing: `Questions about these terms: ${E.commercial}.`,
    },
    pt: {
      title: "Termos de uso", updated: "Última atualização: outubro de 2026",
      intro: `Estes termos são celebrados com ${entityPt}.`,
      sections: [
        { heading: "Objeto e aceitação", body: ["Estes termos regulam o acesso ao site da CruziaPay e o uso dos seus serviços de facilitação de pagamentos. Ao utilizá-los, você aceita estes termos."] },
        { heading: "Natureza do serviço", body: ["A CruziaPay atua como facilitadora de pagamentos. O processamento é realizado em parceria com instituições autorizadas em cada mercado. A CruziaPay não é uma instituição financeira ou de pagamento licenciada."] },
        { heading: "Cadastro e elegibilidade", body: ["O acesso depende de aprovação de KYC, KYB e compliance. Empresas da nossa lista de atividades proibidas não são aceitas."] },
        { heading: "Preços e liquidação", body: ["As taxas publicadas no site são indicativas. Os termos finais, prazos de liquidação e reservas são definidos no contrato comercial."] },
        { heading: "Suspensão e encerramento", body: ["A CruziaPay pode suspender ou encerrar os serviços em caso de risco, descumprimento destes termos ou exigência legal."] },
        { heading: "Lei aplicável", body: ["Estes termos são regidos pela lei brasileira, com foro em Londrina, PR."] },
      ],
      closing: `Dúvidas sobre estes termos: ${E.commercial}.`,
    },
  },
  privacy: {
    en: {
      title: "Privacy policy", updated: "Last updated: October 2026",
      intro: `${company.legalName}, CNPJ ${company.cnpj}, is the controller of the personal data described in this policy, under Brazil's LGPD.`,
      sections: [
        { heading: "Data we collect", body: ["Contact form data (name, company, email, phone, website, country, vertical and volume), onboarding documents and technical navigation data."] },
        { heading: "Purposes", body: ["Commercial follow-up, onboarding and KYC/AML verification, service operation, fraud prevention and compliance with legal obligations."] },
        { heading: "Sharing", body: ["Data may be shared with authorised processing partners and authorities when legally required. We do not sell personal data."] },
        { heading: "Retention and security", body: ["Data is kept only as long as necessary for each purpose or legal requirement, encrypted in transit and at rest."] },
        { heading: "Your rights", body: [`You may exercise the rights of access, correction, deletion and portability, among others provided by the LGPD, by writing to ${E.privacy}.`] },
        { heading: "Data Protection Officer", body: [`Data Protection Officer (Encarregado): ${company.dpo}, ${E.privacy}.`] },
      ],
    },
    pt: {
      title: "Política de privacidade", updated: "Última atualização: outubro de 2026",
      intro: `${company.legalName}, CNPJ ${company.cnpj}, é a controladora dos dados pessoais descritos nesta política, nos termos da LGPD.`,
      sections: [
        { heading: "Dados coletados", body: ["Dados do formulário de contato (nome, empresa, e-mail, telefone, website, país, vertical e volume), documentos de onboarding e dados técnicos de navegação."] },
        { heading: "Finalidades", body: ["Retorno comercial, onboarding e verificação de KYC/AML, operação do serviço, prevenção à fraude e cumprimento de obrigações legais."] },
        { heading: "Compartilhamento", body: ["Os dados podem ser compartilhados com parceiros de processamento autorizados e com autoridades quando exigido por lei. Não vendemos dados pessoais."] },
        { heading: "Retenção e segurança", body: ["Os dados são mantidos apenas pelo tempo necessário a cada finalidade ou exigência legal, com criptografia em trânsito e em repouso."] },
        { heading: "Direitos do titular", body: [`Você pode exercer os direitos de acesso, correção, exclusão e portabilidade, entre outros previstos na LGPD, pelo e-mail ${E.privacy}.`] },
        { heading: "Encarregado de dados", body: [`Encarregado (Data Protection Officer): ${company.dpo}, ${E.privacy}.`] },
      ],
    },
  },
  refund: {
    en: {
      title: "Refund & Chargeback Policy", updated: "Last updated: October 2026",
      sections: [
        { heading: "Refunds", body: ["Merchants may request full or partial refunds through the API or dashboard, within the period allowed by each payment method. A fee of USD 5 applies per refunded transaction."] },
        { heading: "Chargebacks and disputes", body: ["When a buyer disputes a transaction, CruziaPay notifies the merchant, who must submit evidence (proof of delivery, terms accepted, communications) within the deadline indicated in the notice. A fee of USD 25 applies per chargeback."] },
        { heading: "Deadlines", body: ["Dispute and evidence deadlines follow the rules of each card scheme and local payment method and are informed case by case."] },
        { heading: "Right of retention", body: ["CruziaPay may hold or offset amounts, including through the rolling reserve, when there is risk of chargebacks, fraud, regulatory exposure or breach of the commercial agreement."] },
      ],
      closing: `Disputes and chargeback inquiries: ${E.compliance}.`,
    },
    pt: {
      title: "Política de Reembolso e Chargeback", updated: "Última atualização: outubro de 2026",
      sections: [
        { heading: "Reembolsos", body: ["O lojista pode solicitar reembolsos totais ou parciais pela API ou painel, dentro do prazo permitido por cada método. Incide tarifa de USD 5 por transação reembolsada."] },
        { heading: "Chargebacks e contestações", body: ["Quando um comprador contesta uma transação, a CruziaPay notifica o lojista, que deve enviar evidências (comprovante de entrega, termos aceitos, comunicações) no prazo indicado na notificação. Incide tarifa de USD 25 por chargeback."] },
        { heading: "Prazos", body: ["Os prazos de contestação e de envio de evidências seguem as regras de cada bandeira e método local e são informados caso a caso."] },
        { heading: "Direito de retenção", body: ["A CruziaPay pode reter ou compensar valores, inclusive por meio da reserva rotativa, quando houver risco de chargebacks, fraude, exposição regulatória ou descumprimento do contrato comercial."] },
      ],
      closing: `Contestações e dúvidas sobre chargeback: ${E.compliance}.`,
    },
  },
  aml: {
    en: {
      title: "AML & KYC Policy", updated: "Public summary · October 2026",
      sections: [
        { heading: "Customer due diligence", body: ["We verify each business, its legal representatives and ultimate beneficial owners (UBOs), including corporate documents, identity, address and source of funds where applicable."] },
        { heading: "Transaction monitoring", body: ["Transactions are monitored on an ongoing basis for unusual patterns, with enhanced review for higher-risk verticals and markets."] },
        { heading: "Reporting", body: ["Suspicious activity is reported to the competent authorities when required by law."] },
        { heading: "High-risk refusal", body: ["We refuse or terminate relationships with customers that present unacceptable risk, are on sanctions lists or operate activities on our prohibited list."] },
      ],
      closing: `To report suspicious activity or for compliance inquiries, contact ${E.compliance}.`,
    },
    pt: {
      title: "Política de AML e KYC", updated: "Resumo público · outubro de 2026",
      sections: [
        { heading: "Due diligence de clientes", body: ["Verificamos cada empresa, seus representantes legais e beneficiários finais (UBOs), incluindo documentos societários, identidade, endereço e origem dos recursos quando aplicável."] },
        { heading: "Monitoramento de transações", body: ["As transações são monitoradas continuamente em busca de padrões atípicos, com análise reforçada para verticais e mercados de maior risco."] },
        { heading: "Comunicação a autoridades", body: ["Atividades suspeitas são comunicadas às autoridades competentes quando exigido por lei."] },
        { heading: "Recusa de alto risco", body: ["Recusamos ou encerramos relacionamentos com clientes que apresentem risco inaceitável, constem em listas de sanções ou exerçam atividades da nossa lista de proibidas."] },
      ],
      closing: `Para comunicar atividade suspeita ou dúvidas de compliance, escreva para ${E.compliance}.`,
    },
  },
  prohibited: {
    en: {
      title: "Prohibited & Restricted Businesses", updated: "Last updated: October 2026",
      sections: [
        { heading: "Prohibited", body: ["Illegal products or services", "Pyramid and Ponzi schemes", "Weapons, ammunition and explosives", "Drugs and controlled substances", "Illegal adult content", "Unlicensed gaming", "Unregistered crypto-assets", "Unauthorised financial services", "Counterfeit goods", "Money laundering or terrorist financing"] },
        { heading: "Restricted (enhanced review)", body: ["Gaming and sports betting", "Forex", "Crypto-assets", "Travel"] },
      ],
      closing: `Questions about eligibility of your business: ${E.compliance}.`,
    },
    pt: {
      title: "Atividades Proibidas e Restritas", updated: "Última atualização: outubro de 2026",
      sections: [
        { heading: "Proibidas", body: ["Produtos ou serviços ilegais", "Pirâmides e esquemas Ponzi", "Armas, munições e explosivos", "Drogas e substâncias controladas", "Conteúdo adulto ilegal", "Gaming sem licença", "Criptoativos sem registro", "Serviços financeiros não autorizados", "Falsificações", "Lavagem de dinheiro ou financiamento ao terrorismo"] },
        { heading: "Restritas (análise reforçada)", body: ["Gaming e apostas esportivas", "Forex", "Criptoativos", "Viagens"] },
      ],
      closing: `Dúvidas sobre a elegibilidade da sua empresa: ${E.compliance}.`,
    },
  },
  complaints: {
    en: {
      title: "Complaints", updated: "Last updated: October 2026",
      sections: [
        { heading: "How to file a complaint", body: [`Send your complaint to ${E.compliance} with your company name, transaction references and a description of the issue.`] },
        { heading: "Response time", body: ["We reply within up to 10 business days."] },
        { heading: "Escalation", body: [`If the response is not satisfactory, write to ${E.compliance} with the subject "Escalation". The case will be reviewed by the board.`] },
      ],
    },
    pt: {
      title: "Reclamações", updated: "Última atualização: outubro de 2026",
      sections: [
        { heading: "Como registrar uma reclamação", body: [`Envie sua reclamação para ${E.compliance} com o nome da empresa, referências das transações e a descrição do problema.`] },
        { heading: "Prazo de resposta", body: ["Respondemos em até 10 dias úteis."] },
        { heading: "Escalonamento", body: [`Se a resposta não for satisfatória, escreva para ${E.compliance} com o assunto "Escalation". O caso será revisado pela diretoria.`] },
      ],
    },
  },
};

export const pagesCopy = {
  en: {
    about: {
      label: "Company",
      title: "Built by payments operators, for cross-border businesses",
      text: "CruziaPay is a cross-border payment facilitator focused on Latin America. We connect global and regional businesses to local payment methods through one integration, with compliance and settlement designed around each operation.",
      teamTitle: "Our team",
      team: "CruziaPay is led by professionals with over a decade in cross-border payments across Latin America, working with local payment rails such as Pix, SPEI, PSE and OXXO, card acquiring, PSP and PayFac models, FX and settlement structuring, and KYC and AML frameworks. Experience across iGaming, e-commerce, travel and fintech.",
      companyTitle: "Company", legalName: "Legal name", cnpj: "CNPJ", address: "Address", hours: "Business hours", contacts: "Contacts",
      operateTitle: "How we operate", amlLink: "Read our AML & KYC Policy",
    },
    igaming: {
      label: "iGaming",
      title: "Payments for licensed gaming operators in Latin America",
      whoTitle: "Who we work with",
      who: "Only operators holding a valid license in each market where they offer services. Licenses are verified during onboarding and monitored on an ongoing basis.",
      cols: { market: "Market", status: "Status", requirement: "Requirement" },
      status: { on_request: "Available on request", review: "On request", unavailable: "Not available" },
      rgTitle: "Responsible gaming",
      rg: "Operators must apply age verification (18+), self exclusion tools and deposit limits as required by each market's regulation.",
      eddTitle: "Enhanced due diligence",
      edd: ["Valid licenses in each market", "Ultimate beneficial owners (UBOs)", "Source of funds", "Responsible gaming policies", "The operator's AML policy"],
      cta: "Talk to the team",
    },
    method: {
      what: "What it is", how: "How the buyer pays", country: "Country", currency: "Currency", confirmation: "Confirmation window",
      useCases: "Recommended use", status: "Status", cta: "Talk to the team", back: "All methods",
    },
    insights: { label: "Insights", title: "Insights", empty: "First articles coming soon." },
  },
  pt: {
    about: {
      label: "Empresa",
      title: "Construída por operadores de pagamentos, para negócios cross-border",
      text: "A CruziaPay é uma facilitadora de pagamentos cross-border focada na América Latina. Conectamos empresas globais e regionais a métodos de pagamento locais por meio de uma única integração, com compliance e liquidação desenhados para cada operação.",
      teamTitle: "Nosso time",
      team: "A CruziaPay é liderada por profissionais com mais de uma década em pagamentos cross-border na América Latina, atuando com trilhos locais como Pix, SPEI, PSE e OXXO, adquirência de cartões, modelos PSP e PayFac, estruturação de FX e liquidação, e frameworks de KYC e AML. Experiência em iGaming, e-commerce, viagens e fintech.",
      companyTitle: "Empresa", legalName: "Razão social", cnpj: "CNPJ", address: "Endereço", hours: "Horário de atendimento", contacts: "Contatos",
      operateTitle: "Como operamos", amlLink: "Leia nossa Política de AML e KYC",
    },
    igaming: {
      label: "iGaming",
      title: "Pagamentos para operadores de gaming licenciados na América Latina",
      whoTitle: "Com quem trabalhamos",
      who: "Apenas operadores com licença válida em cada mercado onde oferecem serviços. As licenças são verificadas no onboarding e monitoradas continuamente.",
      cols: { market: "Mercado", status: "Status", requirement: "Requisito" },
      status: { on_request: "Disponível sob consulta", review: "Sob consulta", unavailable: "Indisponível" },
      rgTitle: "Jogo responsável",
      rg: "Os operadores devem aplicar verificação de idade (18+), ferramentas de autoexclusão e limites de depósito conforme a regulação de cada mercado.",
      eddTitle: "Due diligence reforçada",
      edd: ["Licenças válidas em cada mercado", "Beneficiários finais (UBOs)", "Origem dos recursos", "Políticas de jogo responsável", "Política de AML do operador"],
      cta: "Falar com o time",
    },
    method: {
      what: "O que é", how: "Como o comprador paga", country: "País", currency: "Moeda", confirmation: "Janela de confirmação",
      useCases: "Uso recomendado", status: "Status", cta: "Falar com o time", back: "Todos os métodos",
    },
    insights: { label: "Insights", title: "Insights", empty: "Primeiros artigos em breve." },
  },
} as const;
