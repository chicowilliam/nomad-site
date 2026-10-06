import "./ProjectVisual.css";

export type ProjectVisualVariant = "diamond" | "mesa" | "axis";

type ProjectVisualProps = {
  variant: ProjectVisualVariant;
};

function SmallArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BrowserBar({ label }: { label: string }) {
  return (
    <div className="pv-browser-bar">
      <div className="pv-browser-dots">
        <i />
        <i />
        <i />
      </div>
      <span>{label}</span>
      <span className="pv-browser-symbol">+</span>
    </div>
  );
}

function DiamondVisual() {
  return (
    <div className="pv-window pv-diamond-window">
      <BrowserBar label="DIAMOND — CONCEPT STORE" />
      <div className="pv-diamond-site">
        <div className="pv-diamond-nav">
          <span className="pv-diamond-logo">
            DIAMOND<span>FINE JEWELRY</span>
          </span>
          <div>
            <span>Coleções</span>
            <span>Nossa essência</span>
          </div>
          <span>Sacola (0)</span>
        </div>
        <div className="pv-diamond-content">
          <div className="pv-diamond-copy">
            <span className="pv-diamond-caption">ESSÊNCIA EM CADA DETALHE</span>
            <p className="pv-diamond-title">
              O essencial
              <br />
              permanece.
            </p>
            <p className="pv-diamond-description">
              Formas que atravessam o tempo.
              <br />
              Histórias que se tornam parte de você.
            </p>
            <span className="pv-diamond-link">
              Conheça a coleção <SmallArrow />
            </span>
          </div>
          <div className="pv-jewelry-art">
            <span className="pv-jewelry-axis" />
            <div className="pv-jewelry-ring pv-jewelry-ring-back" />
            <div className="pv-jewelry-ring pv-jewelry-ring-front" />
            <span className="pv-jewelry-caption">
              A PUREZA DA FORMA.
              <br />A FORÇA DO ENCONTRO.
            </span>
            <span className="pv-jewelry-index">01 — 26</span>
          </div>
        </div>
        <div className="pv-diamond-bottom">
          <span>COLEÇÃO ORIGEM</span>
          <span>Um novo olhar para o que fica.</span>
          <SmallArrow />
        </div>
      </div>
    </div>
  );
}

function MesaVisual() {
  return (
    <div className="pv-window pv-mesa-window">
      <BrowserBar label="MESA — COZINHA DE ORIGEM" />
      <div className="pv-mesa-site">
        <img
          className="pv-mesa-photo"
          src="/assets/project-mesa.webp"
          alt=""
          width="1200"
          height="900"
          loading="lazy"
          decoding="async"
        />
        <div className="pv-mesa-shade" />
        <div className="pv-mesa-nav">
          <span className="pv-mesa-logo">
            mesa<span>COZINHA DE ORIGEM</span>
          </span>
          <div>
            <span>A casa</span>
            <span>Cardápio</span>
            <span className="pv-mesa-reserve">
              Reserve sua mesa <SmallArrow />
            </span>
          </div>
        </div>
        <div className="pv-mesa-copy">
          <span>BELO HORIZONTE · BRASIL</span>
          <p>
            À mesa,
            <br />o tempo
            <br />
            <em>é outro.</em>
          </p>
          <span className="pv-mesa-story">
            O ingrediente é o começo.
            <br />O encontro é o que fica.
          </span>
        </div>
        <div className="pv-mesa-bottom">
          <span>
            DA NOSSA COZINHA
            <br />
            PARA A SUA HISTÓRIA.
          </span>
          <span className="pv-mesa-discover">
            Descubra a casa <SmallArrow />
          </span>
        </div>
      </div>
      <div className="pv-mesa-footnote">
        <span>Comida com origem. Encontros com tempo.</span>
        <span>TER — DOM &nbsp; 12H ÀS 23H</span>
      </div>
    </div>
  );
}

