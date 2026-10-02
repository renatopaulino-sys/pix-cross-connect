import { company } from "./company";
import type { Locale } from "./content";

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = { title: string; updated: string; intro?: string; sections: LegalSection[]; closing?: string };

const E = company.emails;

const policyText: Record<"terms" | "privacy" | "cookies", Record<Locale, LegalDoc>> = {
 "privacy": {
  "en": {
   "title": "Privacy and Personal Data Protection Policy",
   "updated": "Version 1.0 · Public document · Code: POL-001 · LGPD-001",
   "sections": [
    {
     "heading": "Purpose",
     "body": [
      "CRUZIAPAY LTDA (\"CruziaPay\") is a payment facilitator that enables companies, in Brazil and abroad, to receive payments from Brazilian customers via Pix and other local methods, organizing the national and international reconciliation and settlement of operations.",
      "Payment operations are carried out in partnership with institutions authorized to operate within the Pix arrangement. CruziaPay is not a financial institution nor an authorized payment institution, does not offer credit, does not open or manage payment or deposit accounts, and does not perform credit analysis.",
      "This Policy formalizes the protection, privacy, and confidentiality guidelines applicable to the processing of personal data by CruziaPay and must be read in conjunction with the Terms of Use."
     ]
    },
    {
     "heading": "Definitions",
     "body": [
      "Data Subject is the natural person to whom the personal data refers. User is the data subject who browses CruziaPay websites and platforms. Client is the company that contracts CruziaPay's services to receive payments. Payer is the person who makes a payment to a Client through the platform.",
      "Personal data is information related to an identified or identifiable natural person. Sensitive personal data is data concerning racial or ethnic origin, religious conviction, political opinion, health, sexual life, genetic or biometric data. Processing is any operation performed with personal data, pursuant to Art. 5 of the LGPD.",
      "Controller is CRUZIAPAY LTDA, who is responsible for decisions regarding the processing. Processor is the party that processes personal data on behalf of the controller. DPO (Encarregado) is the communication channel between the controller, data subjects, and the ANPD. Anonymization is the use of technical means that prevent the association of data with an individual."
     ]
    },
    {
     "heading": "Legal and Regulatory Basis",
     "body": [
      "This Policy observes Law No. 13,709/2018 (LGPD), Law No. 12,965/2014 (Brazilian Civil Rights Framework for the Internet), Law No. 12,865/2013 and Central Bank of Brazil regulations on payment arrangements and the Pix arrangement, Law No. 9,613/1998 on Anti-Money Laundering, and Law No. 14,790/2023 when the Client operates in the fixed-odds betting sector."
     ]
    },
    {
     "heading": "Scope and Applicability",
     "body": [
      "This Policy applies to all users accessing the cruziapay.com website and CruziaPay platforms, to representatives, partners, and ultimate beneficial owners of Clients during registration, to Payers whose data passes through the platform, and to all employees, third parties, and partners who process personal data on behalf of CruziaPay.",
      "Regarding Payers' data, the Client acts as the controller, and CruziaPay processes such data to enable collection, settlement, and compliance with legal obligations for fraud and money laundering prevention."
     ]
    },
    {
     "heading": "Principles of Processing",
     "body": [
      "CruziaPay and its processors observe the principles of Art. 6 of the LGPD: purpose, adequacy, necessity, free access, data quality, transparency, security, prevention, non-discrimination, and accountability."
     ]
    },
    {
     "heading": "Collected Data and Purposes",
     "body": [
      "Registration data of Clients and their representatives: corporate name, CNPJ or equivalent foreign registry, full name, CPF or identification document, date of birth, address, email, telephone number, and corporate structure, including ultimate beneficial owners.",
      "Financial data: bank details for settlement, estimated volume, and transaction history.",
      "Payer data: name, CPF, value, date, and identifier of the Pix transaction and, when provided by the Client, email and order reference.",
      "Browsing data: IP address, access logs, device, operating system, browser, session identifier, and cookies, pursuant to the Cookie Policy.",
      "Commercial contact data: name, company, corporate email, telephone, country, vertical, estimated volume, and message sent via the website form.",
      "CruziaPay does not process or store payment card data. When card methods are made available, this Policy will be updated to reflect the applicable controls.",
      "These data are processed for Client identification and registration (KYC and KYB), processing, reconciliation, and settlement of payments, prevention of fraud, money laundering, and terrorism financing, compliance with legal and regulatory obligations, information security, customer service, and commercial communication when consented."
     ]
    },
    {
     "heading": "Processing Operations and Legal Grounds",
     "body": [
      "All processing is linked to a legal basis under Art. 7 of the LGPD: compliance with a legal or regulatory obligation (item II), performance of a contract or preliminary procedures at the request of the data subject (item V), regular exercise of rights in judicial, administrative, or arbitration proceedings (item VI), legitimate interest, such as in fraud prevention and transaction security, provided that the data subject's rights do not prevail (item IX), and consent, for commercial communications and non-essential cookies (item I)."
     ]
    },
    {
     "heading": "Sharing and Processors",
     "body": [
      "CruziaPay shares data only for legitimate purposes and never sells or rents it. Sharing occurs with processors under processing and confidentiality agreements and, when required by law, with authorities such as the Central Bank of Brazil, COAF, ANPD, Federal Revenue, and the Judiciary.",
      "The primary processors are: partner institutions authorized to operate in the Pix arrangement, for transaction processing and settlement; foreign exchange providers, for international settlement; hosting and database providers; KYC and document validation providers; and corporate email providers.",
      "International transfer: part of the processing may occur in providers located outside Brazil and, in operations with foreign Clients, settlement data may be transmitted to institutions in other jurisdictions. CruziaPay adopts contractual clauses and technical measures ensuring protection compatible with the LGPD, pursuant to Art. 33."
     ]
    },
    {
     "heading": "Storage, Security, and Retention",
     "body": [
      "Data is encrypted in transit (TLS 1.2 or higher) and at rest. Internal access is restricted by profile, with multi-factor authentication and audit logging of sensitive operations. Anti-fraud monitoring assesses collection and settlement patterns.",
      "Application access logs are kept for at least 6 months, as per Art. 15 of Law No. 12,965/2014. Registration and transaction records are kept for at least 5 years after the termination of the relationship, as per Art. 10 of Law No. 9,613/1998. Commercial contact data without contracting are kept for up to 24 months or until consent is revoked. Once the periods expire, the data is deleted or anonymized."
     ]
    },
    {
     "heading": "Data Subject Rights",
     "body": [
      "Pursuant to Art. 18 of the LGPD, the data subject may request confirmation of the existence of processing, access to data, correction of incomplete, inaccurate, or outdated data, anonymization, blocking or deletion of unnecessary or excessive data, portability, deletion of data processed with consent, information on sharing, and revocation of consent.",
      "Requests must be sent to the DPO at privacidade@cruziapay.com.br and will be responded to within 15 days. Data whose retention is required by law will remain stored for the legal term, even after a deletion request."
     ]
    },
    {
     "heading": "Sensitive Data and Data of Minors",
     "body": [
      "CruziaPay does not intentionally process sensitive personal data, except for biometric data eventually used in onboarding identity validation, subject to specific consent or under the hypotheses of Art. 11 of the LGPD. CruziaPay websites and platforms are not intended for individuals under 18 years of age."
     ]
    },
    {
     "heading": "Contact Channels and General Provisions",
     "body": [
      "Privacy matters and exercise of rights: privacidade@cruziapay.com.br. Compliance and anti-money laundering matters: compliance@cruziapay.com.br.",
      "This Policy may be updated at any time, with prior notice in case of relevant changes. CruziaPay reports suspicious operations to the competent authorities, pursuant to Law No. 9,613/1998. The courts of the District of Londrina/PR are hereby elected. This document is reviewed annually."
     ]
    }
   ],
   "intro": "Entity: CRUZIAPAY LTDA · CNPJ: 69.333.124/0001-95 · Data Protection Officer (DPO): privacidade@cruziapay.com.br · Venue: Londrina/PR, Brazil."
  },
  "pt": {
   "title": "Política de Privacidade e Proteção de Dados Pessoais",
   "updated": "Versão 1.0 · Documento público · Código: POL-001 · LGPD-001",
   "sections": [
    {
     "heading": "Objetivo",
     "body": [
      "A CRUZIAPAY LTDA (\"CruziaPay\") é uma facilitadora de pagamentos (Payment Facilitator) que habilita empresas, no Brasil e no exterior, a receber pagamentos de clientes brasileiros por meio do Pix e de outros métodos locais, organizando a conciliação e a liquidação nacional e internacional das operações.",
      "As operações de pagamento são realizadas em parceria com instituição autorizada a operar no arranjo Pix. O CruziaPay não é instituição financeira nem instituição de pagamento autorizada, não oferta crédito, não abre nem administra conta de pagamento ou de depósito e não realiza análise de crédito.",
      "Esta Política formaliza as diretrizes de proteção, privacidade e sigilo aplicáveis ao tratamento de dados pessoais pelo CruziaPay e deve ser lida em conjunto com os Termos de Uso."
     ]
    },
    {
     "heading": "Definições",
     "body": [
      "Titular é a pessoa natural a quem se referem os dados pessoais. Usuário é o titular que navega pelos sites e plataformas do CruziaPay. Cliente é a empresa que contrata os serviços do CruziaPay para receber pagamentos. Pagador é a pessoa que realiza um pagamento a um Cliente por meio da plataforma.",
      "Dado pessoal é a informação relacionada a pessoa natural identificada ou identificável. Dado pessoal sensível é o dado sobre origem racial ou étnica, convicção religiosa, opinião política, saúde, vida sexual, dado genético ou biométrico. Tratamento é toda operação realizada com dados pessoais, nos termos do art. 5º da LGPD.",
      "Controlador é a CRUZIAPAY LTDA, a quem competem as decisões sobre o tratamento. Operador é quem trata dados pessoais em nome do controlador. Encarregado é o canal de comunicação entre o controlador, os titulares e a ANPD. Anonimização é o uso de meios técnicos que impedem a associação de um dado a um indivíduo."
     ]
    },
    {
     "heading": "Base legal e regulatória",
     "body": [
      "Esta Política observa a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais), a Lei nº 12.965/2014 (Marco Civil da Internet), a Lei nº 12.865/2013 e a regulamentação do Banco Central do Brasil sobre arranjos de pagamento e o arranjo Pix, a Lei nº 9.613/1998 sobre prevenção à lavagem de dinheiro e a Lei nº 14.790/2023 quando o Cliente atuar no setor de apostas de quota fixa."
     ]
    },
    {
     "heading": "Escopo e aplicabilidade",
     "body": [
      "Esta Política se aplica a todos os usuários que acessam o site cruziapay.com e as plataformas do CruziaPay, aos representantes, sócios e beneficiários finais dos Clientes durante o cadastro, aos Pagadores cujos dados transitam pela plataforma e a todos os colaboradores, terceiros e parceiros que tratam dados pessoais em nome do CruziaPay.",
      "Em relação aos dados dos Pagadores, o Cliente atua como controlador e o CruziaPay trata esses dados para viabilizar a cobrança, a liquidação e o cumprimento das obrigações legais de prevenção à fraude e à lavagem de dinheiro."
     ]
    },
    {
     "heading": "Princípios do tratamento",
     "body": [
      "O CruziaPay e seus operadores observam os princípios do art. 6º da LGPD: finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação e responsabilização e prestação de contas."
     ]
    },
    {
     "heading": "Dados coletados e finalidades",
     "body": [
      "Dados cadastrais dos Clientes e de seus representantes: razão social, CNPJ ou registro estrangeiro equivalente, nome completo, CPF ou documento de identidade, data de nascimento, endereço, e-mail, telefone e composição societária, incluindo beneficiários finais.",
      "Dados financeiros: dados bancários para liquidação, volume estimado e histórico de transações.",
      "Dados dos Pagadores: nome, CPF, valor, data e identificador da transação Pix e, quando informados pelo Cliente, e-mail e referência do pedido.",
      "Dados de navegação: endereço IP, registros de acesso, dispositivo, sistema operacional, navegador, identificador de sessão e cookies, nos termos da Política de Cookies.",
      "Dados de contato comercial: nome, empresa, e-mail corporativo, telefone, país, vertical, volume estimado e mensagem enviados pelo formulário do site.",
      "O CruziaPay não processa nem armazena dados de cartão de pagamento. Quando métodos com cartão forem disponibilizados, esta Política será atualizada para refletir os controles aplicáveis.",
      "Esses dados são tratados para identificação e cadastro de Clientes (KYC e KYB), processamento, conciliação e liquidação de pagamentos, prevenção à fraude, à lavagem de dinheiro e ao financiamento do terrorismo, cumprimento de obrigações legais e regulatórias, segurança da informação, atendimento e comunicação comercial quando consentida."
     ]
    },
    {
     "heading": "Operações de tratamento e bases legais",
     "body": [
      "Todo tratamento está vinculado a uma base legal do art. 7º da LGPD: cumprimento de obrigação legal ou regulatória (inciso II), execução de contrato ou de procedimentos preliminares a pedido do titular (inciso V), exercício regular de direitos em processo judicial, administrativo ou arbitral (inciso VI), legítimo interesse, como na prevenção à fraude e na segurança das transações, sempre que não prevalecerem os direitos do titular (inciso IX), e consentimento, para comunicações comerciais e cookies não essenciais (inciso I)."
     ]
    },
    {
     "heading": "Compartilhamento e operadores",
     "body": [
      "O CruziaPay compartilha dados apenas para finalidades legítimas e nunca os vende ou aluga. O compartilhamento ocorre com operadores sob contrato de tratamento e confidencialidade e, quando exigido por lei, com autoridades como Banco Central do Brasil, COAF, ANPD, Receita Federal e Poder Judiciário.",
      "Os principais operadores são: instituição parceira autorizada a operar no arranjo Pix, para processamento e liquidação das transações; provedor de câmbio, para liquidação internacional; provedores de hospedagem e banco de dados; provedor de KYC e validação documental; e provedor de e-mail corporativo.",
      "Transferência internacional: parte do tratamento pode ocorrer em provedores localizados fora do Brasil e, nas operações com Clientes estrangeiros, dados de liquidação podem ser transmitidos a instituições em outras jurisdições. O CruziaPay adota cláusulas contratuais e medidas técnicas que asseguram proteção compatível com a LGPD, nos termos do art. 33."
     ]
    },
    {
     "heading": "Armazenamento, segurança e retenção",
     "body": [
      "Os dados são criptografados em trânsito (TLS 1.2 ou superior) e em repouso. O acesso interno é restrito por perfil, com autenticação multifator e registro de auditoria das operações sensíveis. O monitoramento antifraude avalia padrões de cobrança e liquidação.",
      "Os registros de acesso a aplicações são mantidos por no mínimo 6 meses, conforme o art. 15 do Marco Civil da Internet. Os cadastros e registros de transações são mantidos por no mínimo 5 anos após o encerramento da relação, conforme o art. 10 da Lei nº 9.613/1998. Os dados de contato comercial sem contratação são mantidos por até 24 meses ou até a revogação do consentimento. Encerrados os prazos, os dados são eliminados ou anonimizados."
     ]
    },
    {
     "heading": "Direitos dos titulares",
     "body": [
      "Nos termos do art. 18 da LGPD, o titular pode solicitar a confirmação da existência de tratamento, o acesso aos dados, a correção de dados incompletos, inexatos ou desatualizados, a anonimização, o bloqueio ou a eliminação de dados desnecessários ou excessivos, a portabilidade, a eliminação dos dados tratados com consentimento, a informação sobre compartilhamento e a revogação do consentimento.",
      "As solicitações devem ser enviadas ao Encarregado em privacidade@cruziapay.com.br e serão respondidas em até 15 dias. Dados cuja conservação seja exigida por lei permanecerão armazenados pelo prazo legal, mesmo após pedido de eliminação."
     ]
    },
    {
     "heading": "Dados sensíveis e de menores",
     "body": [
      "O CruziaPay não trata intencionalmente dados pessoais sensíveis, exceto dados biométricos eventualmente usados na validação de identidade do onboarding, mediante consentimento específico ou nas hipóteses do art. 11 da LGPD. Os sites e plataformas do CruziaPay não se destinam a menores de 18 anos."
     ]
    },
    {
     "heading": "Canais de contato e disposições gerais",
     "body": [
      "Questões de privacidade e exercício de direitos: privacidade@cruziapay.com.br. Questões de compliance e prevenção à lavagem de dinheiro: compliance@cruziapay.com.br.",
      "Esta Política pode ser atualizada a qualquer tempo, com comunicação prévia em caso de mudança relevante. O CruziaPay comunica operações suspeitas às autoridades competentes, conforme a Lei nº 9.613/1998. Fica eleito o foro da Comarca de Londrina/PR. Este documento é revisado anualmente."
     ]
    }
   ],
   "intro": "Entidade: CRUZIAPAY LTDA · CNPJ: 69.333.124/0001-95 · Encarregado (DPO): privacidade@cruziapay.com.br · Foro: Comarca de Londrina/PR."
  }
 },
 "terms": {
  "en": {
   "title": "Terms of Use and Institutional Policy",
   "updated": "Version 1.0 · Public document · Code: POL-002",
   "sections": [
    {
     "heading": "Who We Are",
     "body": [
      "CRUZIAPAY LTDA, headquartered at R. João Huss, 1331, Gleba Fazenda Palhano, Londrina, PR, CEP 86050-490, is a payment facilitator that connects companies to local payment methods in Brazil and Latin America. Payment operations are executed by institutions authorized to operate in the Pix arrangement. CruziaPay is not a financial institution nor a payment institution authorized by the Central Bank of Brazil."
     ]
    },
    {
     "heading": "Acceptance",
     "body": [
      "By accessing the website or platform, the user declares to have read and accepted these Terms and the Privacy Policy. Those who do not agree must discontinue use. The contracting of payment services depends on a specific commercial agreement, which shall prevail over these Terms."
     ]
    },
    {
     "heading": "Services",
     "body": [
      "CruziaPay offers collection via Pix through dynamic QR Code, copy-and-paste code, and payment link, REST API, webhooks, reconciliation, and organization of national and international settlement. Methods indicated as \"coming soon\" are not available for contracting and may have their scope, term, and conditions altered."
     ]
    },
    {
     "heading": "Registration and Eligibility",
     "body": [
      "The services are intended exclusively for regularly constituted legal entities, in Brazil or abroad. Registration depends on KYC, KYB, and AML/CFT analysis, and CruziaPay may refuse, suspend, or terminate the relationship when the analysis is not satisfactory. The Client is responsible for the veracity and updating of the information provided."
     ]
    },
    {
     "heading": "Prohibited Activities",
     "body": [
      "It is forbidden to use CruziaPay for illegal activities, the sale of products or services prohibited by law, pyramid schemes, fraud, money laundering, terrorism financing, intellectual property infringement, or any operation that does not correspond to the activity declared at registration.",
      "Clients in the fixed-odds betting sector are only accepted upon proof of current authorization from the Secretariat of Prizes and Betting of the Ministry of Finance, pursuant to Law No. 14,790/2023. The full list of restricted activities is contained in the commercial agreement."
     ]
    },
    {
     "heading": "Client Obligations",
     "body": [
      "The Client must keep their API credentials confidential, implement the integration according to the documentation, correctly inform payers about their products, prices, and refund policies, cooperate with compliance information requests, and be liable to their own customers for the products and services sold."
     ]
    },
    {
     "heading": "Settlement, Fees, and Withholdings",
     "body": [
      "Settlement terms, currencies, fees, and foreign exchange conditions are defined in the commercial agreement. CruziaPay may withhold or block funds in case of suspected fraud, legal or judicial determination, payment dispute, or breach of these Terms, notifying the Client whenever permitted by law."
     ]
    },
    {
     "heading": "Availability",
     "body": [
      "CruziaPay employs reasonable efforts to keep the platform available 24 hours a day, but does not guarantee uninterrupted operation, as there may be downtime due to maintenance, partner failures, the Pix arrangement, or third parties. The code examples and endpoints displayed on the site are illustrative until the publication of official documentation."
     ]
    },
    {
     "heading": "Intellectual Property",
     "body": [
      "The CruziaPay brand, the website, the platform, the API, and its contents belong to CRUZIAPAY LTDA or its licensors. Reproduction, reverse engineering, or use of the brand without prior written authorization is prohibited."
     ]
    },
    {
     "heading": "Limitation of Liability",
     "body": [
      "CruziaPay is not liable for indirect damages, lost profits, failures caused by third parties, incorrect information provided by the Client, or use of the platform in disagreement with these Terms. CruziaPay's total liability is limited to the provisions of the commercial agreement."
     ]
    },
    {
     "heading": "Compliance Commitment",
     "body": [
      "CruziaPay maintains a risk-based anti-money laundering and terrorism financing prevention program, with identification of clients and ultimate beneficial owners, continuous monitoring of transactions, verification against restrictive lists, and reporting of suspicious operations to the competent authorities, pursuant to Law No. 9,613/1998. CruziaPay adopts zero tolerance for corruption, pursuant to Law No. 12,846/2013."
     ]
    },
    {
     "heading": "Amendments, Communications, and Jurisdiction",
     "body": [
      "These Terms may be amended at any time, with the publication of the new version on the website. Communications must be sent to comercial@cruziapay.com.br. Brazilian legislation applies, and the courts of the District of Londrina/PR are hereby elected."
     ]
    }
   ],
   "intro": "CRUZIAPAY LTDA · CNPJ 69.333.124/0001-95. These Terms govern the use of the website and platform; the commercial agreement with each Client prevails in case of conflict."
  },
  "pt": {
   "title": "Termos de Uso e Política Institucional",
   "updated": "Versão 1.0 · Documento público · Código: POL-002",
   "sections": [
    {
     "heading": "Quem somos",
     "body": [
      "A CRUZIAPAY LTDA, com sede na R. João Huss, 1331, Gleba Fazenda Palhano, Londrina, PR, CEP 86050-490, é uma facilitadora de pagamentos que conecta empresas a métodos de pagamento locais no Brasil e na América Latina. As operações de pagamento são executadas por instituição autorizada a operar no arranjo Pix. O CruziaPay não é instituição financeira nem instituição de pagamento autorizada pelo Banco Central do Brasil."
     ]
    },
    {
     "heading": "Aceitação",
     "body": [
      "Ao acessar o site ou a plataforma, o usuário declara ter lido e aceito estes Termos e a Política de Privacidade. Quem não concordar deve interromper o uso. A contratação dos serviços de pagamento depende de contrato comercial específico, que prevalece sobre estes Termos."
     ]
    },
    {
     "heading": "Serviços",
     "body": [
      "O CruziaPay oferece cobrança via Pix por QR Code dinâmico, código copia e cola e link de pagamento, API REST, webhooks, conciliação e organização da liquidação nacional e internacional. Métodos indicados como \"em breve\" não estão disponíveis para contratação e podem ter escopo, prazo e condições alterados."
     ]
    },
    {
     "heading": "Cadastro e elegibilidade",
     "body": [
      "Os serviços são destinados exclusivamente a pessoas jurídicas regularmente constituídas, no Brasil ou no exterior. O cadastro depende de análise de KYC, KYB e PLD/FT, e o CruziaPay pode recusar, suspender ou encerrar o relacionamento quando a análise não for satisfatória. O Cliente responde pela veracidade e atualização das informações fornecidas."
     ]
    },
    {
     "heading": "Atividades não permitidas",
     "body": [
      "É vedado usar o CruziaPay para atividades ilícitas, venda de produtos ou serviços proibidos por lei, esquemas de pirâmide, fraude, lavagem de dinheiro, financiamento do terrorismo, violação de propriedade intelectual ou qualquer operação que não corresponda à atividade declarada no cadastro.",
      "Clientes do setor de apostas de quota fixa somente são aceitos mediante comprovação de autorização vigente da Secretaria de Prêmios e Apostas do Ministério da Fazenda, nos termos da Lei nº 14.790/2023. A lista completa de atividades restritas consta do contrato comercial."
     ]
    },
    {
     "heading": "Obrigações do Cliente",
     "body": [
      "O Cliente deve manter suas credenciais de API em sigilo, implementar a integração conforme a documentação, informar corretamente os pagadores sobre seus produtos, preços e políticas de reembolso, cooperar com pedidos de informação de compliance e responder perante seus próprios clientes pelos produtos e serviços vendidos."
     ]
    },
    {
     "heading": "Liquidação, tarifas e retenções",
     "body": [
      "Prazos de liquidação, moedas, tarifas e condições de câmbio são definidos no contrato comercial. O CruziaPay pode reter ou bloquear valores em caso de suspeita de fraude, determinação legal ou judicial, contestação de pagamento ou descumprimento destes Termos, comunicando o Cliente sempre que permitido por lei."
     ]
    },
    {
     "heading": "Disponibilidade",
     "body": [
      "O CruziaPay emprega esforços razoáveis para manter a plataforma disponível 24 horas por dia, mas não garante funcionamento ininterrupto, podendo haver indisponibilidades por manutenção, falhas de parceiros, do arranjo Pix ou de terceiros. Os exemplos de código e endpoints exibidos no site são ilustrativos até a publicação da documentação oficial."
     ]
    },
    {
     "heading": "Propriedade intelectual",
     "body": [
      "A marca CruziaPay, o site, a plataforma, a API e seus conteúdos pertencem à CRUZIAPAY LTDA ou a seus licenciantes. É vedada a reprodução, engenharia reversa ou uso da marca sem autorização prévia por escrito."
     ]
    },
    {
     "heading": "Limitação de responsabilidade",
     "body": [
      "O CruziaPay não responde por danos indiretos, lucros cessantes, falhas causadas por terceiros, informações incorretas fornecidas pelo Cliente ou uso da plataforma em desacordo com estes Termos. A responsabilidade total do CruziaPay fica limitada ao previsto no contrato comercial."
     ]
    },
    {
     "heading": "Compromisso de compliance",
     "body": [
      "O CruziaPay mantém programa de prevenção à lavagem de dinheiro e ao financiamento do terrorismo baseado em risco, com identificação de clientes e beneficiários finais, monitoramento contínuo de transações, verificação em listas restritivas e comunicação de operações suspeitas às autoridades competentes, conforme a Lei nº 9.613/1998. O CruziaPay adota tolerância zero a corrupção, nos termos da Lei nº 12.846/2013."
     ]
    },
    {
     "heading": "Alterações, comunicações e foro",
     "body": [
      "Estes Termos podem ser alterados a qualquer tempo, com publicação da nova versão no site. Comunicações devem ser enviadas a comercial@cruziapay.com.br. Aplica-se a legislação brasileira e fica eleito o foro da Comarca de Londrina/PR."
     ]
    }
   ],
   "intro": "CRUZIAPAY LTDA · CNPJ 69.333.124/0001-95. Os Termos regem o uso do site e da plataforma; o contrato comercial com cada Cliente prevalece sobre eles em caso de conflito."
  }
 },
 "cookies": {
  "en": {
   "title": "Cookie policy",
   "updated": "Version 1.0 · Public document",
   "sections": [
    {
     "heading": "Cookies",
     "body": [
      "The cruziapay.com website uses strictly necessary cookies for operation and security, which do not depend on consent, and analysis and performance cookies, which are only activated after acceptance in the banner. The user may revoke consent at any time in the browser settings or through the Cookie Preferences link in the footer. Questions: privacidade@cruziapay.com.br."
     ]
    }
   ]
  },
  "pt": {
   "title": "Política de cookies",
   "updated": "Versão 1.0 · Documento público",
   "sections": [
    {
     "heading": "Cookies",
     "body": [
      "O site cruziapay.com usa cookies estritamente necessários, para funcionamento e segurança, que não dependem de consentimento, e cookies de análise e desempenho, que só são ativados após aceite no banner. O usuário pode revogar o consentimento a qualquer tempo nas configurações do navegador ou pelo link Preferências de cookies no rodapé. Dúvidas: privacidade@cruziapay.com.br."
     ]
    }
   ]
  }
 }
};

