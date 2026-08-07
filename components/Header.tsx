"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackEvent } from "@/lib/analytics";
import { scrollToHash } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const navItems = [
  { href: "/#portfolio", label: "Projekty" },
  { href: "/o-mnie", label: "O mnie" },
  { href: "/#kontakt", label: "Kontakt" },
];

function getScrollY() {
  return ScrollSmoother.get()?.scrollTop() ?? window.scrollY;
}

export function Header() {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      const currentY = getScrollY();
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

    gsap.ticker.add(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      gsap.ticker.remove(onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleHashNav = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;

    const hash = href.slice(hashIndex);
    const path = href.slice(0, hashIndex) || "/";

    if (pathname === path || (path === "/" && pathname === "/")) {
      event.preventDefault();
      scrollToHash(hash);
      window.history.pushState(null, "", hash);
      return;
    }

    // Cross-page: let Next navigate; SmoothScroll will pick up the hash.
  };

  return (
    <div className={`site-header${isHidden ? " is-hidden" : ""}`}>
      <header className="topbar">
        <div className="container topbar-inner">
          <Link className="brand" href="/">
            Mez<span>.Design</span>
          </Link>
          <div className="topbar-end">
            <nav aria-label="Nawigacja główna">
              <ul className="nav-list">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(event) => handleHashNav(event, item.href)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              className="btn btn-nav"
              href="/#kontakt"
              onClick={(event) => {
                trackEvent("cta_click", { location: "header_nav", target: "kontakt" });
                handleHashNav(event, "/#kontakt");
              }}
            >
              Pogadajmy o twoim projekcie
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
