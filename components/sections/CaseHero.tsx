import type { WorkCase } from "@/lib/works";
import { withRegisteredMark } from "@/lib/trademark";

type CaseHeroProps = {
  work: WorkCase;
};

export function CaseHero({ work }: CaseHeroProps) {
  return (
    <section className="case-hero">
      <div className="container grid case-hero-grid">
        <h1 className="case-hero-title">{withRegisteredMark(work.heroTitle)}</h1>
        <p className="case-hero-aside">{work.asideLabel}</p>
        <p className="case-hero-lead">{work.heroLead}</p>
      </div>
    </section>
  );
}
