const faq = [
  {
    question: "Ile trwa przygotowanie strony internetowej?",
    answer:
      "Najczesciej od 2 do 5 tygodni, w zaleznosci od zakresu i tego, czy dostarczasz gotowe tresci."
  },
  {
    question: "Czy moge zamowic tylko jedna usluge?",
    answer:
      "Tak. Mozesz zamowic pojedynczy projekt, np. branding albo same materialy do druku."
  },
  {
    question: "Czy pracujesz z klientami z calej Polski?",
    answer: "Tak, caly proces prowadzony jest online i obejmuje regularne aktualizacje postepu."
  },
  {
    question: "Czy po wdrozeniu oferujesz wsparcie?",
    answer:
      "Tak, po zakonczeniu projektu mozemy przejsc na miesieczne wsparcie i optymalizacje."
  }
];

export function Faq() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">FAQ</p>
        <h2>Najczesciej zadawane pytania przed rozpoczeciem wspolpracy.</h2>
        <div className="faq-list">
          {faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
