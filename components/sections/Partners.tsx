import Image from "next/image";

const logos = [
  "/logo-1.png",
  "/logo-2.png",
  "/logo-3.png",
  "/logo-4.png",
  "/logo-5.png",
  "/logo-6.png",
  "/logo-7.png",
  "/logo-8.png",
  "/logo-9.png",
  "/logo-10.png",
  "/logo-11.png",
  "/logo-12.png",
  "/logo-13.png",
  "/logo-14.png",
  "/logo-15.png",
  "/logo-16.png",
];

function MarqueeRow({
  logos,
  direction,
}: {
  logos: string[];
  direction: "left" | "right";
}) {
  const sequence = [...logos, ...logos];

  return (
    <div className={`partners-marquee is-${direction}`}>
      <div className="partners-track">
        {sequence.map((logo, index) => (
          <div
            className="partners-item"
            key={`${direction}-${logo}-${index}`}
            aria-hidden={index >= logos.length || undefined}
          >
            <Image
              src={logo}
              alt={index < logos.length ? "Logo partnera" : ""}
              width={160}
              height={48}
              className="partner-logo"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Partners() {
  return (
    <section className="partners-section">
      <p className="partners-title">Dołącz do grona firm, które mi zaufały</p>
      <div className="partners-lines" aria-label="Logotypy partnerów">
        <MarqueeRow logos={logos} direction="left" />
        <MarqueeRow logos={[...logos].reverse()} direction="right" />
      </div>
    </section>
  );
}
