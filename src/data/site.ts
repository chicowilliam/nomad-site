/**
 * Conteúdo editorial e dados públicos da Nomad.
 * TODO(clientData): substituir os estudos de conceito por trabalhos autorizados.
 * TODO(brand): confirmar domínio e canais oficiais antes da publicação.
 * Dados ausentes permanecem nulos; nenhum contato ou resultado foi inventado.
 */

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  capabilities: string[];
  outcome: string;
}

export interface Project {
  id: string;
  title: string;
  segment: string;
  type: "Conceito de aplicação";
  summary: string;
  problem: string;
  solution: string;
  objective: string;
  capabilities: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface Client {
  name: string;
  logo: string;
  url?: string;
}

export interface SocialLink {
  label: string;
  href: string | null;
}

export const brand = {
  name: "nomad",
  displayName: "Nomad",
  descriptor: "Engenharia digital",
  signature: "Estrutura para o próximo movimento.",
  location: "Belo Horizonte — MG",
  city: "Belo Horizonte",
  country: "Brasil",
  locale: "pt-BR",
  editorialLocation: "ESTÚDIO DIGITAL / BH — BRASIL",
  email: null as string | null,
  whatsapp: null as string | null,
  canonicalUrl: null as string | null,
  instagram: null as string | null,
  linkedin: null as string | null,
};

export const navigation: NavigationItem[] = [
  { label: "Projetos", href: "#projetos" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Processo", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: brand.instagram },
  { label: "LinkedIn", href: brand.linkedin },
  { label: "WhatsApp", href: brand.whatsapp },
];

export const hero = {
  eyebrow: brand.editorialLocation,
  intro: "Não construímos apenas sites.",
  headline: ["ESTRUTURA", "PARA ESCALAR."],
  description:
    "Sites, sistemas e experiências digitais para transformar atenção em vendas e operações manuais em processos escaláveis.",
  primaryCta: "Quero escalar meu negócio",
  secondaryCta: "Ver projetos",
  disciplines: ["SITES", "SYSTEMS", "AUTOMATION"],
  edition: "2026",
};

export const trust = {
  statement:
    "Projetado para negócios que não querem depender apenas de Instagram e WhatsApp.",
  sectors: [
    "RESTAURANTES",
    "VAREJO",
    "SERVIÇOS",
    "IMOBILIÁRIO",
    "PROFISSIONAIS",
  ],
};

export const manifesto = {
  eyebrow: "01 — O PRÓXIMO MOVIMENTO",
  headline: ["SE O NEGÓCIO", "CRESCE, A", "TECNOLOGIA", "CRESCE JUNTO."],
  problems: [
    "Planilhas quebram.",
    "Processos manuais consomem tempo.",
    "Leads se perdem.",
    "Sites lentos deixam dinheiro na mesa.",
  ],
  conclusion: "Transformamos esses gargalos em produto digital.",
  supporting:
    "Unimos estratégia, design e engenharia para construir uma operação que acompanha a ambição da sua empresa.",
};

export const services: Service[] = [
  {
    id: "presenca",
    number: "01",
    label: "PRESENÇA",
    title: "Sites & landing pages",
    description:
      "Posicionamento, SEO e experiência construídos para transformar visitantes em oportunidades.",
    capabilities: [
      "Sites institucionais",
      "Landing pages",
      "Experiência & SEO",
    ],
    outcome: "Seja encontrado. Seja escolhido.",
  },
  {
    id: "venda",
    number: "02",
    label: "VENDA",
    title: "E-commerce",
    description:
      "Uma operação digital pronta para vender enquanto sua equipe cuida do negócio.",
    capabilities: [
      "Lojas virtuais",
      "Catálogo & checkout",
      "Integração de pedidos",
    ],
    outcome: "Sua próxima venda pode acontecer agora.",
  },
  {
    id: "operacao",
    number: "03",
    label: "OPERAÇÃO",
    title: "Sistemas sob medida",
    description:
      "Substitua planilhas, tarefas repetitivas e processos fragmentados por uma operação centralizada.",
    capabilities: ["Sistemas internos", "Dashboards", "Gestão de operações"],
    outcome: "Menos abas. Mais controle.",
  },
  {
    id: "escala",
    number: "04",
    label: "ESCALA",
    title: "Automação & integrações",
    description:
      "Conecte ferramentas, dados e processos para crescer sem multiplicar trabalho manual.",
    capabilities: [
      "Automação de processos",
      "Integrações",
      "Fluxos de atendimento",
    ],
    outcome: "O trabalho flui. O negócio cresce.",
  },
];

export const systemStatement = {
  before: ["SEU NEGÓCIO NÃO", "PRECISA DE MAIS", "FERRAMENTAS."],
  after: ["PRECISA DE", "UM SISTEMA."],
  stages: ["SITE", "PROCESSO", "SISTEMA", "ESCALA"],
};

/** Conceitos demonstrativos; não representam clientes, entregas ou resultados reais. */
export const projects: Project[] = [
  {
    id: "diamond",
    title: "DIAMOND",
    segment: "E-commerce / Varejo",
    type: "Conceito de aplicação",
    summary:
      "Da vitrine física a uma operação que pode vender a qualquer hora.",
    problem: "Vendas limitadas ao horário da loja e ao atendimento manual.",
    solution:
      "Uma loja digital com catálogo editorial, compra direta e pedidos organizados.",
    objective:
      "Ampliar os canais de venda e dar autonomia ao cliente para comprar.",
    capabilities: ["E-commerce", "Direção de arte", "Experiência de compra"],
  },
  {
    id: "mesa",
    title: "MESA",
    segment: "Experiência / Gastronomia",
    type: "Conceito de aplicação",
    summary: "Da primeira pesquisa à próxima reserva.",
    problem:
      "Informações dispersas e pedidos de reserva perdidos entre mensagens.",
    solution:
      "Uma experiência que reúne cardápio, descoberta local e um caminho claro para reservar.",
    objective:
      "Transformar o interesse pelo restaurante em visitas e reservas.",
    capabilities: ["Site institucional", "Cardápio digital", "Reservas"],
  },
  {
    id: "axis",
    title: "AXIS",
    segment: "Sistemas / Operações",
    type: "Conceito de aplicação",
    summary: "Uma operação inteira. Um lugar para decidir.",
    problem:
      "Dados em planilhas, tarefas duplicadas e pouca visibilidade sobre a operação.",
    solution:
      "Um sistema centralizado para conectar tarefas, equipes e informações.",
    objective:
      "Reduzir retrabalho e tornar a operação mais clara e previsível.",
    capabilities: ["Sistema web", "Dashboard", "Automação"],
  },
];

export const positioning = {
  eyebrow: "05 — VALOR QUE PERMANECE",
  headline: ["O OBJETIVO NÃO É", "TER UM SITE.", "É TER UM ATIVO."],
  statements: [
    "Seu site deve atrair.",
    "Seu sistema deve organizar.",
    "Sua automação deve economizar.",
  ],
  conclusion:
    "Sua operação digital deve continuar funcionando mesmo quando você não está olhando.",
  indicators: ["ATRAIR", "CONVERTER", "AUTOMATIZAR", "ESCALAR"],
};

export const process: ProcessStep[] = [
  {
    number: "01",
    title: "DIAGNÓSTICO",
    description:
      "Entendemos onde seu negócio perde tempo, clientes ou dinheiro.",
    detail: "O ponto de partida é a operação real da sua empresa.",
  },
  {
    number: "02",
    title: "ESTRATÉGIA",
    description: "Definimos o produto digital que resolve esse gargalo.",
    detail: "Escopo claro, prioridades certas e uma direção em comum.",
  },
  {
    number: "03",
    title: "CONSTRUÇÃO",
    description:
      "Design, engenharia e integrações construídos como um único produto.",
    detail: "Você acompanha a evolução e participa das decisões que importam.",
  },
  {
    number: "04",
    title: "LANÇAMENTO",
    description: "Publicamos, medimos e refinamos.",
    detail: "Cada ponto de contato é preparado para a operação começar.",
  },
  {
    number: "05",
    title: "ESCALA",
    description:
      "A estrutura continua preparada para crescer junto com a empresa.",
    detail: "Novas necessidades encontram uma base pronta para evoluir.",
  },
];

export const clientData: { clients: Client[]; testimonials: Testimonial[] } = {
  // TODO(clientData): adicionar somente marcas com autorização de uso.
  clients: [],
  // TODO(clientData): adicionar depoimentos reais aprovados por seus autores.
  testimonials: [],
};

export const testimonialsCopy = {
  eyebrow: "07 — RELAÇÕES QUE CONSTROEM",
  headline: ["QUEM CRESCEU", "COM A GENTE."],
};

export const contact = {
  eyebrow: "SEU PRÓXIMO MOVIMENTO",
  headline: [
    "SE O PRÓXIMO NÍVEL",
    "DA SUA EMPRESA",
    "DEPENDE DE TECNOLOGIA,",
    "VAMOS CONSTRUÍ-LO.",
  ],
  cta: "Começar um projeto",
  navigationCta: "Falar sobre um projeto",
  description: "Conte o que hoje limita sua operação. Nós pensamos no resto.",
  formEndpoint: null as string | null,
};

export const footer = {
  headline: ["BUILD.", "SELL.", "AUTOMATE.", "SCALE."],
  signature: "Estratégia, design e engenharia. No mesmo sentido.",
};

export const seo = {
  title: "Nomad — Sites, sistemas e estrutura para escalar",
  description:
    "Estúdio de soluções digitais em Belo Horizonte. Desenvolvimento de sites, e-commerce, sistemas web e automação para vender mais e organizar sua operação.",
  imageAlt: "Nomad — Engenharia digital. Estrutura para escalar.",
};

export const siteData = {
  brand,
  navigation,
  socialLinks,
  hero,
  trust,
  manifesto,
  services,
  systemStatement,
  projects,
  positioning,
  process,
  clientData,
  testimonialsCopy,
  contact,
  footer,
  seo,
};