const columns = [
  {
    name: "Entrada",
    count: "03",
    items: [
      {
        title: "Nova unidade",
        type: "PROJETO · 018",
        text: "Proposta comercial",
        initials: "AC",
        date: "Hoje",
      },
      {
        title: "Catálogo digital",
        type: "PROJETO · 019",
        text: "Diagnóstico inicial",
        initials: "ML",
        date: "Hoje",
      },
      {
        title: "Portal de parceiros",
        type: "PROJETO · 020",
        text: "Reunião de alinhamento",
        initials: "RF",
        date: "Amanhã",
      },
    ],
  },
  {
    name: "Em andamento",
    count: "02",
    items: [
      {
        title: "Operação conectada",
        type: "PROJETO · 016",
        text: "Integrações em validação",
        initials: "AC",
        date: "08 out",
      },
      {
        title: "Vendas recorrentes",
        type: "PROJETO · 014",
        text: "Revisão da experiência",
        initials: "ML",
        date: "09 out",
      },
    ],
  },
  {
    name: "Concluído",
    count: "02",
    items: [
      {
        title: "Painel de gestão",
        type: "PROJETO · 012",
        text: "Entregue à operação",
        initials: "RF",
        date: "Concluído",
      },
      {
        title: "Fluxo de pedidos",
        type: "PROJETO · 011",
        text: "Automação publicada",
        initials: "AC",
        date: "Concluído",
      },
    ],
  },
];

function AxisVisual() {
  return (
    <div className="pv-window pv-axis-window">
      <BrowserBar label="AXIS — WORKSPACE" />
      <div className="pv-axis-site">
        <div className="pv-axis-sidebar">
          <span className="pv-axis-logo">
            axis<span>®</span>
          </span>
          <span className="pv-axis-workspace">
            <i>N</i>Meu workspace
          </span>
          <div className="pv-axis-menu">
            <span>
              <i className="pv-axis-menu-icon" />
              Visão geral
            </span>
            <span className="pv-axis-menu-active">
              <i className="pv-axis-menu-icon" />
              Operação<small>7</small>
            </span>
            <span>
              <i className="pv-axis-menu-icon" />
              Contatos
            </span>
            <span>
              <i className="pv-axis-menu-icon" />
              Documentos
            </span>
            <span>
              <i className="pv-axis-menu-icon" />
              Relatórios
            </span>
          </div>
          <div className="pv-axis-sidebar-bottom">
            <span>ESTRUTURA QUE CONECTA.</span>
            <div>
              <i>ND</i>
              <span>
                Nomad Studio<small>Administrador</small>
              </span>
            </div>
          </div>
        </div>
        <div className="pv-axis-main">
          <div className="pv-axis-topbar">
            <span>
              Workspace <span>/</span> Operação
            </span>
            <span>
              Dados de demonstração <i />
            </span>
          </div>
          <div className="pv-axis-heading">
            <div>
              <span>QUARTA-FEIRA, 07 DE OUTUBRO</span>
              <p>
                Sua operação.
                <br />
                Em um só lugar.
              </p>
            </div>
            <span className="pv-axis-add">
              Novo projeto <b>+</b>
            </span>
          </div>
          <div className="pv-axis-toolbar">
            <span className="pv-axis-tab-active">
              Quadro de projetos <small>07</small>
            </span>
            <span>Atividades</span>
            <span>Equipe</span>
            <span className="pv-axis-view">
              Filtrar{" "}
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" />
              </svg>
            </span>
          </div>
          <div className="pv-axis-board">
            {columns.map((column) => (
              <div className="pv-axis-column" key={column.name}>
                <div className="pv-axis-column-name">
                  <span>
                    <i />
                    {column.name} <small>{column.count}</small>
                  </span>
                  <b>+</b>
                </div>
                {column.items.map((item) => (
                  <div className="pv-axis-task" key={item.type}>
                    <span className="pv-axis-task-type">
                      {item.type}
                      <b>···</b>
                    </span>
                    <p>{item.title}</p>
                    <span className="pv-axis-task-description">
                      {item.text}
                    </span>
                    <div className="pv-axis-task-bottom">
                      <i>{item.initials}</i>
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="pv-axis-status">
            <span>
              <i />
              Todos os processos, conectados.
            </span>
            <span>Última atualização agora</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Decorative concept previews; the enclosing case supplies accessible content. */
export function ProjectVisual({ variant }: ProjectVisualProps) {
  return (
    <div
      className={`project-visual project-visual--${variant}`}
      aria-hidden="true"
    >
      {variant === "diamond" ? (
        <DiamondVisual />
      ) : variant === "mesa" ? (
        <MesaVisual />
      ) : (
        <AxisVisual />
      )}
    </div>
  );
}
