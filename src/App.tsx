import { useEffect, useRef, useState } from "react";
import { Navigation } from "./components/Navigation";
import { Arrow, BrandMark } from "./components/Icon";
import { ProjectVisual } from "./components/ProjectVisual";
import { ContactForm } from "./components/ContactForm";
import { useEditorialMotion } from "./hooks/useEditorialMotion";
import {
  brand,
  hero,
  trust,
  manifesto,
  services,
  projects,
  positioning,
  process,
  clientData,
  contact,
  footer,
  navigation,
  socialLinks,
  type Project,
} from "./data/site";

function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-topline micro">
        <span>{hero.eyebrow}</span>
        <span className="hero-coordinate">19°55′ S / 43°56′ W</span>
      </div>
      <div className="hero-composition">
        <h1 id="hero-title">
          <span className="hero-intro">{hero.intro}</span>
          <span className="hero-line">ESTRUTURA</span>
          <span className="hero-line">PARA</span>
          <span className="hero-line">
            ESCALAR<span className="period">.</span>
          </span>
        </h1>
        <figure className="hero-art">
          <img
            src="/assets/structure.webp"
            srcSet="/assets/structure-small.webp 720w, /assets/structure.webp 1448w"
            sizes="(max-width: 700px) 100vw, 58vw"
            width="1448"
            height="1086"
            alt="Estrutura escultural de três peças metálicas interligadas, símbolo de uma operação conectada"
            fetchPriority="high"
          />
          <figcaption className="micro">
            <span>
              PARTES CONECTADAS.
              <br />
              POSSIBILIDADES EXPANDIDAS.
            </span>
            <span className="art-cross">+</span>
          </figcaption>
        </figure>
      </div>
      <div className="hero-bottom">
        <div className="hero-description">
          <p>{hero.description}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#contato">
              {hero.primaryCta}
              <Arrow diagonal />
            </a>
            <a className="underlined-link" href="#projetos">
              {hero.secondaryCta}
              <Arrow />
            </a>
          </div>
        </div>
        <div className="hero-index micro">
          <span>
            SITES
            <br />
            SYSTEMS
            <br />
            AUTOMATION
          </span>
          <span>
            INDEPENDENT STUDIO
            <br />© {hero.edition}
          </span>
        </div>
      </div>
      <div className="hero-endline" aria-hidden="true">
        <span>ENGENHARIA DIGITAL, SEM LIMITES ARTIFICIAIS.</span>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0 80H620L705 8H1440" />
        </svg>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section
      className="trust-section section-shell"
      aria-label="Para quem construímos"
    >
      <div className="trust-intro">
        <BrandMark />
        <p>{trust.statement}</p>
        <span className="micro">
          O SEU NEGÓCIO.
          <br />A PRÓXIMA ESTRUTURA.
        </span>
      </div>
      <div className="sectors">
        {trust.sectors.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </section>
  );
}

const flowSteps = [
  "Novo pedido recebido",
  "Pagamento confirmado",
  "Estoque atualizado",
  "Entrega programada",
];
function OperationDemo() {
  const [step, setStep] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const running = step >= 0 && step < 4;
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  function simulate() {
    timers.current.forEach(clearTimeout);
    setStep(0);
    for (let i = 1; i <= 4; i++)
      timers.current.push(setTimeout(() => setStep(i), i * 650));
  }
  return (
    <div className="operation-demo" data-reveal="mask">
      <div className="operation-rails" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="operation-head micro">
        <span>OPERAÇÃO CONECTADA</span>
        <span>DEMO / 001</span>
      </div>
      <div className="operation-flow">
        {flowSteps.map((label, index) => (
          <div
            key={label}
            className={`flow-step ${step >= index ? "flow-active" : ""}`}
          >
            <span className="flow-node">
              {step > index ? (
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="m5 10 3 3 7-7" />
                </svg>
              ) : (
                `0${index + 1}`
              )}
            </span>
            <span>{label}</span>
            <span className="flow-state">
              {step > index
                ? "CONCLUÍDO"
                : step === index
                  ? "EM CURSO"
                  : "AGUARDANDO"}
            </span>
          </div>
        ))}
      </div>
      <div className="operation-foot">
        <span className="micro" role="status">
          {step === 4
            ? "MENOS TRABALHO MANUAL."
            : "UM FLUXO. NENHUMA PLANILHA."}
        </span>
        <button className="demo-button" onClick={simulate} disabled={running}>
          {running
            ? "Conectando…"
            : step === 4
              ? "Simular novamente"
              : "Simular um pedido"}
          <Arrow />
        </button>
      </div>
      <span className="demo-caption micro">FLUXO ILUSTRATIVO DE AUTOMAÇÃO</span>
    </div>
  );
}

