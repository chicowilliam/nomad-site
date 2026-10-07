/** Conteúdo oficial. Contatos e domínio aguardam confirmação; nenhum case ou resultado é inventado. */
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
  type: "Conceito de aplicação" | "Projeto";
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
export const brand = {
  name: "guarda-chuva",
  displayName: "Guarda-Chuva",
  descriptor: "Domínio digital para gastronomia",
  signature: "Seu negócio. Seu domínio.",
  location: "Belo Horizonte — MG",
  city: "Belo Horizonte",
  country: "Brasil",
  locale: "pt-BR",
  editorialLocation: "BELO HORIZONTE → BRASIL",
  email: null as string | null,
  whatsapp: null as string | null,
  canonicalUrl: null as string | null,
  instagram: null as string | null,
  linkedin: null as string | null,
};
export function getWhatsAppUrl(message?: string) {
  if (!brand.whatsapp) return null;
  const value = brand.whatsapp.trim();
  let number = value;
  if (value.startsWith("https://")) {
    try {
      const url = new URL(value);
      if (url.hostname === "wa.me") number = url.pathname.slice(1);
      else if (url.hostname === "api.whatsapp.com")
        number = url.searchParams.get("phone") ?? "";
      else return null;
    } catch {
      return null;
    }
  }
  number = number.replace(/[\s()+.-]/g, "");
  if (!/^[1-9]\d{9,14}$/.test(number)) return null;
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
export const navigation: NavigationItem[] = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Projetos", href: "#projetos" },
  { label: "Como funciona", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];
export const hero = {
  label: "DOMÍNIO DIGITAL PARA GASTRONOMIA",
  physical: ["SEU RESTAURANTE", "JÁ TEM UM ENDEREÇO."],
  digital: ["AGORA ELE PRECISA", "DE UM NA INTERNET."],
  description:
    "Construímos sites, sistemas e estruturas digitais para restaurantes, bares e deliveries serem encontrados, venderem mais e dependerem menos de plataformas de terceiros.",
  primaryCta: "Quero construir meu domínio",
  secondaryCta: "Conhecer a Guarda-Chuva",
  visualCaption: "Todos os caminhos levam para o seu domínio.",
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
  rented: ["VOCÊ ALUGA ATENÇÃO", "NAS REDES."],
  owned: ["SEU DOMÍNIO", "É SEU."],
  changes: ["Instagram muda.", "O algoritmo muda.", "As plataformas mudam."],
  description:
    "É no seu domínio que sua marca constrói autoridade, aparece no Google, apresenta seu cardápio, recebe clientes e transforma interesse em pedido ou reserva.",
  callout: "O melhor momento para construir seu espaço na internet foi ontem.",
  conclusion: "O segundo melhor é agora.",
};
export const land = {
  headline: ["TODA EMPRESA PRECISA", "DE UM TERRENO."],
  second: ["NO DIGITAL", "NÃO É DIFERENTE."],
  description:
    "No mundo físico, localização importa. Na internet também. Um domínio próprio, conteúdo relevante e uma estrutura bem construída tornam mais sólido o espaço digital da sua marca.",
  physical: ["TERRENO", "ENDEREÇO", "ESTRUTURA", "MOVIMENTO", "VALOR"],
  digital: ["DOMÍNIO", "SITE", "CONTEÚDO", "TRÁFEGO", "AUTORIDADE"],
};
export const problem = {
  title: ["SE O CLIENTE TE PROCURA,", "O QUE ELE ENCONTRA?"],
  items: [
    "Instagram desatualizado.",
    "Cardápio escondido em PDF.",
    "Google sem informação.",
    "WhatsApp sobrecarregado.",
    "Delivery só no marketplace.",
    "Nenhum lugar centralizando tudo.",
  ],
  conclusion: "Isso não é presença digital. São peças soltas.",
  answer: "A Guarda-Chuva conecta tudo.",
};
export const ecosystem = {
  title: ["TUDO SOB", "A MESMA ESTRUTURA."],
  description:
    "Cada canal tem um papel. O seu domínio dá um destino a todos eles.",
  channels: [
    "SITE",
    "CARDÁPIO",
    "GOOGLE",
    "DELIVERY",
    "RESERVAS",
    "WHATSAPP",
    "CRM",
    "AUTOMAÇÕES",
    "ANÁLISE",
  ],
};
export const services: Service[] = [
  {
    id: "site",
    number: "01",
    label: "SITE",
    title: "O ponto de partida do seu domínio digital.",
    description:
      "Sites rápidos, personalizados e preparados para transformar pesquisa em visita, pedido ou reserva.",
    capabilities: [
      "Site para restaurante",
      "Descoberta local",
      "Experiência mobile",
    ],
    outcome: "Um endereço à altura da sua casa.",
  },
  {
    id: "cardapio",
    number: "02",
    label: "CARDÁPIO DIGITAL",
    title: "Seu cardápio não deveria ficar escondido.",
    description:
      "Uma experiência rápida e acessível pelo celular, Google, QR Code ou redes sociais. Da vontade de conhecer à vontade de pedir.",
    capabilities: ["Cardápio por categoria", "QR Code", "Atualização simples"],
    outcome: "Facilite a próxima escolha.",
  },
  {
    id: "delivery",
    number: "03",
    label: "DELIVERY",
    title: "Venda sem entregar sua relação com o cliente.",
    description:
      "Um canal próprio que complementa os marketplaces e reduz a dependência de uma única plataforma para vender.",
    capabilities: [
      "Canal direto",
      "Fluxo de pedidos",
      "Relacionamento com o cliente",
    ],
    outcome: "Mais caminhos para o seu pedido.",
  },
  {
    id: "reservas",
    number: "04",
    label: "RESERVAS",
    title: "Menos mensagens. Mais mesas ocupadas.",
    description:
      "Fluxos digitais que organizam reservas, dão clareza para o cliente e reduzem o trabalho manual da equipe.",
    capabilities: [
      "Disponibilidade",
      "Confirmação",
      "Organização do atendimento",
    ],
    outcome: "Receba melhor, desde o primeiro contato.",
  },
  {
    id: "sistemas",
    number: "05",
    label: "SISTEMAS",
    title: "Quando a planilha começa a limitar o negócio.",
    description:
      "Construímos o próximo passo: sistemas internos que organizam os dados e ajudam a enxergar a operação inteira.",
    capabilities: [
      "Financeiro & estoque",
      "CRM & reservas",
      "Dashboards & operação",
    ],
    outcome: "Uma operação mais organizada.",
  },
  {
    id: "automacoes",
    number: "06",
    label: "AUTOMAÇÕES",
    title: "O repetitivo não precisa continuar manual.",
    description:
      "Integrações e automações para conectar suas ferramentas, informações e processos. Sua equipe ganha tempo para cuidar da casa.",
    capabilities: [
      "Integrações",
      "Fluxos de atendimento",
      "Processos conectados",
    ],
    outcome: "Deixe o trabalho fluir.",
  },
];
export const journey = {
  title: ["UM BOM RESTAURANTE", "NÃO DEVERIA SER", "DIFÍCIL DE ENCONTRAR."],
  steps: ["ENCONTRAR", "CONHECER", "DESEJAR", "PEDIR", "VOLTAR"],
};
export const discovery = {
  title: ["QUANDO ALGUÉM PESQUISA,", "VOCÊ PRECISA ESTAR LÁ."],
  description:
    "As pessoas procuram onde comer antes mesmo de sair de casa. Construímos páginas estruturadas para ajudar seu negócio a ser entendido pelos mecanismos de busca e receber bem quem chega.",
  factors: [
    "Busca local",
    "SEO",
    "Performance",
    "Conteúdo",
    "Cardápio",
    "Informações",
  ],
  note: "Relevância se constrói com conteúdo, estrutura e uma boa experiência. Sem promessas de posição no Google.",
};
/** MESA é o conceito gastronômico já existente. Nenhum projeto entregue a cliente foi fornecido. */
export const projects: Project[] = [
  {
    id: "mesa",
    title: "MESA",
    segment: "Restaurante / Experiência digital",
    type: "Conceito de aplicação",
    summary: "Da primeira pesquisa à próxima reserva.",
    problem: "Informações dispersas e reservas perdidas entre mensagens.",
    solution:
      "Site, cardápio e reservas no mesmo endereço. Uma experiência pensada para a descoberta local e o celular.",
    objective: "Transformar o interesse pela casa em visitas e reservas.",
    capabilities: ["Site institucional", "Cardápio digital", "Reservas"],
  },
];
export const comparison = {
  before: [
    "Instagram como único canal.",
    "Cardápio espalhado.",
    "Dependência de marketplaces.",
    "Reservas no improviso.",
    "Pouca informação no Google.",
    "Processos manuais.",
  ],
  after: [
    "Domínio próprio.",
    "Marca centralizada.",
    "Cardápio acessível.",
    "Canal direto.",
    "Dados organizados.",
    "Processos conectados.",
  ],
};
export const process: ProcessStep[] = [
  {
    number: "01",
    title: "DIAGNÓSTICO",
    description:
      "Entendemos como as pessoas encontram, escolhem e compram do seu negócio hoje.",
    detail: "Primeiro, a realidade da sua operação.",
  },
  {
    number: "02",
    title: "ESTRUTURA",
    description: "Definimos o que realmente precisa existir.",
    detail: "Escopo claro. Sem ferramentas por hábito.",
  },
  {
    number: "03",
    title: "DESIGN",
    description:
      "Construímos uma experiência que representa o nível do seu estabelecimento.",
    detail: "Do primeiro olhar à próxima escolha.",
  },
  {
    number: "04",
    title: "DESENVOLVIMENTO",
    description:
      "Transformamos o projeto em um produto rápido, responsivo e preparado para produção.",
    detail: "Cada conexão é testada antes de entrar em operação.",
  },
  {
    number: "05",
    title: "LANÇAMENTO",
    description: "Colocamos sua estrutura digital no ar.",
    detail: "Seu endereço pronto para receber.",
  },
  {
    number: "06",
    title: "EVOLUÇÃO",
    description: "A estrutura cresce conforme o negócio cresce.",
    detail: "Uma base que permite o próximo passo.",
  },
];
export const ownership = {
  title: [
    "AS PLATAFORMAS",
    "PODEM TRAZER CLIENTES.",
    "MAS A MARCA",
    "PRECISA SER SUA.",
  ],
  platforms: [
    "Use Instagram.",
    "Use Google.",
    "Use marketplaces.",
    "Use WhatsApp.",
  ],
  description:
    "Mas faça todos eles trabalharem para construir algo que pertence ao seu negócio.",
  signature: ["SEU DOMÍNIO.", "SUA MARCA.", "SEUS CLIENTES."],
};
export const contact = {
  cta: "Construir meu domínio",
  navigationCta: "Construir meu espaço digital",
  title: [
    "SE O SEU RESTAURANTE",
    "JÁ EXISTE NO MUNDO REAL,",
    "ESTÁ NA HORA DE",
    "CONSTRUIR O DIGITAL.",
  ],
  description:
    "Conte para nós onde seu negócio está hoje. Nós mostramos o que ele pode se tornar no digital.",
  message:
    "Olá, Guarda-Chuva! Quero construir o domínio digital do meu negócio gastronômico.",
  formEndpoint: null as string | null,
};
export const footer = {
  headline: ["SEU NEGÓCIO.", "SEU DOMÍNIO."],
  disciplines: ["RESTAURANTES", "BARES", "DELIVERY", "DIGITAL"],
  signature: "Estratégia, design e tecnologia. À mesa com o seu negócio.",
};
export const socialLinks = [
  { label: "Instagram", href: brand.instagram },
  { label: "WhatsApp", href: getWhatsAppUrl() },
];
export const clientData = {
  clients: [] as { name: string; logo: string }[],
  testimonials: [] as {
    quote: string;
    name: string;
    role: string;
    company: string;
  }[],
};
export const seo = {
  title: "Guarda-Chuva — Sites e domínio digital para restaurantes",
  description:
    "Sites para restaurantes, bares e deliveries, cardápios digitais, reservas e sistemas. A Guarda-Chuva constrói seu domínio digital em Belo Horizonte e no Brasil.",
  imageAlt:
    "Guarda-Chuva. Seu negócio. Seu domínio. Soluções digitais para gastronomia.",
};
