import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Navigation } from "./components/Navigation";
import { Arrow, BrandMark } from "./components/Icon";
import { DomainVisual, EcosystemVisual } from "./components/DomainVisual";
import {
  brand,
  hero,
  thesis,
  land,
  problem,
  solutions,
  services,
  ecosystem,
  work,
  projects,
  principle,
  processIntro,
  process,
  ownership,
  difference,
  technology,
  proof,
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
      {lines.map((line, i) => (
        <span className={`text-line ${i === blue ? "blue" : ""}`} key={line}>
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
function ConversationLink({
  label = contact.cta,
  className = "button button-primary",
  message = contact.message,
}: {
  label?: string;
  className?: string;
  message?: string;
}) {
  return (
    <a
      className={className}
      href={getWhatsAppUrl(message)!}
      target="_blank"
      rel="noreferrer"
    >
      <span>{label}</span>
      <Arrow diagonal />
    </a>
  );
}
function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-top micro">
        <span>
          GUARDA-CHUVA®
          <br />
          {hero.label}
        </span>
        <span>UM ENDEREÇO. TODAS AS CONEXÕES.</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="hero-physical">
              {hero.physical.map((line) => (
                <span className="hero-line" key={line}>
                  <span>{line}</span>
                </span>
              ))}
            </span>
            <span className="hero-digital">
              {hero.digital.map((line) => (
                <span className="hero-line" key={line}>
                  <span>{line}</span>
                </span>
              ))}
            </span>
          </h1>
          <div className="hero-description">
            <p>{hero.description}</p>
            <div className="hero-actions">
              <ConversationLink label={hero.primaryCta} />
              <a className="text-link hero-secondary" href="#projetos">
                {hero.secondaryCta}
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <DomainVisual />
      </div>
      <div className="hero-bottom micro">
        <span>BH — BRASIL</span>
        <span>RESTAURANTES / BARES / DELIVERY</span>
        <span>
          2026 <Arrow />
        </span>
      </div>
      <div className="hero-cut" aria-hidden="true" />
    </section>
  );
}
function Manifesto() {
  return (
    <section id="sobre" className="manifesto section-shell section-space">
      <SectionNote
        left={thesis.label}
        right="O SEU NEGÓCIO MERECE UM ENDEREÇO PRÓPRIO"
      />
      <div className="manifesto-grid">
        <Heading lines={thesis.title} blue={4} />
        <div className="manifesto-copy">
          <p className="lead">{thesis.investment}</p>
          <p>{thesis.question}</p>
          <div className="manifesto-fragments">
            {thesis.fragments.map((line, i) => (
              <span key={line}>
                <small>0{i + 1}</small>
                {line}
              </span>
            ))}
          </div>
          <p>{thesis.description}</p>
        </div>
      </div>
      <div className="manifesto-signature">
        {thesis.signature.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <span className="micro">SUA MARCA. SEU PONTO DE ENCONTRO.</span>
      </div>
    </section>
  );
}
function DigitalLand() {
  return (
    <section className="domain-land section-space">
      <div className="section-shell">
        <SectionNote
          left={land.label}
          right="DO PONTO FÍSICO AO ENDEREÇO DIGITAL"
        />
        <div className="land-v2-intro">
          <Heading lines={land.title} blue={2} />
          <div>
            <p className="lead">{land.intro}</p>
            <p>{land.description}</p>
          </div>
        </div>
        <div className="land-v2-grid">
          <div className="site-plan" aria-hidden="true">
            <span className="micro plan-coordinate">19°55′ S / 43°56′ W</span>
            <svg viewBox="0 0 600 420" fill="none">
              <path
                className="plan-street"
                d="M0 100H600M0 340H600M100 0V420M500 0V420"
              />
              <path className="plan-outline" d="M145 145H445V295H145Z" />
              <path
                className="plan-route"
                d="M0 220H145M445 220H600M295 0V145M295 295V420"
              />
              <path d="M140 135v20m-10-10h20M440 135v20m-10-10h20M140 285v20m-10-10h20M440 285v20m-10-10h20" />
            </svg>
            <div className="plot-label">
              <BrandMark />
              <span>SEU LUGAR.</span>
              <small>NO MAPA. NA INTERNET.</small>
            </div>
            <span className="micro plan-key">UM LUGAR PARA CONSTRUIR.</span>
          </div>
          <div className="land-comparison">
            <div className="land-comparison-header micro">
              <span>MUNDO FÍSICO</span>
              <span>DIGITAL</span>
            </div>
            {land.physical.map((item, i) => (
              <div className="land-step" key={item}>
                <span>{item}</span>
                <Arrow />
                <strong>{land.digital[i]}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="land-bottom">
          <p>{land.signature}</p>
          <small>{land.note}</small>
        </div>
      </div>
    </section>
  );
}
function Diagnosis() {
  return (
    <section className="diagnosis section-shell section-space">
      <div className="diagnosis-grid">
        <Heading lines={problem.title} />
        <div className="fragment-list">
          {problem.items.map((item, i) => (
            <div className="fragment" key={item}>
              <span className="micro">0{i + 1}</span>
              <span>{item}</span>
              <i aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
      <div className="diagnosis-answer">
        <p>
          {problem.conclusion.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <Heading lines={problem.answer} blue={2} />
      </div>
    </section>
  );
}
function Solutions() {
  const [active, setActive] = useState<string | null>("site");
  useEffect(() => {
    window.dispatchEvent(new Event("guarda:layout"));
  }, [active]);
  return (
    <section
      id="solucoes"
      className="solutions solutions-v2 section-shell section-space"
    >
      <SectionNote
        left={solutions.label}
        right="DA DESCOBERTA AO PRÓXIMO PEDIDO"
      />
      <div className="heading-row">
        <Heading lines={solutions.title} blue={2} />
        <p>{solutions.description}</p>
      </div>
      <ol className="conversion-path">
        {solutions.journey.map((step, i) => (
          <li key={step}>
            <span className="micro">0{i + 1}</span>
            {step}
            {i < 4 && <Arrow />}
          </li>
        ))}
      </ol>
      <div className="service-list">
        {services.map((service) => (
          <article
            className={`service-row ${active === service.id ? "service-open" : ""}`}
            key={service.id}
          >
            <h3 className="service-heading">
              <button
                className="service-trigger"
                onClick={() =>
                  setActive(active === service.id ? null : service.id)
                }
                aria-expanded={active === service.id}
                aria-controls={`service-${service.id}`}
              >
                <span className="service-identity micro">
                  <span>{service.number}</span>
                  {service.label}
                </span>
                <span className="service-label">
                  {service.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
                <span className="service-plus" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="service-content"
              id={`service-${service.id}`}
              hidden={active !== service.id}
            >
              <p className="service-outcome">{service.outcome}</p>
              <div>
                <p>{service.description}</p>
                <ul className="service-capabilities">
                  {service.capabilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ConversationLink
                  className="text-link"
                  label={`Conversar sobre ${service.label.toLowerCase()}`}
                  message={`Olá, Guarda-Chuva! Quero conversar sobre ${service.label.toLowerCase()} para o meu negócio gastronômico.`}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Ecosystem() {
  return (
    <section id="estrutura" className="ecosystem ecosystem-v2 section-space">
      <div className="section-shell">
        <SectionNote
          left={ecosystem.label}
          right="CANAIS → DOMÍNIO → CLIENTE"
        />
        <div className="heading-row">
          <Heading lines={ecosystem.title} blue={3} />
          <p>{ecosystem.description}</p>
        </div>
        <EcosystemVisual />
        <div className="ecosystem-footer micro">
          <span>DESCOBERTA. ESCOLHA. PEDIDO. RETORNO.</span>
          <span>TUDO LEVA À SUA MARCA.</span>
        </div>
      </div>
    </section>
  );
}
function Work() {
  return (
    <section id="projetos" className="work section-shell section-space">
      <SectionNote
        left={work.label}
        right="ESTRATÉGIA + DESIGN + DESENVOLVIMENTO"
      />
      <div className="heading-row">
        <Heading lines={work.title} blue={2} />
        <p>{work.description}</p>
      </div>
      {projects.map((project) => (
        <article className="work-case" key={project.id}>
          <a
            className="work-visual"
            href={project.href}
            title={project.linkLabel}
            data-reveal="image"
          >
            <div className="work-browser micro">
              <span>GUARDA-CHUVA®</span>
              <span>UM PROJETO PRÓPRIO</span>
              <Arrow diagonal />
            </div>
            <img
              src={project.image}
              width="1440"
              height="900"
              alt={project.imageAlt}
              loading="lazy"
              decoding="async"
            />
            <span className="work-image-caption micro">
              CAPTURA DA IMPLEMENTAÇÃO / WEB & MOBILE
            </span>
          </a>
          <div className="work-description">
            <div className="work-name">
              <span className="micro">{project.type}</span>
              <h3>{project.title}</h3>
              <span className="micro">{project.segment}</span>
            </div>
            <dl>
              <div>
                <dt>O PROBLEMA</dt>
                <dd>{project.problem}</dd>
              </div>
              <div>
                <dt>O QUE CONSTRUÍMOS</dt>
                <dd>{project.solution}</dd>
              </div>
            </dl>
            <div className="work-links">
              <a className="text-link" href={project.href}>
                {project.linkLabel}
                <Arrow diagonal />
              </a>
              <p>{work.note}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
function Principle() {
  return (
    <section className="principle section-space" data-theme="blue">
      <div className="section-shell">
        <SectionNote
          left="TECNOLOGIA COM FUNÇÃO"
          right="A OPERAÇÃO VEM PRIMEIRO"
        />
        <Heading lines={principle.title} />
        <div className="principle-statements">
          {principle.statements.map((line, i) => (
            <p key={line}>
              <span className="micro">0{i + 1}</span>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
function Process() {
  return (
    <section
      id="processo"
      className="process process-v2 section-shell section-space"
    >
      <SectionNote
        left={processIntro.label}
        right="DO PRIMEIRO CONTATO À PRÓXIMA FASE"
      />
      <div className="process-grid">
        <div className="process-title">
          <Heading lines={processIntro.title} blue={1} />
          <p>{processIntro.description}</p>
          <div className="process-meter" aria-hidden="true">
            <div>
              <span />
            </div>
            <span className="micro">DO PROBLEMA AO AR</span>
            <strong className="process-readout">01 / CONVERSA</strong>
          </div>
          <ConversationLink
            className="text-link"
            label="Vamos começar pela conversa"
          />
        </div>
        <ol className="process-list">
          {process.map((step) => (
            <li key={step.number} data-step={step.number}>
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
    <section className="base-section section-space">
      <div className="base-stage section-shell">
        <div className="base-copy">
          <Heading lines={ownership.title} className="base-context" />
          <Heading
            lines={ownership.conclusion}
            className="base-conclusion"
            blue={1}
          />
          <p>{ownership.description}</p>
        </div>
        <div
          className="base-map"
          aria-label="Instagram, Google, iFood e WhatsApp conectados ao seu domínio e à sua marca"
        >
          <div className="base-channels">
            {ownership.channels.map((item, i) => (
              <div className="base-word" key={item}>
                <span className="micro">0{i + 1}</span>
                {item}
                <Arrow />
              </div>
            ))}
          </div>
          <div className="base-domain">
            <BrandMark />
            <span>SEU DOMÍNIO</span>
            <i />
          </div>
          <div className="base-brand">
            <span className="micro">O PONTO DE ENCONTRO</span>
            <strong>SUA MARCA.</strong>
            <Arrow />
          </div>
        </div>
      </div>
    </section>
  );
}
function Difference() {
  return (
    <section className="difference section-shell section-space">
      <SectionNote left={difference.label} right="O QUE ORIENTA CADA DECISÃO" />
      <div className="difference-grid">
        <Heading lines={difference.title} blue={1} />
        <div className="difference-list">
          {difference.items.map((item, i) => (
            <article key={item.title}>
              <span className="micro">0{i + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Technology() {
  return (
    <section className="technology section-shell section-space">
      <SectionNote
        left={technology.label}
        right="FERRAMENTAS A SERVIÇO DO NEGÓCIO"
      />
      <div className="technology-grid">
        <Heading lines={technology.title} />
        <div>
          <p>{technology.description}</p>
          <span className="micro">{technology.note}</span>
          <ul>
            {technology.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
function Proof() {
  return (
    <section className="proof section-shell">
      <Heading lines={proof.title} blue={1} />
      <div>
        <p>{proof.description}</p>
        <nav aria-label="Explore o trabalho em funcionamento">
          {proof.links.map((link, i) => (
            <a href={link.href} key={link.label}>
              <span className="micro">0{i + 1}</span>
              <div>
                <strong>{link.label}</strong>
                <span>{link.detail}</span>
              </div>
              <Arrow diagonal />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
function Contact() {
  return (
    <section id="contato" className="contact contact-v2 section-space">
      <div className="section-shell">
        <SectionNote left={contact.label} right="BH → BRASIL" />
        <div className="contact-main">
          <Heading lines={contact.title} blue={4} />
          <div className="contact-orbit" aria-hidden="true">
            <svg viewBox="0 0 400 400" fill="none">
              <path d="M20 200H380M200 20V380M55 55L345 345M55 345L345 55" />
              <circle cx="200" cy="200" r="140" />
              <circle cx="200" cy="200" r="70" />
            </svg>
            <BrandMark />
            <span className="micro">COMEÇA COM UMA CONVERSA.</span>
          </div>
        </div>
        <div className="contact-bottom">
          <div>
            <p>{contact.description}</p>
            <small>{contact.microcopy}</small>
          </div>
          <ConversationLink className="button button-primary contact-button" />
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer footer-v2 section-shell">
      <div className="footer-top">
        <a
          className="wordmark"
          href="#inicio"
          aria-label="Guarda- Chuva® — início"
        >
          <BrandMark />
          <span>
            guarda-
            <br />
            chuva<sup>®</sup>
          </span>
        </a>
        <span className="micro">{footer.signature}</span>
        <span className="micro">
          {brand.location}
          <br />
          {brand.country}
        </span>
      </div>
      <div className="footer-main">
        <p className="footer-statement">
          {footer.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <nav aria-label="Navegação do rodapé">
          {navigation
            .filter((item) => item.href !== "#sobre")
            .map((item) => (
              <a className="text-link" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          {socialLinks
            .filter((item) => item.href)
            .map((item) => (
              <a
                className="text-link"
                href={item.href!}
                key={item.label}
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
        <span>© {new Date().getFullYear()} GUARDA-CHUVA®</span>
        <span>{footer.disciplines.join(" / ")}</span>
        <a href="#inicio">VOLTAR AO INÍCIO ↑</a>
      </div>
    </footer>
  );
}
const EditorialMotion = lazy(() => import("./components/EditorialMotion"));
export default function App() {
  const scope = useRef<HTMLDivElement>(null);
  return (
    <div ref={scope} className="site-evolution">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Navigation />
      <main id="conteudo">
        <Hero />
        <Manifesto />
        <DigitalLand />
        <Diagnosis />
        <Solutions />
        <Ecosystem />
        <Work />
        <Principle />
        <Process />
        <Ownership />
        <Difference />
        <Technology />
        <Proof />
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
