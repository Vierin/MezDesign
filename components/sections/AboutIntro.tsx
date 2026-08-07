import Image from "next/image";

const helpItems = [
  "Landing page",
  "Prowadzenie social media",
  "Montaż video contentu",
  "Kreacje do Google Ads i Meta Ads",
  "Identyfikacja wizualna",
  "Materiały marketingowe",
  "Materiały drukowane",
  "AI-content",
];

export function AboutIntro() {
  return (
    <section className="about-intro">
      <div className="container about-intro-grid">
        <div className="about-intro-col">
          <h2>O mnie:</h2>
          <p>
            Łączę doświadczenie agencyjne i marketingowe z samodzielnym prowadzeniem projektów i
            praktycznym wykorzystaniem AI.
          </p>
          <p>
            Codziennie pomagam markom tworzyć spójny wizerunek we wszystkich punktach kontaktu z
            klientem — od digitalu po materiały drukowane.
          </p>
        </div>

        <div className="about-intro-col">
          <h2>W czym mogę pomóc:</h2>
          <ul className="about-intro-list">
            {helpItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <figure className="about-intro-portrait">
          <div className="about-intro-media">
            <Image
              src="/about-2.jpg"
              alt="Daria Mezeankina"
              width={854}
              height={946}
              sizes="(max-width: 860px) 100vw, 360px"
            />
          </div>
          <figcaption>
            <p className="about-intro-name">Daria Mezeankina</p>
            <p className="about-intro-role">Multidisciplinary Designer</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
