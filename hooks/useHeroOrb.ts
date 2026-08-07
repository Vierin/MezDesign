"use client";

import { type RefObject, useEffect, useRef } from "react";

const FOLLOW_LERP = 0.12;
const SCALE_LERP = 0.1;
const SCALE_IDLE = 1;
const SCALE_MIN = 0.55;
const LAG_FOR_MIN = 72;

export function useHeroOrb(containerRef: RefObject<HTMLElement | null>) {
  const orbRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const orb = useRef({ x: 0, y: 0, scale: SCALE_IDLE });
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
      if (!visible) orb.current.scale = SCALE_IDLE;
    };

    const applyTransform = () => {
      orbEl.style.transform = `translate3d(${orb.current.x}px, ${orb.current.y}px, 0) translate(-50%, -50%) scale(${orb.current.scale})`;
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
        orb.current.scale = SCALE_IDLE;
        applyTransform();
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

        const lag = Math.hypot(targetX - orb.current.x, targetY - orb.current.y);
        const moveT = Math.min(lag / LAG_FOR_MIN, 1);
        const targetScale = SCALE_IDLE - moveT * (SCALE_IDLE - SCALE_MIN);
        const scaleEase = reduceMotion ? 1 : SCALE_LERP;
        orb.current.scale += (targetScale - orb.current.scale) * scaleEase;

        applyTransform();
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
