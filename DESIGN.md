---
name: Guarda-Chuva
description: Um endereço próprio na internet para negócios gastronômicos
colors:
  paper: "#fafaf8"
  ink: "#101828"
  muted: "#536070"
  blue: "#2864db"
  deep: "#163a70"
  wash: "#eaf2ff"
  rule: "rgba(16, 24, 40, 0.1)"
  white: "#ffffff"
  error: "#9f2530"
typography:
  display:
    fontFamily: "Instrument Sans Variable, sans-serif"
    fontSize: "clamp(52px, 4.62vw, 84px)"
    fontWeight: 450
    lineHeight: 1.055
    letterSpacing: "-0.058em"
  headline:
    fontFamily: "Instrument Sans Variable, sans-serif"
    fontSize: "clamp(43px, 5.15vw, 88px)"
    fontWeight: 450
    lineHeight: 1.05
    letterSpacing: "-0.055em"
  title:
    fontFamily: "Instrument Sans Variable, sans-serif"
    fontSize: "clamp(27px, 3.05vw, 50px)"
    fontWeight: 450
    letterSpacing: "-0.045em"
  body:
    fontFamily: "DM Sans Variable, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "DM Sans Variable, sans-serif"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.65
    letterSpacing: "0.065em"
rounded:
  square: "0px"
  node: "50%"
spacing:
  gutter: "clamp(24px, 4.5vw, 88px)"
  gutter-mobile: "24px"
  gutter-compact: "20px"
  section: "112px"
  section-tablet: "90px"
  section-mobile: "68px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.square}"
    padding: "17px 23px"
  button-primary-hover:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.white}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "17px 23px"
  text-link:
    textColor: "{colors.ink}"
    padding: "9px 0"
  contact-input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "10px 0 13px"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "94px"
  channel-tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "10px 13px"
  service-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "27px 0"
  domain-address:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.square}"
    padding: "19px 24px 18px"
  ecosystem-node:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.deep}"
    rounded: "{rounded.square}"
    padding: "13px 17px"
---

# Design System: Guarda-Chuva

## Overview

**Creative North Star: "Um endereço próprio."**

A Guarda-Chuva traduz estrutura digital em uma composição editorial clara: papel, tipografia leve, fotografia gastronômica e linhas que levam canais a um endereço próprio. A identidade é precisa, acolhedora e segura. A assimetria cria direção; o espaço deixa a proposta respirar.

A superfície clara predomina. O azul identifica ações, conexões e propriedade, com uma única pausa de página inteira na afirmação de marca. Fotografias mostram matéria e apetite; diagramas explicam relações. O acabamento vem de proporção, alinhamento e contraste, sem aparência de dashboard SaaS.

O sistema descreve a implementação atual. Os tokens acima foram extraídos de `src/styles/global.css` e dos componentes; são normativos. `PRODUCT.md` guarda público e conteúdo, enquanto este arquivo orienta decisões visuais. As extensões de movimento, profundidade, breakpoints e exemplos renderizáveis ficam em `.impeccable/design.json`.

**Key Characteristics:**

- Papel claro predominante e azul usado com intenção.
- Títulos amplos de peso moderado, composição assimétrica e leitura arejada.
- Fotografia gastronômica integrada a endereços, linhas e nós.
- Superfícies retas, índices discretos e divisões finas.
- Mobile recomposto e movimento subordinado à leitura.

## Colors

Um papel levemente quente recebe tinta azulada, azul nítido e planos azulados quase brancos. A família é clara e precisa, com contraste suficiente para leitura.

### Primary

- **Azul de endereço** (`blue`): CTAs, trechos decisivos de títulos, conexões, nós e a placa de domínio.
- **Azul profundo** (`deep`): hover de CTA, legenda da composição e informação estrutural.
- **Azul de fundo** (`wash`): terreno digital, comparativo, busca ilustrativa e ecossistema mobile.

### Neutral

- **Papel** (`paper`): fundo principal, navegação e etiquetas.
- **Tinta** (`ink`): títulos e conteúdo principal.
- **Texto de apoio** (`muted`): parágrafos, metadados e descrições.
- **Linha estrutural** (`rule`): divisões finas e relações entre blocos; preserve sua transparência.
- **Branco** (`white`): texto e ícones sobre azul.

O vermelho de erro (`error`) pertence exclusivamente ao feedback do formulário. A paleta quente do conceito Mesa pertence à cena demonstrativa e não substitui as cores da agência.

**The Azul com função Rule.** Use azul para ação, conexão e domínio próprio. A grande superfície azul pertence à seção de propriedade; preserve o predomínio claro no restante da página.

## Typography

**Display Font:** Instrument Sans Variable, com fallback sans-serif.

**Body Font:** DM Sans Variable, com fallback sans-serif. Ambas são locais; não dependem de um provedor de fontes em runtime.

A primeira organiza declarações e relações em grandes proporções; a segunda sustenta leitura, navegação e controles. Tracking compacto, caixa alta editorial e entrelinha curta dão caráter aos títulos, sem aumentar excessivamente o peso.