export const legalDocs: Record<string, Record<Locale, LegalDoc>> = {
  terms: policyText.terms,
  privacy: policyText.privacy,
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
  cookies: policyText.cookies,
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
      text: "CruziaPay is a payment facilitator built for global businesses that sell to customers in Brazil and Latin America. We connect merchants to local payment methods through one integration, starting with Pix, and organise reconciliation and international settlement around the way each operation runs.",
      paragraphs: ["Our model is simple. CruziaPay handles merchant onboarding, technology, routing and support. Regulated activities in the payment flow are performed by authorised partner institutions, selected for coverage, reliability and compliance standards.", "We started in Brazil because Pix changed how Brazilians pay. We are expanding to other Latin American rails, such as SPEI in Mexico and PSE in Colombia, as new partners go live.", "Compliance comes first. Every merchant goes through KYC and AML review before processing, and we monitor transactions continuously for fraud and risk.", "CRUZIAPAY LTDA is headquartered in Londrina, Paraná, Brazil."],
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
      text: "A CruziaPay é uma facilitadora de pagamentos construída para empresas globais que vendem para clientes no Brasil e na América Latina. Conectamos merchants a métodos de pagamento locais por meio de uma única integração, começando pelo Pix, e organizamos a conciliação e a liquidação internacional conforme o funcionamento de cada operação.",
      paragraphs: ["Nosso modelo é simples. A CruziaPay cuida do onboarding de merchants, da tecnologia, do roteamento e do suporte. As atividades reguladas do fluxo de pagamento são realizadas por instituições parceiras autorizadas, selecionadas por cobertura, confiabilidade e padrões de compliance.", "Começamos pelo Brasil porque o Pix mudou a forma como os brasileiros pagam. Estamos expandindo para outros trilhos da América Latina, como SPEI no México e PSE na Colômbia, conforme novos parceiros entram no ar.", "Compliance vem primeiro. Todo merchant passa por análise de KYC e AML antes de processar, e monitoramos as transações continuamente quanto a fraude e risco.", "A CRUZIAPAY LTDA tem sede em Londrina, Paraná, Brasil."],
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
