import Image from "next/image";
import Link from "next/link";
import { workCases } from "@/lib/works";

const featured = {
  ...workCases.henzo,
  titleNode: (
    <>
      End-to-End Product Design
      <br />
      for a Fitness Marketplace
    </>
  ),
};

const pair = [workCases.chicco, workCases.oknoplus];
const wide = workCases.campaign;

export function Works() {
  return (
    <section id="portfolio" className="works-section">
      <div className="container">
        <Link href={featured.href!} className="works-featured works-card">
          <div className="works-media">
            <Image
              src={featured.image!}
              alt={featured.alt}
              width={1668}
              height={1128}
              sizes="(max-width: 860px) 100vw, 65vw"
              priority
            />
          </div>
          <div className="works-copy">
            <h3>{featured.titleNode}</h3>
            <p>{featured.tags}</p>
          </div>
        </Link>

        <div className="works-pair">
          {pair.map((item) => (
            <Link className="works-card" href={item.href!} key={item.id}>
              <div className="works-media">
                <Image
                  src={item.image!}
                  alt={item.alt}
                  width={1224}
                  height={812}
                  sizes="(max-width: 860px) 100vw, 45vw"
                />
              </div>
              <div className="works-copy">
                <h3>{item.title}</h3>
                <p>{item.tags}</p>
              </div>
            </Link>
          ))}
        </div>

        <div
          className="works-wide works-card works-card--soon"
          data-cursor-label="Wkrótce"
        >
          <div className="works-media works-media--placeholder" aria-hidden="true" />
          <div className="works-copy">
            <h3>{wide.title}</h3>
            <p>{wide.tags}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