### Hierarchy

- **Display:** título da abertura, com quatro linhas semânticas agrupadas em duas afirmações. No mobile usa `clamp(34px, 9.4vw, 54px)`, entrelinha (1.01) e tracking (-0.05em); há ajuste específico para telas compactas.
- **Headline:** títulos de seção; o token é a base, com escalas próprias nas afirmações de domínio, jornada, propriedade e rodapé. No mobile a base usa `clamp(35px, 8.8vw, 55px)` e entrelinha (1.08).
- **Title:** nomes de soluções no acordeão. No mobile usa `clamp(23px, 6.2vw, 38px)`.
- **Body:** corpo recorrente; composições usam variações de (13–15px), entrelinhas de (1.8–1.9) e larguras contidas, normalmente (290–470px). Inputs sobem para (16px) até o breakpoint de campos.
- **Label:** índices e notas em caixa alta, com números tabulares. Metadados decorativos podem ser menores. Os nomes do ecossistema mobile usam (11px), peso (500), tracking neutro e nunca herdam a escala mínima de microtexto.

A marca usa peso (550); subtítulos de processo usam (500). Georgia aparece somente no mockup Mesa, como parte da identidade do conceito.

**The Escala antes de peso Rule.** Dê força ao título por tamanho, quebra e espaço. Preserve o peso moderado da família display; não compense uma hierarquia fraca com negrito pesado.

## Layout

A largura geral máxima é (1720px), incluindo gutters fluidos. A hero e composições internas amplas chegam a (1544px). Relações assimétricas como (1.35fr / 1fr), offsets, colunas estreitas de apoio e faixas de largura total variam o ritmo. Não existe uma grade única para todas as seções.

A home atual tem quatorze seções: abertura, manifesto, terreno digital, diagnóstico, soluções, ecossistema, trabalho próprio, princípio, processo, propriedade, diferenças, stack, prova navegável e contato. Essa sequência é a composição desta página; novas superfícies devem herdar sua gramática, sem copiar obrigatoriamente a sequência.

O respiro padrão entre seções segue os tokens de spacing, com exceções deliberadas nas transições. Até (1100px), reduz-se a escala intermediária. Até (900px), a navegação vira diálogo. Até (767px), a composição principal passa a uma coluna, o título e o CTA da hero vêm antes da composição visual. O gutter mobile é fixo e reduz novamente até (374px).

No celular, o ecossistema apresenta canais compactos, centro, domínio, três destinos e cliente em níveis verticais conectados. Serviços mantêm seus argumentos visíveis mesmo fechados. O trabalho próprio usa uma captura real, e o processo deixa de ser sticky. O contato é direto, sem formulário.

Priorize (390×844) e (430×932) sem perder composição em (1440×900) e (1920×1080). A validação atual também cobre (360×800), (375×812), (768×1024) e (1024×768), sem overflow horizontal. Preserve esse limite ao alterar texto, diagrama ou tipografia.

## Elevation & Depth

A interface é plana por padrão. Planos tonais e linhas organizam conteúdo; na evolução comercial, hero e trabalho não usam sombras. O terreno digital é uma planta gráfica, sem extrusão. Os valores abaixo permanecem apenas no acervo legado, não na home atual.

### Shadow Vocabulary

- **Placa de domínio** (`0 12px 22px #163a7010`): separa a placa azul da fotografia.
- **Consulta ilustrativa** (`0 7px 20px #163a7007`): pequena sobreposição sobre o plano pálido.
- **Terreno próprio** (`-10px 12px 0 #163a70`): extrusão geométrica, sem blur.
- **Janela de conceito** (`0 3cqw 6cqw #0002`): profundidade contextual dentro do mockup Mesa.

**The Profundidade localizada Rule.** Mantenha a interface plana. Reserve sombra para objetos sobrepostos e cenas demonstrativas com uma relação espacial concreta.

## Shapes

Retângulos de cantos retos, linhas técnicas de (1px), setas finas e pequenos nós circulares formam a linguagem. Bordas não transformam cada grupo de conteúdo em um card. A hero termina com um pequeno recorte diagonal; a fotografia, as etiquetas e a placa de endereço recebem rotações contidas, como peças de uma composição impressa.

A fotografia gastronômica foi criada para esta composição: prato, tecido azul, talheres e mesa clara. Seu corte mantém o alimento reconhecível em cada viewport. A legenda fica abaixo do objeto, com espaço próprio, e não atravessa a placa ou a fotografia.

## Components

### Buttons and links

O CTA principal é um retângulo azul com texto branco, seta diagonal e altura mínima de (54px), reduzida a (52px) na base mobile. O CTA final é maior. Hover traz o azul profundo de baixo para cima e desloca texto/seta poucos pixels. Foco usa contorno azul (2px) com afastamento (5px); sobre a navegação inversa o contorno fica branco.

