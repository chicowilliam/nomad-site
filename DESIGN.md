---
name: Nomad
description: Engenharia digital com precisão editorial
colors:
  paper: "#f2f2f0"
  ink: "#0a0a0a"
  surface: "#151515"
  muted: "#a4a4a0"
  rule: "#30302e"
typography:
  display:
    fontFamily: "Space Grotesk Variable, sans-serif"
    fontSize: "clamp(90px, 8.6vw, 158px)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.062em"
  headline:
    fontFamily: "Space Grotesk Variable, sans-serif"
    fontSize: "clamp(44px, 5.25vw, 88px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.055em"
  body:
    fontFamily: "Manrope Variable, sans-serif"
    fontWeight: 400
  label:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "10px"
    fontWeight: 550
    lineHeight: 1.65
    letterSpacing: "0.075em"
rounded:
  square: "0px"
spacing:
  gutter: "clamp(24px, 4.5vw, 88px)"
  section: "116px"
  section-tablet: "90px"
  section-mobile: "74px"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "16px 21px"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "16px 21px"
  contact-input:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "10px 0 13px"
---

# Design System: Nomad

## Overview

**Creative North Star: “Arquitetura para escalar.”**

A identidade aproxima a precisão de engenharia da composição de um estúdio editorial. Tipografia ocupa espaço, linhas organizam relações e objetos metálicos representam partes que funcionam juntas. A proposta comercial conduz o olhar: estrutura para vender, operar e crescer.

A linguagem combina preto profundo, papel claro, recortes geométricos e escala tipográfica. A densidade muda entre afirmações amplas e conteúdo de leitura. O acabamento vem de proporção, espaço e contraste. A referência do briefing é reinterpretada como linguagem, sem reproduzir um site existente.

Características principais: assimetria, títulos leves e compactos, superfícies retas, microtextos funcionais e imagens integradas à composição.

## Colors

A paleta da agência é acromática, com pequenas diferenças de temperatura entre os cinzas.

- **Paper** (`--paper`): fundo claro de abertura, texto principal sobre preto e botões claros.
- **Ink** (`--ink`): fundo principal, texto sobre papel e botão de abertura.
- **Surface** (`--surface`): planos de interface com contraste discreto.
- **Muted** (`--muted`): textos de apoio e metadados editoriais.
- **Rule** (`--rule`): linhas estruturais que separam ou conectam conteúdo.

Os mockups dos projetos têm paletas próprias e contidas. Essas cores pertencem aos conceitos apresentados e não se tornam cores de interface da Nomad. Contraste legível prevalece sobre sutileza, sobretudo em legendas e estados interativos.

## Typography

**Display:** Space Grotesk Variable, com fallback sans-serif. **Body:** Manrope Variable, com fallback sans-serif. Ambas são servidas localmente. Não há dependência de Google Fonts em runtime.

Space Grotesk usa peso 400 nos grandes títulos. O tracking negativo e a entrelinha curta fazem parte da construção, sem forçar texto fora do viewport. A hero desktop usa o token `display`; os títulos de seção partem de `headline`, com ajustes locais conforme a composição.

O corpo usa Manrope com entrelinhas generosas e larguras delimitadas por componente. Labels `.micro` usam caixa alta, espaçamento aberto e números tabulares. Dados decorativos não substituem texto principal legível. Inputs usam 16px no mobile para preservar leitura e evitar zoom automático.

Na hero mobile, o título é recomposto em três linhas e a escultura recebe altura própria abaixo da tipografia. Os títulos permanecem parte do layout; quebras são decisões editoriais, não efeitos de uma largura fixa aplicada a todas as seções.

## Layout

`.section-shell` tem largura máxima de 1720px incluindo gutters fluidos. A composição principal da hero e seu rodapé têm máximo de 1560px. As seções alternam relações próximas de 60/40, offsets, faixas de largura total e pares assimétricos.

O espaço padrão entre seções é 116px por lado, reduzido para 90px no tablet e 74px no mobile. Há exceções deliberadas de ritmo nas transições e na área de contato. A coluna do processo permanece fixa durante a leitura em telas grandes e volta ao fluxo no mobile.

A grade muda abaixo de 1100px. Até 767px, navegação vira diálogo fullscreen, a escultura ganha posição própria abaixo do título, projetos se tornam composições verticais e detalhes de casos se distribuem em duas colunas compactas. Até 374px, o gutter é 20px. O formulário reorganiza seu cabeçalho até 1024px e seus campos até 600px.

