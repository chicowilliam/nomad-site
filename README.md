# Nomad — engenharia digital

Site editorial da Nomad, estúdio de soluções digitais em Belo Horizonte. A home apresenta sites, e-commerce, sistemas e automação como estrutura para vender, organizar a operação e crescer.

Construído com React 19, TypeScript, Vite 7 e Tailwind CSS 4. A direção visual e os componentes usam CSS próprio. Space Grotesk Variable e Manrope Variable são servidas localmente pelo pacote de fontes. O projeto gera arquivos estáticos e não depende de banco de dados, backend ou segredos para rodar.

## Desenvolvimento

Use Node.js 24 e npm. A instalação respeita `package-lock.json`:

```sh
npm ci
npm run dev
```

O Vite disponibiliza o servidor na porta 5173, salvo se estiver ocupada. Use o checkout existente; cada tarefa do ambiente de nuvem já é isolada e não precisa de outro worktree.

## Build e verificações

```sh
npm run check
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

`check` executa a verificação TypeScript. `build` executa TypeScript e gera a versão de produção em `dist/`. `preview` permite inspecionar esse build localmente; ele não publica o site.

Com o preview ativo em outro terminal:

```sh
npm run test:e2e
```

O script usa Playwright e espera o site em `http://127.0.0.1:4173`. Use `BASE_URL` para testar outro endereço. O ambiente de nuvem disponibiliza Chromium em `/usr/bin/chromium`; `CHROMIUM_PATH` permite indicar outro executável quando necessário. O comando executa a validação automatizada; seus resultados dependem da versão atual do build.

## Conteúdo e configuração

Edite `src/data/site.ts` para atualizar marca, localização, contatos, textos, serviços, projetos, processo e metadados. A hierarquia visual vive em `src/App.tsx`; os tokens e layouts principais ficam em `src/styles/global.css`.

| Configuração | Onde editar | Comportamento |
| --- | --- | --- |
| Marca, localização e SEO | `brand` e `seo` | Identidade, metadados e dados estruturados |
| WhatsApp | `brand.whatsapp` | Número internacional completo ou URL `https://wa.me/…` |
| E-mail | `brand.email` | Prepara uma mensagem no aplicativo do visitante |
| Instagram e LinkedIn | `brand.instagram` e `brand.linkedin` | Exibe apenas os links configurados |
| Recebimento por formulário | `contact.formEndpoint` | Envia JSON por POST e aguarda confirmação HTTP |
| Projetos | `projects` | Conteúdo dos três conceitos de aplicação |
| Prova social | `clientData` | Clientes e depoimentos reais, com autorização de uso |

Diamond, Mesa e Axis são **conceitos demonstrativos**, não clientes ou entregas reais. Objetivos de projeto não representam resultados alcançados. `clientData` permanece vazio até haver conteúdo verificável.

O formulário funciona agora como preparação de briefing: valida os dados e oferece um arquivo TXT para download, sem transmiti-los. Ao configurar um destino, a prioridade é endpoint, WhatsApp e e-mail. WhatsApp e e-mail exigem que o visitante conclua o envio no aplicativo correspondente. Um endpoint externo precisa aceitar o JSON e permitir o domínio do site via CORS, quando aplicável. Não coloque credenciais, chaves privadas ou segredos no frontend ou em variáveis `VITE_*`.

## Domínio e SEO

Antes de publicar em produção, configure o domínio público oficial e os canais de contato. Copie `.env.example` para `.env.local` e preencha `VITE_SITE_URL` com a URL oficial completa, incluindo `https://`. Como alternativa, configure `brand.canonicalUrl`. A variável de ambiente tem prioridade.

O plugin local em `vite.config.ts` gera description, robots, Open Graph, Twitter Card e schema.org `ProfessionalService`. Com um domínio configurado, ele acrescenta canonical, `og:url`, URLs absolutas de compartilhamento e `sitemap.xml`. `robots.txt` é emitido no build; sem domínio, não inclui uma referência fictícia de sitemap. Depois de alterar essa configuração, gere um novo build.

## Publicação

```sh
npm ci
npm run build
```

Publique o conteúdo de `dist/` em uma hospedagem estática com HTTPS. Configure `VITE_SITE_URL` no ambiente de build da hospedagem. A navegação da home usa âncoras; não há rotas de servidor ou serviço persistente para manter. Arquivos estáticos com hash podem receber cache longo; mantenha a atualização do HTML habilitada.

## Direção e assets

- `PRODUCT.md`: público, posicionamento, limites dos dados e critérios do produto.
- `DESIGN.md`: sistema visual extraído da implementação.
- `.impeccable/design.json`: extensão estruturada de motion, breakpoints e componentes.
- `public/assets/SOURCES.md`: origem e contexto dos assets visuais.

A escultura cromada do hero e a fotografia do conceito Mesa são imagens geradas para este projeto, otimizadas em WebP. Os mockups dos conceitos são compostos em HTML, CSS e SVG. A arte demonstra aplicações possíveis sem sugerir clientes existentes.

A skill Impeccable orientou composição, hierarquia, responsividade, motion e documentação por suas referências. O launcher binário não estava disponível no ambiente; as instruções e o código do projeto foram consultados diretamente.
