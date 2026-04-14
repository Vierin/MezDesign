const services = [
  {
    title: "Projektowanie stron internetowych",
    description:
      "Nowoczesne strony i strony docelowe z czytelna hierarchia tresci, dopracowana typografia i spojnym stylem."
  },
  {
    title: "Projektowanie materialow komunikacji wizualnej",
    description:
      "Szablony postow, relacji i karuzel, ktore utrzymuja spojna estetyke marki w komunikacji cyfrowej."
  },
  {
    title: "Materialy do druku",
    description:
      "Wizytowki, ulotki, katalogi i inne materialy offline przygotowane zgodnie z wymaganiami drukarni."
  },
  {
    title: "System prezentacji i dokumentow",
    description:
      "Szablony ofert, prezentacji i dokumentow firmowych, ktore porzadkuja komunikacje wizualna."
  },
  {
    title: "Identyfikacja wizualna marki",
    description:
      "Tozsamosc wizualna marki: logo, kolory, typografia i zasady, ktore porzadkuja caly przekaz."
  }
];

export function Services() {
  return (
    <section id="uslugi" className="section">
      <div className="container">
        <p className="eyebrow">Uslugi</p>
        <h2>Kompleksowe wsparcie projektowe dla freelancerow i firm.</h2>
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
