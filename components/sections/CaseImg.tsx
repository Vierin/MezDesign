import Image from "next/image";

type CaseImgProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
};

export function CaseImg({ src, alt, width, height, priority = false }: CaseImgProps) {
  return (
    <section className="case-img">
      <div className="container">
        <div className="case-img-media">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 1320px) calc(100vw - 2 * var(--grid-margin, 1.5rem)), 1320px"
            priority={priority}
          />
        </div>
      </div>
    </section>
  );
}
