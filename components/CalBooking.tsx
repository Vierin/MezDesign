"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK?.trim() ?? "";
const TIMEZONE = "Europe/Warsaw";
const CALL_DURATION_MIN = (() => {
  const slug = CAL_LINK.split("/")[1] ?? "";
  const match = slug.match(/(\d+)/);
  return match ? Number(match[1]) : 30;
})();

const WEEKDAYS = ["PON", "WTO", "ŚRO", "CZW", "PIĄ", "SOB", "NIE"];
const MONTHS_PL = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

type Step = "date" | "time" | "form";

type SlotsByDate = Record<string, Array<{ start: string }>>;

function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildMonthGrid(anchor: Date) {
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (first.getDay() + 6) % 7;
  const cells: Array<number | null> = Array.from({ length: startOffset }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function formatSlotLabel(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TIMEZONE,
  }).format(date);
}

function formatSelectedDate(dateKey: string) {
  const date = new Date(`${dateKey}T12:00:00`);
  return new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TIMEZONE,
  }).format(date);
}

function ChevronIcon({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === "prev" ? "M15 6 9 12l6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalBooking() {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const [step, setStep] = useState<Step>("date");
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [monthSlots, setMonthSlots] = useState<SlotsByDate>({});
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [bookStatus, setBookStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [bookError, setBookError] = useState("");

  const cells = useMemo(() => buildMonthGrid(viewDate), [viewDate]);
  const isCurrentMonth =
    viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear();

  const daySlots = selectedDate ? (monthSlots[selectedDate] ?? []) : [];

  const loadMonthSlots = useCallback(async (anchor: Date) => {
    if (!CAL_LINK) return;

    const start = toDateKey(new Date(anchor.getFullYear(), anchor.getMonth(), 1));
    const end = toDateKey(new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0));

    setSlotsLoading(true);
    setSlotsError("");

    try {
      const response = await fetch(`/api/cal/slots?start=${start}&end=${end}`);
      const body = (await response.json()) as {
        status?: string;
        data?: SlotsByDate;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(body.error ?? "Nie udało się pobrać terminów.");
      }

      setMonthSlots(body.data ?? {});
    } catch (error) {
      setMonthSlots({});
      setSlotsError(error instanceof Error ? error.message : "Nie udało się pobrać terminów.");
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMonthSlots(viewDate);
  }, [viewDate, loadMonthSlots]);

  function shiftMonth(delta: number) {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  }

  function handleSelectDay(day: number) {
    const dateKey = toDateKey(new Date(viewDate.getFullYear(), viewDate.getMonth(), day));
    setSelectedDate(dateKey);
    setSelectedSlot(null);
    setStep("time");
    trackEvent("booking_date_select", { date: dateKey });
  }

  function handleSelectSlot(slot: string) {
    setSelectedSlot(slot);
    setBookStatus("idle");
    setBookError("");
    setStep("form");
    trackEvent("booking_slot_select", { slot });
  }

  function goBackToDate() {
    setStep("date");
    setSelectedSlot(null);
  }

  function goBackToTime() {
    setStep("time");
    setSelectedSlot(null);
    setBookStatus("idle");
    setBookError("");
  }

  async function handleBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlot) return;

    setBookError("");
    setBookStatus("loading");

    try {
      const response = await fetch("/api/cal/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selectedSlot,
          name,
          email,
          notes,
        }),
      });

      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(body.error ?? "Rezerwacja nie powiodła się.");
      }

      trackEvent("booking_success", { location: "contact_section" });
      setBookStatus("success");
      setName("");
      setEmail("");
      setNotes("");
    } catch (error) {
      trackEvent("booking_error", { location: "contact_section" });
      setBookStatus("error");
      setBookError(error instanceof Error ? error.message : "Nieznany błąd.");
    }
  }

  if (!CAL_LINK) {
    return (
      <div className="contact-cal is-empty">
        <p>
          Ustaw <code>NEXT_PUBLIC_CAL_LINK</code> w <code>.env.local</code> (np.{" "}
          <code>twoj-nick/30min</code>).
        </p>
      </div>
    );
  }

  return (
    <div className="contact-cal">
      {step === "date" && (
        <div className="contact-cal-step">
          <div className="contact-calendar-top">
            <p className="contact-calendar-month">
              {MONTHS_PL[viewDate.getMonth()]} {viewDate.getFullYear()}
            </p>
            <div className="contact-calendar-nav">
              <button type="button" aria-label="Poprzedni miesiąc" onClick={() => shiftMonth(-1)}>
                <ChevronIcon dir="prev" />
              </button>
              <button type="button" aria-label="Następny miesiąc" onClick={() => shiftMonth(1)}>
                <ChevronIcon dir="next" />
              </button>
            </div>
          </div>

          <div className="contact-calendar-weekdays">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="contact-calendar-grid">
            {cells.map((day, index) => {
              if (!day) return <span key={`e-${index}`} className="is-empty" />;

              const dateKey = toDateKey(new Date(viewDate.getFullYear(), viewDate.getMonth(), day));
              const isPast = isCurrentMonth && day < today.getDate();
              const hasSlots = (monthSlots[dateKey]?.length ?? 0) > 0;
              const isSelected = selectedDate === dateKey;
              const disabled = isPast || (!slotsLoading && !hasSlots);

              return (
                <button
                  key={day}
                  type="button"
                  className={`contact-calendar-day${isSelected ? " is-selected" : ""}`}
                  disabled={disabled}
                  onClick={() => handleSelectDay(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {slotsLoading && <p className="contact-cal-status">Ładowanie dostępności…</p>}
          {slotsError && <p className="contact-cal-status is-error">{slotsError}</p>}
        </div>
      )}

      {step === "time" && selectedDate && (
        <div className="contact-cal-step">
          <div className="contact-cal-time-head">
            <button
              type="button"
              className="contact-cal-back"
              onClick={goBackToDate}
              aria-label="Wróć do wyboru daty"
            >
              <ChevronIcon dir="prev" />
            </button>
            <p className="contact-cal-time-date">{formatSelectedDate(selectedDate)}</p>
          </div>

          {slotsLoading ? (
            <p className="contact-cal-status">Ładowanie godzin…</p>
          ) : daySlots.length === 0 ? (
            <p className="contact-cal-status">Brak wolnych terminów tego dnia.</p>
          ) : (
            <div className="contact-cal-slots">
              {daySlots.map((slot) => (
                <button
                  key={slot.start}
                  type="button"
                  className="contact-cal-slot"
                  onClick={() => handleSelectSlot(slot.start)}
                >
                  {formatSlotLabel(slot.start)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {step === "form" && selectedDate && selectedSlot && (
        <div className="contact-cal-step is-form">
          <div className="contact-cal-time-head">
            <button
              type="button"
              className="contact-cal-back"
              onClick={goBackToTime}
              aria-label="Zmień godzinę"
            >
              <ChevronIcon dir="prev" />
            </button>
            <p className="contact-cal-time-date">
              {formatSelectedDate(selectedDate)} · {formatSlotLabel(selectedSlot)}{" "}
              ({CALL_DURATION_MIN} min)
            </p>
          </div>

          {bookStatus === "success" ? (
            <div className="contact-cal-success" role="status" aria-live="polite">
              <h3>Dziękuję. Termin został zarezerwowany.</h3>
              <p>Potwierdzenie oraz link do spotkania otrzymasz na e-mail.</p>
            </div>
          ) : (
            <form className="contact-cal-book-form" onSubmit={handleBook}>
              <label className="visually-hidden" htmlFor="cal-book-name">
                Imię i Nazwisko
              </label>
              <input
                id="cal-book-name"
                name="name"
                placeholder="Imię i Nazwisko"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoComplete="name"
              />

              <label className="visually-hidden" htmlFor="cal-book-email">
                E-mail
              </label>
              <input
                id="cal-book-email"
                type="email"
                name="email"
                placeholder="E-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
              />

              <label className="visually-hidden" htmlFor="cal-book-notes">
                Dodatkowe informacje
              </label>
              <textarea
                id="cal-book-notes"
                name="notes"
                rows={4}
                placeholder="Dodatkowe informacje, które pomogą przygotować się do rozmowy..."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />

              {bookStatus === "error" && <p className="contact-cal-status is-error">{bookError}</p>}

              <button
                type="submit"
                className="contact-panel-btn"
                disabled={bookStatus === "loading"}
              >
                {bookStatus === "loading" ? "Rezerwuję..." : "Potwierdź →"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
