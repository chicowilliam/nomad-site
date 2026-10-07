# Validação — evolução comercial Guarda-Chuva

Executada em 7 de outubro de 2026, no build de produção servido localmente por Vite Preview, Chromium headless.

## Gates

- `npm run lint`, `npm run typecheck` e `npm run build`: aprovados.
- Playwright: 360×800, 375×812, 390×844, 430×932, 768×1024, 1024×768, 1440×900 e 1920×1080.
- Sem overflow horizontal, assets quebrados, erros ou warnings de console.
- Menu: teclado, foco contido, Escape, retorno de foco e navegação por âncoras.
- Seis soluções: Enter/Space, estados ARIA e conteúdo expandido.
- WhatsApp: número confirmado, mensagem contextual, nova aba e navegação interceptada localmente. Nenhuma mensagem enviada; disponibilidade da conta externa não foi auditada.
- GSAP/Lenis: um ticker, conexões SVG, revelações completas, pin somente desktop, pausa com menu, resize, redução de movimento dinâmica e refresh com/sem fragmento.
- Inspeção visual: abertura, manifesto, terreno, diagnóstico, serviços, ecossistema, trabalho, princípio, processo, propriedade, diferenças, stack, prova, contato e rodapé; segunda passada tipográfica e terceira passada mobile.
- Axe WCAG A/AA: nenhuma violação na página mobile e no menu. O nome acessível do link de trabalho também foi corrigido e revalidado no Lighthouse.

## Lighthouse — última rodada

| Perfil | Performance | Accessibility | Best Practices | SEO | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile simulado | 92 | 100 | 100 | 100 | 0,00036 |
| Desktop | 100 | 100 | 100 | 100 | 0,00030 |

São medições de laboratório locais, não garantias sobre hospedagem ou dispositivos reais. Uma rodada anterior mediu Performance 94 no mobile; a rodada final permaneceu acima da meta de 90.

## SEO e limites

Title, description, Open Graph, Twitter, ProfessionalService, telefone confirmado e catálogo de seis Services verificados. O build sem domínio não inventa canonical. Um build separado em `/tmp`, com `https://example.com` exclusivamente como fixture, confirmou canonical, URLs absolutas, robots e sitemap.

O domínio oficial, Instagram e cases de clientes ainda não foram fornecidos. A home usa apenas o projeto próprio como evidência. Solid Tech estava bloqueado pela política de rede: foram aplicados os princípios comerciais descritos pelo usuário, sem alegar inspeção da página externa.

Capturas e relatório Playwright ficam em `.impeccable/review/`, ignorada pelo Git. Relatórios Lighthouse desta sessão: `/tmp/guarda-evolution-mobile-final.json` e `/tmp/guarda-evolution-desktop-final.json`.
