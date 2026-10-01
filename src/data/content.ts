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
    badge: { available: "Disponível", on_request: "Disponível sob consulta", soon: "Em breve" },
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
        "Pix disponível no Brasil. Demais métodos disponíveis sob consulta, sujeitos a onboarding, ou em breve.",
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
        { name: "SaaS e assinaturas", text: "Cobranças recorrentes com referência própria por ciclo." },
        { name: "Marketplaces", text: "Recebimento centralizado e repasse a sellers na sequência." },
        { name: "Travel", text: "Reservas com janela de expiração definida por cobrança." },
        { name: "Educação", text: "Mensalidades e matrículas com conciliação por aluno." },
        { name: "Serviços digitais", text: "Pagamentos avulsos por link, sem desenvolvimento." },
        { name: "iGaming e Entretenimento Digital", text: "Disponível apenas para operadores com licença válida em cada mercado onde atuam, sujeito a due diligence reforçada." },
      ],
    },
    security: {
      label: "Compliance",
      title: "Segurança e compliance",
      paragraphs: [
        "Os dados trafegam criptografados em trânsito e são armazenados criptografados em repouso. O acesso interno é controlado por perfis, com registro de auditoria das operações sensíveis. O monitoramento antifraude avalia padrões de cobrança e liquidação. O onboarding segue políticas de KYC e AML, incluindo verificação documental da empresa e de seus sócios. O tratamento de dados pessoais segue a LGPD.",
        "A CruziaPay atua como facilitadora de pagamentos. O processamento é realizado em parceria com instituições autorizadas em cada mercado onde os serviços são oferecidos. A CruziaPay não é uma instituição financeira ou de pagamento licenciada e não se apresenta como tal.",
        "Os dados de cartão são processados por parceiros certificados PCI DSS. A CruziaPay não armazena dados completos de cartão.",
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
      docs: "Documentação completa",
      note: "Exemplo ilustrativo. Endpoints e campos podem mudar até a publicação da documentação.",
    },
    faq: {
      label: "FAQ",
      title: "Perguntas frequentes",
      items: [
        {
          q: "Quais métodos já estão disponíveis?",
          a: "Pix está disponível no Brasil. Cartões, split, Pix out e métodos LATAM estão disponíveis sob consulta, sujeitos a onboarding. Boleto, Pix parcelado e carteiras digitais estão em breve.",
        },
        {
          q: "Qual o prazo de liquidação do Pix?",
          a: "A confirmação do pagamento chega em segundos. O prazo de liquidação em conta é definido em contrato conforme o perfil de risco do merchant e o país de destino dos recursos.",
        },
        {
          q: "Como funciona a integração?",
          a: "Por API REST com autenticação por chave, ou por link de pagamento gerado sem desenvolvimento. As mudanças de status são enviadas por webhook e há sandbox para testes antes da produção.",
        },
        {
          q: "Quais documentos são exigidos no cadastro?",
          a: "Contrato social ou estatuto, cartão CNPJ ou equivalente no país de origem, documentos dos sócios e representantes, comprovante de endereço e dados bancários da conta de liquidação. Dependendo da vertical, pedimos documentação adicional.",
        },
        {
          q: "Vocês atendem empresas estrangeiras?",
          a: "Sim. É o caso de uso central do produto: empresas fora do Brasil que vendem para clientes brasileiros e precisam receber em Pix com liquidação fora do país. O processo de KYC é adaptado à jurisdição da empresa.",
        },
        {
          q: "Em quantos mercados vocês atuam?",
          a: "Métodos locais em 12 mercados da América Latina, sob consulta e sujeitos a onboarding. Veja a seção de preços para detalhes por país.",
        },
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
      privacyContact: "Privacidade",
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
    badge: { available: "Available", on_request: "Available on request", soon: "Coming soon" },
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
        "Pix available in Brazil. Other methods available on request, subject to onboarding, or coming soon.",
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
        { name: "SaaS and subscriptions", text: "Recurring charges with your own reference per cycle." },
        { name: "Marketplaces", text: "Centralised collection and downstream transfers to sellers." },
        { name: "Travel", text: "Bookings with an expiry window defined per charge." },
        { name: "Education", text: "Tuition and enrolment with per-student reconciliation." },
        { name: "Digital services", text: "One-off payments by link, with no development." },
        { name: "iGaming and Digital Entertainment", text: "Available only to operators holding a valid license in each market where they operate, subject to enhanced due diligence." },
      ],
    },
    security: {
      label: "Compliance",
      title: "Security and compliance",
      paragraphs: [
        "Data travels encrypted in transit and is stored encrypted at rest. Internal access is role controlled, with audit logging of sensitive operations. Anti fraud monitoring evaluates charge and settlement patterns. Onboarding follows KYC and AML policies, including document verification of the company and its shareholders. Personal data processing follows Brazil's LGPD.",
        "CruziaPay operates as a payment facilitator. Payment processing is carried out in partnership with institutions authorised in each market where services are offered. CruziaPay is not a licensed financial or payment institution and does not present itself as one.",
        "Card data is processed by PCI DSS certified partners. CruziaPay does not store full card data.",
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
      docs: "Full documentation",
      note: "Illustrative example. Endpoints and fields may change before documentation is published.",
    },
    faq: {
      label: "FAQ",
      title: "Frequently asked questions",
      items: [
        {
          q: "Which methods are available today?",
          a: "Pix is available in Brazil. Cards, split, Pix out and LATAM methods are available on request, subject to onboarding. Boleto, Pix in installments and digital wallets are coming soon.",
        },
        {
          q: "What is the Pix settlement window?",
          a: "Payment confirmation arrives in seconds. Settlement to your account is defined contractually according to merchant risk profile and the destination country of the funds.",
        },
        {
          q: "How does integration work?",
          a: "Through a REST API with key authentication, or through payment links generated without development. Status changes are pushed by webhook and a sandbox is available before production.",
        },
        {
          q: "Which documents are required at onboarding?",
          a: "Articles of incorporation, tax registration in the country of origin, documents of shareholders and legal representatives, proof of address and the settlement bank account details. Depending on the vertical we request additional documentation.",
        },
        {
          q: "Do you serve foreign companies?",
          a: "Yes. That is the core use case: companies outside Brazil selling to Brazilian customers that need to collect via Pix and settle abroad. KYC is adapted to the company's jurisdiction.",
        },
        {
          q: "How many markets do you cover?",
          a: "Local methods in 12 Latin American markets, on request and subject to onboarding. See the pricing section for details per country.",
        },
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
      privacyContact: "Privacy",
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
