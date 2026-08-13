import Image from "next/image";

type Service = {
  title: string;
  subtitle: string;
  features: string[];
};

const services: Service[] = [
  {
    title: "Web Design",
    subtitle: "Landing pages · Strony internetowe",
    features: [
      "Landing pages, e-commerce",
      "Analiza konkurencji",
      "Projekt UI/UX",
      "Wersja desktop + mobile",
      "Przygotowanie do wdrożenia",
      "Dokładny brief dotyczący wdrożenia projektu",
    ],
  },
  {
    title: "Social Media + Mailingi",
    subtitle: "Grafiki · Karuzele · Reels · Mailingi",
    features: [
      "Opracowywanie koncepcji i planu publikacji opartej na celach biznesowych",
      "Montaż rolek / tworzenie karuzeli / postów / stories",
      "Spójna linia wizualna",
    ],
  },
  {
    title: "Google & Meta Ads",
    subtitle: "Kreacje reklamowe · Kampanie wizualne",
    features: [
      "Koncepcja kreatywna",
      "Adaptacje do platform i formatów (Meta, Google)",
      "Przygotowanie plików do publikacji",
    ],
  },
  {
    title: "Print Design",
    subtitle: "Ulotki · Katalogi · Materiały drukowane",
    features: [
      "Projekt graficzny",
      "Przygotowanie materiałów do drukarni",
      "Wsparcie w doborze formatu",
    ],
  },
  {
    title: "Branding",
    subtitle: "Logo · Identyfikacja wizualna",
    features: [
      "Logo (3 koncepcje)",
      "3 formaty (post + karuzele + stories)",
      "Spójna linia wizualna",
      "2 rundy poprawek",
    ],
  },
  {
    title: "AI Content",
    subtitle: "AI visuals · Video content",
    features: [
      "Koncepcja wizualna",
      "Grafiki/video generowane AI",
      "Selekcja i retusz",
      "Adaptacja do SM",
    ],
  },
];

export function Services() {
  return (
    <section id="uslugi" className="services-section">
      <div className="container grid services-layout">
        <header className="services-intro">
          <h2 className="services-title">
            Usługi
            <Image
              className="services-star"
              src="/icon-star.png"
              alt=""
              width={28}
              height={28}
              aria-hidden="true"
            />
          </h2>
          <p className="services-lead">
            <Image
              className="services-lead-star"
              src="/icon-star.png"
              alt=""
              width={18}
              height={18}
              aria-hidden="true"
            />
            <span>
              Poniższe ceny mają charakter orientacyjny i mogą się różnić w
              zależności od zakresu, celów i indywidualnych potrzeb projektu.
              Każda realizacja wyceniana jest indywidualnie.
            </span>
          </p>
        </header>

        <div className="services-grid">
          {services.map((service) => (
            <article className="services-card" key={service.title}>
              <span className="services-card-icon" aria-hidden="true">
                <Image src="/plane.svg" alt="" width={22} height={22} />
              </span>

              <h3 className="services-card-title">{service.title}</h3>
              <p className="services-card-subtitle">{service.subtitle}</p>

              <hr className="services-card-rule" />

              <ul className="services-card-list">
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
