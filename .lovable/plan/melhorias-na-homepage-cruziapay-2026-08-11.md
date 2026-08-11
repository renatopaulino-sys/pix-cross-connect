# Melhorias na homepage CruziaPay

## Objetivo
Adicionar à página inicial: (1) a vertical "iGaming e Entretenimento Digital" e (2) uma nova seção visual "Orquestração e Resiliência Local" que comunica a integração com múltiplos parceiros de adquirência regionais e a redundância automática.

## Escopo
- Alterações apenas no site institucional (landing page). Nenhuma mudança no painel, banco de dados ou autenticação.
- Conteúdo bilíngue (PT/EN) via `src/data/content.ts`.
- Estilo alinhado ao design system existente (tokens semânticos, tipografia Bricolage Grotesque/Public Sans/JetBrains Mono, sem cores hardcoded).

## Tarefas

### 1. Adicionar vertical iGaming
- Em `src/data/content.ts`, incluir o item "iGaming e Entretenimento Digital" no array `verticals.items` (PT) e "iGaming and Digital Entertainment" (EN).
- Texto descritivo: processamento de Pix PayIn e Payout instantâneo 24/7 com conformidade legal.
- Verificar se a lista de `verticals` do formulário de contato já contempla iGaming (já existe "iGaming"); manter como está.

### 2. Criar seção "Orquestração e Resiliência Local"
- Criar componente `OrchestrationSection` em `src/components/site/Sections.tsx` (ou arquivo próximo, caso fique mais limpo).
- Posicionar a nova seção entre `VerticalsSection` e `SecuritySection` em `src/routes/index.tsx`.
- Conteúdo:
  - Título: "Orquestração e Resiliência Local" / "Local Orchestration and Resilience".
  - Subtítulo explicando que a CruziaPay está integrada a múltiplos parceiros de adquirência regionais para redundância automática e taxas otimizadas.
  - Lista de parceiros: Cielo, Kushki, Bamboo, Monnet, Klap (texto/ícones genéricos; sem logos oficiais a menos que o usuário forneça).
- Representação visual:
  - Diagrama em SVG mostrando a CruziaPay como hub central conectado a nós dos parceiros.
  - Indicadores de status "ativo" nos nós (usar classes `cp-status-dot` ou estilo equivalente).
  - Setas/linhas sugerindo roteamento dinâmico e failover.
  - Usar tokens `--color-cobalt`, `--color-signal`, `--color-ink`, `--color-paper`, `--color-sand` e fundo `bg-sand` para contraste com a seção anterior.
- Layout responsivo: empilhamento limpo em mobile, diagrama ao lado do texto em desktop.

### 3. Verificar e ajustar
- Atualizar importações em `src/routes/index.tsx` se `OrchestrationSection` for exportado de arquivo separado.
- Rodar `tsgo` para garantir tipos.
- Capturar screenshot da homepage com Playwright para validar posicionamento, legibilidade e responsividade.

## Não incluído
- Novas páginas ou rotas.
- Alterações no painel administrativo, banco de dados, RLS ou autenticação.
- Uso de logos oficiais de terceiros sem assets fornecidos.
