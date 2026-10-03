export type Locale = "pt" | "en";

export const content = {
  pt: {
    nav: {
      solutions: "Soluções",
      crossBorder: "Cross-border",
      methods: "Métodos",
      pricing: "Preços",
      how: "Como funciona",
      developers: "Desenvolvedores",
      company: "Empresa",
      contact: "Contato",
      cta: "Falar com o time",
      login: "Portal do merchant",
      testPix: "Testar Pix",
    },
    badge: { available: "Ativo", on_request: "Ativo", soon: "Ativo" },
    hero: {
      headline: "Receba com Pix. Liquide onde você precisa.",
      sub: "Infraestrutura de pagamentos cross-border para empresas que vendem no Brasil e precisam de liquidação previsível fora dele.",
      primary: "Falar com o time",
      secondary: "Ver documentação",
      status: "Pix, cartões e demais trilhos de pagamento disponíveis.",
      nodeBuyer: "Comprador no Brasil",
      nodeGateway: "CruziaPay",
      nodeAccount: "Sua conta",
    },
    methods: {
      label: "Métodos",
      title: "Métodos de pagamento",
      intro:
        "Pix, cartões, boleto, carteiras digitais e métodos locais LATAM estão ativos na mesma integração.",
    },
    solutions: {
      label: "Soluções",
      title: "O que você pode operar",
      intro:
        "Produtos construídos sobre o mesmo núcleo de cobrança, liquidação e conciliação.",
    },
    how: {
      label: "Fluxo",
      title: "Como funciona",
      steps: [
        {
          title: "Cadastro e KYC",
          text: "Envio de documentação da empresa e aprovação de compliance.",
        },
        {
          title: "Integração",
          text: "Conecte por API REST ou link de pagamento, sem infraestrutura própria.",
        },
        {
          title: "Cobrança",
          text: "Seu cliente paga por Pix e a confirmação chega em segundos.",
        },
        {
          title: "Liquidação",
          text: "Recebimento em conta com extrato conciliado.",
        },
      ],
    },
    verticals: {
      label: "Verticais",
      title: "Verticais atendidas",
      items: [
        { name: "E-commerce", text: "Cobrança Pix no checkout com confirmação imediata do pedido." },
        { name: "SaaS e assinaturas", text: "Cobranças recorrentes por ciclo de faturamento, com referência própria e conciliação automática." },
        { name: "Marketplaces", text: "Cobrança centralizada com conciliação por pedido e split automático para sellers." },
        { name: "Travel", text: "Reservas com janela de expiração definida por cobrança." },
        { name: "Educação", text: "Mensalidades e matrículas com conciliação por aluno." },
        { name: "Serviços digitais", text: "Pagamentos avulsos por link, sem desenvolvimento." },
        { name: "iGaming e Entretenimento Digital", text: "Vertical suspensa no Brasil após a Medida Provisória assinada em 25 de setembro de 2026." },
      ],
    },
    security: {
      label: "Compliance",
      title: "Segurança e compliance",
      paragraphs: [
        "Os dados trafegam criptografados em trânsito e são armazenados criptografados em repouso. O acesso interno é controlado por perfis, com registro de auditoria das operações sensíveis. O monitoramento antifraude avalia padrões de cobrança e liquidação. O onboarding segue políticas de KYC e AML, incluindo verificação documental da empresa e de seus sócios. O tratamento de dados pessoais segue a LGPD.",
        "A CruziaPay atua como facilitadora de pagamentos. O processamento é realizado em parceria com instituições autorizadas em cada mercado onde os serviços são oferecidos. A CruziaPay não é uma instituição financeira ou de pagamento licenciada e não se apresenta como tal.",
        "Dados de cartão são capturados e tokenizados por instituição parceira certificada PCI DSS. O CruziaPay não armazena o número completo do cartão nem o código de segurança e trata apenas o token e os dados mínimos da transação.",
        "Não fazemos onboarding de empresas da nossa lista de atividades proibidas. Operadores de gaming devem possuir licença válida em cada mercado e cumprir requisitos de jogo responsável e verificação de idade (18+).",
      ],
    },
    developers: {
      label: "Desenvolvedores",
      title: "Integração REST, webhooks e sandbox",
      text: [
        "A API é REST com autenticação por chave secreta enviada no header. Cada cobrança recebe uma referência sua, o que mantém a conciliação simples do lado do seu sistema.",
        "As mudanças de estado são notificadas por webhook assinado, com reentrega em caso de falha. O ambiente de sandbox reproduz o ciclo completo de cobrança e confirmação sem movimentação real de recursos.",
      ],
      docs: "Solicitar acesso à API",
      note: "Exemplo ilustrativo. Endpoints e campos podem mudar até a publicação da documentação.",
    },
    faq: {
      label: "FAQ",
      title: "Perguntas frequentes",
      items: [
        { q: "Quais métodos estão disponíveis hoje?", a: "Pix, cartões de crédito e débito, boleto, Pix parcelado, carteiras digitais, Pix out e métodos locais da América Latina estão ativos na mesma integração." },
        { q: "Qual o prazo de liquidação do Pix?", a: "O Pix é confirmado em segundos, 24/7. A liquidação local ocorre de D+0 a D+1 dia útil. A liquidação internacional segue a moeda e o prazo acordados em contrato." },
        { q: "Como funciona a integração?", a: "API REST com autenticação por chave secreta, webhooks assinados com reentrega e referência própria em cada cobrança. Links de pagamento estão disponíveis para times sem desenvolvimento." },
        { q: "Quais documentos são exigidos no cadastro?", a: "Contrato social, registro fiscal, identificação dos sócios e beneficiários finais (UBO), comprovante de endereço e dados bancários de liquidação. Empresas estrangeiras enviam os documentos equivalentes da sua jurisdição." },
        { q: "Vocês atendem empresas estrangeiras?", a: "Sim. A CruziaPay foi construída para empresas globais que vendem para clientes brasileiros, com liquidação internacional estruturada por parceiros autorizados nos termos acordados comercialmente." },
        { q: "Como acesso os métodos disponíveis?", a: "Fale com o time para configurar os métodos, moedas, limites e condições comerciais adequados ao seu mercado e à sua operação." },
      ],
    },
    contact: {
      label: "Contato",
      title: "Fale com o time comercial",
      intro:
        "Descreva sua operação e o time responde com o desenho de integração e as condições aplicáveis.",
      fields: {
        name: "Nome",
        company: "Empresa",
        email: "E-mail corporativo",
        phone: "Telefone com DDI",
        country: "País de operação",
        vertical: "Vertical",
        volume: "Volume mensal estimado",
        message: "Mensagem",
        select: "Selecione",
        website: "Website",
        markets: "Mercados de interesse (opcional)",
      },
      verticals: [
        "E-commerce",
        "SaaS e assinaturas",
        "Marketplace",
        "Travel",
        "iGaming",
        "Educação",
        "Serviços digitais",
        "Outra",
      ],
      volumes: [
        "Até R$ 100 mil",
        "R$ 100 mil a R$ 500 mil",
        "R$ 500 mil a R$ 2 milhões",
        "R$ 2 milhões a R$ 10 milhões",
        "Acima de R$ 10 milhões",
      ],
      consent:
        "Autorizo o CruziaPay a tratar meus dados para retorno comercial, conforme a",
      consentLink: "Política de privacidade",
      license: "Confirmo que minha empresa possui as licenças exigidas nos mercados onde opera.",
      submit: "Enviar contato",
      sending: "Enviando...",
      successTitle: "Contato enviado",
      successText:
        "Recebemos seus dados. O time comercial retorna em até um dia útil no e-mail informado.",
      errors: {
        name: "Informe o nome completo.",
        company: "Informe o nome da empresa.",
        email: "Informe um e-mail corporativo válido.",
        phone: "Informe o telefone com DDI.",
        country: "Informe o país de operação.",
        vertical: "Selecione a vertical da operação.",
        volume: "Selecione a faixa de volume mensal.",
        consent: "É necessário autorizar o tratamento dos dados.",
        website: "Informe o website da empresa.",
        license: "É necessário confirmar as licenças.",
        submit: "Não foi possível enviar agora. Tente novamente em instantes.",
      },
    },
    footer: {
      description:
        "Infraestrutura de pagamentos cross-border para a América Latina.",
      legal: "Legal",
      product: "Produto",
      company: "Empresa",
      terms: "Termos de uso",
      privacy: "Política de privacidade",
      cookies: "Política de cookies",
      refund: "Reembolso e chargeback",
      aml: "AML e KYC",
      prohibited: "Atividades proibidas",
      complaints: "Reclamações",
      about: "Sobre",
      igaming: "iGaming",
      insights: "Insights",
      brandLine: "CruziaPay é uma marca operada por",
      commercial: "Comercial",
      compliance: "Compliance",
      privacyContact: "Privacidade (DPO)",
      security: "Segurança e compliance",
      cookiePrefs: "Preferências de cookies",
      partnerLine: "As operações de pagamento são realizadas em parceria com instituição autorizada a operar no arranjo Pix. A CruziaPay é uma facilitadora de pagamentos e não é instituição financeira ou de pagamento licenciada.",
      hours: "Horário de atendimento",
      rights: "Todos os direitos reservados.",
    },
    cookies: {
      text: "Usamos cookies essenciais para operar o site e cookies opcionais de medição de audiência.",
      accept: "Aceitar todos",
      reject: "Recusar não essenciais",
      link: "Política de cookies",
    },
    legal: {
      pending: "Conteúdo pendente de revisão jurídica.",
      back: "Voltar ao site",
    },
  },
  en: {
    nav: {
      solutions: "Solutions",
      crossBorder: "Cross-border",
      methods: "Methods",
      pricing: "Pricing",
      how: "How it works",
      developers: "Developers",
      company: "Company",
      contact: "Contact",
      cta: "Talk to the team",
      login: "Merchant portal",
      testPix: "Test Pix",
    },
    badge: { available: "Live", on_request: "Live", soon: "Live" },
    hero: {
      headline: "Get paid with Pix. Settle where you need it.",
      sub: "Cross-border payment infrastructure for companies selling in Brazil that need predictable settlement outside of it.",
      primary: "Talk to the team",
      secondary: "See documentation",
      status: "Pix, cards and other payment rails are available.",
      nodeBuyer: "Buyer in Brazil",
      nodeGateway: "CruziaPay",
      nodeAccount: "Your account",
    },
    methods: {
      label: "Methods",
      title: "Payment methods",
      intro:
        "Pix, cards, boleto, digital wallets and local LATAM methods are live through the same integration.",
    },
    solutions: {
      label: "Solutions",
      title: "What you can run",
      intro:
        "Products built on the same charging, settlement and reconciliation core.",
    },
    how: {
      label: "Flow",
      title: "How it works",
      steps: [
        { title: "Onboarding and KYC", text: "Company documentation review and compliance approval." },
        { title: "Integration", text: "Connect via REST API or payment link, with no infrastructure of your own." },
        { title: "Charge", text: "Your customer pays with Pix and confirmation arrives in seconds." },
        { title: "Settlement", text: "Funds credited to your account with a reconciled statement." },
      ],
    },
    verticals: {
      label: "Verticals",
      title: "Verticals we serve",
      items: [
        { name: "E-commerce", text: "Pix at checkout with immediate order confirmation." },
        { name: "SaaS and subscriptions", text: "Recurring charges per billing cycle, with your own reference and automatic reconciliation." },
        { name: "Marketplaces", text: "Centralised collection with per-order reconciliation and automatic seller split." },
        { name: "Travel", text: "Bookings with an expiry window defined per charge." },
        { name: "Education", text: "Tuition and enrolment with per-student reconciliation." },
        { name: "Digital services", text: "One-off payments by link, with no development." },
        { name: "iGaming and Digital Entertainment", text: "Vertical suspended in Brazil following the Provisional Measure signed on 25 September 2026." },
      ],
    },
    security: {
      label: "Compliance",
      title: "Security and compliance",
      paragraphs: [
        "Data travels encrypted in transit and is stored encrypted at rest. Internal access is role controlled, with audit logging of sensitive operations. Anti fraud monitoring evaluates charge and settlement patterns. Onboarding follows KYC and AML policies, including document verification of the company and its shareholders. Personal data processing follows Brazil's LGPD.",
        "CruziaPay operates as a payment facilitator. Payment processing is carried out in partnership with institutions authorised in each market where services are offered. CruziaPay is not a licensed financial or payment institution and does not present itself as one.",
        "Card data is captured and tokenised by a PCI DSS certified partner institution. CruziaPay does not store the full card number or security code and processes only the token and minimum transaction data.",
        "We do not onboard businesses on our prohibited list. Gaming operators must hold a valid license in each market and comply with responsible gaming and age verification (18+) requirements.",
      ],
    },
    developers: {
      label: "Developers",
      title: "REST integration, webhooks and sandbox",
      text: [
        "The API is REST with secret-key authentication sent in the header. Every charge carries your own reference, which keeps reconciliation simple on your side.",
        "State changes are notified through signed webhooks, with retry on failure. The sandbox reproduces the full charge and confirmation cycle with no real movement of funds.",
      ],
      docs: "Request API access",
      note: "Illustrative example. Endpoints and fields may change before documentation is published.",
    },
    faq: {
      label: "FAQ",
      title: "Frequently asked questions",
      items: [
        { q: "Which methods are available today?", a: "Pix, credit and debit cards, boleto, Pix instalments, digital wallets, Pix out and local Latin American methods are live through the same integration." },
        { q: "What is the Pix settlement window?", a: "Pix is confirmed in seconds, 24/7. Local settlement runs from D+0 to D+1 business day. International settlement follows the currency and timing agreed in your contract." },
        { q: "How does integration work?", a: "A REST API with secret key authentication, signed webhooks with retry, and your own reference on every charge. Payment links are available for teams that need no development." },
        { q: "Which documents are required at onboarding?", a: "Articles of incorporation, tax registration, shareholder and UBO identification, proof of address and settlement bank details. Foreign companies submit the equivalent documents from their home jurisdiction." },
        { q: "Do you serve foreign companies?", a: "Yes. CruziaPay is built for global businesses selling to Brazilian customers, with international settlement structured through authorised partners under the terms agreed commercially." },
        { q: "How do I access the available methods?", a: "Talk to the team to configure the methods, currencies, limits and commercial terms suited to your market and operation." },
      ],
    },
    contact: {
      label: "Contact",
      title: "Talk to the commercial team",
      intro:
        "Describe your operation and the team replies with an integration design and applicable terms.",
      fields: {
        name: "Name",
        company: "Company",
        email: "Work email",
        phone: "Phone with country code",
        country: "Country of operation",
        vertical: "Vertical",
        volume: "Estimated monthly volume",
        message: "Message",
        select: "Select",
        website: "Website",
        markets: "Markets of interest (optional)",
      },
      verticals: [
        "E-commerce",
        "SaaS and subscriptions",
        "Marketplace",
        "Travel",
        "iGaming",
        "Education",
        "Digital services",
        "Other",
      ],
      volumes: [
        "Up to USD 20k",
        "USD 20k to USD 100k",
        "USD 100k to USD 400k",
        "USD 400k to USD 2M",
        "Above USD 2M",
      ],
      consent:
        "I authorise CruziaPay to process my data for commercial follow-up, under the",
      consentLink: "Privacy policy",
      license: "I confirm my business holds the licenses required in the markets where it operates.",
      submit: "Send message",
      sending: "Sending...",
      successTitle: "Message sent",
      successText:
        "We received your details. The commercial team replies within one business day at the email provided.",
      errors: {
        name: "Enter your full name.",
        company: "Enter the company name.",
        email: "Enter a valid work email.",
        phone: "Enter the phone with country code.",
        country: "Enter the country of operation.",
        vertical: "Select the operation vertical.",
        volume: "Select the monthly volume range.",
        consent: "You must authorise data processing.",
        website: "Enter the company website.",
        license: "You must confirm the required licenses.",
        submit: "Could not send right now. Please try again shortly.",
      },
    },
    footer: {
      description:
        "Cross-border payment infrastructure for Latin America.",
      legal: "Legal",
      product: "Product",
      company: "Company",
      terms: "Terms of use",
      privacy: "Privacy policy",
      cookies: "Cookie policy",
      refund: "Refund & Chargeback",
      aml: "AML & KYC",
      prohibited: "Prohibited Businesses",
      complaints: "Complaints",
      about: "About",
      igaming: "iGaming",
      insights: "Insights",
      brandLine: "CruziaPay is a brand operated by",
      commercial: "Commercial",
      compliance: "Compliance",
      privacyContact: "Privacy (DPO)",
      security: "Security and compliance",
      cookiePrefs: "Cookie preferences",
      partnerLine: "Payment operations are carried out in partnership with an institution authorised to operate in the Pix scheme. CruziaPay is a payment facilitator and is not itself a licensed financial or payment institution.",
      hours: "Business hours",
      rights: "All rights reserved.",
    },
    cookies: {
      text: "We use essential cookies to run the site and optional cookies for audience measurement.",
      accept: "Accept all",
      reject: "Reject non-essential",
      link: "Cookie policy",
    },
    legal: {
      pending: "Content pending legal review.",
      back: "Back to site",
    },
  },
} as const;

