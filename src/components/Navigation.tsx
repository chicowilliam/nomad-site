import { brand, contact, getWhatsAppUrl, navigation } from "../data/site";
import { Arrow } from "./Icon";
export function Navigation() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          className="wordmark"
          href="#inicio"
          aria-label={`${brand.displayName} — início`}
        >
          GUARDA
          <span>
            CHUVA<span className="brand-dot">.</span>
          </span>
        </a>
        <nav aria-label="Navegação principal">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="header-contact"
          href={getWhatsAppUrl(contact.message)}
          target="_blank"
          rel="noreferrer"
        >
          <span>Falar no WhatsApp</span>
          <span className="status-dot" aria-hidden="true" />
          <Arrow diagonal />
        </a>
      </div>
    </header>
  );
}
