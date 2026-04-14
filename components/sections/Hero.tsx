import Image from "next/image";

const navItems = [
  { href: "#o-mnie", label: "O nas" },
  { href: "#uslugi", label: "Uslugi" },
  { href: "#portfolio", label: "Projekty" },
  { href: "#opinie", label: "Opinie" }
];

export function Hero() {
  return (
    <section className="hero">
      <header className="topbar topbar-light">
        <p className="brand">MZ Studio</p>
        <nav aria-label="Nawigacja glowna">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-nav" href="#kontakt">
          Kontakt
        </a>
      </header>

      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-chip">
            <Image
              src="https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/6890bee0bc046268f9b1496c_magic-wand.svg"
              alt=""
              width={16}
              height={16}
            />
            Projektowanie graficzne dla nowoczesnych marek
          </p>
          <h1>
            Pomagam firmom szybko zwiekszac <span>rozpoznawalnosc w social media</span>
          </h1>
          <p className="lead">
            Tworze grafiki, branding i content wizualny, ktory od razu wyglada profesjonalnie i
            przyciaga uwage Twoich klientow w social media.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#kontakt">
              Umow bezplatna konsultacje
            </a>
            <a className="btn btn-secondary" href="#portfolio">
              Zobacz projekty
            </a>
          </div>
        </div>
        <div className="hero-media">
          <Image
            src="https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/68b38088492c916cc2b2e802_203646ac22604322e486f1d149b88bc6_Hero%20Image.avif"
            alt="Zespol pracujacy nad strategia wizualna"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
