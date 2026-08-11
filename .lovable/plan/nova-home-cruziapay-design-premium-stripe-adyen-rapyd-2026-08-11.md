# Nova home CruziaPay — design premium (Stripe/Adyen/Rapyd)

Reconstrução completa da página institucional (`/`), mantendo 100% intacto o back-office (rotas `/app/*`, `/auth`, funções de servidor, banco e RLS).

## Identidade visual

- Gradiente principal `#0A8FDC → #00D4FF`, sucesso `#00C853`, alerta `#FFAB00`, texto `#212121`, fundo `#FAFAFA` (+ equivalentes dark).
- Tipografia: Inter (títulos) e Roboto (corpo), carregadas por `<link>` no root.
- Novo arquivo `src/styles/theme.css` com as variáveis de cor/tipografia, importado pelo `src/styles.css`.
- Mapa-múndi mantido no hero, sob camada glass-morphism com o novo gradiente.
- Idioma padrão passa a ser **inglês**, com seletor PT/EN preservado.

## Seções (na ordem)

1. **Hero** — glass gradient, headline em duas linhas ("Receba com Pix. / Liquide onde precisar."), sub-headline, botões "Falar com o time" (primário) e "Ver documentação" (secundário), mais 4 bullets de valor (Instantâneo, Escalável, Global-ready, Compliance total).
2. **Product Highlights** — 3 colunas com ícones lucide: Pix (badge Live), Cartões & Split (Em breve), Payouts & Global Rails (Em breve). Os dois "Em breve" trazem o link "Entre em contato para mais informações" que rola até o formulário e pré-seleciona o assunto.
3. **How it works** — timeline horizontal de 4 passos com fade-in ao scroll.
4. **Verticais** — grid de cards (E-commerce, SaaS, Marketplace, Travel, Educação, Serviços digitais, iGaming) com fundo em blur e badge Available/Upcoming.
5. **Smart Routing & Multi-Acquirer** — diagrama SVG com CruziaPay ligada às adquirentes (Cielo, Kushki, Bamboo, Monnet…), animação stroke-dashoffset e tooltip em cada nó.
6. **Simulador LATAM** — seletor de país (BR, MX, CO, PE, AR, CL) alimentado por JSON estático; mostra métodos locais, prazo de settlement e documentos KYC, com spinner curto e botão "Solicitar demo" que preenche o formulário de contato.
7. **Developer Hub** — abas cURL / Node / Python em bloco dark com destaque de sintaxe e link para sandbox.
8. **FAQ** — accordion com seta rotativa.
9. **CTA final** — faixa em gradiente com "Comece a receber Pix hoje — Experimente o sandbox grátis".
10. **Footer** — links legais, redes sociais e seletor PT/EN.

## Detalhes técnicos

- Novos componentes em `src/components/site/home/`: `Hero`, `ProductHighlights`, `HowItWorks`, `Verticals`, `SmartRouting`, `LatamSimulator`, `DeveloperHub`, `Faq`, `FinalCta`. `Sections.tsx` antigo é aposentado da home.
- Toda a copy nova entra em `src/data/content.ts` (PT + EN) e o mapa do simulador em `src/data/latam.ts`.
- Reaproveita o `ContactForm` existente (nenhuma mudança na tabela `leads`); o link "Entre em contato" e o "Solicitar demo" apenas navegam e preenchem campos.
- Animações CSS-only (fade-in/translate-y via IntersectionObserver leve, scale/shadow em botões, stroke-dashoffset no SVG), com `prefers-reduced-motion` respeitado.
- Destaque de código no Developer Hub feito com marcação estática (sem dependência extra) para não pesar o bundle; se preferir Prism, instalo o pacote.
- `src/routes/index.tsx` passa a montar as novas seções; head/SEO e JSON-LD atualizados para a nova copy.
- Header, Footer e legais continuam funcionando; nada em `src/routes/_authenticated/*`, `src/lib/panel.functions.ts` ou `kycdocs.functions.ts` é tocado.
