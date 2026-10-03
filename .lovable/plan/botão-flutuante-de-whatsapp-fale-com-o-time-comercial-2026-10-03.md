# Botão flutuante de WhatsApp — Fale com o time comercial

## Objetivo
Adicionar um botão flutuante de WhatsApp visível em todas as páginas públicas do site, que abre uma conversa com o time comercial no número **+55 14 99820-2287**.

## Escopo
- Somente páginas públicas do site (home, métodos, precificação, páginas legais etc.). O painel do cliente/admin (`/app`, `/auth`) **não** exibe o botão — já existe um controle de rota (`isPanel` em `src/routes/__root.tsx`) que decide o que aparece no site público, e o botão entra nesse mesmo controle.

## O que será feito
1. **Centralizar o número** — adicionar o WhatsApp comercial em `src/data/company.ts` (fonte única de dados da empresa, seguindo a convenção do projeto), com o link pronto `https://wa.me/5514998202287` e uma mensagem inicial pré-preenchida tipo "Olá! Quero falar com o time comercial do CruziaPay." (versão em inglês para o locale EN).
2. **Criar o componente** `src/components/site/WhatsAppButton.tsx`:
   - Botão circular fixo no canto inferior direito (`fixed bottom-6 right-6`), verde WhatsApp, com ícone oficial do WhatsApp (SVG inline, sem dependência nova).
   - Abre `wa.me` em nova aba (`target="_blank"`, `rel="noopener noreferrer"`).
   - Rótulo acessível bilíngue: "Fale com o time comercial" / "Talk to our sales team".
   - Animação sutil de entrada/hover, sem alterar layout, cores ou componentes existentes.
   - Espaçamento para não sobrepor o cookie banner quando ele estiver visível.
3. **Renderizar no layout raiz** — incluir `<WhatsAppButton />` em `src/routes/__root.tsx`, dentro do mesmo `!isPanel` usado por Header/Footer, para aparecer em todas as páginas públicas em PT e EN.

## Critérios de aceite
- O botão aparece em todas as rotas públicas (testado na home, `/termos`, `/igaming`) e não aparece no painel `/app`.
- O clique abre `https://wa.me/5514998202287` com mensagem pré-preenchida.
- Rótulo muda com o idioma PT/EN.
- Build OK, sem erros no navegador; layout e páginas existentes inalterados.
