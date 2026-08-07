"use client";

import { type RefObject, useEffect } from "react";

const POS_LERP = 0.045;
const TARGET_LERP = 0.06;
const RADIUS = 360;
const MAX_SHIFT = 24;

type ScatterItem = {
  el: HTMLElement;
  strength: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  rawX: number;
  rawY: number;
};

export function useHeroScatter(collageRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const collage = collageRef.current;
    if (!collage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    const nodes = collage.querySelectorAll<HTMLElement>("[data-scatter]");
    const items: ScatterItem[] = Array.from(nodes).map((el) => ({
      el,
      strength: Number(el.dataset.scatter) || 1,
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      rawX: 0,
      rawY: 0,
    }));

    if (!items.length) return;

    let rafId = 0;
    const hero = (collage.closest(".hero") as HTMLElement | null) ?? collage;

    const resetTargets = () => {
      items.forEach((item) => {
        item.rawX = 0;
        item.rawY = 0;
      });
    };

    const onMove = (event: PointerEvent) => {
      const rect = collage.getBoundingClientRect();
      const pad = 48;
      const inside =
        event.clientX >= rect.left - pad &&
        event.clientX <= rect.right + pad &&
        event.clientY >= rect.top - pad &&
        event.clientY <= rect.bottom + pad;

      if (!inside) {
        resetTargets();
        return;
      }

      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;

      items.forEach((item) => {
        const itemRect = item.el.getBoundingClientRect();
        const cx = itemRect.left + itemRect.width / 2 - rect.left - item.x;
        const cy = itemRect.top + itemRect.height / 2 - rect.top - item.y;
        const dx = cx - pointerX;
        const dy = cy - pointerY;
        const dist = Math.hypot(dx, dy) || 1;

        if (dist >= RADIUS) {
          item.rawX = 0;
          item.rawY = 0;
          return;
        }

        const force = Math.pow(1 - dist / RADIUS, 1.85) * MAX_SHIFT * item.strength;
        item.rawX = (dx / dist) * force;
        item.rawY = (dy / dist) * force;
      });
    };

    const onLeave = () => resetTargets();

    const tick = () => {
      items.forEach((item) => {
        item.tx += (item.rawX - item.tx) * TARGET_LERP;
        item.ty += (item.rawY - item.ty) * TARGET_LERP;
        item.x += (item.tx - item.x) * POS_LERP;
        item.y += (item.ty - item.y) * POS_LERP;

        const settled =
          Math.abs(item.x) < 0.02 &&
          Math.abs(item.y) < 0.02 &&
          Math.abs(item.tx) < 0.02 &&
          Math.abs(item.ty) < 0.02 &&
          item.rawX === 0 &&
          item.rawY === 0;

        if (settled) {
          item.x = 0;
          item.y = 0;
          item.tx = 0;
          item.ty = 0;
          item.el.style.transform = "translate3d(0,0,0)";
          return;
        }

        item.el.style.transform = `translate3d(${item.x.toFixed(2)}px, ${item.y.toFixed(2)}px, 0)`;
      });

      rafId = window.requestAnimationFrame(tick);
    };

    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(rafId);
      items.forEach((item) => {
        item.el.style.transform = "";
      });
    };
  }, [collageRef]);
}
