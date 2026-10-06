import { useEffect, useRef, useState } from "react";
import { Arrow, BrandMark } from "./Icon";
import { navigation, contact } from "../data/site";

const links = navigation.map(({ label, href }) => [label, href] as const);
export function Navigation() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) {
      menu.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      menu.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Nomad — início">
          <BrandMark />
          nomad<span>®</span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a className="text-link" key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contato">
          {contact.navigationCta}
          <Arrow diagonal />
        </a>
        <button
          className="menu-toggle"
          ref={trigger}
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
        </button>
      </header>
      <dialog
        id="mobile-menu"
        ref={menu}
        className="mobile-menu"
        aria-label="Menu principal"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = menu.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
          if (!controls?.length) return;
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
      >
        <div className="mobile-menu-top">
          <span className="wordmark">
            <BrandMark />
            nomad<span>®</span>
          </span>
          <button
            onClick={close}
            className="menu-close"
            aria-label="Fechar menu"
          >
            <span />
            <span />
          </button>
        </div>
        <nav aria-label="Navegação mobile">
          {links.map(([label, href], i) => (
            <a key={href} href={href} onClick={close}>
              <span className="micro">0{i + 1}</span>
              {label}
              <Arrow diagonal />
            </a>
          ))}
        </nav>
        <a className="button button-light" href="#contato" onClick={close}>
          {contact.navigationCta}
          <Arrow diagonal />
        </a>
        <p className="micro">ESTÚDIO DIGITAL / BH — BRASIL</p>
      </dialog>
    </>
  );
}
