# Validação — Guarda-Chuva, editorial escuro

9 de outubro de 2026. Build de produção servido localmente por Vite Preview e Chromium headless.

## Gates executados

- `npm run lint`, `npm run typecheck`, `npm run build`: aprovados.
- `npm run test:e2e`: 12/12 verificações aprovadas.
- Viewports: 360×800, 390×844, 430×932, 768×1024, 1440×900 e 1920×1080.
- Sem overflow horizontal, títulos cortados, assets quebrados, erros ou warnings de console.
- Fontes locais Instrument Serif normal/itálico e Instrument Sans carregadas.
- Header mobile compacto, foco por teclado, skip link e âncoras funcionais.
- Cinco serviços visíveis sem accordion; lojas virtuais explícitas na abertura e na lista.
- WhatsApp: número confirmado, mensagem, nova aba e navegação interceptada localmente. Nenhuma mensagem enviada; disponibilidade da conta externa não foi auditada.
- GSAP e Lenis: um ticker, conteúdo revelado, nenhum pin, resize, ativação/desativação dinâmica de movimento reduzido e restauração de scroll após refresh.
- Axe WCAG A/AA: nenhuma violação na página mobile.
- SEO: cinco Services, ProfessionalService, telefone, metadata e ausência de posicionamento restrito a gastronomia. Canonical, robots e sitemap verificados em build separado com `example.com` como fixture; o build final não contém domínio fictício.

## Inspeção visual

Duas passadas locais em mobile/desktop. Ajustes finais: alvo de toque do CTA do header com 44px e chips de serviços com melhor leitura. Revisão independente: **ship**, sem achados visuais materiais, dentro do escopo do briefing escrito. A revisão cobriu heros e páginas completas nas cinco larguras solicitadas, além de detalhes de serviços, sobre, trabalho e contato.

O vídeo Solid Tech não estava disponível nos anexos; a URL externa retornou HTTP 403 pela política de rede. Portanto não foi possível comparar a gravação lado a lado. Não há alegação de equivalência medida à referência ausente.

## Lighthouse mobile

| Performance | Accessibility | Best Practices | SEO | CLS | LCP |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 97 | 100 | 100 | 100 | 0,000683 | 2,3 s |

Medição local de laboratório, não garantia sobre hospedagem ou dispositivos reais. Relatório da sessão: `/tmp/guarda-dark-mobile.json`. Capturas e relatório Playwright: `.impeccable/review/dark/`, ignorados pelo Git.

## Pendências de conteúdo

Domínio oficial, Instagram e cases de clientes não foram fornecidos. O projeto publicado na seção Trabalho é o próprio site, identificado como projeto próprio. Nenhum conceito Diamond/Mesa/Axis é apresentado como cliente ou e-commerce entregue.
