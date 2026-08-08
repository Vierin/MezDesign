"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { trackEvent } from "@/lib/analytics";
import {
  clearScrollIntent,
  scrollToHash,
  setScrollIntent,
  type ScrollIntent,
} from "@/lib/scroll";

const navItems = [
  { href: "/#portfolio", label: "Projekty", intent: "portfolio" as ScrollIntent },
  { href: "/#uslugi", label: "Usługi", intent: "uslugi" as ScrollIntent },
  { href: "/o-mnie", label: "O mnie" },
  { href: "/#kontakt", label: "Kontakt", intent: "kontakt" as ScrollIntent },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
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

    gsap.ticker.add(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      gsap.ticker.remove(onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goHomeWithIntent = (
    event: React.MouseEvent<HTMLAnchorElement>,
    intent: ScrollIntent,
  ) => {
    event.preventDefault();

    if (pathname === "/") {
      scrollToHash(`#${intent}`);
      window.history.pushState(null, "", `#${intent}`);
      return;
    }

    setScrollIntent(intent);
    router.push(`/#${intent}`);
  };

  return (
    <div className={`site-header${isHidden ? " is-hidden" : ""}`}>
      <header className="topbar">
        <div className="container topbar-inner">
          <Link
            className="brand"
            href="/"
            onClick={() => clearScrollIntent()}
          >
            Mez<span>.Design</span>
          </Link>
          <div className="topbar-end">
            <nav aria-label="Nawigacja główna">
              <ul className="nav-list">
                {navItems.map((item) => (
                  <li key={item.href}>
                    {item.intent ? (
                      <a
                        href={item.href}
                        onClick={(event) => goHomeWithIntent(event, item.intent!)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} onClick={() => clearScrollIntent()}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <a
              className="btn btn-nav"
              href="/#kontakt"
              onClick={(event) => {
                trackEvent("cta_click", { location: "header_nav", target: "kontakt" });
                goHomeWithIntent(event, "kontakt");
              }}
            >
              {pathname.startsWith("/projekty")
                ? "Wypełnij formularz"
                : "Pogadajmy o twoim projekcie"}
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
