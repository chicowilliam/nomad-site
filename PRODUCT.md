# Guarda-Chuva

## Produto e público

Site institucional de design e desenvolvimento em Belo Horizonte para empresas de todo o Brasil. A Guarda-Chuva constrói sites, sistemas, aplicativos, lojas virtuais e automações sob medida. O público são responsáveis por negócios que precisam vender, organizar a operação e crescer no digital; a proposta não se restringe a restaurantes.

## Tese comercial

Entender o negócio, construir a solução apropriada e colocá-la para funcionar. Sites, sistemas e lojas virtuais são explícitos na primeira tela. A linguagem é direta e acessível; tecnologia aparece como capacidade de execução, sem promessas financeiras, posições garantidas em buscadores ou resultados sem evidência.

## Jornada da home

1. Cabeçalho compacto com marca textual e WhatsApp; navegação interna no desktop.
2. Hero com proposta, “sob medida.” em itálico, descrição, WhatsApp e link para o trabalho.
3. Sobre: posicionamento e quatro indicadores conceituais.
4. Cinco serviços sempre abertos: Sites, Sistemas, Aplicativos, Lojas virtuais, Automações & IA.
5. Plano quente com o projeto próprio Guarda-Chuva e captura real.
6. Contato direto e rodapé com âncoras.

“05 frentes”, “01 conversa”, “WEB” e “BR” descrevem oferta e abordagem. Não representam volume de clientes, projetos entregues ou resultados medidos.

## Conteúdo verificável e canais

WhatsApp confirmado pelo proprietário: **+55 31 99464-9759** (`5531994649759`). CTAs abrem uma conversa com mensagem contextual; o visitante decide enviá-la no aplicativo. Não há formulário renderizado, backend ou coleta de dados implementada nesta home.

Domínio oficial, e-mail e Instagram não foram informados. Canonical, URL pública e sitemap dependem de configuração real. Não presumir um domínio ou publicar contatos inventados.

O único projeto mostrado é o próprio site Guarda-Chuva. Não foram fornecidos cases externos autorizados, métricas, depoimentos ou case de e-commerce verificado. Diamond, Mesa e Axis são conceitos legados, fora da interface e sem valor de prova de entrega.

`src/data/site.ts` guarda marca, proposta, navegação, contato e SEO; `src/data/services.ts` define os cinco serviços; `src/data/projects.ts` define o trabalho verificável. `site.ts` reexporta serviços e projetos. `ContactForm` e `ProjectVisual` permanecem no acervo, sem renderização na home.

## Direção aprovada e referências

A direção atual é editorial escura: Instrument Serif normal/itálico, Instrument Sans local, fundo quase preto, texto quente, azul contido, cinco linhas de serviços e um plano claro arredondado para trabalho. `DESIGN.md` contém os tokens; `.impeccable/surfaces/home.md` registra o contrato da superfície.

O vídeo Solid Tech solicitado não está entre os anexos disponíveis. A URL retornou HTTP 403 do proxy. A implementação foi guiada pelo briefing visual detalhado do usuário; não se alega comparação exata com o vídeo nem fidelidade medida à referência.

## Critérios de qualidade

Priorizar clareza em 390×844 e 430×932, com composição íntegra em 768px, 1440×900 e 1920×1080; 360px acrescenta cobertura de overflow. Conteúdo semântico, foco visível, teclado, contraste, fontes locais e imagens válidas são requisitos.

GSAP e Lenis compartilham um único ticker, com movimento discreto e nenhum pin. Movimento reduzido preserva conteúdo e rolagem nativa. Âncoras, resize e reload devem preservar uma navegação previsível.

Metas de laboratório: Performance ≥90, Accessibility ≥95, Best Practices ≥95 e SEO ≥95. A rodada final registrada passou lint, TypeScript, build e 12/12 verificações E2E; axe WCAG encontrou zero violações. Lighthouse mobile marcou 97/100/100/100 e CLS 0.000683. Esses resultados pertencem à medição local, não são promessa sobre hospedagem ou dispositivos reais. Evidências e limites estão em `VALIDATION.md`.
