import type { ReactNode } from "react";

export function withRegisteredMark(text: string): ReactNode {
  const parts = text.split("®");
  if (parts.length === 1) return text;

  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 ? <sup className="tm">®</sup> : null}
    </span>
  ));
}