## Elevation & Depth

A interface principal usa planos tonais e linhas, com profundidade concentrada na escultura cromada e nos mockups. Não há uma camada genérica de sombras sobre todos os blocos. As janelas dos conceitos podem usar sombra contextual (`0 3cqw 6cqw #0002`) para separar a tela da sua base.

Motion acompanha a leitura: máscara de texto, revelação lateral de imagem e pequenas mudanças de contraste. `--ease` é `cubic-bezier(.16, 1, .3, 1)`. Revelações duram até 900ms; respostas simples de controles são mais rápidas. A opção de movimento reduzido mantém conteúdo visível e remove as transições decorativas.

## Shapes

A forma recorrente é o retângulo de cantos retos. A passagem entre hero e conteúdo escuro usa um recorte diagonal arquitetônico. Linhas de 1px constroem divisões, trilhos e conexões. Círculos pequenos aparecem quando representam nós, status ou parte do próprio mockup; não são uma linguagem de cards arredondados.

## Components

### Buttons

Blocos retangulares, texto legível e seta discreta. O botão escuro pertence ao plano claro; o claro orienta ações sobre fundo escuro. A altura mínima padrão é 52px. Hover altera contraste e desloca a seta poucos pixels. Foco usa contorno visível com afastamento, sem depender da cor de fundo.

Links textuais têm sublinhado que se revela ou muda de contraste. Links navegam; botões alteram estado ou iniciam uma ação.

### Navigation

Logo à esquerda, links horizontais e CTA no desktop. A navegação mantém alinhamento com a composição da página e usa contraste adequado ao plano atual. No mobile, um `<dialog>` ocupa a tela, mostra links em grande escala e oferece fechamento por botão ou Escape. O foco retorna ao controle de abertura.

### Solutions

Um acordeão editorial de linhas amplas substitui a grade repetida de cards. Número, categoria, descrição da oferta e sinal de expansão constroem a leitura. O estado aberto revela copy, capacidades e geometria própria. `aria-expanded`, `aria-controls` e conteúdo oculto nativo mantêm o comportamento semântico.

### Projects

Cada caso combina mockup amplo, nome, segmento, problema, solução e objetivo. A posição da mídia alterna entre os casos, e Axis recebe offset. Diamond, Mesa e Axis são conceitos, com essa informação explícita. Os mockups comunicam o contexto do negócio e não introduzem resultados comerciais fictícios.

### Operation demo

Um fluxo visual de pedido conecta quatro estados. A simulação é iniciada pelo visitante, usa feedback textual e termina. Não é uma animação permanente nem um sistema conectado a dados reais.

### Contact form

Campos têm superfície transparente e linha inferior. Labels permanecem visíveis; placeholder só oferece exemplo. Validação usa campos nativos, feedback acessível e foco. O formulário aceita endpoint configurado, WhatsApp ou e-mail; sem canais definidos, produz um briefing TXT local e informa que nada foi enviado.

### Testimonials

A estrutura acomoda depoimentos reais em blocos editoriais ao lado do título. Sem conteúdo autorizado, o título muda para “A próxima história começa aqui” e a interface apresenta um convite honesto para conversar. Com depoimentos reais em clientData, o título passa a “Quem cresceu com a gente”. Não usar quotes, nomes ou métricas fabricados como prova social.

## Do's and Don'ts

### Do

- Use tipografia, linhas e espaço para estabelecer hierarquia.
- Preserve a força do contraste entre abertura clara e narrativa escura.
- Recompose mobile com quebras de linha, offsets e densidade próprios.
- Mantenha cenas de projeto explicitamente demonstrativas quando não forem cases reais.
- Garanta teclado, foco visível, labels persistentes e movimento reduzido.
- Mantenha texto de venda centrado no negócio: receita, conversão, controle e trabalho manual.

### Don't

- Não transforme as seções em uma sequência de cards iguais.
- Não introduza neon, glow, blobs ou glassmorphism na identidade da agência.
- Não use títulos excessivamente pesados ou Inter como fonte universal.
- Não substitua arte por ícones gigantes decorativos.
- Não invente clientes, depoimentos, resultados ou canais de contato.
- Não faça a interface afirmar que enviou algo sem confirmação do canal de destino.
