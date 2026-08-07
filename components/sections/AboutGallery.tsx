import Image from "next/image";

const photos = [
  "/ab-1.jpg",
  "/ab-2.jpg",
  "/ab-3.jpg",
  "/ab-4.jpg",
  "/ab-5.jpg",
];

export function AboutGallery() {
  const sequence = [...photos, ...photos];

  return (
    <section className="about-gallery" aria-label="Zdjęcia z projektów">
      <div className="about-gallery-marquee">
        <div className="about-gallery-track">
          {sequence.map((src, index) => (
            <div
              className="about-gallery-item"
              key={`${src}-${index}`}
              aria-hidden={index >= photos.length || undefined}
            >
              <Image
                src={src}
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
