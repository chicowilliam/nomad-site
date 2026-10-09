# Guarda-Chuva — sites, sistemas e lojas virtuais sob medida

Home de design e desenvolvimento para empresas de todo o Brasil. React 19, TypeScript, Vite 7, Tailwind CSS 4 e CSS próprio; Instrument Serif normal/itálico e Instrument Sans locais; GSAP/ScrollTrigger e Lenis. A direção editorial escura apresenta cinco serviços sempre abertos e contato direto pelo WhatsApp.

## Desenvolvimento

Node.js 24 e npm. Não há backend, banco de dados ou credenciais necessários para rodar:

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

O teste usa Playwright e Chromium em `/usr/bin/chromium`. `CHROMIUM_PATH` altera o executável, `BASE_URL` altera o endereço e `SCREENSHOTS=false` desativa capturas. `check` permanece como alias da verificação TypeScript.

São 12 verificações, incluindo seis larguras (360, 390, 430, 768, 1440 e 1920px), overflow, assets, semântica, teclado, cinco serviços abertos, projeto próprio, links WhatsApp, GSAP/Lenis sem pins, resize, movimento reduzido e restauração após reload. A navegação ao WhatsApp é interceptada localmente: o teste não envia mensagens nem comprova disponibilidade da conta.

Capturas e relatórios ficam em `.impeccable/review/dark/`, ignorada pelo Git. A rodada final passou lint, typecheck, build e 12/12 E2E. Auditoria axe WCAG: zero violações; Lighthouse mobile: Performance 97, Accessibility 100, Best Practices 100, SEO 100, CLS 0.000683. Consulte `VALIDATION.md` para evidências e limites da medição.

## Conteúdo e contato

| Arquivo/campo | Responsabilidade |
| --- | --- |
| `src/data/site.ts` | Marca, navegação, hero, Sobre, contato e SEO |
| `src/data/services.ts` | Sites, Sistemas, Aplicativos, Lojas virtuais, Automações & IA |
| `src/data/projects.ts` | Apenas trabalho verificável e autorizado |
| `brand.whatsapp` | Número confirmado: `5531994649759` |
| `brand.canonicalUrl` | Domínio oficial ainda não informado |
| `brand.email` / `brand.instagram` | Canais opcionais ainda não informados |
| `contact.formEndpoint` | Campo reservado ao formulário legado não renderizado |

`site.ts` reexporta serviços e projetos. O site oferece atuação ampla para negócios; não possui posicionamento exclusivo para gastronomia.

WhatsApp confirmado: **+55 31 99464-9759**. Cabeçalho, hero, contato e rodapé levam ao canal real. O visitante decide enviar a mensagem no aplicativo. Não há formulário intermediário nem coleta de dados implementada na home. Nunca coloque segredos no frontend ou em `VITE_*`.

O trabalho mostrado é o próprio site, com captura real e identificação explícita de projeto próprio. Não há case externo ou e-commerce de cliente verificado; conceitos antigos não são prova comercial.

## Motion e acessibilidade

`src/components/EditorialMotion.tsx` separa o motor do bundle inicial. `src/hooks/useEditorialMotion.ts` usa `useGSAP` e matchMedia. Um ticker GSAP chama `lenis.raf(time * 1000)`; eventos de Lenis atualizam ScrollTrigger. Cleanup remove ticker, listeners e instância.

Textos deslocam poucos pixels, divisórias entram por escala e a imagem revela por máscara discreta. Não há pins ou parallax. Fontes e imagens atualizam as medidas; âncoras consideram o cabeçalho e reload restaura posição quando sessionStorage está disponível. `prefers-reduced-motion` desativa Lenis e movimento decorativo, mantendo conteúdo e rolagem nativa.

O cabeçalho é compacto e fixo. Desktop tem navegação interna; mobile mantém marca e WhatsApp direto, sem diálogo de menu. Skip link, HTML semântico e foco visível apoiam teclado.

## SEO e publicação

Copie `.env.example` para `.env.local` e preencha `VITE_SITE_URL` com a URL oficial completa, ou configure `brand.canonicalUrl`. A variável tem prioridade. Domínio e Instagram continuam pendentes; não invente valores.

O plugin de `vite.config.ts` produz description, Open Graph, Twitter Card, schema.org `ProfessionalService` e catálogo de cinco `Service`. Sempre gera `robots.txt`. Somente com domínio configurado gera canonical, `og:url`, imagem absoluta e `sitemap.xml`. `index.html` define pt-BR, tema escuro e preloads das fontes locais.

```sh
npm ci
npm run build
```

Publique `dist/` em hospedagem estática com HTTPS. Configure a URL oficial antes da publicação. A home usa âncoras, sem rotas de servidor.

## Sistema visual e assets

- `PRODUCT.md`: público, proposta e limites verificáveis.
- `DESIGN.md` e `.impeccable/design.json`: tokens e extensões do sistema atual.
- `.impeccable/surfaces/home.md`: contrato da home.
- `src/styles/global.css`: estilos da implementação.
- `public/assets/project-guarda.webp`: captura real do projeto próprio.
- `public/assets/SOURCES.md`: origem dos assets.
- `scripts/generate-social.mjs`: regenera `public/og-cover.png`.

Instrument Serif substitui a antiga tipografia display; DM Sans foi removida. `evolution.css` e `DomainVisual` foram removidos. `ContactForm` e `ProjectVisual` permanecem como componentes legados sem uso na home.

O vídeo Solid Tech não foi encontrado nos anexos disponíveis e a URL retornou proxy HTTP 403. A composição foi implementada a partir do briefing detalhado; não há alegação de comparação exata ou fidelidade medida ao vídeo. Impeccable orientou composição e documentação por suas referências, pois o launcher não estava disponível.