export const codeSamples = {
  curl: `POST https://api.cruziapay.com/v1/charges
Authorization: Bearer sk_test_xxx
Content-Type: application/json

{
  "method": "pix",
  "amount": 24990,
  "currency": "BRL",
  "reference": "order_10482",
  "expires_in": 3600,
  "customer": {
    "name": "Maria Souza",
    "tax_id": "000.000.000-00 (test data)"
  }
}`,
  node: `const res = await fetch("https://api.cruziapay.com/v1/charges", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.CRUZIAPAY_SECRET_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    method: "pix",
    amount: 24990,
    currency: "BRL",
    reference: "order_10482",
    expires_in: 3600,
    customer: { name: "Maria Souza", tax_id: "000.000.000-00 (test data)" },
  }),
});

const charge = await res.json();
console.log(charge.qr_code);`,
  python: `import os, requests

res = requests.post(
    "https://api.cruziapay.com/v1/charges",
    headers={
        "Authorization": f"Bearer {os.environ['CRUZIAPAY_SECRET_KEY']}",
        "Content-Type": "application/json",
    },
    json={
        "method": "pix",
        "amount": 24990,
        "currency": "BRL",
        "reference": "order_10482",
        "expires_in": 3600,
        "customer": {"name": "Maria Souza", "tax_id": "000.000.000-00 (test data)"},
    },
)

charge = res.json()
print(charge["qr_code"])`,
} as const;
