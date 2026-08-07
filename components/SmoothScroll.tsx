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
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
    });

    ScrollTrigger.refresh();

    if (window.location.hash) {
      // Wait a tick so layout/images settle after route change.
      requestAnimationFrame(() => {
        scrollToHash(window.location.hash, true);
      });
    }

    return () => {
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
