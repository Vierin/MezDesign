const testimonials = [
  {
    name: "Anna Kowalska",
    role: "Wlascicielka marki beauty",
    quote:
      "Wspolpraca byla konkretna i szybka. Dostalismy branding, ktory od razu podniosl postrzeganie naszej marki."
  },
  {
    name: "Marek Zielinski",
    role: "Freelance konsultant",
    quote:
      "Nowa strona i komunikacja e-mail pomogly mi regularnie domykac rozmowy z klientami premium."
  },
  {
    name: "Katarzyna Nowak",
    role: "Manager marketingu",
    quote:
      "Materialy byly estetyczne i gotowe technicznie do druku. Zero poprawek po stronie drukarni."
  }
];

export function Testimonials() {
  return (
    <section id="opinie" className="section">
      <div className="container">
        <p className="eyebrow">Opinie</p>
        <h2>Klienci wracaja, bo design przeklada sie na realne wyniki.</h2>
        <div className="card-grid testimonials-grid">
          {testimonials.map((testimonial) => (
            <article className="card" key={testimonial.name}>
              <p>&quot;{testimonial.quote}&quot;</p>
              <p className="testimonial-author">
                {testimonial.name} - {testimonial.role}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
