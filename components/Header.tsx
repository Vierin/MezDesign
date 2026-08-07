"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const navItems = [
  { href: "#portfolio", label: "Projekty" },
  { href: "#o-mnie", label: "O mnie" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY <= 20) {
        setIsHidden(false);
      } else if (delta > 6 && currentY > 120) {
        setIsHidden(true);
      } else if (delta < -6) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`hero-topbar-shell${isHidden ? " is-hidden" : ""}`}>
      <header className="topbar">
        <a className="brand" href="#top">
          Mez<span>.Design</span>
        </a>
        <div className="topbar-end">
          <nav aria-label="Nawigacja główna">
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
            Wypełnij formularz
          </a>
        </div>
      </header>
    </div>
  );
}
