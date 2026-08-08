"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  consumeScrollIntent,
  scrollToHashWhenReady,
  scrollToTop,
  type ScrollIntent,
} from "@/lib/scroll";

/** Native scroll on route change (top, or intentional #portfolio / #uslugi / #kontakt). */
export function RouteScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;

    const intent = consumeScrollIntent();
    const hash = window.location.hash.replace(/^#/, "");
    const target =
      intent ??
      (hash === "portfolio" || hash === "uslugi" || hash === "kontakt"
        ? (hash as ScrollIntent)
        : null);

    const boot = () => {
      if (cancelled) return;

      if (target) {
        scrollToTop(false);
        requestAnimationFrame(() => {
          if (cancelled) return;
          scrollToHashWhenReady(`#${target}`, !reduceMotion);
        });
      } else {
        scrollToTop(false);
        if (window.location.hash) {
          window.history.replaceState(null, "", pathname);
        }
      }
    };

    const bootRaf = requestAnimationFrame(() => {
      requestAnimationFrame(boot);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(bootRaf);
    };
  }, [pathname]);

  return null;
}
