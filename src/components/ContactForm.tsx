import { useId, useState, type FormEvent } from "react";
import { brand, contact, services } from "../data/site";
import { Arrow } from "./Icon";
import "./ContactForm.css";

interface ContactFormProps {
  id?: string;
}

type SubmitState = "idle" | "sending" | "success" | "error";
type ContactChannel = "endpoint" | "whatsapp" | "email" | "download";

function getWhatsAppNumber(value: string | null): string | null {
  if (!value) return null;
  let candidate = value.trim();
  if (candidate.startsWith("https://")) {
    try {
      const url = new URL(candidate);
      if (url.hostname === "wa.me") candidate = url.pathname.slice(1);
      else if (url.hostname === "api.whatsapp.com")
        candidate = url.searchParams.get("phone") ?? "";
      else return null;
    } catch {
      return null;
    }
  }
  const digits = candidate.replace(/[\s()+.-]/g, "");
  return /^[1-9]\d{9,14}$/.test(digits) ? digits : null;
}

const whatsappNumber = getWhatsAppNumber(brand.whatsapp);
const channel: ContactChannel = contact.formEndpoint
  ? "endpoint"
  : whatsappNumber
    ? "whatsapp"
    : brand.email
      ? "email"
      : "download";

const buttonLabels: Record<ContactChannel, string> = {
  endpoint: "Enviar briefing",
  whatsapp: "Continuar no WhatsApp",
  email: "Preparar e-mail",
  download: "Salvar briefing",
};

const channelNotes: Record<ContactChannel, string> = {
  endpoint: "Usaremos estes dados para conversar sobre o seu projeto.",
  whatsapp: "Você revisa a mensagem e conclui o envio no WhatsApp.",
  email:
    "Você revisa o briefing e conclui o envio no seu aplicativo de e-mail.",
  download:
    "Prepare seu projeto em um arquivo. O briefing é salvo no seu dispositivo; nenhum dado é enviado.",
};

export function ContactForm({ id }: ContactFormProps) {
  const generatedId = useId();
  const prefix = id ?? `project-brief-${generatedId}`;
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || state === "sending") return;

    const fields = new FormData(form);
    const payload = {
      name: String(fields.get("name") ?? "").trim(),
      company: String(fields.get("company") ?? "").trim(),
      email: String(fields.get("email") ?? "").trim(),
      service: String(fields.get("service") ?? "").trim(),
      challenge: String(fields.get("challenge") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.challenge) {
      setState("error");
      setMessage("Preencha seu nome, e-mail e o desafio do projeto.");
      const missingField = !payload.name
        ? "name"
        : !payload.email
          ? "email"
          : "challenge";
      const element = form.elements.namedItem(missingField);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    const serviceName =
      services.find((service) => service.id === payload.service)?.title ??
      "Vamos definir juntos";
    const briefing = [
      "NOMAD — BRIEFING DE PROJETO",
      "",
      `Nome: ${payload.name}`,
      `Empresa: ${payload.company || "Não informada"}`,
      `E-mail: ${payload.email}`,
      `Solução: ${serviceName}`,
      "",
      "O QUE HOJE LIMITA A OPERAÇÃO",
      payload.challenge,
    ].join("\n");

    setMessage("");

    if (channel === "endpoint" && contact.formEndpoint) {
      setState("sending");
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(contact.formEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ ...payload, service: serviceName }),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Briefing request failed");
        setState("success");
        setMessage(
          "Briefing enviado com sucesso. Obrigado por compartilhar seu próximo movimento.",
        );
        form.reset();
      } catch {
        setState("error");
        setMessage(
          "Não foi possível enviar agora. Seus dados continuam no formulário. Tente novamente.",
        );
      } finally {
        window.clearTimeout(timeout);
      }
      return;
    }

    if (channel === "whatsapp" && whatsappNumber) {
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(briefing)}`,
        "_blank",
        "noopener,noreferrer",
      );
      setState("success");
      setMessage(
        "Briefing preparado. Conclua o envio na conversa do WhatsApp.",
      );
      return;
    }

    if (channel === "email" && brand.email) {
      window.location.href = `mailto:${encodeURIComponent(brand.email)}?subject=${encodeURIComponent(`Projeto — ${payload.company || payload.name}`)}&body=${encodeURIComponent(briefing)}`;
      setState("success");
      setMessage(
        "Briefing preparado para o e-mail. Conclua o envio no seu aplicativo.",
      );
      return;
    }

    const file = new Blob([briefing], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const download = document.createElement("a");
    download.href = url;
    download.download = "nomad-briefing.txt";
    document.body.append(download);
    download.click();
    download.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setState("success");
    setMessage("Briefing preparado para download. Nenhum dado foi enviado.");
  }

  return (
    <div className="contact-form" id={id}>
      <div className="contact-form__intro">
        <span className="contact-form__eyebrow">VAMOS AO PONTO</span>
        <h3 id={`${prefix}-title`}>Qual é o próximo movimento?</h3>
        <p>Comece pelo que precisa mudar. O resto, construímos juntos.</p>
      </div>
      <form
        className="contact-form__fields"
        onSubmit={handleSubmit}
        aria-labelledby={`${prefix}-title`}
        aria-describedby={`${prefix}-note`}
        aria-busy={state === "sending"}
      >
        <div className="contact-form__field">
          <label htmlFor={`${prefix}-name`}>
            Seu nome <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${prefix}-name`}
            name="name"
            autoComplete="name"
            placeholder="Como podemos chamar você?"
            required
            maxLength={100}
          />
        </div>
        <div className="contact-form__field">
          <label htmlFor={`${prefix}-company`}>
            Empresa <span className="contact-form__optional">(opcional)</span>
          </label>
          <input
            id={`${prefix}-company`}
            name="company"
            autoComplete="organization"
            placeholder="Nome do seu negócio"
            maxLength={120}
          />
        </div>
        <div className="contact-form__field">
          <label htmlFor={`${prefix}-email`}>
            Seu e-mail <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${prefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@empresa.com.br"
            required
            maxLength={254}
          />
        </div>
        <div className="contact-form__field">
          <label htmlFor={`${prefix}-service`}>O que você tem em mente?</label>
          <select id={`${prefix}-service`} name="service" defaultValue="">
            <option value="">Vamos definir juntos</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </div>
        <div className="contact-form__field contact-form__field--wide">
          <label htmlFor={`${prefix}-challenge`}>
            O que hoje limita sua operação? <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={`${prefix}-challenge`}
            name="challenge"
            placeholder="Conte um pouco sobre o desafio e o que você quer alcançar."
            required
            maxLength={2000}
            rows={3}
          />
        </div>
        <div className="contact-form__actions">
          <p id={`${prefix}-note`} className="contact-form__note">
            {channelNotes[channel]}
          </p>
          <button
            className="contact-form__submit"
            type="submit"
            disabled={state === "sending"}
          >
            <span>
              {state === "sending" ? "Enviando…" : buttonLabels[channel]}
            </span>
            <Arrow diagonal />
          </button>
        </div>
        <div
          className={`contact-form__feedback${state === "error" ? " contact-form__feedback--error" : ""}`}
          role={state === "error" ? "alert" : "status"}
          aria-atomic="true"
        >
          {message}
        </div>
      </form>
    </div>
  );
}
