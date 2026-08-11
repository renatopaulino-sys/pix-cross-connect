# CruziaPay Gateway

Prompt para o Lovable — Website CruziaPay (LOGO INSERIDA, SIGA COR E FONTE)

Copie tudo abaixo da linha e cole no Lovable como primeiro prompt do projeto.

1. Contexto e objetivo

Construa o website institucional do CruziaPay, um gateway de pagamentos cross-border focado na América Latina, com operação inicial no Brasil.

O site tem um único objetivo primário: fazer um merchant ou parceiro qualificado preencher o formulário de contato comercial. Todo o restante da página existe para dar credibilidade técnica e levar a esse formulário.

Estágio da empresa: pré-lançamento. Somente o Pix está disponível hoje. Todos os demais métodos e produtos devem aparecer no site marcados como "Em breve", para mostrar a visão do roadmap sem prometer o que ainda não existe.

Idioma: português do Brasil como padrão, com toggle para inglês no header (mesma estrutura de página, copy traduzida).

2. Público-alvo

Decisores técnicos e comerciais de merchants e plataformas: Head of Payments, CFO, CTO, founders de e-commerce, SaaS, marketplaces, iGaming e travel, tanto empresas brasileiras quanto empresas estrangeiras que querem receber de clientes no Brasil.

Tom: técnico, direto, sem hipérbole de marketing. Nada de "revolucionário", "disruptivo" ou "a melhor plataforma do mercado". Quem lê esse site entende de MDR, settlement, chargeback e conciliação. Fale com essa pessoa.

3. Regra central do "Em breve"

Esta é a regra mais importante do projeto. Implemente um componente reutilizável de card de método/produto com uma propriedade status que aceita dois valores:

status: "live" — card em contraste total, ícone colorido, badge verde com texto "Disponível", card clicável e com hover ativo.

status: "soon" — card com opacidade reduzida (cerca de 55%), ícone em escala de cinza, badge neutra com texto "Em breve", cursor default, sem hover, sem link. Não use disabled de formulário, apenas o tratamento visual.

Hoje apenas o Pix recebe status: "live". Todo o resto recebe status: "soon". Deixe isso centralizado em um único arquivo de dados (por exemplo src/data/methods.ts) para que trocar um método de "soon" para "live" seja uma edição de uma linha.

4. Estrutura da página

Single page com âncoras de navegação, mais três páginas legais separadas.

Header

Logo CruziaPay à esquerda. Navegação: Soluções, Métodos, Como funciona, Desenvolvedores, Contato. Toggle PT/EN. Botão primário "Falar com o time". Header fixo com fundo translúcido e blur ao rolar.

Hero

Headline: Receba com Pix. Liquide onde você precisa.

Subheadline: Infraestrutura de pagamentos cross-border para empresas que vendem no Brasil e precisam de liquidação previsível fora dele.

Dois botões: "Falar com o time" (primário) e "Ver documentação" (secundário, apontando para a seção de desenvolvedores).

Abaixo dos botões, uma linha discreta de status: um ponto verde pulsante com o texto "Pix ativo. Cartões e demais rails em homologação."

Elemento assinatura do hero: uma animação de travessia. Uma linha traçada em SVG que sai de um ponto rotulado "Comprador no Brasil", atravessa a largura do hero passando por um nó intermediário rotulado "CruziaPay", e chega a um ponto rotulado "Sua conta". A linha se desenha em cerca de 1,8 segundo no carregamento, com um pequeno pulso viajando em loop depois disso. Respeite prefers-reduced-motion mostrando a linha já completa e estática. Essa é a única animação elaborada do site. Não replique esse nível de movimento em outras seções.

Não coloque números, estatísticas, volumes processados, contagem de clientes ou logos de empresas em nenhum lugar do site. A empresa está pré-lançamento e não tem esses dados.

Seção "Métodos de pagamento"

Grid responsivo de cards usando o componente descrito no item 3.

Com status: "live":

Pix — Cobrança via QR Code dinâmico, Pix Copia e Cola e link de pagamento. Confirmação em segundos, 24 por 7.

Com status: "soon":

Cartão de crédito — Bandeiras nacionais e internacionais, parcelado e recorrência.

Cartão de débito

Boleto bancário

Pix parcelado

Pix out (pagamentos e saques)

Carteiras digitais

SPEI (México)

PSE (Colômbia)

OXXO (México)

Transferências locais em outros países da LATAM

Não use os logotipos oficiais das bandeiras de cartão nem da marca Pix. Use ícones próprios e o nome do método em texto, para evitar problema de uso de marca antes das aprovações.

Seção "Soluções"

Quatro cards, mesma lógica de status.

Live:

Cobrança Pix — Gere cobranças por API ou link e receba confirmação em tempo real.

Em breve:

Checkout transparente — Checkout hospedado ou embarcado no seu fluxo.

Links de pagamento — Cobre sem integração, direto pelo painel.

Split de pagamentos — Divisão automática entre marketplace e sellers.

Payouts e liquidação internacional — Envie recursos para fora do Brasil com FX transparente.

Painel e conciliação — Extrato, relatórios e conciliação automática.

Seção "Como funciona"

Quatro passos numerados. Use numeração aqui porque é de fato uma sequência.

Cadastro e KYC — Envio de documentação da empresa e aprovação de compliance.

Integração — Conecte por API REST ou link de pagamento, sem infraestrutura própria.

