"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import {
  consumeScrollIntent,
  scrollToHashWhenReady,
  scrollToTop,
} from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  // Create once — recreating on every route breaks ScrollSmoother.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    ScrollSmoother.get()?.kill();

    const smoother = ScrollSmoother.create({
      wrapper,
      content,
      smooth: 1.2,
      effects: false,
      smoothTouch: 0.1,
      normalizeScroll: true,
    });
    smootherRef.current = smoother;

    ScrollTrigger.refresh();

    return () => {
      smootherRef.current = null;
      smoother.kill();
    };
  }, []);

  // Route change: always top, unless intentional nav (Projekty / Kontakt).
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const content = contentRef.current;
    if (!content) return;

    let cancelled = false;
    let refreshRaf = 0;
    let resizeTimer = 0;
    let lastHeight = 0;

    const intent = consumeScrollIntent();
    const hash = window.location.hash.replace(/^#/, "");
    // Only Projekty (portfolio) is the documented exception from other pages.
    // Kontakt keeps working the same way for CTA / nav consistency.
    const target =
      intent ??
      (hash === "portfolio" || hash === "kontakt" ? (hash as "portfolio" | "kontakt") : null);

    const refresh = () => {
      if (cancelled) return;
      cancelAnimationFrame(refreshRaf);
      refreshRaf = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        lastHeight = content.offsetHeight;
      });
    };

    const boot = () => {
      if (cancelled) return;

      if (target) {
        scrollToTop(false);
        refresh();
        requestAnimationFrame(() => {
          if (cancelled) return;
          scrollToHashWhenReady(`#${target}`, !reduceMotion);
        });
      } else {
        scrollToTop(false);
        if (window.location.hash) {
          window.history.replaceState(null, "", pathname);
        }
        refresh();
      }
    };

    const bootRaf = requestAnimationFrame(() => {
      requestAnimationFrame(boot);
    });

    const onLoad = () => refresh();
    window.addEventListener("load", onLoad);

    const fontsReady = document.fonts?.ready?.then(() => {
      if (!cancelled) refresh();
    });

    const bindImages = () => {
      content.querySelectorAll("img").forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", refresh, { once: true });
          img.addEventListener("error", refresh, { once: true });
        }
      });
    };
    bindImages();
    const imgTimer = window.setTimeout(bindImages, 120);

    const resizeObserver = new ResizeObserver(() => {
      const nextHeight = content.offsetHeight;
      if (Math.abs(nextHeight - lastHeight) < 1) return;
      lastHeight = nextHeight;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refresh, 80);
    });
    resizeObserver.observe(content);

    return () => {
      cancelled = true;
      cancelAnimationFrame(bootRaf);
      cancelAnimationFrame(refreshRaf);
      window.clearTimeout(resizeTimer);
      window.clearTimeout(imgTimer);
      window.removeEventListener("load", onLoad);
      resizeObserver.disconnect();
      void fontsReady;
    };
  }, [pathname]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
