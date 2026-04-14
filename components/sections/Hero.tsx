"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const navItems = [
  { href: "#o-mnie", label: "O nas" },
  { href: "#uslugi", label: "Uslugi" },
  { href: "#portfolio", label: "Projekty" },
  { href: "#opinie", label: "Opinie" }
];

export function Hero() {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateHeaderVisibility = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY <= 20) {
        setIsHeaderHidden(false);
      } else if (delta > 6 && currentY > 120) {
        setIsHeaderHidden(true);
      } else if (delta < -6) {
        setIsHeaderHidden(false);
      }

      lastScrollY.current = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeaderVisibility);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero">
      <div className={`hero-topbar-shell${isHeaderHidden ? " is-hidden" : ""}`}>
        <header className="topbar topbar-light">
          <p className="brand">Mez Design</p>
          <nav aria-label="Nawigacja glowna">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            className="btn btn-nav"
            href="#kontakt"
            onClick={() => trackEvent("cta_click", { location: "header_nav", target: "kontakt" })}
          >
            Kontakt
          </a>
        </header>
      </div>

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
            Tworze projekty, ktore buduja <span>spojny i profesjonalny wizerunek marki</span>
          </h1>
          <p className="lead">
            Projektuje identyfikacje wizualne, strony i materialy, ktore sa estetyczne,
            czytelne i gotowe do codziennego uzycia w Twojej marce.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-primary"
              href="#kontakt"
              onClick={() => trackEvent("cta_click", { location: "hero_primary", target: "kontakt" })}
            >
              Umow konsultacje projektowa
            </a>
            <a
              className="btn btn-secondary"
              href="#portfolio"
              onClick={() => trackEvent("cta_click", { location: "hero_secondary", target: "portfolio" })}
            >
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