Cobrança — Seu cliente paga por Pix e a confirmação chega em segundos.

Liquidação — Recebimento em conta com extrato conciliado.

Seção "Verticais atendidas"

Lista simples em texto, sem cards pesados: e-commerce, SaaS e assinaturas, marketplaces, travel, educação, serviços digitais. Uma linha de uma frase para cada.

Seção "Segurança e compliance"

Texto sóbrio, sem selo falso e sem alegação de licença que a empresa não possui. Cubra: criptografia em trânsito e em repouso, controle de acesso, monitoramento antifraude, políticas de KYC e AML, e conformidade com a LGPD. Deixe claro que a operação de pagamentos é realizada em parceria com instituição autorizada a operar no arranjo Pix, sem afirmar que o CruziaPay é a instituição licenciada.

Não invente certificação PCI DSS, ISO ou registro no Banco Central. Se algum selo for exibido no futuro, ele entra depois.

Seção "Desenvolvedores"

Bloco com fundo escuro contrastando com o restante da página. À esquerda, texto curto explicando que a integração é REST com autenticação por chave, webhooks de notificação e ambiente de sandbox. À direita, um bloco de código em fonte monoespaçada mostrando um exemplo ilustrativo de criação de cobrança Pix, com tabs "cURL", "Node" e "Python".

Exemplo de payload a usar no bloco cURL:

POST https://api.cruziapay.com/v1/charges
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
}


Abaixo do bloco, um botão secundário "Documentação completa" com a badge "Em breve", sem link ativo.

Seção "Perguntas frequentes"

Accordion com seis perguntas. Escreva respostas curtas e honestas para: quais métodos já estão disponíveis, qual o prazo de liquidação do Pix, como funciona a integração, quais documentos são exigidos no cadastro, se atende empresas estrangeiras, e quando os demais métodos entram no ar.

Na última resposta, seja transparente: o roadmap está em execução e as datas serão comunicadas aos clientes cadastrados, sem prometer mês específico.

Seção final de contato

Formulário com os campos: nome, empresa, e-mail corporativo, telefone com DDI, país de operação, vertical (select), volume mensal estimado (faixas) e mensagem. Checkbox de consentimento LGPD com link para a política de privacidade. Botão "Enviar contato". Estado de sucesso confirmando o envio e informando o retorno em até um dia útil. Mensagens de erro específicas por campo, sem texto genérico.

Configure o envio via Supabase, gravando os leads em uma tabela leads.

Footer

Logo, uma linha de descrição, colunas de links (Soluções, Métodos, Desenvolvedores, Legal), e os links de Termos de uso, Política de privacidade e Política de cookies. Aviso de copyright com o ano corrente.

Páginas legais

Crie as três páginas com estrutura e títulos de seção prontos, com conteúdo placeholder claramente marcado como pendente de revisão jurídica. Não gere texto jurídico definitivo.

5. Direção visual

Não use o visual padrão de fintech com fundo creme e serifa de alto contraste, nem fundo preto com acento neon. A referência conceitual é a cartografia náutica: travessia, rota, precisão.

Paleta:

--ink #0E2439 — azul profundo, fundo das seções escuras e texto principal

--cobalt #1F4FD8 — azul de ação, botões primários e links

--current #35C2B5 — turquesa, usado exclusivamente para indicar o que está ativo (badge do Pix, ponto de status, linha da animação do hero)

--sand #EDEAE3 — bege claro para blocos alternados

--paper #FFFFFF — fundo padrão

--slate #59626B — texto de apoio

Regra de disciplina: o turquesa aparece somente onde algo está efetivamente disponível. Nunca em elemento decorativo. Isso faz o Pix se destacar naturalmente contra tudo que está "em breve".

Tipografia:

Display: Bricolage Grotesque para headline do hero e títulos de seção, em peso alto e tracking levemente negativo

Corpo: Public Sans para todo o texto corrido

Utilitária e código: JetBrains Mono para o bloco de API, valores numéricos e labels pequenos em caixa alta

Layout: container de 1200px, grid de 12 colunas, respiro vertical generoso entre seções (mínimo 120px no desktop). Cantos com raio de 8px, nunca pílulas. Bordas de 1px em vez de sombras pesadas. Sombra apenas no header fixo e nos cards em hover.

6. Requisitos técnicos

React com TypeScript, Tailwind e shadcn/ui

Totalmente responsivo, testado a partir de 360px de largura

Acessibilidade: contraste AA, foco visível no teclado, labels em todos os campos, prefers-reduced-motion respeitado

SEO: title, meta description, Open Graph e favicon. Title sugerido: "CruziaPay | Pagamentos Pix e cross-border para LATAM"

Banner de cookies discreto, com opção de recusar não essenciais em destaque igual ao aceitar

Performance: sem bibliotecas pesadas de animação, use CSS e SVG nativo

Todo o conteúdo textual e a lista de métodos em arquivos de dados separados dos componentes

7. O que não fazer

Não invente depoimentos, cases, logos de clientes, prêmios, número de transações, TPV, uptime ou tempo de mercado. Não afirme licença, certificação ou registro regulatório. Não coloque preços nem taxas de MDR no site. Não use imagens de banco de imagens com pessoas sorrindo em escritório. Não crie chat widget nem popup de saída.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pix-cross-connect.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2f88266c-2c22-4f16-add0-db130815623f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
