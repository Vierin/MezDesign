"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { scrollToHash } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      if (window.location.hash) {
        requestAnimationFrame(() => scrollToHash(window.location.hash, false));
      }
      return;
    }

    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const smoother = ScrollSmoother.create({
      wrapper,
      content,
      smooth: 1.2,
      effects: false,
      smoothTouch: 0.1,
      normalizeScroll: true,
    });

    let refreshRaf = 0;
    let resizeTimer = 0;
    let lastHeight = content.offsetHeight;

    const refresh = () => {
      cancelAnimationFrame(refreshRaf);
      refreshRaf = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        lastHeight = content.offsetHeight;
      });
    };

    refresh();

    const onLoad = () => refresh();
    window.addEventListener("load", onLoad);

    const fontsReady = document.fonts?.ready?.then(refresh);

    const images = content.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", refresh, { once: true });
        img.addEventListener("error", refresh, { once: true });
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      const nextHeight = content.offsetHeight;
      if (Math.abs(nextHeight - lastHeight) < 1) return;
      lastHeight = nextHeight;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refresh, 80);
    });
    resizeObserver.observe(content);

    if (window.location.hash) {
      requestAnimationFrame(() => {
        scrollToHash(window.location.hash, true);
      });
    }

    return () => {
      cancelAnimationFrame(refreshRaf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("load", onLoad);
      resizeObserver.disconnect();
      void fontsReady;
      smoother.kill();
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