function Manifesto() {
  return (
    <section
      id="sobre"
      className="manifesto section-shell section-space"
      aria-labelledby="manifesto-title"
    >
      <div className="section-topline micro">
        <span>01 / POR QUE EXISTIMOS</span>
        <span>ESTRATÉGIA + DESIGN + ENGENHARIA</span>
      </div>
      <div className="manifesto-grid">
        <div className="manifesto-heading">
          <h2 id="manifesto-title" className="display" data-reveal="text">
            SE O NEGÓCIO
            <br />
            CRESCE,
            <br />
            <span className="muted">A TECNOLOGIA</span>
            <br />
            CRESCE JUNTO.
          </h2>
          <p className="manifesto-support">{manifesto.supporting}</p>
        </div>
        <div className="manifesto-right">
          <OperationDemo />
          <div className="manifesto-copy">
            <p>
              {manifesto.problems.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <p>{manifesto.conclusion}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  const [active, setActive] = useState<string | null>("presenca");
  return (
    <section
      id="solucoes"
      className="solutions section-shell section-space"
      aria-labelledby="solutions-title"
    >
      <div className="section-topline micro">
        <span>02 / O QUE CONSTRUÍMOS</span>
        <span>DO PRIMEIRO CLIQUE À OPERAÇÃO INTEIRA</span>
      </div>
      <div className="section-heading-row">
        <h2 id="solutions-title" className="display" data-reveal="text">
          SISTEMAS PARA
          <br />
          <span className="muted">CRESCER.</span>
        </h2>
        <p>
          O digital deve resolver
          <br />o que trava seu negócio.
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
              onClick={() =>
                setActive(active === service.id ? null : service.id)
              }
              aria-expanded={active === service.id}
              aria-controls={`service-${service.id}`}
            >
              <span className="service-number micro">{service.number}</span>
              <span className="service-label">{service.label}</span>
              <span className="service-name">{service.title}</span>
              <span className="service-plus" aria-hidden="true" />
            </button>
            <div
              className="service-content"
              id={`service-${service.id}`}
              hidden={active !== service.id}
            >
              <div
                className={`service-symbol service-symbol-${service.id}`}
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="service-description">
                <p>{service.description}</p>
                <div className="service-capabilities micro">
                  {service.capabilities.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
                <a className="underlined-link" href="#contato">
                  {service.outcome}
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

function Statement() {
  return (
    <section
      className="statement section-space"
      aria-labelledby="statement-title"
    >
      <div className="statement-top micro">
        <span>MENOS FRAGMENTAÇÃO.</span>
        <span>MAIS DIREÇÃO.</span>
      </div>
      <h2 id="statement-title" className="statement-title" data-reveal="text">
        <span>SEU NEGÓCIO NÃO</span>
        <span>PRECISA DE MAIS</span>
        <span className="statement-strike">FERRAMENTAS.</span>
        <span className="statement-answer">
          PRECISA DE
          <br />
          <em>UM SISTEMA.</em>
        </span>
      </h2>
      <div className="system-stages micro" aria-label="Do site à escala">
        <span>SITE</span>
        <Arrow />
        <span>PROCESSO</span>
        <Arrow />
        <span>SISTEMA</span>
        <Arrow />
        <span>ESCALA</span>
      </div>
      <span className="statement-mark" aria-hidden="true">
        N
      </span>
    </section>
  );
}

function CaseStudy({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`case-study case-${project.id}`}>
      <div className="case-visual" data-reveal="mask">
        <div className="case-visual-top micro">
          <span>{project.type}</span>
          <span>0{index + 1} / 03</span>
        </div>
        <ProjectVisual variant={project.id as "diamond" | "mesa" | "axis"} />
      </div>
      <div className="case-description">
        <span className="micro case-segment">{project.segment}</span>
        <h3>
          {project.title}
          <span>®</span>
        </h3>
        <p className="case-summary">{project.summary}</p>
        <dl className="case-facts">
          <div>
            <dt>O DESAFIO</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>A SOLUÇÃO</dt>
            <dd>{project.solution}</dd>
          </div>
        </dl>
        <details className="case-details">
          <summary>
            Explorar conceito
            <Arrow diagonal />
          </summary>
          <div>
            <span className="micro">OBJETIVO</span>
            <p>{project.objective}</p>
            <ul>
              {project.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="case-disclaimer">
              Estudo demonstrativo. Não representa um cliente ou resultado real.
            </p>
          </div>
        </details>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section
      id="projetos"
      className="projects section-shell section-space"
      aria-labelledby="projects-title"
    >
      <div className="section-topline micro">
        <span>03 / POSSIBILIDADES EM PRÁTICA</span>
        <span>DESIGN QUE ENCONTRA ENGENHARIA</span>
      </div>
      <div className="section-heading-row">
        <h2 id="projects-title" className="display" data-reveal="text">
          O QUE MUDA
          <br />
          <span className="muted">QUANDO CONECTA.</span>
        </h2>
        <p>
          Três conceitos de aplicação.
          <br />
          Diferentes negócios.
          <br />A mesma visão de escala.
        </p>
      </div>
      <div className="project-list">
        {projects.map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function Positioning() {
  return (
    <section
      className="positioning section-shell section-space"
      aria-labelledby="positioning-title"
    >
      <div className="positioning-grid">
        <h2 id="positioning-title" className="display" data-reveal="text">
          O OBJETIVO NÃO É<br />
          <span className="muted">TER UM SITE.</span>
          <br />É TER UM ATIVO.
        </h2>
        <div className="positioning-copy">
          <p>
            {positioning.statements.map((s) => (
              <span key={s}>
                {s}
                <br />
              </span>
            ))}
          </p>
          <p>{positioning.conclusion}</p>
        </div>
      </div>
      <div className="value-path" data-reveal="line">
        <svg
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 140C250 140 240 120 400 100S650 140 800 70S1000 30 1200 0" />
        </svg>
        {positioning.indicators.map((i, index) => (
          <div className="value-step" key={i}>
            <span className="micro">0{index + 1}</span>
            <h3>{i}</h3>
            <span className="value-dot" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section
      id="processo"
      className="process section-shell section-space"
      aria-labelledby="process-title"
    >
      <div className="section-topline micro">
        <span>04 / COMO CHEGAMOS LÁ</span>
        <span>CLAREZA EM CADA MOVIMENTO</span>
      </div>
      <div className="process-grid">
        <div className="process-title">
          <h2 id="process-title" className="display" data-reveal="text">
            DO GARGALO
            <br />
            <span className="muted">AO PRÓXIMO</span>
            <br />
            PASSO.
          </h2>
          <p>
            Antes de escrever uma linha de código,
            <br />
            entendemos o que precisa mudar.
          </p>
          <a className="underlined-link" href="#contato">
            Vamos entender seu negócio
            <Arrow diagonal />
          </a>
        </div>
        <ol className="process-list">
          {process.map((step) => (
            <li key={step.number} data-reveal="line">
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

function Testimonials() {
  return (
    <section
      className="testimonials section-shell section-space"
      aria-labelledby="testimonials-title"
    >
      <div>
        <span className="micro">RELAÇÕES QUE CONSTROEM</span>
        <h2 id="testimonials-title" className="display" data-reveal="text">
          {clientData.testimonials.length ? "QUEM CRESCEU" : "A PRÓXIMA HISTÓRIA"}
          <br />
          <span className="muted">{clientData.testimonials.length ? "COM A GENTE." : "COMEÇA AQUI."}</span>
        </h2>
      </div>
      <div className="testimonials-list">
        {clientData.testimonials.length ? (
          clientData.testimonials.map((t) => (
            <figure className="testimonial" key={t.name}>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                {t.name}
                <span>
                  {t.role} · {t.company}
                </span>
              </figcaption>
            </figure>
          ))
        ) : (
          <div className="testimonial-empty">
            <p>
              Boas parcerias começam
              <br />
              com uma boa conversa.
            </p>
            <span className="testimonial-note">
              Os relatos de clientes serão publicados aqui, com autorização.
            </span>
            <a href="#contato" className="underlined-link">
              A próxima história pode ser a sua
              <Arrow diagonal />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function Contact() {
  const [expanded, setExpanded] = useState(false);
  const formSection = useRef<HTMLDivElement>(null);
  function openBrief() {
    setExpanded(true);
    setTimeout(() => {
      formSection.current?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
      formSection.current
        ?.querySelector<HTMLInputElement>("input")
        ?.focus({ preventScroll: true });
    }, 50);
  }
  return (
    <section
      id="contato"
      className="contact section-shell section-space"
      aria-labelledby="contact-title"
    >
      <div className="contact-canvas">
        <img
          src="/assets/structure.webp"
          width="1448"
          height="1086"
          alt=""
          loading="lazy"
          className="contact-art"
        />
        <div className="contact-canvas-top micro">
          <span>{contact.eyebrow}</span>
          <span>COMEÇA AQUI ↘</span>
        </div>
        <div className="contact-canvas-content">
          <h2 id="contact-title">
            SE O PRÓXIMO NÍVEL
            <br />
            DA SUA EMPRESA
            <br />
            <span>DEPENDE DE TECNOLOGIA,</span>
            <br />
            VAMOS CONSTRUÍ-LO.
          </h2>
          <div className="contact-canvas-bottom">
            <button
              className="button button-light"
              onClick={openBrief}
              aria-expanded={expanded}
              aria-controls="briefing"
            >
              {contact.cta}
              <Arrow diagonal />
            </button>
            <p>{contact.description}</p>
          </div>
        </div>
      </div>
      <div
        id="briefing"
        className="briefing"
        ref={formSection}
        hidden={!expanded}
      >
        <ContactForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer section-shell">
      <div className="footer-top">
        <a className="wordmark" href="#inicio" aria-label="Nomad — início">
          <BrandMark />
          nomad<span>®</span>
        </a>
        <span className="micro">
          {brand.location}
          <br />
          {brand.country}
        </span>
        <a className="back-top" href="#inicio" aria-label="Voltar ao início">
          <Arrow diagonal />
        </a>
      </div>
      <div className="footer-main">
        <div className="footer-statement">
          {footer.headline.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="footer-nav">
          <p className="micro">EXPLORE</p>
          {navigation.map((n) => (
            <a className="text-link" href={n.href} key={n.href}>
              {n.label}
            </a>
          ))}
          <a className="text-link" href="#contato">
            Contato
          </a>
        </div>
        <div className="footer-social">
          <p className="micro">CONEXÕES</p>
          {socialLinks
            .filter((l) => l.href)
            .map((l) => (
              <a
                className="text-link"
                href={l.href!}
                key={l.label}
                target="_blank"
                rel="noreferrer"
              >
                {l.label}
                <Arrow diagonal />
              </a>
            ))}
          {!socialLinks.some((l) => l.href) && (
            <a className="text-link" href="#contato">
              Comece uma conversa
              <Arrow diagonal />
            </a>
          )}
          <p className="footer-signature">{footer.signature}</p>
        </div>
      </div>
      <div className="footer-bottom micro">
        <span>© 2026 NOMAD. ENGENHARIA DIGITAL.</span>
        <span>FEITO PARA O PRÓXIMO MOVIMENTO.</span>
        <a href="#inicio">BH, BRASIL ↗</a>
      </div>
    </footer>
  );
}

export default function App() {
  useEditorialMotion();
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Navigation />
      <main id="conteudo">
        <Hero />
        <Trust />
        <Manifesto />
        <Solutions />
        <Statement />
        <Projects />
        <Positioning />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <div className="scroll-progress" aria-hidden="true" />
    </>
  );
}
