"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: ""
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

      setStatus("success");
      setForm(initialState);
    } catch (error) {
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
          <h2>Zacznijmy projekt, ktory zwiekszy Twoja widocznosc i liczbe klientow.</h2>
          <p>
            Opisz krotko, czego potrzebujesz. Odpowiadam zazwyczaj w ciagu jednego dnia roboczego.
          </p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
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
          <label htmlFor="phone">
            Telefon (opcjonalnie)
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
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
            name="website"
            value={form.website}
            onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
          />

          <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Wysylanie..." : "Wyslij wiadomosc"}
          </button>

          {status === "success" && <p className="form-success">Dziekuje. Wiadomosc zostala wyslana.</p>}
          {status === "error" && <p className="form-error">{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
}
