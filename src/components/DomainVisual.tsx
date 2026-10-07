import { Arrow, BrandMark } from "./Icon";
import { ecosystem, hero } from "../data/site";

export function DomainVisual() {
  return (
    <figure
      className="domain-collage"
      aria-label="Canais conectados ao domínio próprio de um restaurante"
    >
      <div className="domain-photo">
        <img
          src="/assets/gastronomy.webp"
          srcSet="/assets/gastronomy-small.webp 600w, /assets/gastronomy.webp 1200w"
          sizes="(max-width: 767px) 65vw, (max-width: 1023px) 50vw, 32vw"
          width="1200"
          height="1500"
          alt="Composição gastronômica com prato artesanal, guardanapo azul e talheres sobre uma mesa clara"
          fetchPriority="high"
        />
      </div>
      <svg
        className="hero-connections"
        viewBox="0 0 580 560"
        aria-hidden="true"
      >
        <path d="M100 75H290V407M493 154H408V407M65 275H170V407M490 415H408" />
        <circle cx="100" cy="75" r="4" />
        <circle cx="493" cy="154" r="4" />
        <circle cx="65" cy="275" r="4" />
      </svg>
      <span className="channel channel-google">
        Google
        <Arrow diagonal />
      </span>
      <span className="channel channel-instagram">
        Instagram
        <Arrow diagonal />
      </span>
      <span className="channel channel-whatsapp">
        WhatsApp
        <Arrow diagonal />
      </span>
      <span className="channel channel-delivery">
        Delivery
        <Arrow diagonal />
      </span>
      <div className="domain-address">
        <span className="micro">O PONTO DE ENCONTRO</span>
        <strong>SEU DOMÍNIO.</strong>
        <div>
          <span>Cardápio</span>
          <span>Reservas</span>
          <span>Pedidos</span>
          <Arrow />
        </div>
      </div>
      <figcaption className="micro">
        {hero.visualCaption}
        <span>01 / ESTRUTURA PRÓPRIA</span>
      </figcaption>
    </figure>
  );
}

const positions = [
  { x: 500, y: 42 },
  { x: 90, y: 100 },
  { x: 90, y: 210 },
  { x: 90, y: 320 },
  { x: 910, y: 100 },
  { x: 910, y: 210 },
  { x: 910, y: 320 },
  { x: 230, y: 435 },
  { x: 770, y: 435 },
];

export function EcosystemVisual() {
  return (
    <div
      className="ecosystem-scene"
      aria-label="Site, cardápio, Google, delivery, reservas, WhatsApp, CRM, automações e análise conectados"
    >
      <svg
        className="ecosystem-lines"
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {positions.map(({ x, y }, index) => (
          <path
            className="connection-path"
            key={index}
            d={`M${x} ${y} L${x} ${y < 210 ? 175 : 300} L500 ${y < 210 ? 175 : 300} L500 250`}
          />
        ))}
        <path className="connection-output" d="M500 270V440" />
      </svg>
      {ecosystem.channels.map((name, index) => (
        <div
          key={name}
          className={`ecosystem-node ecosystem-node-${index}`}
          style={{
            left: `${positions[index].x / 10}%`,
            top: `${positions[index].y / 5}%`,
          }}
        >
          <span className="node-dot" />
          {name}
        </div>
      ))}
      <div className="ecosystem-center">
        <BrandMark />
        <span>GUARDA-CHUVA</span>
        <small>UMA ESTRUTURA. TODAS AS CONEXÕES.</small>
      </div>
      <div className="ecosystem-destination">
        <span className="micro">O ENDEREÇO É SEU</span>
        <strong>
          SEU DOMÍNIO
          <Arrow />
        </strong>
      </div>
    </div>
  );
}
