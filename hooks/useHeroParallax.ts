"use client";

import { type RefObject, useEffect } from "react";

const LERP = 0.08;
const MAX_OFFSET = 56;

type ParallaxItem = {
  el: HTMLElement;
  depth: number;
  y: number;
  ty: number;
};

export function useHeroParallax(collageRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const collage = collageRef.current;
    if (!collage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    if (window.matchMedia("(max-width: 860px)").matches) return;

    const nodes = collage.querySelectorAll<HTMLElement>("[data-parallax]");
    const items: ParallaxItem[] = Array.from(nodes).map((el) => ({
      el,
      depth: Number(el.dataset.parallax) || 0.35,
      y: 0,
      ty: 0,
    }));

    if (!items.length) return;

    const hero = collage.closest(".hero") as HTMLElement | null;
    let rafId = 0;
    let ticking = false;

    const updateTargets = () => {
      const heroRect = (hero ?? collage).getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // 0 at hero top aligned to viewport top, grows while scrolling through hero
      const scrolled = Math.min(Math.max(-heroRect.top, 0), heroRect.height + viewport);
      const progress = scrolled / (heroRect.height + viewport * 0.35);

      items.forEach((item) => {
        item.ty = progress * MAX_OFFSET * item.depth;
      });
    };

    const tick = () => {
      items.forEach((item) => {
        item.y += (item.ty - item.y) * LERP;

        if (Math.abs(item.y - item.ty) < 0.05 && Math.abs(item.y) < 0.05) {
          item.y = item.ty;
        }

        item.el.style.transform = `translate3d(0, ${item.y.toFixed(2)}px, 0)`;
      });

      rafId = window.requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateTargets();
        ticking = false;
      });
    };

    updateTargets();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(rafId);
      items.forEach((item) => {
        item.el.style.transform = "";
      });
    };
  }, [collageRef]);
}
