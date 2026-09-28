# Atualização da home CruziaPay — direção Neo-global

Modernizar a página inicial com inspiração conceitual em PagSmile e a55, preservando a identidade azul–ciano–verde-água, o conteúdo bilíngue e todos os fluxos existentes do site e do painel.

## Direção visual aprovada

- Adotar a direção **Neo-global payment stack**: visual internacional, técnico e seguro, com contraste mais forte, superfícies escuras pontuais e detalhes luminosos controlados.
- Manter logo, paleta e tipografia atuais, reorganizando hierarquia, ritmo e densidade para reduzir áreas vazias e repetição de cartões.
- Usar movimentos discretos nas conexões e entradas de conteúdo, sempre respeitando redução de movimento.
- Não copiar textos, identidade ou números das referências; elas serão usadas apenas como referência de organização e narrativa.

## Estrutura da página

1. **Hero atualizado**
   - Reforçar a proposta de entrada na América Latina com Pix no Brasil e integração única.
   - Manter os botões atuais, o teste de Pix e o mapa, mas transformar a lateral em uma visualização de operação real, sem métricas não verificadas.
   - Melhorar composição e leitura em telas grandes, 768px e 360px.

2. **Produtos e meios de pagamento**
   - Reorganizar os blocos atuais em uma leitura mais clara de pay-in, routing e settlement.
   - Diferenciar com precisão o que está disponível e o que está “em breve”.
   - Manter os links de contato e funcionalidades já existentes.

3. **Nova seção Cross-border**
   - Inserir após os destaques de produto, antes das seções mais técnicas.
   - Criar uma faixa visual escura de alto contraste com fluxo responsivo em três etapas:
     1. cliente paga com método local;
     2. CruziaPay processa e direciona a transação;
     3. a empresa recebe a liquidação internacional conforme contratação.
   - Explicar benefícios em linguagem comercial: experiência local, integração centralizada, visibilidade operacional e suporte a compliance.
   - Incluir países e métodos apenas conforme os estados atuais já cadastrados; Pix no Brasil aparece como ativo e expansões continuam identificadas como futuras.
   - Adicionar CTA para contato e link interno próprio (`#cross-border`).

4. **Como funciona e cobertura**
   - Aproximar o fluxo “Como funciona” do modelo objetivo das referências, com etapas curtas e visuais.
   - Integrar melhor Smart Routing, cobertura LATAM e simulador, evitando narrativas duplicadas.
   - Manter provedores anônimos como Provider 1, Provider 2 etc.

5. **Verticais, tecnologia e confiança**
   - Atualizar a apresentação das verticais para leitura por caso de uso, preservando todas as opções e seus estados.
   - Dar mais destaque à integração por API, webhooks, KYC/AML e segurança sem adicionar certificações ou capacidades não confirmadas.
   - Refinar o bloco de desenvolvedores e a chamada final para acompanhar a nova linguagem visual.

## Conteúdo, navegação e SEO

- Criar toda a nova redação em português e inglês, com troca de idioma estável em todas as seções.
- Adicionar “Cross-border” à navegação desktop e mobile.
- Atualizar título, descrição, Open Graph, Twitter Card, canonical e dados estruturados da home para refletir pagamentos cross-border e Pix na América Latina.
- Usar o domínio público atual da CruziaPay nos metadados.
- Remover ou reformular qualquer número comercial ou promessa que não esteja comprovada no produto atual.

## Implementação técnica

- Criar um componente dedicado para a seção cross-border e ampliar o modelo bilíngue de conteúdo existente.
- Reutilizar os tokens semânticos, componentes e animações atuais; novos tons escuros e estados visuais serão definidos no tema, não diretamente nas telas.
- Preservar formulário, envio de leads, autenticação, painel, banco e rotas internas sem alterações funcionais.
- Validar troca PT/EN, links, modal Pix, formulário e comportamento visual em 360px, 768px e desktop.
- Conferir erros de execução, conteúdo cortado, contraste, foco por teclado e redução de movimento antes da entrega.
