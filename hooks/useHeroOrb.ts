"use client";

import { type RefObject, useEffect, useRef } from "react";

const FOLLOW_LERP = 0.12;

export function useHeroOrb(containerRef: RefObject<HTMLElement | null>) {
  const orbRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const orb = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const orbEl = orbRef.current;
    if (!container || !orbEl) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) {
      orbEl.hidden = true;
      return;
    }

    const setOrbVisible = (visible: boolean) => {
      orbEl.classList.toggle("is-active", visible);
      pointer.current.active = visible;
    };

    const onMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        setOrbVisible(false);
        return;
      }

      pointer.current.x = x;
      pointer.current.y = y;

      if (!pointer.current.active) {
        orb.current.x = x;
        orb.current.y = y;
        orbEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        setOrbVisible(true);
      }
    };

    const onLeave = () => setOrbVisible(false);

    const tick = () => {
      if (pointer.current.active) {
        const targetX = pointer.current.x;
        const targetY = pointer.current.y;
        const ease = reduceMotion ? 1 : FOLLOW_LERP;

        orb.current.x += (targetX - orb.current.x) * ease;
        orb.current.y += (targetY - orb.current.y) * ease;

        orbEl.style.transform = `translate3d(${orb.current.x}px, ${orb.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = window.requestAnimationFrame(tick);
    };

    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);
    rafId.current = window.requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(rafId.current);
    };
  }, [containerRef]);

  return orbRef;
}
