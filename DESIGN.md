---
name: Guarda-Chuva
description: Sites, sistemas e lojas virtuais sob medida
colors:
  background: "#08080b"
  text: "#f4f0e8"
  muted: "#a6a3a0"
  blue: "#659fff"
  button: "#3b82f6"
  button-text: "#080b12"
  button-hover: "#78adff"
  line: "rgba(255, 255, 255, 0.09)"
  paper: "#f2eee6"
  ink: "#17181e"
  work-blue: "#215cc5"
  work-muted: "#62615e"
  work-line: "rgba(23, 24, 30, 0.14)"
  chip-text: "#b7b4b0"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(52px, 15.25vw, 70px)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.026em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(54px, 13.7vw, 76px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(42px, 12vw, 58px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Instrument Sans Variable, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Instrument Sans Variable, sans-serif"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.1em"
rounded:
  pill: "30px"
  chip: "4px"
  project: "9px"
  project-wide: "12px"
  work: "30px 30px 0 0"
  work-tablet: "42px 42px 0 0"
  work-desktop: "52px 52px 0 0"
spacing:
  gutter-mobile: "24px"
  gutter-compact: "20px"
  gutter-tablet: "40px"
  gutter-desktop: "72px"
  section-mobile: "86px"
  section-tablet: "105px"
  section-desktop: "130px"
components:
  button-primary:
    backgroundColor: "{colors.button}"
    textColor: "{colors.button-text}"
    rounded: "{rounded.pill}"
    padding: "15px 20px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
    textColor: "{colors.button-text}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "15px 18px"
  header-contact:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "11px 13px"
  capability-chip:
    backgroundColor: "transparent"
    textColor: "{colors.chip-text}"
    rounded: "{rounded.chip}"
    padding: "6px 8px"
  service-row:
    textColor: "{colors.text}"
    padding: "31px 0 36px"
  work-plane:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.work}"
    padding: "68px 0 70px"
---

# Design System: Guarda-Chuva

## Overview

**Creative North Star: "Editorial escuro, sob medida."**

A identidade combina fundo quase preto, títulos serifados amplos, texto quente e azul contido. A proporção e o espaço dão força à proposta; itálicos azuis marcam as palavras decisivas. A mudança para um único plano quente e arredondado dá destaque ao trabalho real.

Este arquivo documenta a implementação aprovada em `src/styles/global.css` e `src/App.tsx`. O frontmatter contém os tokens normativos da base mobile; exceções responsivas aparecem abaixo. `PRODUCT.md` guarda a verdade comercial e `.impeccable/surfaces/home.md` guarda a estratégia da home. A sidecar `.impeccable/design.json` estende os tokens com movimento, breakpoints e exemplos.

**Key Characteristics:**

- Fundo escuro predominante e contraste quente.
- Instrument Serif normal/itálico com Instrument Sans local.
- Índices pequenos, divisórias finas e serviços sempre legíveis.
- Um plano claro arredondado para o trabalho.
- Movimento curto, secundário e dispensável para leitura.

## Colors

O azul tem valores próprios para texto sobre escuro, botão e texto sobre papel.

### Primary

- **Azul editorial** (`blue`): itálicos, foco, pontos e detalhes sobre escuro.
- **Azul de ação** (`button`): CTA principal, sempre com `button-text` escuro; hover usa `button-hover`.
- **Azul sobre papel** (`work-blue`): títulos em itálico, categoria, hover e foco dentro do trabalho.

### Neutral

- **Quase preto** (`background`): fundo principal e rodapé.
- **Texto quente** (`text`): títulos e texto de destaque.
- **Apoio** (`muted`): descrições e metadados.
- **Linha escura** (`line`): separadores discretos, preservando a transparência.
- **Papel quente** (`paper`), **tinta** (`ink`), **apoio sobre papel** (`work-muted`) e **linha sobre papel** (`work-line`): conjunto exclusivo do plano de trabalho.
- **Texto de capacidade** (`chip-text`): pequenas etiquetas de recursos.

**The Azul por superfície Rule.** O plano de trabalho redefine localmente `--blue`, `--muted` e `--line`; preserve o contraste de cada superfície.

## Typography

**Display Font:** Instrument Serif, Georgia, serif, peso 400 normal e itálico.

**Body Font:** Instrument Sans Variable, sans-serif. As fontes são servidas localmente pelo bundle; DM Sans foi removida.

### Hierarchy

- **Display:** hero mobile em três linhas semânticas, com “sob medida.” em itálico azul. A partir de 600px usa `clamp(76px, 12vw, 128px)`; a partir de 1024px, `clamp(108px, 8.3vw, 128px)`. Abaixo de 375px usa 15vw.
- **Headline:** títulos de seção usam o token base, 80px a partir de 600px e 96px a partir de 1024px. Trabalho usa `clamp(67px, 17vw, 94px)`, depois 96px/112px; contato usa `clamp(52px, 13.8vw, 74px)`, depois 80px/100px.
- **Title:** serviços usam o token base, 49px em tablet e 52px no desktop; telas abaixo de 375px usam 42px.
- **Body:** descrições recorrentes em 14px/1.85. Texto de apresentação chega a 16px; parágrafos de Sobre usam 15–16px/1.9. Larguras de leitura são contidas, normalmente 390–480px.
- **Label:** índices em caixa alta e números tabulares. Metadados variam de 7–10px; não use essa escala para descrições ou controles principais.

O texto de Sobre usa sans de 25px, 27px e 34px, sem imitar um título display. A marca compacta usa sans de peso 650. Hierarquia vem de escala, quebra e espaço.

## Layout

A `.shell` tem máximo de 1280px. Gutters por lado: 24px na base mobile, 20px abaixo de 375px, 40px a partir de 600px e 72px a partir de 1024px. O cabeçalho tem máximo próprio de 1360px e gutters desktop de 48px.

O ritmo geral de seções é 86px/105px/130px por breakpoint, com ajustes deliberados: Serviços começa com menos espaço; Trabalho recebe 68px/70px na base e 110px/105px no desktop. O hero tem altura mínima de 790px mobile e 920px a partir de 600px, com espaço amplo acima do título.

A navegação fixa mede 80px na base e 90px no desktop. Links internos do cabeçalho aparecem somente a partir de 1024px; no celular permanecem marca e WhatsApp direto, sem diálogo. Âncoras consideram offset de 92px.

Serviços usam índice + conteúdo no celular; a partir de 600px, índice/título/descrição; no desktop, quatro colunas de índice, título, descrição e capacidades. São cinco linhas sempre abertas, sem cards nem acordeão. Sobre tem indicadores conceituais em uma grade 2×2. O trabalho usa texto em duas colunas a partir de 600px e captura em largura total.

## Elevation & Depth

Não há sombras de interface. A profundidade vem de contraste tonal, divisórias e troca de superfície. O cabeçalho usa fundo translúcido escuro e blur de 12px; sua borda aparece após 24px de rolagem. Uma grade estática mascarada, três pontos e um gradiente radial azul de baixa opacidade dão textura ao hero. Não são um canvas nem uma animação contínua.

## Shapes

CTAs em cápsula de 30px contrastam com linhas de serviço abertas e finas. Chips têm 4px de raio. A captura tem 9px no mobile e 12px a partir de 600px, com proporção 1.6. O plano de trabalho arredonda somente os cantos superiores em 30px/42px/52px. Pontos e o controle gráfico sobre a captura são circulares.

## Components

### Buttons and links

O CTA principal tem texto escuro sobre azul, altura mínima de 50px, padding 15px 20px e fonte de 12px. A partir de 600px usa altura mínima de 54px, padding 17px 25px e fonte de 13px. O secundário tem borda branca de 16% de opacidade; hover muda texto e borda para azul. Setas deslocam 2px no hover.

O foco visível usa contorno de 2px, afastado 5px. O trabalho usa o azul local no foco. Links de projeto têm linha inferior e seta; os CTAs WhatsApp abrem uma conversa em nova aba, sem enviar mensagem automaticamente.

### Navigation

Marca textual em duas linhas, ponto azul, links internos no desktop e cápsula de contato com alvo mínimo de 44px. O estado rolado aumenta a opacidade do fundo e mostra uma divisória. No celular não há menu oculto, botão de expansão ou modal. O rodapé mantém as âncoras acessíveis. O skip link aparece ao receber foco.

### Service rows and capability chips

Cinco artigos sempre abertos: Sites, Sistemas, Aplicativos, Lojas virtuais e Automações & IA. Descrição e capacidades ficam disponíveis sem interação. Hover em ponteiro fino desloca o título 6px e reforça linha, índice e etiquetas. Lojas virtuais tem índice e divisória azuis; “virtuais” e “IA” aparecem em itálico. Chips são informação, sem semântica de filtro ou botão.

### Work plane

O plano quente contém somente o site Guarda-Chuva, identificado como SITE INSTITUCIONAL · PROJETO PRÓPRIO. A imagem é uma captura real, com dimensões intrínsecas, lazy loading e texto alternativo. Link e captura retornam ao início do próprio site. Hover da imagem amplia apenas 1.015×. Não há portfólio fictício nem case de e-commerce verificado.

### Editorial motion

`EditorialMotion` carrega GSAP, ScrollTrigger e Lenis em chunk separado. Um único ticker GSAP chama `lenis.raf`; Lenis usa duração 0.75s, sem RAF automático nem sincronização de touch. Entradas movem texto 6–14px, linhas começam em escala horizontal 0.75 e a captura usa máscara de 12% com raio de 9px. Durações de 0.6–0.75s, easing `power3.out`, entradas de seção executadas uma vez.

Não existem pins, parallax ou narrativa controlada pela rolagem. Cleanup remove ticker, listeners e instância Lenis; matchMedia desfaz animações quando muda a preferência. Fontes e imagens atualizam ScrollTrigger. A posição de reload é registrada em sessionStorage quando disponível; âncoras são resolvidas após fontes carregarem.

Com movimento reduzido, conteúdo permanece estático e legível, Lenis não é criado, rolagem é nativa e transformações de hover são removidas.

## Do's and Don'ts

### Do

- Do preservar a predominância escura, texto quente e itálicos azuis.
- Do manter os cinco serviços abertos e o e-commerce explícito na proposta.
- Do recompor colunas, quebras e espaço no mobile.
- Do preservar foco visível, navegação por teclado e movimento reduzido.
- Do mostrar somente trabalho verificável com seu vínculo real.

### Don't

- Don't restaurar a antiga identidade clara ou o posicionamento exclusivo para gastronomia.
- Don't substituir a tipografia por DM Sans ou títulos sans genéricos.
- Don't transformar serviços em cards, acordeão ou conteúdo dependente de hover.
- Don't criar menu mobile modal, pins ou loops decorativos.
- Don't inventar clientes, resultados, depoimentos ou fidelidade à referência inacessível.
