"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { CalBooking } from "@/components/CalBooking";
import { trackEvent } from "@/lib/analytics";

type FormState = {
  name: string;
  email: string;
  companyName: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  companyName: "",
  message: "",
  website: "",
};

const CLIENT_LIMIT_KEY = "mez_contact_submits";
const CLIENT_WINDOW_MS = 60 * 60 * 1000;
const CLIENT_MAX = 3;

function readClientSubmits(): number[] {
  try {
    const raw = localStorage.getItem(CLIENT_LIMIT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const now = Date.now();
    return parsed.filter((ts): ts is number => typeof ts === "number" && now - ts < CLIENT_WINDOW_MS);
  } catch {
    return [];
  }
}

function recordClientSubmit() {
  const next = [...readClientSubmits(), Date.now()];
  localStorage.setItem(CLIENT_LIMIT_KEY, JSON.stringify(next));
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v4.2l2.8 1.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5.5" y="10.5" width="13" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.2 10.5V8a3.8 3.8 0 0 1 7.6 0v2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMessage("Uzupełnij wymagane pola: imię, e-mail i wiadomość.");
      return;
    }

    if (readClientSubmits().length >= CLIENT_MAX) {
      setStatus("error");
      setErrorMessage(
        "Wysłano już maksymalnie 3 wiadomości w ciągu godziny. Spróbuj ponownie później.",
      );
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          companyName: form.companyName,
          message: form.message,
          website: form.website,
          siteLink: "",
        }),
      });

      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Wysyłka nie powiodła się.");
      }

      recordClientSubmit();
      trackEvent("contact_form_submit_success", {
        has_company: Boolean(form.companyName.trim()),
      });
      setStatus("success");
      setForm(initialState);
    } catch (error) {
      trackEvent("contact_form_submit_error");
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Nieznany błąd. Spróbuj ponownie za chwilę.",
      );
    }
  }

  return (
    <section id="kontakt" className="contact-section">
      <div className="container">
        <div className="contact-intro">
          <p className="contact-chip">
            Porozmawiajmy
            <Image
              src="/arrow.png"
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
            />
          </p>
          <h2 className="contact-title">
            Wybierz <span className="is-muted">najwygodniejszy</span> <br /> sposób kontaktu.
          </h2>
          <p className="contact-lead">
            Niezależnie od tego, czy wolisz szybkie spotkanie, czy krótką wiadomość –{" "}
            <strong>jestem do Twojej dyspozycji!</strong>
          </p>
        </div>

        <div className="contact-panels">
          <article className="contact-panel">
            <div className="contact-panel-head">
              <span className="contact-panel-icon is-lime" aria-hidden="true">
                <Image src="/calendar.svg" alt="" width={26} height={25} />
              </span>
              <div>
                <h3>Zarezerwuj rozmowę</h3>
                <p>Wybierz dogodny termin w moim kalendarzu.</p>
              </div>
            </div>

            <CalBooking />

            <div className="contact-panel-foot">
              <p className="contact-panel-note">
                <ClockIcon />
                <span>Po wyborze terminu otrzymasz potwierdzenie oraz link do spotkania.</span>
              </p>
            </div>
          </article>

          <article className="contact-panel">
            <div className="contact-panel-head">
              <span className="contact-panel-icon is-sky" aria-hidden="true">
                <Image src="/plane.svg" alt="" width={28} height={28} />
              </span>
              <div>
                <h3>Napisz wiadomość</h3>
                <p>Wypełnij formularz, a odezwę się tak szybko, jak to możliwe.</p>
              </div>
            </div>

            <form
              className={`contact-form${status === "success" ? " is-success" : ""}`}
              onSubmit={handleSubmit}
            >
              <label className="visually-hidden" htmlFor="contact-name">
                Imię i Nazwisko
              </label>
              <input
                id="contact-name"
                name="name"
                placeholder="Imię i Nazwisko"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
                autoComplete="name"
              />

              <label className="visually-hidden" htmlFor="contact-email">
                E-mail
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="E-mail"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                required
                autoComplete="email"
              />

              <label className="visually-hidden" htmlFor="contact-company">
                Nazwa firmy (opcjonalnie)
              </label>
              <input
                id="contact-company"
                name="companyName"
                placeholder="Nazwa firmy (opcjonalnie)"
                value={form.companyName}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, companyName: event.target.value }))
                }
                autoComplete="organization"
              />

              <label className="visually-hidden" htmlFor="contact-message">
                Wiadomość
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Napisz, w czym mogę Ci pomóc..."
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                required
              />

              <input
                aria-hidden="true"
                className="honeypot"
                tabIndex={-1}
                autoComplete="off"
                name="website"
                value={form.website}
                onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
              />

              {status === "error" && <p className="form-error">{errorMessage}</p>}

              {status === "success" && (
                <div className="form-success-overlay" role="status" aria-live="polite">
                  <h3>Dziękuję. Wiadomość została wysłana.</h3>
                  <p>Skontaktuję się z Tobą najszybciej jak to możliwe.</p>
                </div>
              )}

              <div className="contact-panel-foot">
                <button className="contact-panel-btn" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? (
                    "Wysyłanie..."
                  ) : (
                    <>
                      Wyślij wiadomość
                      <Image
                        src="/arrow-btn.svg"
                        alt=""
                        width={16}
                        height={12}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
                <p className="contact-panel-note">
                  <LockIcon />
                  <span>Twoje dane są bezpieczne i nie będą udostępniane.</span>
                </p>
              </div>
            </form>
          </article>
        </div>
      </div>
    </section>
  );
}
