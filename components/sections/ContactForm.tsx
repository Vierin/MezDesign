"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type FormState = {
  name: string;
  email: string;
  siteLink: string;
  message: string;
  company: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  siteLink: "",
  message: "",
  company: ""
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMessage("Uzupelnij wymagane pola: imie, e-mail i wiadomosc.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        throw new Error(body.error ?? "Wysylka nie powiodla sie.");
      }

      trackEvent("contact_form_submit_success", {
        has_site_link: Boolean(form.siteLink.trim())
      });
      setStatus("success");
      setForm(initialState);
    } catch (error) {
      trackEvent("contact_form_submit_error");
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Nieznany blad. Sprobuj ponownie za chwile."
      );
    }
  }

  return (
    <section id="kontakt" className="section contact-section">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">Kontakt</p>
          <h2>Zacznijmy projekt, ktory uporzadkuje i wzmocni Twoja komunikacje wizualna.</h2>
          <p>
            Opisz krotko, czego potrzebujesz. Odpowiadam zazwyczaj w ciagu jednego dnia roboczego.
          </p>
        </div>
        <form
          className={`contact-form${status === "success" ? " is-success" : ""}`}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">
            Imie i nazwisko
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
          </label>
          <label htmlFor="siteLink">
            Adres strony lub link do social media (opcjonalnie)
            <input
              id="siteLink"
              name="siteLink"
              value={form.siteLink}
              onChange={(event) => setForm((prev) => ({ ...prev, siteLink: event.target.value }))}
            />
          </label>
          <label htmlFor="message">
            Wiadomosc
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              required
            />
          </label>

          <input
            aria-hidden="true"
            className="honeypot"
            tabIndex={-1}
            autoComplete="off"
            name="company"
            value={form.company}
            onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
          />

          <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Wysylanie..." : "Wyslij wiadomosc"}
          </button>

          {status === "error" && <p className="form-error">{errorMessage}</p>}

          {status === "success" && (
            <div className="form-success-overlay" role="status" aria-live="polite">
              <h3>Dziekuje. Wiadomosc zostala wyslana.</h3>
              <p>Skontaktuje sie z Toba najszybciej jak to mozliwe.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
