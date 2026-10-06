# Nomad — direção do produto

## Contexto

A Nomad é apresentada como um estúdio de soluções digitais em Belo Horizonte, Brasil. A marca foi inferida do nome do repositório e do conteúdo inicial. O posicionamento solicitado é construir infraestrutura digital para empresas venderem, operarem e crescerem em escala.

O público inclui donos de empresas, restaurantes, lojas, imobiliárias, clínicas, profissionais autônomos e negócios que já vendem e precisam organizar ou ampliar sua operação digital.

## Oferta e narrativa

- Presença: sites institucionais e landing pages orientados a descoberta, autoridade e conversão.
- Venda: e-commerce e jornadas de compra.
- Operação: sistemas web personalizados, dashboards e sistemas internos.
- Escala: automações e integrações que reduzem trabalho manual.

A home segue uma narrativa editorial: proposta de valor, contexto de negócio, manifesto, soluções, integração de ferramentas, aplicações, valor como ativo, processo, espaço para prova real, contato e assinatura da marca.

A direção visual combina hero claro, seções escuras, tipografia grotesca de grande escala, composições assimétricas, linhas técnicas e formas arquitetônicas. A linguagem comercial fala de vendas, produtividade, controle e autonomia. Tecnologia aparece como competência da agência.

## Fonte única de conteúdo

`src/data/site.ts` centraliza marca, navegação, textos comerciais, serviços, projetos demonstrativos, processo, dados de clientes, canais de contato e metadados SEO.

## Dados confirmados e limites

- O código original continha somente o nome “Nomad Site” e uma mensagem provisória.
- Localização de Belo Horizonte, escopo de serviços e posicionamento vêm do briefing do usuário.
- Não foram fornecidos domínio público, e-mail, telefone, WhatsApp, Instagram ou LinkedIn oficiais. Seus campos permanecem `null` até confirmação.
- Não existe endpoint de recebimento de propostas confirmado. A interface deve explicar qualquer ação local de preparação ou cópia de briefing e não afirmar que uma mensagem foi enviada.
- Não há clientes, projetos entregues, métricas comerciais ou depoimentos verificáveis no repositório.
- Diamond, Mesa e Axis são **conceitos de aplicação**, não trabalhos para clientes. Devem ser identificados dessa forma em toda apresentação pública.
- Os objetivos dos conceitos são intenções de projeto, não resultados alcançados.
- `clientData.clients` e `clientData.testimonials` permanecem vazios. A estrutura aceita conteúdo real, com autorização de uso, posteriormente.
- Não publicar logos, depoimentos, estrelas, contagens de clientes ou números de crescimento fictícios.
- Canonical e sitemap precisam do domínio oficial antes da publicação em produção. Não usar domínio inventado.

## Critérios de validação

Verificar build de produção, hierarquia semântica, teclado e foco, contraste, movimento reduzido, menu mobile, ausência de overflow horizontal e funcionamento dos CTAs. Revisar ao menos 390 × 844, 430 × 932, 1440 × 900 e 1920 × 1080, com atenção à composição própria do mobile.

As metas Lighthouse do briefing são Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95 e SEO ≥ 95. Registrar somente medições realmente executadas.
