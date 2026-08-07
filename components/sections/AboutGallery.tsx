import Image from "next/image";

const photos = [
  { src: "/ab-1.jpg", variant: "a" },
  { src: "/ab-2.jpg", variant: "b" },
  { src: "/ab-3.jpg", variant: "c" },
  { src: "/ab-4.jpg", variant: "d" },
  { src: "/ab-5.jpg", variant: "e" },
];

export function AboutGallery() {
  const sequence = [...photos, ...photos];

  return (
    <section className="about-gallery" aria-label="Zdjęcia z projektów">
      <div className="about-gallery-marquee">
        <div className="about-gallery-track">
          {sequence.map((photo, index) => (
            <div
              className={`about-gallery-item is-${photo.variant}`}
              key={`${photo.src}-${index}`}
              aria-hidden={index >= photos.length || undefined}
            >
              <Image
                src={photo.src}
                alt={index < photos.length ? "Zdjęcie z pracy i projektów" : ""}
                width={480}
                height={640}
                sizes="(max-width: 860px) 55vw, 280px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
