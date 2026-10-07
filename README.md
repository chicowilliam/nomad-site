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

O teste usa Playwright e Chromium em `/usr/bin/chromium`. `CHROMIUM_PATH` altera o executável, `BASE_URL` altera o endereço e `SCREENSHOTS=false` desativa capturas. Verifica oito resoluções, overflow, imagens, semântica, menu e foco, seis soluções, conceito Mesa, briefing, GSAP, Lenis, resize, movimento reduzido e refresh em âncora. Relatórios e capturas locais ficam em `.impeccable/review/`, ignorada pelo Git. `check` permanece como alias da verificação TypeScript.

## Conteúdo e contato

Edite `src/data/site.ts`. Não há WhatsApp, domínio, e-mail ou perfil social oficial confirmado no repositório.

| Campo | Uso |
| --- | --- |
| `brand.whatsapp` | Número internacional completo ou URL `https://wa.me/…`; ativa CTA direto |
| `brand.email` | Canal de e-mail para o briefing |
| `brand.instagram` | Link real no rodapé |
| `contact.formEndpoint` | Endpoint que recebe JSON e confirma o envio por HTTP |
| `projects` | Conteúdo do conceito Mesa; substituir por cases autorizados |
| `services` | Soluções e opções do briefing |

O CTA final abre WhatsApp quando configurado. Sem esse canal, abre um briefing local. O formulário prioriza endpoint, WhatsApp, e-mail e download TXT. WhatsApp/e-mail exigem confirmação no aplicativo do visitante. O download não transmite dados. Um endpoint externo precisa permitir CORS quando necessário; nunca coloque segredos no frontend ou em `VITE_*`.

Mesa é um **conceito demonstrativo**, sem alegação de cliente real, entrega ou resultado comercial. Não inventar prova social.

## Motion e acessibilidade

`EditorialMotion.tsx` separa o motor de animação do bundle inicial de conteúdo. `useEditorialMotion.ts` usa `useGSAP`, contexts e matchMedia. Um único ticker GSAP chama `lenis.raf(time * 1000)`; os eventos de Lenis atualizam ScrollTrigger. O cleanup remove ticker, listeners, instância, pins e timelines.

Headlines revelam por máscara; linhas convergem para o domínio; a jornada do cliente usa pin limitado no desktop e linha vertical sem pin no celular. Imagens têm máscaras e parallax discreto apenas em desktop. `prefers-reduced-motion` mantém conteúdo visível, navegação nativa e remove movimento decorativo. O menu preserva foco, Escape e navegação por teclado.

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

A fotografia do hero e a fotografia do conceito Mesa foram geradas para a composição, otimizadas em WebP. Não representam estabelecimentos reais. O mockup Mesa usa HTML/CSS/SVG do projeto anterior. Impeccable orientou composição, legibilidade, auditoria e documentação; seu launcher não está instalado neste ambiente, por isso as referências foram usadas diretamente.
