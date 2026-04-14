const services = [
  {
    title: "Tworzenie stron internetowych",
    description:
      "Nowoczesne strony i landing page, ktore buduja zaufanie i prowadza uzytkownika do kontaktu."
  },
  {
    title: "Content i prowadzenie social media",
    description:
      "Plan komunikacji, grafiki i copy pod regularna obecność marki na Instagramie, Facebooku i LinkedIn."
  },
  {
    title: "Materialy do druku",
    description:
      "Wizytowki, ulotki, katalogi i inne materialy offline przygotowane zgodnie z wymaganiami drukarni."
  },
  {
    title: "E-mail marketing",
    description:
      "Szablony newsletterow, scenariusze kampanii i komunikacja, ktora zwieksza powroty i sprzedaz."
  },
  {
    title: "Branding",
    description:
      "Tozsamosc wizualna marki: logo, kolory, typografia i zasady, ktore porzadkuja caly przekaz."
  }
];

export function Services() {
  return (
    <section id="uslugi" className="section">
      <div className="container">
        <p className="eyebrow">Uslugi</p>
        <h2>Kompleksowe wsparcie wizualne i marketingowe dla freelancerow i firm.</h2>
        <div className="card-grid services-grid">
          {services.map((service) => (
            <article className="card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
