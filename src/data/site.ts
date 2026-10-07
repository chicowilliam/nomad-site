/** Conteúdo comercial e configuração. Só publicar evidências verificáveis. */
export interface NavigationItem {
  label: string;
  href: string;
}
export interface Service {
  id: string;
  number: string;
  label: string;
  title: string;
  lines: string[];
  description: string;
  capabilities: string[];
  outcome: string;
}
export interface Project {
  id: string;
  title: string;
  segment: string;
  type: string;
  problem: string;
  solution: string;
  image: string;
  imageAlt: string;
  href: string;
  linkLabel: string;
  capabilities: string[];
}
export const brand = {
  name: "guarda-chuva",
  displayName: "Guarda-Chuva",
  descriptor: "Domínio digital para gastronomia",
  signature: "Seu negócio. Seu domínio.",
  location: "Belo Horizonte — MG",
  city: "Belo Horizonte",
  country: "Brasil",
  locale: "pt-BR",
  whatsapp: "5531994649759",
  email: null as string | null,
  canonicalUrl: null as string | null,
  instagram: null as string | null,
};
export function getWhatsAppUrl(message?: string) {
  const number = brand.whatsapp.replace(/[\s()+.-]/g, "");
  if (!/^[1-9]\d{9,14}$/.test(number)) return null;
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
export const navigation: NavigationItem[] = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Trabalho", href: "#projetos" },
  { label: "Processo", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
];
export const hero = {
  label: "DOMÍNIO DIGITAL PARA GASTRONOMIA",
  physical: ["SEU RESTAURANTE", "JÁ TEM ENDEREÇO."],
  digital: ["FALTA CONSTRUIR", "O DIGITAL."],
  description:
    "Criamos sites, sistemas e estruturas digitais para restaurantes, bares e deliveries serem encontrados, apresentarem melhor a própria marca e transformarem pesquisa em pedido, reserva ou visita.",
  primaryCta: "Construir meu domínio",
  secondaryCta: "Ver nosso trabalho",
  visualCaption: "DO SEU DOMÍNIO ATÉ A PRÓXIMA MESA.",
  channels: ["GOOGLE", "INSTAGRAM", "WHATSAPP", "IFOOD", "MAPS", "CARDÁPIO"],
  sectors: [
    "RESTAURANTES",
    "BARES",
    "CAFETERIAS",
    "HAMBURGUERIAS",
    "PIZZARIAS",
    "DELIVERIES",
  ],
};
export const thesis = {
  label: "01 · MANIFESTO",
  title: [
    "NÃO VENDEMOS",
    "“UM SITE”.",
    "CONSTRUÍMOS",
    "O SEU ESPAÇO",
    "NA INTERNET.",
  ],
  investment: "Você investiu em ponto, fachada, cozinha, equipe e experiência.",
  question:
    "Mas quando alguém procura seu restaurante no Google, o que encontra?",
  fragments: [
    "Um perfil.",
    "Um link.",
    "Um cardápio perdido.",
    "Um Instagram.",
  ],
  description:
    "A Guarda-Chuva transforma essas peças soltas em uma estrutura digital que pertence ao seu negócio.",
  signature: ["Rede social é canal.", "Domínio é patrimônio."],
};
export const land = {
  label: "02 · DOMÍNIO",
  title: ["TODO NEGÓCIO", "PRECISA DE UM LUGAR", "PARA CHAMAR DE SEU."],
  intro: "No mundo físico, você escolhe onde abrir. No digital, também.",
  description:
    "Seu domínio é o endereço onde sua marca deixa de depender exclusivamente de plataformas de terceiros e começa a construir uma presença própria.",
  physical: [
    "Endereço",
    "Fachada",
    "Cardápio",
    "Atendimento",
    "Movimento",
    "Reputação",
  ],
  digital: [
    "Domínio",
    "Página inicial",
    "Conteúdo",
    "Conversão",
    "Tráfego",
    "Autoridade",
  ],
  signature: "O terreno é seu. O que construímos nele também.",
  note: "Domínio próprio pede registro e renovação. Autoridade se constrói com conteúdo, relevância e uma boa experiência.",
};
export const problem = {
  title: ["QUANDO ALGUÉM", "PROCURA SEU RESTAURANTE,", "O QUE ENCONTRA?"],
  items: [
    "Instagram como página principal.",
    "Cardápio em um PDF pesado.",
    "Link quebrado na bio.",
    "Informações diferentes no Google.",
    "WhatsApp recebendo a mesma pergunta todos os dias.",
    "Marketplace controlando toda a venda digital.",
  ],
  conclusion: ["Isso não é um ecossistema.", "São ferramentas soltas."],
  answer: ["A GUARDA-CHUVA", "COLOCA TUDO SOB", "A MESMA ESTRUTURA."],
};
export const solutions = {
  label: "03 · O QUE CONSTRUÍMOS",
  title: ["UMA ESTRUTURA.", "VÁRIAS FORMAS", "DE VENDER."],
  description:
    "Do primeiro resultado no Google ao cliente que volta. Construímos o caminho inteiro.",
  journey: [
    "SER ENCONTRADO",
    "SER ESCOLHIDO",
    "CONVERTER",
    "VENDER",
    "RETORNAR",
  ],
};
export const services: Service[] = [
  {
    id: "site",
    number: "01",
    label: "SITE",
    title: "Seu endereço digital.",
    lines: ["SEU ENDEREÇO", "DIGITAL."],
    description:
      "Um site próprio para apresentar sua marca, localização, horários, cardápio e diferenciais — rápido o bastante para quem está escolhendo onde comer agora.",
    capabilities: [
      "SEO local",
      "Google",
      "Performance",
      "Mobile first",
      "Analytics",
    ],
    outcome: "Da pesquisa à visita.",
  },
  {
    id: "cardapio",
    number: "02",
    label: "CARDÁPIO",
    title: "Cardápio feito para dar vontade.",
    lines: ["CARDÁPIO FEITO", "PARA DAR VONTADE."],
    description:
      "Não esconda o principal produto do restaurante dentro de um PDF. Criamos uma experiência rápida, organizada e feita primeiro para o celular.",
    capabilities: ["Categorias", "Fotos", "Preços", "QR Code", "Atualização"],
    outcome: "Facilite a escolha.",
  },
  {
    id: "delivery",
    number: "03",
    label: "DELIVERY",
    title: "Marketplace é canal. Não precisa ser a sua casa.",
    lines: ["MARKETPLACE É CANAL.", "NÃO PRECISA SER", "A SUA CASA."],
    description:
      "Criamos caminhos para o cliente também comprar diretamente da sua marca e ajudamos o negócio a reduzir a dependência de um único canal.",
    capabilities: [
      "Pedido",
      "Pagamento",
      "WhatsApp",
      "Catálogo",
      "Integrações",
    ],
    outcome: "Um caminho direto.",
  },
  {
    id: "reservas",
    number: "04",
    label: "RESERVAS",
    title: "Menos mensagens. Mais mesas organizadas.",
    lines: ["MENOS MENSAGENS.", "MAIS MESAS ORGANIZADAS."],
    description:
      "Fluxos digitais para transformar disponibilidade, reservas e informações em um processo mais organizado para cliente e equipe.",
    capabilities: ["Disponibilidade", "Confirmação", "Atendimento"],
    outcome: "Receba com organização.",
  },
  {
    id: "sistemas",
    number: "05",
    label: "SISTEMAS",
    title:
      "Quando a planilha vira o problema, a gente constrói o próximo passo.",
    lines: [
      "QUANDO A PLANILHA",
      "VIRA O PROBLEMA,",
      "CONSTRUÍMOS O PRÓXIMO PASSO.",
    ],
    description:
      "Financeiro, estoque, reservas, clientes, indicadores e operação podem deixar de viver em lugares diferentes.",
    capabilities: [
      "Financeiro",
      "Estoque",
      "Clientes",
      "Indicadores",
      "Operação",
    ],
    outcome: "Enxergue a operação.",
  },
  {
    id: "automacoes",
    number: "06",
    label: "AUTOMAÇÃO",
    title: "Se a equipe faz todo dia, talvez o sistema possa fazer.",
    lines: ["SE A EQUIPE FAZ", "TODO DIA,", "TALVEZ O SISTEMA", "POSSA FAZER."],
    description:
      "Integramos processos e ferramentas para eliminar parte do trabalho repetitivo da operação.",
    capabilities: ["Integrações", "Dados conectados", "Rotinas automáticas"],
    outcome: "Devolva tempo à equipe.",
  },
];
export const ecosystem = {
  label: "04 · ECOSSISTEMA",
  title: [
    "NÃO É MAIS UM LINK",
    "NA SUA BIO.",
    "É O CENTRO DA",
    "OPERAÇÃO DIGITAL.",
  ],
  description:
    "Os canais trazem gente. Seu domínio organiza a chegada e oferece o próximo passo.",
  channels: ["GOOGLE", "INSTAGRAM", "MAPS", "IFOOD", "WHATSAPP"],
  destinations: ["CARDÁPIO", "RESERVA", "DELIVERY"],
};
export const work = {
  label: "05 · TRABALHO",
  title: ["MENOS PROMESSA.", "MAIS TRABALHO", "À VISTA."],
  description:
    "Começamos pelo nosso próprio endereço. Você já está usando o que construímos.",
  note: "Projeto próprio. Sem métricas comerciais atribuídas e sem clientes fictícios.",
};
export const projects: Project[] = [
  {
    id: "guarda-chuva",
    title: "GUARDA-CHUVA",
    segment: "GASTRONOMIA / ESTÚDIO DIGITAL",
    type: "PROJETO PRÓPRIO · ESTE SITE",
    problem:
      "Explicar como site, canais e operação podem funcionar no mesmo endereço.",
    solution:
      "Estratégia de conteúdo, design, desenvolvimento e contato direto. Uma experiência feita para o celular, com navegação acessível e animação a serviço da mensagem.",
    image: "/assets/project-guarda.webp",
    imageAlt:
      "Captura real da página da Guarda-Chuva, com a headline Seu restaurante já tem endereço e a composição de domínio digital",
    href: "#inicio",
    linkLabel: "Explorar este site",
    capabilities: [
      "Design & desenvolvimento",
      "Experiência mobile",
      "SEO técnico",
      "WhatsApp",
    ],
  },
];
export const principle = {
  title: [
    "A MELHOR TECNOLOGIA",
    "PARA UM RESTAURANTE",
    "É A QUE AJUDA",
    "O RESTAURANTE",
    "A FUNCIONAR MELHOR.",
  ],
  statements: [
    "Se precisa ser um site, fazemos um site.",
    "Se precisa ser um sistema, construímos um sistema.",
    "Se basta melhorar um processo, não vamos tentar te vender dez ferramentas.",
  ],
};
export const processIntro = {
  label: "06 · COMO FUNCIONA",
  title: ["DO PROBLEMA", "AO AR.", "SEM MISTÉRIO."],
  description:
    "Você conhece a sua casa. Nós organizamos o caminho para ela funcionar melhor no digital.",
};
export const process = [
  {
    number: "01",
    title: "CONVERSA",
    description:
      "Entendemos como o seu negócio funciona antes de sugerir qualquer tela.",
    detail: "Primeiro, ouvir.",
  },
  {
    number: "02",
    title: "DIAGNÓSTICO",
    description:
      "Mapeamos onde o digital está ajudando e onde está atrapalhando.",
    detail: "Encontrar o que trava.",
  },
  {
    number: "03",
    title: "DIREÇÃO",
    description: "Definimos o que realmente vale construir agora.",
    detail: "Escolher o próximo passo.",
  },
  {
    number: "04",
    title: "DESIGN",
    description:
      "Desenhamos a experiência antes de transformar tudo em código.",
    detail: "Dar forma à solução.",
  },
  {
    number: "05",
    title: "DESENVOLVIMENTO",
    description:
      "Construímos, testamos e colocamos o projeto para funcionar em situações reais.",
    detail: "Fazer funcionar.",
  },
  {
    number: "06",
    title: "PUBLICAÇÃO",
    description: "Seu domínio entra no ar pronto para receber gente.",
    detail: "Abrir as portas.",
  },
  {
    number: "07",
    title: "EVOLUÇÃO",
    description: "Se o negócio crescer, a estrutura pode crescer junto.",
    detail: "Preparar o que vem depois.",
  },
];
export const ownership = {
  title: [
    "VOCÊ PODE CRESCER",
    "NO INSTAGRAM.",
    "PODE VENDER PELO IFOOD.",
    "PODE ATENDER",
    "PELO WHATSAPP.",
  ],
  conclusion: ["MAS A BASE", "PRECISA SER SUA."],
  description:
    "Não queremos substituir os canais que já funcionam. Queremos conectá-los a algo que pertence à sua marca.",
  channels: ["INSTAGRAM", "GOOGLE", "IFOOD", "WHATSAPP"],
};
export const difference = {
  label: "07 · GUARDA-CHUVA",
  title: ["FEITO PARA", "O SEU NEGÓCIO.", "NÃO PARA", "QUALQUER NEGÓCIO."],
  items: [
    {
      title: "NADA DE TEMPLATE",
      description:
        "Seu restaurante não tem a mesma identidade do restaurante ao lado. O site também não deveria ter.",
    },
    {
      title: "MOBILE PRIMEIRO",
      description:
        "A decisão de onde comer acontece muitas vezes com um celular na mão.",
    },
    {
      title: "SEM TECNOLOGIA À TOA",
      description:
        "Se uma ferramenta não resolve um problema real, ela não entra no projeto.",
    },
    {
      title: "PREPARADO PARA CRESCER",
      description:
        "Começamos pelo que faz sentido hoje sem construir algo que limite amanhã.",
    },
    {
      title: "CONTATO DIRETO",
      description: "Você fala com quem está construindo.",
    },
  ],
};
export const technology = {
  label: "08 · POR BAIXO",
  title: ["TECNOLOGIA É IMPORTANTE.", "MAS ELA NÃO É O PRODUTO."],
  description:
    "Escolhemos as ferramentas de acordo com o projeto, não de acordo com a moda da semana.",
  note: "Neste site, usamos:",
  stack: ["React", "TypeScript", "Vite", "GSAP", "Lenis"],
};
export const proof = {
  title: ["PODE OLHAR", "DE PERTO."],
  description:
    "A estrutura começa aqui: informações organizadas, leitura no celular e um caminho direto para conversar.",
  links: [
    {
      label: "Veja o que construímos",
      href: "#solucoes",
      detail: "Serviços sem rodeio.",
    },
    {
      label: "Entenda as conexões",
      href: "#estrutura",
      detail: "Cada canal com uma função.",
    },
    {
      label: "Fale com a gente",
      href: "#contato",
      detail: "Do site para a conversa.",
    },
  ],
};
export const contact = {
  label: "09 · VAMOS CONVERSAR",
  cta: "Falar no WhatsApp",
  navigationCta: "Falar sobre meu negócio",
  title: [
    "CONTA COMO",
    "SEU RESTAURANTE",
    "FUNCIONA HOJE.",
    "A GENTE PENSA",
    "NO DIGITAL.",
  ],
  description:
    "Sem formulário de vinte perguntas. Fale direto conosco pelo WhatsApp e conte onde o seu negócio está travando.",
  microcopy: "Resposta direta. Sem vendedor no meio.",
  message:
    "Olá, Guarda-Chuva! Quero conversar sobre o domínio digital do meu restaurante.",
  formEndpoint: null as string | null,
};
export const footer = {
  headline: [
    "SEU NEGÓCIO JÁ TEM",
    "UM LUGAR NA CIDADE.",
    "VAMOS CONSTRUIR",
    "O LUGAR DELE",
    "NA INTERNET.",
  ],
  disciplines: ["REST.", "BAR.", "DELIVERY."],
  signature: "DOMÍNIO DIGITAL PARA GASTRONOMIA.",
};
export const socialLinks = [
  { label: "Instagram", href: brand.instagram },
  { label: "WhatsApp", href: getWhatsAppUrl() },
];
export const seo = {
  title: "Guarda-Chuva — Site para restaurante e domínio digital | BH",
  description:
    "Site para restaurante, bar e delivery em Belo Horizonte e no Brasil. Cardápio digital, reservas, sistemas e automações conectados ao domínio da sua marca.",
  imageAlt:
    "Guarda-Chuva: seu negócio, seu domínio. Domínio digital para gastronomia.",
};
