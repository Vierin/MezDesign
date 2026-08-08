"use client";

import { useEffect, useRef } from "react";

const FOLLOW_LERP = 0.16;
const SCALE_LERP = 0.14;
const SCALE_LERP_HIDE = 0.28;
const SCALE_IDLE = 1;
const SCALE_MIN = 0.62;
const SCALE_HIDDEN = 0;
const LAG_FOR_MIN = 64;

/** Form controls + booking — orb collapses so native cursor stays clear. */
const HIDE_SELECTOR =
  "input:not([type='hidden']):not(.honeypot), textarea, select, [contenteditable='true'], .contact-cal, .contact-panel-btn";

const LABEL_SELECTOR = "[data-cursor-label]";

function shouldHideOrb(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(HIDE_SELECTOR));
}

function getCursorLabel(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) return null;
  const host = target.closest(LABEL_SELECTOR);
  if (!host) return null;
  return host.getAttribute("data-cursor-label");
}

export function useCursorOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, active: false, hide: false, label: null as string | null });
  const orb = useRef({ x: 0, y: 0, scale: SCALE_IDLE });
  const rafId = useRef(0);

  useEffect(() => {
    const orbEl = orbRef.current;
    if (!orbEl) return;

    const labelEl = orbEl.querySelector<HTMLElement>(".cursor-orb-label");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) {
      orbEl.hidden = true;
      return;
    }

    const setOrbVisible = (visible: boolean) => {
      orbEl.classList.toggle("is-active", visible);
      pointer.current.active = visible;
      if (!visible) {
        orb.current.scale = SCALE_IDLE;
        pointer.current.hide = false;
        pointer.current.label = null;
        orbEl.classList.remove("is-label");
      }
    };

    const applyTransform = () => {
      orbEl.style.transform = `translate3d(${orb.current.x}px, ${orb.current.y}px, 0) translate(-50%, -50%) scale(${orb.current.scale})`;
    };

    const onMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      pointer.current.hide = shouldHideOrb(event.target);
      const nextLabel = pointer.current.hide ? null : getCursorLabel(event.target);
      pointer.current.label = nextLabel;
      orbEl.classList.toggle("is-label", Boolean(nextLabel));

      if (labelEl && nextLabel && labelEl.textContent !== nextLabel) {
        labelEl.textContent = nextLabel;
      }

      if (!pointer.current.active) {
        orb.current.x = event.clientX;
        orb.current.y = event.clientY;
        orb.current.scale = pointer.current.hide ? SCALE_HIDDEN : SCALE_IDLE;
        applyTransform();
        setOrbVisible(true);
      }
    };

    const onLeave = (event: PointerEvent) => {
      if (event.relatedTarget === null) setOrbVisible(false);
    };

    const tick = () => {
      if (pointer.current.active) {
        const targetX = pointer.current.x;
        const targetY = pointer.current.y;
        const ease = reduceMotion ? 1 : FOLLOW_LERP;

        orb.current.x += (targetX - orb.current.x) * ease;
        orb.current.y += (targetY - orb.current.y) * ease;

        let targetScale: number;
        let scaleEase: number;

        if (pointer.current.hide) {
          targetScale = SCALE_HIDDEN;
          scaleEase = reduceMotion ? 1 : SCALE_LERP_HIDE;
        } else if (pointer.current.label) {
          targetScale = SCALE_IDLE;
          scaleEase = reduceMotion ? 1 : SCALE_LERP;
        } else {
          const lag = Math.hypot(targetX - orb.current.x, targetY - orb.current.y);
          const moveT = Math.min(lag / LAG_FOR_MIN, 1);
          const squash = moveT * moveT;
          targetScale = SCALE_IDLE - squash * (SCALE_IDLE - SCALE_MIN);
          scaleEase = reduceMotion ? 1 : SCALE_LERP;
        }

        orb.current.scale += (targetScale - orb.current.scale) * scaleEase;
        applyTransform();
      }

      rafId.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    rafId.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(rafId.current);
    };
  }, []);

  return orbRef;
}
