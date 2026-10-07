import { Arrow, BrandMark } from "./Icon";
import { ecosystem, hero } from "../data/site";

export function DomainVisual() {
  return (
    <figure
      className="domain-collage"
      aria-label="Google, Instagram, WhatsApp, iFood, Maps e cardápio convergem para o domínio próprio e chegam ao cliente"
    >
      <div className="domain-photo">
        <img
          src="/assets/gastronomy.webp"
          srcSet="/assets/gastronomy-small.webp 600w, /assets/gastronomy.webp 1200w"
          sizes="(max-width: 767px) 65vw, (max-width: 1023px) 50vw, 32vw"
          width="1200"
          height="1500"
          alt="Prato artesanal e linho azul: a experiência do restaurante encontra seu endereço digital"
          fetchPriority="high"
        />
      </div>
      <svg
        className="hero-connections"
        viewBox="0 0 580 600"
        aria-hidden="true"
        fill="none"
      >
        <path d="M55 80H270V420M510 110H390V420M35 235H190V420M515 280H390V420M65 355H150V420M510 395H430V420M285 475V548H410" />
        <circle cx="410" cy="548" r="4" />
      </svg>
      {hero.channels.map((name, i) => (
        <span className={`channel channel-${i}`} key={name}>
          {name}
          <Arrow diagonal />
        </span>
      ))}
      <div className="domain-address">
        <span className="micro">SEU RESTAURANTE NO CENTRO</span>
        <strong>DOMÍNIO PRÓPRIO.</strong>
        <div>
          <span>SUA MARCA</span>
          <span>SEUS CAMINHOS</span>
          <Arrow />
        </div>
      </div>
      <div className="hero-client">
        <span className="micro">O PRÓXIMO PASSO</span>
        <strong>
          CLIENTE
          <Arrow />
        </strong>
      </div>
      <figcaption className="micro">{hero.visualCaption}</figcaption>
    </figure>
  );
}
const channelPositions = [
  { x: 14, y: 14 },
  { x: 34, y: 7 },
  { x: 54, y: 14 },
  { x: 75, y: 7 },
  { x: 91, y: 14 },
];
export function EcosystemVisual() {
  return (
    <div
      className="ecosystem-scene"
      aria-label="Os canais levam ao domínio próprio, que oferece cardápio, reserva e delivery para o cliente"
    >
      <div className="ecosystem-stage-note micro">01 / ENCONTRAR</div>
      <svg
        className="ecosystem-lines"
        viewBox="0 0 1000 700"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {channelPositions.map((p, i) => (
          <path
            className="connection-path"
            key={i}
            d={`M${p.x * 10} ${p.y * 7}V180H500V230`}
          />
        ))}
        <path className="connection-output" d="M500 265V385" />
        <path
          className="connection-branch"
          d="M500 425V475H180V520M500 475V520M500 475H820V520"
        />
        <path
          className="connection-client"
          d="M180 550V600H820V550M500 550V665"
        />
      </svg>
      <div className="eco-channels">
        {ecosystem.channels.map((name, i) => (
          <div
            className="ecosystem-node"
            key={name}
            style={{
              left: `${channelPositions[i].x}%`,
              top: `${channelPositions[i].y}%`,
            }}
          >
            <i />
            {name}
          </div>
        ))}
      </div>
      <div className="ecosystem-center">
        <BrandMark />
        <span>GUARDA-CHUVA</span>
        <small>ESTRATÉGIA, DESIGN E TECNOLOGIA.</small>
      </div>
      <div className="ecosystem-destination">
        <span className="micro">02 / ESCOLHER</span>
        <strong>SEU DOMÍNIO.</strong>
        <small>O ENDEREÇO DA SUA MARCA.</small>
      </div>
      <div className="eco-destinations">
        {ecosystem.destinations.map((item, i) => (
          <div
            className="eco-solution"
            style={{ left: `${18 + i * 32}%` }}
            key={item}
          >
            <span className="micro">0{i + 1}</span>
            {item}
            <Arrow />
          </div>
        ))}
      </div>
      <div className="eco-client">
        <span className="micro">03 / PEDIR. RESERVAR. VOLTAR.</span>
        <strong>
          SEU CLIENTE.
          <Arrow />
        </strong>
      </div>
    </div>
  );
}
