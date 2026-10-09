export { services } from "./services";
export { projects } from "./projects";
export const brand = {
  name: "guarda-chuva",
  displayName: "Guarda-Chuva",
  descriptor: "Sites, sistemas e lojas virtuais sob medida",
  location: "Belo Horizonte — MG",
  city: "Belo Horizonte",
  country: "Brasil",
  whatsapp: "5531994649759",
  email: null as string | null,
  instagram: null as string | null,
  canonicalUrl: null as string | null,
};
export function getWhatsAppUrl(message?: string) {
  return `https://wa.me/${brand.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
export const navigation = [
  { label: "Trabalho", href: "#trabalho" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];
export const contact = {
  cta: "Falar no WhatsApp",
  message:
    "Olá, Guarda-Chuva! Quero conversar sobre um site, sistema ou loja virtual para o meu negócio.",
  formEndpoint: null as string | null,
  title: "O próximo projeto",
  accent: "pode ser o seu.",
  description:
    "Conte o que você precisa construir. A conversa começa pelo seu negócio, não pela tecnologia.",
  note: "Contato direto. Sem formulário, sem intermediário.",
};
export const hero = {
  eyebrow: "DESIGN + DESENVOLVIMENTO",
  lines: ["Sites, sistemas", "e lojas virtuais"],
  accent: "sob medida.",
  description:
    "Criamos sites, sistemas e lojas virtuais para empresas que precisam vender, organizar e crescer no digital. Nada de template pronto.",
  secondaryCta: "Ver trabalho",
  footer: ["DO PRIMEIRO PIXEL AO PRODUTO NO AR.", "BH — BRASIL"],
};
export const about = {
  label: "01 · SOBRE",
  headline: "A Guarda-Chuva não trabalha com projeto enlatado.",
  paragraphs: [
    "Cada site, sistema ou loja é construído de acordo com o negócio que vai usar aquilo todos os dias.",
    "O que precisa ser simples, continua simples. O que precisa escalar, nasce preparado para crescer.",
    "Não queremos que tecnologia pareça complicada. Nosso trabalho é entender o problema, construir a solução e colocar para funcionar.",
  ],
  indicators: [
    { value: "05", label: "FRENTES DE TRABALHO" },
    { value: "01", label: "CONVERSA PARA COMEÇAR" },
    { value: "WEB", label: "DESIGN + ENGENHARIA" },
    { value: "BR", label: "ATENDIMENTO NACIONAL" },
  ],
};
export const servicesIntro = {
  label: "02 · SERVIÇOS",
  title: "Cinco frentes.",
  accent: "Todas sob medida.",
  description:
    "Da primeira página à ferramenta que move a operação. Construímos o que o seu negócio precisa.",
};
export const work = {
  label: "03 · TRABALHO",
  title: "Projetos",
  accent: "que vendem.",
  description:
    "Site bonito é obrigação. O projeto também precisa fazer sentido para o negócio.",
  note: "Trabalho próprio, mostrado como ele é. Sem resultados ou clientes inventados.",
};
export const seo = {
  title: "Guarda-Chuva — Sites, sistemas e lojas virtuais sob medida",
  description:
    "Sites, sistemas, aplicativos, lojas virtuais e automações sob medida. Design e desenvolvimento em Belo Horizonte para empresas de todo o Brasil.",
  imageAlt: "Guarda-Chuva. Sites, sistemas e lojas virtuais sob medida.",
};
