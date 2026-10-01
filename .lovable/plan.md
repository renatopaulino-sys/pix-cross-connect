# Pricing, consistência comercial e compliance

## Objetivo

Adicionar uma seção completa de preços por mercado e alinhar toda a comunicação pública da CruziaPay aos status, ressalvas regulatórias e informações legais fornecidas, preservando o visual atual e a paridade integral entre português e inglês.

## 1. Nova seção Pricing

- Criar uma seção `#pricing` logo após “Métodos”, mantendo o tema escuro, os gradientes e os padrões atuais de espaçamento, tipografia, cards e botões.
- Adicionar “Pricing” / “Preços” ao menu principal, entre “Methods” / “Métodos” e “How it works” / “Como funciona”, inclusive no menu móvel e no rodapé.
- Centralizar toda a nova cópia e os dados de preços no modelo bilíngue da home.
- Exibir título, subtítulo e uma faixa responsiva com os 12 mercados: Brasil, México, Argentina, Colômbia, Chile, Peru, Equador, Costa Rica, Guatemala, Panamá, Uruguai e Bolívia.
- Cada card mostrará bandeira, país, moeda e preço inicial; ao selecionar, abrirá o respectivo conteúdo.
- Em telas maiores, usar abas acessíveis; no celular, trocar por um seletor de país.
- Para cada país, renderizar tabelas separadas de Pay-in e Payout com método, redes/marcas aceitas e tarifa, além de taxa mínima e notas tributárias/regulatórias quando aplicáveis.
- Manter os nomes fornecidos de bandeiras, bancos, carteiras e redes apenas como exemplos textuais de aceitação. Não usar logotipos nem apresentá-los como parceiros da CruziaPay.
- Exibir “Available on request · subject to onboarding” / “Disponível sob consulta · sujeito a onboarding” nos mercados e métodos aplicáveis. Pix Brasil terá o selo exclusivo “Available” / “Disponível”; a tarifa de Pix continuará “sob consulta”.
- Adicionar os cards de “Account & settlement fees”, todas as taxas informadas, notas legais e CTA para `#contato`.

## 2. Status consistentes em todo o site

- Evoluir o modelo de status de binário para três estados: disponível, disponível sob consulta e em breve.
- Marcar apenas Pix Brasil como disponível.
- Marcar cartões, Split, Boleto, Pix out, Pix parcelado, carteiras e métodos LATAM presentes no Pricing como disponíveis sob consulta; métodos restantes ficarão como em breve.
- Aplicar os mesmos rótulos em Métodos e Produtos, removendo “Live”.
- Atualizar o simulador para os 12 países do Pricing, com Pix disponível no Brasil e os demais métodos sob consulta.
- Substituir todos os prazos fixos de liquidação do simulador por “Settlement window defined in the commercial agreement.” e sua tradução.

## 3. Alegações comerciais e demonstração técnica

- Substituir as promessas de smart routing, multi-acquirer e failover por “Routing across regional partners, designed for resilience.” e tradução equivalente.
- Simplificar o diagrama para “Regional partner network” / “Rede de parceiros regionais”, sem nomes, numeração ou alegações de parceiros específicos.
- Atualizar o texto de iGaming para exigir licença válida em cada mercado, análise reforçada, jogo responsável e verificação de idade quando pertinente.
- Trocar `sk_live_xxx` por `sk_test_xxx` e identificar o CPF como dado de teste em todos os exemplos.
- Restringir a demonstração “Test Pix” ao sandbox: remover a alternativa de cartão, usar apenas dados fictícios e exibir claramente “Sandbox environment, no real funds are moved.” / tradução.

## 4. Compliance público

- Ampliar a seção atual com os textos fornecidos sobre atuação como facilitadora de pagamentos, processamento por instituições autorizadas, ausência de licença própria, tratamento de cartões por parceiros certificados PCI DSS, ausência de armazenamento integral de cartões e política de negócios proibidos.
- Manter a redação equivalente e completa em português e inglês.
- Revisar FAQ, hero, produtos e demais trechos públicos para remover alegações conflitantes sobre disponibilidade, liquidação, adquirência e licenciamento.

## 5. Páginas legais

- Transformar o componente legal atual, hoje baseado em títulos e placeholders, em um modelo que aceite seções completas com títulos, parágrafos e listas bilíngues.
- Completar Termos de Uso com a identificação da CRUZIAPAY LTDA, CNPJ, endereço e contato comercial fornecidos.
- Completar Política de Privacidade com a controladora, encarregado, e-mail e direitos de acesso, correção, exclusão e portabilidade.
- Criar páginas independentes para:
  - Política de Reembolso e Chargeback;
  - Política AML & KYC;
  - Negócios Proibidos e Restritos;
  - Reclamações.
- Incluir os prazos, procedimentos, taxas, retenções, listas e canais de contato solicitados, em PT e EN.
- Adicionar links no bloco Legal do rodapé, metadados próprios por página e as novas URLs ao sitemap.
- Usar URLs canônicas consistentes com o domínio público atual.

## 6. Rodapé e formulário de contato

- Adicionar ao rodapé a identificação legal completa da empresa e os contatos Comercial, Compliance e Privacidade, mantendo o acabamento visual preto e a transição atual.
- Adicionar ao formulário os campos obrigatórios “Website” e confirmação de licenças, com validação e mensagens bilíngues.
- Ampliar a lista de países do formulário para os 12 mercados do Pricing.
- Enviar os novos campos ao fluxo atual de leads, planilha e e-mail comercial.
- Atualizar a estrutura do banco de leads para persistir website e confirmação de licença, preservando as regras de acesso atuais.

## 7. Validação

- Conferir toda a home e todas as páginas legais em PT e EN.
- Testar seleção dos 12 países, cards, abas no desktop, dropdown no celular, CTA para contato e troca de idioma.
- Testar validação e envio do formulário com os dois novos campos até o armazenamento e encaminhamento existentes.
- Validar em 360 px, 768 px e 1280 px, sem rolagem lateral, sobreposição, texto cortado ou regressão no menu/rodapé.
- Confirmar ausência de nomes de adquirentes ou provedores, de logotipos de bandeiras e das alegações proibidas em todo o conteúdo público.
- Confirmar compilação, console sem erros e metadados próprios em todas as rotas públicas.

## Detalhes técnicos

- Criar um componente dedicado de Pricing e tipos de dados explícitos para país, método, tarifa, nota e status.
- Reutilizar `SectionShell`, controles e tokens sem introduzir cores paralelas ou estilos fora do sistema atual.
- Ajustar os modelos bilíngues existentes em vez de espalhar texto PT/EN pelos componentes.
- Criar uma migração aditiva para os novos campos de lead, preservando tabela, permissões e políticas existentes.
- Não alterar autenticação, painel administrativo ou regras financeiras além do conteúdo solicitado.

## Critério de conclusão

O trabalho estará concluído quando preços, status, demonstração, compliance, políticas, rodapé e formulário apresentarem a mesma informação em PT e EN, com os 12 mercados navegáveis e todos os fluxos principais validados em celular e desktop.