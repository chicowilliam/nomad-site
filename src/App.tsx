import { lazy, Suspense, useRef } from "react";
import { Navigation } from "./components/Navigation";
import { Arrow } from "./components/Icon";
import {
  about,
  brand,
  contact,
  getWhatsAppUrl,
  hero,
  navigation,
  servicesIntro,
  work,
} from "./data/site";
import { services } from "./data/services";
import { projects } from "./data/projects";

function ContactLink({
  className = "button button-primary",
  label = contact.cta,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      className={className}
      href={getWhatsAppUrl(contact.message)}
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
    <section id="inicio" className="hero">
      <div className="hero-grid" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="shell hero-content">
        <p className="eyebrow hero-label">
          <span className="status-dot" aria-hidden="true" />
          {hero.eyebrow}
        </p>
        <h1>
          {hero.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <em>{hero.accent}</em>
        </h1>
        <p className="hero-description">{hero.description}</p>
        <div className="hero-actions">
          <ContactLink />
          <a className="button button-ghost" href="#trabalho">
            {hero.secondaryCta}
            <Arrow />
          </a>
        </div>
        <div className="hero-bottom eyebrow">
          <span>{hero.footer[0]}</span>
          <span>{hero.footer[1]}</span>
        </div>
      </div>
    </section>
  );
}
function About() {
  return (
    <section id="sobre" className="about shell section-space">
      <p className="eyebrow">{about.label}</p>
      <div className="about-layout">
        <div className="about-copy">
          <h2>{about.headline}</h2>
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="metrics">
          {about.indicators.map((item) => (
            <div key={item.label}>
              <dt className="eyebrow">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
function Services() {
  return (
    <section id="servicos" className="services shell section-space">
      <div className="section-intro">
        <p className="eyebrow">{servicesIntro.label}</p>
        <h2 className="display" data-reveal="text">
          {servicesIntro.title}
          <em>{servicesIntro.accent}</em>
        </h2>
        <p className="section-description">{servicesIntro.description}</p>
      </div>
      <div className="service-list">
        {services.map((service) => (
          <article
            id={service.id}
            key={service.id}
            className={`service-row ${service.id === "lojas-virtuais" ? "service-commerce" : ""}`}
          >
            <span className="service-rule" aria-hidden="true" />
            <span className="service-number eyebrow">{service.number}</span>
            <h3>
              {service.title}
              {service.accent && (
                <>
                  {" "}
                  <em>{service.accent}</em>
                </>
              )}
            </h3>
            <p>{service.description}</p>
            <ul
              className="chips"
              aria-label={`Recursos e ferramentas para ${service.label}`}
            >
              {service.capabilities.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
function Projects() {
  return (
    <section id="trabalho" className="work section-space">
      <div className="shell">
        <div className="section-intro">
          <p className="eyebrow">{work.label}</p>
          <h2 className="display" data-reveal="text">
            {work.title}
            <em>{work.accent}</em>
          </h2>
          <p className="section-description">{work.description}</p>
        </div>
        {projects.map((project) => (
          <article className="project-case" key={project.id}>
            <div className="project-copy">
              <div>
                <p className="eyebrow project-category">
                  {project.category}
                  <span> · {project.kind}</span>
                </p>
                <h3>{project.name}</h3>
              </div>
              <div>
                <p>{project.description}</p>
                <a href={project.href} className="project-link">
                  {project.linkLabel}
                  <Arrow diagonal />
                </a>
              </div>
            </div>
            <a
              href={project.href}
              className="project-image"
              title={project.linkLabel}
              data-reveal="image"
            >
              <img
                src={project.image}
                width="1440"
                height="900"
                loading="lazy"
                decoding="async"
                alt={project.imageAlt}
              />
              <span className="image-action" aria-hidden="true">
                <Arrow diagonal />
              </span>
            </a>
            <p className="project-note">{project.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
function Contact() {
  return (
    <section id="contato" className="contact shell section-space">
      <p className="eyebrow">04 · VAMOS CONVERSAR</p>
      <h2 className="display" data-reveal="text">
        {contact.title}
        <em>{contact.accent}</em>
      </h2>
      <p>{contact.description}</p>
      <ContactLink />
      <small>{contact.note}</small>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer shell">
      <div className="footer-top">
        <a
          href="#inicio"
          className="wordmark"
          aria-label="Guarda-Chuva — início"
        >
          GUARDA
          <span>
            CHUVA<span className="brand-dot">.</span>
          </span>
        </a>
        <p>
          Sites. Sistemas. Lojas virtuais.
          <br />
          Tudo sob medida.
        </p>
        <nav aria-label="Navegação do rodapé">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
          <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
            WhatsApp
            <Arrow diagonal />
          </a>
        </nav>
      </div>
      <div className="footer-bottom eyebrow">
        <span>© {new Date().getFullYear()} GUARDA-CHUVA</span>
        <span>{brand.location} · Brasil</span>
        <a href="#inicio">
          VOLTAR AO TOPO
          <Arrow diagonal />
        </a>
      </div>
    </footer>
  );
}
const EditorialMotion = lazy(() => import("./components/EditorialMotion"));
export default function App() {
  const scope = useRef<HTMLDivElement>(null);
  return (
    <div ref={scope} className="site-dark">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Navigation />
      <main id="conteudo">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <EditorialMotion scope={scope} />
      </Suspense>
    </div>
  );
}
