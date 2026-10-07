import { lazy, Suspense, useRef, useState } from "react";
import { Navigation } from "./components/Navigation";
import { Arrow, BrandMark } from "./components/Icon";
import { ContactForm } from "./components/ContactForm";
import { ProjectVisual } from "./components/ProjectVisual";
import { DomainVisual, EcosystemVisual } from "./components/DomainVisual";
import {
  brand,
  hero,
  thesis,
  land,
  problem,
  ecosystem,
  services,
  journey,
  discovery,
  projects,
  comparison,
  process,
  ownership,
  contact,
  footer,
  navigation,
  socialLinks,
  getWhatsAppUrl,
} from "./data/site";

function Heading({
  lines,
  id,
  className = "",
  blue = -1,
}: {
  lines: string[];
  id?: string;
  className?: string;
  blue?: number;
}) {
  return (
    <h2 id={id} className={`display ${className}`} data-reveal="heading">
      {lines.map((line, index) => (
        <span
          className={`text-line ${index === blue ? "blue" : ""}`}
          key={line}
        >
          <span data-text-line>{line}</span>
        </span>
      ))}
    </h2>
  );
}
function SectionNote({ left, right }: { left: string; right?: string }) {
  return (
    <div className="section-note micro">
      <span>{left}</span>
      {right && <span>{right}</span>}
    </div>
  );
}
function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-top micro">
        <span>
          <i />
          {hero.label}
        </span>
        <span>INDEPENDÊNCIA COMEÇA COM UM ENDEREÇO.</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="hero-physical">
              <span>SEU RESTAURANTE</span>
              <span>JÁ TEM UM ENDEREÇO.</span>
            </span>
            <span className="hero-digital">
              <span>AGORA ELE PRECISA</span>
              <span>
                DE UM NA <em>INTERNET.</em>
              </span>
            </span>
          </h1>
          <div className="hero-description">
            <p>{hero.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contato">
                <span>{hero.primaryCta}</span>
                <Arrow diagonal />
              </a>
              <a className="text-link hero-secondary" href="#sobre">
                {hero.secondaryCta}
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <DomainVisual />
      </div>
      <div className="hero-bottom micro">
        <span>
          BELO HORIZONTE <Arrow /> BRASIL
        </span>
        <span>REST. &nbsp; BAR. &nbsp; DELIVERY. &nbsp; DIGITAL.</span>
        <a href="#sobre" aria-label="Continue para conhecer a Guarda-Chuva">
          <span>EXPLORE</span>
          <Arrow />
        </a>
      </div>
      <div className="hero-cut" aria-hidden="true" />
    </section>
  );
}
function Thesis() {
  return (
    <section id="sobre" className="thesis section-shell section-space">
      <div className="sector-strip micro">
        {hero.sectors.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <div className="thesis-grid">
        <div>
          <SectionNote left="UM ENDEREÇO PRÓPRIO MUDA TUDO" />
          <Heading lines={thesis.rented} className="thesis-muted" />
          <Heading lines={thesis.owned} className="thesis-owned" blue={1} />
        </div>
        <div className="thesis-copy">
          <span className="editorial-cross" aria-hidden="true">
            +
          </span>
          <p className="thesis-changes">
            {thesis.changes.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <p className="thesis-permanence">Seu domínio continua sendo seu.</p>
          <p>{thesis.description}</p>
          <div className="thesis-callout">
            <p>{thesis.callout}</p>
            <strong>{thesis.conclusion}</strong>
            <a className="text-link" href="#contato">
              Comece pelo seu endereço
              <Arrow diagonal />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
function DigitalLand() {
  return (
    <section className="land section-shell section-space">
      <div className="land-intro">
        <Heading lines={land.headline} />
        <div>
          <Heading lines={land.second} className="land-secondary" blue={0} />
          <p>{land.description}</p>
        </div>
      </div>
      <div className="land-map">
        <div className="land-plane" aria-hidden="true">
          <div className="land-lot lot-one" />
          <div className="land-lot lot-two" />
          <div className="land-lot lot-three" />
          <div className="land-lot lot-main">
            <span>
              SEU
              <br />
              ESPAÇO.
            </span>
          </div>
          <div className="land-coordinate">
            19°55′ S<br />
            43°56′ W
          </div>
          <span className="land-map-label micro">UM LUGAR PARA CONSTRUIR.</span>
        </div>
        <div className="land-comparison">
          <div className="land-comparison-header micro">
            <span>NO MUNDO FÍSICO</span>
            <span>NO MUNDO DIGITAL</span>
          </div>
          {land.physical.map((value, index) => (
            <div key={value} className="land-step">
              <span>{value}</span>
              <Arrow />
              <strong>{land.digital[index]}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Problem() {
  return (
    <section className="problem section-shell section-space">
      <SectionNote
        left="QUANDO A PRESENÇA VIRA RUÍDO"
        right="DA BUSCA À ESCOLHA"
      />
      <div className="problem-grid">
        <Heading lines={problem.title} />
        <div className="fragment-list">
          {problem.items.map((item, index) => (
            <div className="fragment" key={item}>
              <span className="micro">0{index + 1}</span>
              <span>{item}</span>
              <i aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
      <div className="problem-answer">
        <p>{problem.conclusion}</p>
        <span>
          {problem.answer}
          <Arrow diagonal />
        </span>
      </div>
    </section>
  );
}
function Ecosystem() {
  return (
    <section className="ecosystem section-shell section-space" id="estrutura">
      <div className="heading-row">
        <Heading lines={ecosystem.title} blue={1} />
        <p>{ecosystem.description}</p>
      </div>
      <EcosystemVisual />
      <div className="ecosystem-footer micro">
        <span>CANAIS CONECTADOS. MARCA CENTRALIZADA.</span>
        <span>O NEGÓCIO NO CENTRO.</span>
      </div>
    </section>
  );
}
function Solutions() {
  const [active, setActive] = useState<string | null>("site");
  return (
    <section id="solucoes" className="solutions section-shell section-space">
      <SectionNote
        left="SOLUÇÕES PARA A SUA CASA"
        right="DO PRIMEIRO CLIQUE AO PRÓXIMO PEDIDO"
      />
      <div className="heading-row">
        <Heading lines={["SEU DOMÍNIO.", "BEM ESTRUTURADO."]} blue={1} />
        <p>
          O que seu negócio precisa.
          <br />
          Tudo conversando entre si.
        </p>
      </div>
      <div className="service-list">
        {services.map((service) => (
          <article
            key={service.id}
            className={`service-row ${active === service.id ? "service-open" : ""}`}
          >
            <button
              className="service-trigger"
              aria-expanded={active === service.id}
              aria-controls={`service-${service.id}`}
              onClick={() =>
                setActive(active === service.id ? null : service.id)
              }
            >
              <span className="service-number micro">{service.number}</span>
              <span className="service-label">{service.label}</span>
              <span className="service-teaser">{service.outcome}</span>
              <span className="service-plus" aria-hidden="true" />
            </button>
            <div
              id={`service-${service.id}`}
              hidden={active !== service.id}
              className="service-content"
            >
              <h3>{service.title}</h3>
              <div>
                <p>{service.description}</p>
                <ul className="service-capabilities">
                  {service.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <a className="text-link" href="#contato">
                  Vamos construir
                  <Arrow diagonal />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Journey() {
  return (
    <section className="journey" aria-labelledby="journey-title">
      <div className="journey-stage section-shell">
        <SectionNote left="O CAMINHO ATÉ A SUA MESA" right="CADA ETAPA CONTA" />
        <Heading id="journey-title" lines={journey.title} blue={2} />
        <div className="journey-track" aria-label="A jornada do cliente">
          <div className="journey-line">
            <span />
          </div>
          {journey.steps.map((step, index) => (
            <div className="journey-step" key={step}>
              <span className="micro">0{index + 1}</span>
              <strong>{step}</strong>
              <i />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Discovery() {
  return (
    <section className="discovery section-shell section-space">
      <div className="search-composition" data-reveal="image">
        <span className="micro">A PRÓXIMA VISITA COMEÇA NA BUSCA</span>
        <div className="search-query">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="6" />
            <path d="m15 15 5 5" />
          </svg>
          <span>onde comer perto de mim</span>
          <span className="search-caret" />
        </div>
        <div className="search-result">
          <div className="search-result-top">
            <BrandMark />
            <div>
              <span>SEU RESTAURANTE</span>
              <small>Seu endereço na internet</small>
            </div>
            <Arrow diagonal />
          </div>
          <strong>
            Um lugar para conhecer.
            <br />
            Um motivo para voltar.
          </strong>
          <p>
            Cardápio, localização, horários e reservas. As informações que
            ajudam alguém a escolher sua casa.
          </p>
          <div className="search-shortcuts">
            <span>Cardápio</span>
            <span>Como chegar</span>
            <span>Reservar</span>
          </div>
        </div>
        <div className="search-ground">
          <span className="search-location" />
          <span className="micro">PRESENÇA LOCAL. ESTRUTURA PRÓPRIA.</span>
        </div>
        <small className="search-disclaimer">
          Composição ilustrativa. Não representa um resultado de busca real.
        </small>
      </div>
      <div className="discovery-copy">
        <Heading lines={discovery.title} />
        <p>{discovery.description}</p>
        <ul className="discovery-factors">
          {discovery.factors.map((factor, index) => (
            <li key={factor}>
              <span className="micro">0{index + 1}</span>
              {factor}
            </li>
          ))}
        </ul>
        <p className="discovery-note">{discovery.note}</p>
      </div>
    </section>
  );
}
function Projects() {
  const project = projects[0];
  return (
    <section id="projetos" className="projects section-shell section-space">
      <SectionNote
        left="DA IDEIA À ESTRUTURA"
        right="APLICAÇÃO / GASTRONOMIA"
      />
      <div className="heading-row">
        <Heading
          lines={["NÃO É SÓ PORTFÓLIO.", "É ESTRUTURA", "PARA FUNCIONAR."]}
          blue={2}
        />
        <p>
          Um conceito do acervo.
          <br />
          Uma possibilidade para o seu negócio.
        </p>
      </div>
      <article className="case-study">
        <div className="case-visual" data-reveal="image">
          <div className="case-caption micro">
            <span>{project.type}</span>
            <span>DESIGN + DESENVOLVIMENTO</span>
          </div>
          <ProjectVisual variant="mesa" />
        </div>
        <div className="case-description">
          <span className="micro">{project.segment}</span>
          <h3>
            {project.title}
            <Arrow diagonal />
          </h3>
          <p className="case-summary">{project.summary}</p>
          <dl>
            <div>
              <dt>O DESAFIO</dt>
              <dd>{project.problem}</dd>
            </div>
            <div>
              <dt>A ESTRUTURA</dt>
              <dd>{project.solution}</dd>
            </div>
          </dl>
          <details className="case-details">
            <summary>
              Conhecer o conceito
              <Arrow diagonal />
            </summary>
            <div>
              <span className="micro">OBJETIVO DO ESTUDO</span>
              <p>{project.objective}</p>
              <ul>
                {project.capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="case-disclaimer">
                Estudo demonstrativo do acervo. Não representa um cliente,
                projeto entregue ou resultado comercial.
              </p>
              <span className="micro">INTERFACE WEB / DESIGN RESPONSIVO</span>
            </div>
          </details>
        </div>
      </article>
    </section>
  );
}
function Comparison() {
  return (
    <section className="comparison section-shell section-space">
      <Heading lines={["DEPOIS DA", "GUARDA-CHUVA."]} blue={1} />
      <div className="comparison-grid">
        <div className="comparison-before">
          <span className="micro">ANTES / PEÇAS SOLTAS</span>
          <ul>
            {comparison.before.map((item) => (
              <li key={item}>
                <span aria-hidden="true">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="comparison-after">
          <span className="micro">DEPOIS / ESTRUTURA PRÓPRIA</span>
          <ul>
            {comparison.after.map((item) => (
              <li key={item}>
                <Arrow />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
function Process() {
  return (
    <section id="processo" className="process section-shell section-space">
      <SectionNote
        left="COMO ACONTECE"
        right="UM PROCESSO CLARO. DO INÍCIO À EVOLUÇÃO."
      />
      <div className="process-grid">
        <div className="process-title">
          <Heading
            lines={[
              "VOCÊ CUIDA",
              "DO RESTAURANTE.",
              "A GENTE CUIDA",
              "DO DIGITAL.",
            ]}
            blue={3}
          />
          <p>
            Uma boa estrutura começa com uma boa conversa. O resto tem método.
          </p>
          <a className="text-link" href="#contato">
            Vamos falar da sua casa
            <Arrow diagonal />
          </a>
        </div>
        <ol className="process-list">
          {process.map((step) => (
            <li key={step.number}>
              <span className="process-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span className="process-detail">{step.detail}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
function Ownership() {
  return (
    <section className="ownership section-space" data-theme="blue">
      <div className="section-shell">
        <SectionNote
          left="A REGRA É SIMPLES"
          right="NÃO CONSTRUA SÓ EM TERRENO ALHEIO"
        />
        <Heading lines={ownership.title} />
        <div className="ownership-bottom">
          <p>
            {ownership.platforms.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
          <p>{ownership.description}</p>
          <div>
            {ownership.signature.map((item) => (
              <strong key={item}>{item}</strong>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Contact() {
  const [expanded, setExpanded] = useState(false);
  const brief = useRef<HTMLDivElement>(null);
  const whatsapp = getWhatsAppUrl(contact.message);
  const openBrief = () => {
    setExpanded(true);
    setTimeout(() => {
      brief.current?.scrollIntoView({ behavior: "instant", block: "start" });
      brief.current
        ?.querySelector<HTMLInputElement>("input")
        ?.focus({ preventScroll: true });
    }, 30);
  };
  return (
    <section id="contato" className="contact section-shell section-space">
      <div className="contact-top micro">
        <span>PRONTO PARA RECEBER NOVOS CLIENTES?</span>
        <span>BELO HORIZONTE → BRASIL</span>
      </div>
      <div className="contact-main">
        <Heading lines={contact.title} blue={3} />
        <div className="contact-stamp" aria-hidden="true">
          <BrandMark />
          <span aria-hidden="true">
            SEU
            <br />
            LUGAR
            <br />É AQUI.
          </span>
        </div>
      </div>
      <div className="contact-bottom">
        <p>{contact.description}</p>
        {whatsapp ? (
          <a
            className="button button-primary contact-button"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <span>{contact.cta}</span>
            <Arrow diagonal />
          </a>
        ) : (
          <button
            className="button button-primary contact-button"
            onClick={openBrief}
            aria-expanded={expanded}
            aria-controls="briefing"
          >
            <span>{contact.cta}</span>
            <Arrow diagonal />
          </button>
        )}
      </div>
      <div className="briefing" id="briefing" ref={brief} hidden={!expanded}>
        <ContactForm />
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer section-shell">
      <div className="footer-top">
        <a
          className="wordmark"
          href="#inicio"
          aria-label={`${brand.displayName.replace("-", "- ")}® — início`}
        >
          <BrandMark />
          <span>
            guarda-
            <br />
            chuva<sup>®</sup>
          </span>
        </a>
        <span className="micro">
          {brand.location}
          <br />
          {brand.country}
        </span>
        <a href="#inicio" className="back-top" aria-label="Voltar ao início">
          <Arrow diagonal />
        </a>
      </div>
      <div className="footer-main">
        <p className="footer-statement">
          {footer.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <nav aria-label="Navegação do rodapé">
          {navigation
            .filter((item) =>
              ["Soluções", "Projetos", "Contato"].includes(item.label),
            )
            .map((item) => (
              <a className="text-link" key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          {socialLinks
            .filter((item) => item.href)
            .map((item) => (
              <a
                className="text-link"
                key={item.label}
                href={item.href!}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
                <Arrow diagonal />
              </a>
            ))}
        </nav>
      </div>
      <div className="footer-bottom micro">
        <span>© {new Date().getFullYear()} GUARDA-CHUVA</span>
        <span>{footer.disciplines.join(" / ")}</span>
        <span>SEU NEGÓCIO. SEU DOMÍNIO.</span>
      </div>
    </footer>
  );
}
const EditorialMotion = lazy(() => import("./components/EditorialMotion"));

export default function App() {
  const scope = useRef<HTMLDivElement>(null);
  return (
    <div ref={scope}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Navigation />
      <main id="conteudo">
        <Hero />
        <Thesis />
        <DigitalLand />
        <Problem />
        <Ecosystem />
        <Solutions />
        <Journey />
        <Discovery />
        <Projects />
        <Comparison />
        <Process />
        <Ownership />
        <Contact />
      </main>
      <Footer />
      <div className="scroll-progress" aria-hidden="true" />
      <Suspense fallback={null}>
        <EditorialMotion scope={scope} />
      </Suspense>
    </div>
  );
}
