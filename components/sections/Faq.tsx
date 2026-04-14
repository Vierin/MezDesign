"use client";

import { useState } from "react";

const faq = [
  {
    question: "Jak przebiega proces projektowy?",
    answer:
      "Zaczynamy od krotkiego briefu, potem przygotowuje kierunek wizualny, a po akceptacji dopracowuje finalne materialy."
  },
  {
    question: "Co zawiera pakiet identyfikacji wizualnej?",
    answer:
      "Zalezne od zakresu, ale najczesciej obejmuje logo, kolorystyke, typografie i zasady uzycia w dokumentacji marki."
  },
  {
    question: "Ile trwa przygotowanie projektu?",
    answer:
      "Mniejsze projekty realizuje zwykle w 7-14 dni, a pelna identyfikacja wizualna zajmuje zazwyczaj od 3 do 5 tygodni."
  },
  {
    question: "Czy moge zlecic tylko jeden element, np. logo?",
    answer:
      "Tak. Mozesz zamowic pojedynczy projekt albo rozbudowac zakres o kolejne elementy wizualne."
  },
  {
    question: "Jak wyglada przekazanie plikow po zakonczeniu?",
    answer:
      "Otrzymujesz uporzadkowany pakiet plikow produkcyjnych i webowych oraz krotkie wytyczne, jak poprawnie ich uzywac."
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq-section">
      <div className="container">
        <div className="faq-header">
          <p className="faq-pill">
            <span aria-hidden>•</span>
            Spojny System Wizualny
          </p>
          <h2>Masz pytania?</h2>
          <p className="faq-subtitle">
            Projektuje identyfikacje i materialy, ktore sa estetyczne, czytelne i gotowe
            do wdrozenia od razu po odbiorze.
          </p>
        </div>
        <div className="faq-list">
          {faq.map((item, index) => (
            <article
              key={item.question}
              className={`faq-item${openIndex === index ? " is-open" : ""}`}
            >
              <button
                type="button"
                className="faq-trigger"
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex((prev) => (prev === index ? -1 : index))}
              >
                {item.question}
              </button>
              <div id={`faq-panel-${index}`} className="faq-answer">
                <div className="faq-answer-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
