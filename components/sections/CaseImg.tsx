"use client";

import Image from "next/image";
import { useState } from "react";

type CaseImgProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
};

export function CaseImg({ src, alt, width, height, priority = false }: CaseImgProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="case-img">
      <div className="container">
        <div
          className={`case-img-media${loaded ? " is-loaded" : ""}${priority ? " is-priority" : ""}`}
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 860px) calc(100vw - 1.7rem), min(1320px, calc(100vw - 2 * var(--grid-margin, 3rem)))"
            quality={80}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "low"}
            decoding="async"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
}
