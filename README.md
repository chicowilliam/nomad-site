# Guarda-Chuva — domínio digital para gastronomia

Rebrand do projeto existente em React 19, TypeScript, Vite 7 e Tailwind CSS 4. A home apresenta sites, cardápios digitais, delivery, reservas, sistemas e automações para restaurantes, bares e negócios gastronômicos. CSS próprio, Instrument Sans e DM Sans locais, GSAP/ScrollTrigger e Lenis.

## Desenvolvimento

Node.js 24 e npm, sem backend, banco de dados ou credenciais para rodar:

```sh
npm ci
npm run dev
```

Use o checkout existente em `/workspace/nomad-site`. Cada tarefa da nuvem já é isolada.

## Verificação e build

```sh
npm run lint
npm run typecheck
npm run build
npm run preview -- --port 4173
```

Em outro terminal, com o preview ativo:

```sh
npm run test:e2e
```

O teste usa Playwright e Chromium em `/usr/bin/chromium`. `CHROMIUM_PATH` altera o executável, `BASE_URL` altera o endereço e `SCREENSHOTS=false` desativa capturas. Verifica oito resoluções, overflow, imagens, semântica, menu e foco, seis soluções, projeto próprio, links WhatsApp, GSAP, Lenis, resize, movimento reduzido e refresh. O teste de WhatsApp intercepta a navegação: não envia mensagens nem comprova disponibilidade da conta. Relatórios e capturas locais ficam em `.impeccable/review/`, ignorada pelo Git. `check` permanece como alias da verificação TypeScript.

## Conteúdo e contato

Edite `src/data/site.ts`. WhatsApp confirmado: **+55 31 99464-9759**. Domínio, e-mail e Instagram ainda aguardam informação oficial.

| Campo | Uso |
| --- | --- |
| `brand.whatsapp` | Número internacional completo, apenas dígitos; CTAs diretos |
| `brand.email` | Canal opcional ainda não informado |
| `brand.instagram` | Link real no rodapé |
| `contact.formEndpoint` | Reservado ao formulário legado não renderizado |
| `projects` | Projeto próprio verificável; adicionar apenas cases autorizados |
| `services` | Soluções, argumentos, capacidades e mensagens contextuais |

Navbar, hero, serviços, processo e CTA final abrem conversa no WhatsApp. A mensagem só é enviada mediante ação do visitante no aplicativo. Não há formulário intermediário, backend ou coleta de dados implementada nesta home. Nunca coloque segredos no frontend ou em `VITE_*`.

O trabalho mostrado é o próprio site, com captura real e identificação explícita de projeto próprio. Os conceitos anteriores permanecem no acervo, fora da interface. Não inventar prova social.

## Motion e acessibilidade

`EditorialMotion.tsx` separa o motor de animação do bundle inicial de conteúdo. `useEditorialMotion.ts` usa `useGSAP`, contexts e matchMedia. Um único ticker GSAP chama `lenis.raf(time * 1000)`; os eventos de Lenis atualizam ScrollTrigger. O cleanup remove ticker, listeners, instância, pins e timelines.

Headlines revelam por máscara; a analogia físico/digital é construída progressivamente; linhas convergem para o domínio e se abrem em soluções; o processo possui indicador de avanço. A seção de propriedade usa pin limitado no desktop, sem pin no celular. Imagens têm máscaras e parallax discreto apenas em desktop. `prefers-reduced-motion` mantém conteúdo visível e navegação nativa. O menu preserva foco, Escape e teclado.

## SEO e publicação

Copie `.env.example` para `.env.local` e preencha `VITE_SITE_URL` com a URL oficial completa, ou configure `brand.canonicalUrl`. A variável tem prioridade. Não invente um domínio.

O plugin em `vite.config.ts` produz description, Open Graph, Twitter Card, schema.org `ProfessionalService` e catálogo de `Service`. Sempre gera `robots.txt`. Com o domínio confirmado, gera canonical, `og:url`, imagem absoluta e `sitemap.xml`. Sem o domínio, omite URLs fictícias. `index.html` contém idioma, title e preloads da fonte display e imagem principal.

```sh
npm ci
npm run build
```

Publique `dist/` em uma hospedagem estática com HTTPS. Configure o domínio e os contatos antes da publicação oficial. A home usa âncoras, sem rotas de servidor.

## Sistema visual e assets

- `PRODUCT.md`: público, tese, conteúdo e limites verificáveis.
- `DESIGN.md` e `.impeccable/design.json`: sistema visual da implementação.
- `public/assets/SOURCES.md`: origem das fotografias e assets preservados.
- `scripts/generate-social.mjs`: regenera `public/og-cover.png`.

A fotografia gastronômica foi gerada para a composição e otimizada em WebP; não representa um estabelecimento real. `project-guarda.webp` é uma captura real desta implementação. `evolution.css` estende os controles e a base visual preservados em `global.css`. Impeccable orientou composição, legibilidade e refinamento; as referências foram usadas diretamente porque o launcher não está instalado no ambiente.
