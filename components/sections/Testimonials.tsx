import Image from "next/image";

const leftCards = [
  {
    quote:
      "Ich strategiczne podejscie i jakosc projektow wizualnych szybko podniosly rozpoznawalnosc naszej marki."
  },
  {
    name: "Ethan Cole",
    role: "Brand Strategist",
    avatar:
      "https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/6892110cf1e57709cfa174b8_Profile%201.avif",
    quote:
      "Od koncepcji do wdrozenia wszystko bylo konkretne, szybkie i bardzo dobrze zaplanowane."
  }
];

const rightCards = [
  {
    name: "Max Turner",
    role: "Marketing Manager",
    avatar:
      "https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/6892110ca98321d20a239824_Profile%202.avif",
    quote:
      "Wspolpraca przebiegla plynnie, a nowa oprawa wizualna dala nam wieksza wiarygodnosc i lepsze wyniki."
  },
  {
    name: "Leo Bennett",
    role: "Creative Director",
    avatar:
      "https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/6892110c97d3296f9216d7a8_Profile%203.avif",
    quote:
      "Dostalismy system wizualny, ktory jest latwy do wdrozenia i dziala swietnie zarowno online, jak i offline."
  }
];

export function Testimonials() {
  return (
    <section id="opinie" className="section testimonials-section">
      <div className="container">
        <p className="eyebrow">Client Feedback</p>
        <h2>
          Trusted by brands worldwide
          <br />
          and <span>growing every day</span>
        </h2>

        <div className="testimonials-layout">
          <div className="testimonials-column">
            {leftCards.map((card, index) => (
              <article className="testimonial-card" key={`left-${index}`}>
                {card.avatar && card.name && card.role ? (
                  <div className="testimonial-meta">
                    <Image src={card.avatar} alt={card.name} width={44} height={44} />
                    <div>
                      <p className="testimonial-name">{card.name}</p>
                      <p className="testimonial-role">{card.role}</p>
                    </div>
                  </div>
                ) : null}
                <p className="testimonial-quote">&quot;{card.quote}&quot;</p>
              </article>
            ))}
          </div>

          <article className="testimonial-featured">
            <p className="testimonial-badge">CEO of Merkil</p>
            <Image
              src="https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/689213eeb0073b2a0a61c9ee_Ceo%20Image.avif"
              alt="CEO portret"
              width={280}
              height={320}
              className="testimonial-featured-image"
            />
            <p className="testimonial-featured-quote">
              &quot;Ich kreatywne podejscie i strategia wyniosly nasza marke na nowy poziom. Efekt
              koncowy byl dokladnie tym, czego potrzebowalismy.&quot;
            </p>
            <div className="testimonial-featured-stats">
              <div>
                <p className="stat-value">98%</p>
                <p className="stat-label">Satisfied Client Rate</p>
              </div>
              <div>
                <p className="stat-value">08+</p>
                <p className="stat-label">Brands experiences</p>
              </div>
            </div>
          </article>

          <div className="testimonials-column">
            {rightCards.map((card, index) => (
              <article className="testimonial-card" key={`right-${index}`}>
                <div className="testimonial-meta">
                  <Image src={card.avatar} alt={card.name} width={44} height={44} />
                  <div>
                    <p className="testimonial-name">{card.name}</p>
                    <p className="testimonial-role">{card.role}</p>
                  </div>
                </div>
                <p className="testimonial-quote">&quot;{card.quote}&quot;</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
