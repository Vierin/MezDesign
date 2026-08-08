"use client";

import { useCursorOrb } from "@/hooks/useCursorOrb";

export function CursorOrb() {
  const orbRef = useCursorOrb();

  return <div ref={orbRef} className="cursor-orb" aria-hidden="true" />;
}
