"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      if (menuOpen) {
        setIsHidden(false);
        ticking = false;
        return;
      }

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
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const desktopQuery = window.matchMedia("(min-width: 861px)");
    const onDesktop = () => {
      if (desktopQuery.matches) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", onDesktop);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const goHomeWithIntent = (
    event: React.MouseEvent<HTMLAnchorElement>,
    intent: ScrollIntent,
  ) => {
    event.preventDefault();
    setMenuOpen(false);

    if (pathname === "/") {
      scrollToHash(`#${intent}`);
      window.history.pushState(null, "", `#${intent}`);
      return;
    }

    setScrollIntent(intent);
    router.push(`/#${intent}`);
  };

  const closeMenu = () => setMenuOpen(false);

  const navContent = (
    <>
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
                <Link
                  href={item.href}
                  onClick={() => {
                    clearScrollIntent();
                    closeMenu();
                  }}
                >
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
    </>
  );

  return (
    <div
      className={`site-header${isHidden ? " is-hidden" : ""}${menuOpen ? " is-menu-open" : ""}`}
    >
      <header className="topbar">
        <div className="container topbar-inner">
          <Link
            className="brand"
            href="/"
            onClick={() => {
              clearScrollIntent();
              closeMenu();
            }}
          >
            Mez<span>.Design</span>
          </Link>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            onClick={(event) => {
              event.stopPropagation();
              setMenuOpen((open) => !open);
            }}
          >
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
          </button>

          <div className="topbar-end">{navContent}</div>
        </div>
      </header>

      <div
        className="mobile-nav"
        id="site-nav"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-nav-inner">{navContent}</div>
      </div>
    </div>
  );
}