A variante clara existe no CSS; o CTA do diálogo mobile é sobrescrito para azul. Links de texto usam sublinhado que cresce e seta discreta. Use links para navegar e botões para expandir ou executar ações.

### Navigation

Cabeçalho fixo, marca à esquerda, links e ação à direita. Uma linha aparece após a rolagem. Sobre a seção de propriedade, cabeçalho e conteúdo assumem a inversão azul/branco. A altura é (94px) no desktop e (84px) no celular.

O menu mobile mantém `dialog` nativo, nome acessível, foco contido, Escape, fechamento ao seguir uma âncora e retorno de foco ao controle de abertura. Controles de abrir/fechar têm (44px). O diálogo ocupa (100dvh) e impede a rolagem da página enquanto aberto.

### Channel tags and domain address

Etiquetas pequenas identificam Google, Instagram, WhatsApp e delivery; linhas finas convergem para a placa azul de domínio. São elementos explicativos, sem comportamento de filtro ou link. A placa contém título amplo, uma nota funcional e uma linha de capacidades. Mantenha a legenda fora da sobreposição.

### Ecosystem

No desktop, cinco canais convergem por linhas SVG para a Guarda-Chuva, seguem ao domínio azul e se abrem em cardápio, reserva e delivery antes de chegar ao cliente. No celular, níveis verticais e conectores CSS substituem o SVG largo. Labels de canais têm (11px); conteúdo permanece compreensível sem animação.

### Solutions

Seis módulos expansíveis, com índice, categoria, argumento tipográfico visível e sinal de expansão. A linha aberta revela descrição, capacidades e CTA; o primeiro item começa aberto. Título e sinal ficam azuis no estado aberto ou hover. O comportamento usa botão, `aria-expanded`, `aria-controls` e `hidden`. No mobile, coloque a categoria acima do argumento e distribua a descrição aberta em uma coluna.

### Journey and editorial motion

A entrada coreografa tipografia, texto, CTA e composição. A analogia físico/digital se constrói progressivamente. O ecossistema desenha canais, domínio, soluções e cliente. O processo de sete etapas tem indicador de avanço. A seção de propriedade recebe pin apenas a partir de (1024px), sem pin no celular; o processo usa sticky CSS separado. Imagens e títulos revelam por máscara; o parallax da fotografia é discreto e exclusivo do desktop.

`EditorialMotion` carrega o motor em um chunk separado. GSAP, `@gsap/react`, ScrollTrigger e Lenis compartilham um único ticker; Lenis não cria outro RAF. Contexts e matchMedia desfazem listeners, animações e pins em mudança de condição e desmontagem. A abertura do menu pausa Lenis; fontes e imagens provocam recálculo sem ocultar conteúdo.

Com movimento reduzido, não são criados Lenis, revelações decorativas, parallax ou pins. O conteúdo continua visível, as âncoras usam rolagem nativa e a composição estática preserva sua forma. Não use movimento para tornar informação indispensável acessível.

### Trabalho verificável

O próprio site é apresentado com captura real, identificação de projeto próprio, problema e implementação. Não representa um cliente externo nem resultados financeiros. Os conceitos Mesa, Diamond e Axis permanecem no acervo, fora da interface. A prova final leva a partes funcionais do site.

### Contact fields and feedback

Campos transparentes, label persistente, linha inferior, placeholder secundário e foco azul. O erro combina texto vermelho e linha lateral; o botão desabilitado reduz opacidade e informa estado de espera. O formulário mantém validação nativa e feedback acessível.

WhatsApp confirmado: +55 31 99464-9759. CTAs levam diretamente ao aplicativo com mensagem contextual; não enviam nada automaticamente. O formulário legado está preservado, mas não é renderizado. O domínio oficial ainda precisa ser configurado para canonical e sitemap.

## Do's and Don'ts

### Do

- Do usar tipografia, espaço, linhas e alinhamento para construir hierarquia.
- Do manter papel claro predominante e reservar grandes planos azuis para a afirmação de propriedade.
- Do recompor a leitura em 390×844 e 430×932, preservando canais legíveis e legenda separada da fotografia.
- Do usar fotos gastronômicas com função editorial e diagramas que expliquem relações reais.
- Do preservar teclado, foco visível, labels persistentes e conteúdo completo com movimento reduzido.
- Do apresentar somente trabalho verificável e identificar o site da agência como projeto próprio.
- Do manter ações de contato coerentes com o WhatsApp confirmado, sem alegar envio automático.

### Don't

- Don't transformar a página em uma grade de cards iguais ou numa interface genérica de SaaS.
- Don't introduzir neon, glow, blobs ou glassmorphism na identidade.
- Don't usar negrito pesado como linguagem dominante nem substituir o par tipográfico por uma fonte universal.
- Don't reduzir nomes de canais à escala de microlegenda para fazê-los caber no celular.
- Don't aplicar pin, parallax ou rolagem suave quando o visitante pede movimento reduzido.
- Don't inventar clientes, métricas, depoimentos, contatos oficiais ou confirmação de envio.
