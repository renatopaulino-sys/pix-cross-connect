export type Locale = "pt" | "en";

export const content = {
  pt: {
    nav: {
      solutions: "Soluções",
      methods: "Métodos",
      how: "Como funciona",
      developers: "Desenvolvedores",
      contact: "Contato",
      cta: "Falar com o time",
      login: "Entrar",
    },
    badge: { live: "Disponível", soon: "Em breve" },
    hero: {
      headline: "Receba com Pix. Liquide onde você precisa.",
      sub: "Infraestrutura de pagamentos cross-border para empresas que vendem no Brasil e precisam de liquidação previsível fora dele.",
      primary: "Falar com o time",
      secondary: "Ver documentação",
      status: "Pix ativo. Cartões e demais rails em homologação.",
      nodeBuyer: "Comprador no Brasil",
      nodeGateway: "CruziaPay",
      nodeAccount: "Sua conta",
    },
    methods: {
      label: "Métodos",
      title: "Métodos de pagamento",
      intro:
        "Um único contrato de integração. Novos métodos entram no mesmo endpoint conforme entram em produção.",
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
      ],
    },
    security: {
      label: "Compliance",
      title: "Segurança e compliance",
      paragraphs: [
        "Dados trafegam sob criptografia em trânsito e são armazenados criptografados em repouso. O acesso interno é controlado por perfis, com registro de auditoria das operações sensíveis.",
        "O monitoramento antifraude avalia padrões de cobrança e liquidação. Os processos de cadastro seguem políticas de KYC e AML, incluindo verificação documental da empresa e de seus sócios.",
        "O tratamento de dados pessoais segue a LGPD, com base legal definida por finalidade e retenção limitada ao necessário.",
        "A operação de pagamentos é realizada em parceria com instituição autorizada a operar no arranjo Pix. O CruziaPay não é a instituição licenciada e não se apresenta como tal.",
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
          a: "Somente o Pix. Cobrança por QR Code dinâmico, Pix Copia e Cola e link de pagamento. Os demais métodos listados no site estão marcados como em breve e ainda não podem ser contratados.",
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
          q: "Quando os demais métodos entram no ar?",
          a: "O roadmap está em execução e as datas dependem de homologações com parceiros e emissores. Não divulgamos mês específico. Clientes cadastrados são comunicados diretamente conforme cada método entra em produção.",
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
      submit: "Enviar contato",
      sending: "Enviando...",
      successTitle: "Contato enviado",
      successText:
        "Recebemos seus dados. O time comercial retorna em até um dia útil no e-mail informado.",
      errors: {
        name: "Informe o nome completo.",
        company: "Informe o nome da empresa.",
        email: "Informe um e-mail corporativo válido.",
        phone: "Informe o telefone com DDI, por exemplo +55 11 90000-0000.",
        country: "Informe o país de operação.",
        vertical: "Selecione a vertical da operação.",
        volume: "Selecione a faixa de volume mensal.",
        consent: "É necessário autorizar o tratamento dos dados.",
        submit: "Não foi possível enviar agora. Tente novamente em instantes.",
      },
    },
    footer: {
      description:
        "Infraestrutura de pagamentos cross-border para América Latina, com operação inicial no Brasil.",
      legal: "Legal",
      terms: "Termos de uso",
      privacy: "Política de privacidade",
      cookies: "Política de cookies",
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
      methods: "Methods",
      how: "How it works",
      developers: "Developers",
      contact: "Contact",
      cta: "Talk to the team",
      login: "Log in",
    },
    badge: { live: "Available", soon: "Coming soon" },
    hero: {
      headline: "Get paid with Pix. Settle where you need it.",
      sub: "Cross-border payment infrastructure for companies selling in Brazil that need predictable settlement outside of it.",
      primary: "Talk to the team",
      secondary: "See documentation",
      status: "Pix live. Cards and other rails in certification.",
      nodeBuyer: "Buyer in Brazil",
      nodeGateway: "CruziaPay",
      nodeAccount: "Your account",
    },
    methods: {
      label: "Methods",
      title: "Payment methods",
      intro:
        "One integration contract. New methods land on the same endpoint as they go into production.",
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
      ],
    },
    security: {
      label: "Compliance",
      title: "Security and compliance",
      paragraphs: [
        "Data travels encrypted in transit and is stored encrypted at rest. Internal access is role-controlled, with audit logging of sensitive operations.",
        "Anti-fraud monitoring evaluates charge and settlement patterns. Onboarding follows KYC and AML policies, including document verification of the company and its shareholders.",
        "Personal data processing follows Brazil's LGPD, with a legal basis defined per purpose and retention limited to what is necessary.",
        "Payment operations are carried out in partnership with an institution authorised to operate in the Pix scheme. CruziaPay is not the licensed institution and does not present itself as one.",
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
          a: "Pix only. Dynamic QR Code charges, copy-and-paste codes and payment links. Every other method listed on this site is marked as coming soon and cannot be contracted yet.",
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
          q: "When do the other methods go live?",
          a: "The roadmap is in execution and dates depend on certification with partners and issuers. We do not announce a specific month. Registered clients are informed directly as each method reaches production.",
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
      submit: "Send message",
      sending: "Sending...",
      successTitle: "Message sent",
      successText:
        "We received your details. The commercial team replies within one business day at the email provided.",
      errors: {
        name: "Enter your full name.",
        company: "Enter the company name.",
        email: "Enter a valid work email.",
        phone: "Enter the phone with country code, e.g. +55 11 90000-0000.",
        country: "Enter the country of operation.",
        vertical: "Select the operation vertical.",
        volume: "Select the monthly volume range.",
        consent: "You must authorise data processing.",
        submit: "Could not send right now. Please try again shortly.",
      },
    },
    footer: {
      description:
        "Cross-border payment infrastructure for Latin America, starting in Brazil.",
      legal: "Legal",
      terms: "Terms of use",
      privacy: "Privacy policy",
      cookies: "Cookie policy",
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
Authorization: Bearer sk_live_xxx
Content-Type: application/json

{
  "method": "pix",
  "amount": 24990,
  "currency": "BRL",
  "reference": "order_10482",
  "expires_in": 3600,
  "customer": {
    "name": "Maria Souza",
    "tax_id": "000.000.000-00"
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
    customer: { name: "Maria Souza", tax_id: "000.000.000-00" },
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
        "customer": {"name": "Maria Souza", "tax_id": "000.000.000-00"},
    },
)

charge = res.json()
print(charge["qr_code"])`,
} as const;
