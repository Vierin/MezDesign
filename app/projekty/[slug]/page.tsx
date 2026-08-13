import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseHero } from "@/components/sections/CaseHero";
import { CaseImg } from "@/components/sections/CaseImg";
import { Footer } from "@/components/sections/Footer";
import { Works } from "@/components/sections/Works";
import { getAllWorkSlugs, getWorkCase } from "@/lib/works";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkCase(slug);
  if (!work?.href) return { title: "Projekt — Mez.Design" };

  return {
    title: `${work.heroTitle} — Mez.Design`,
    description: work.heroLead,
  };
}

export default async function ProjectCasePage({ params }: PageProps) {
  const { slug } = await params;
  const work = getWorkCase(slug);
  if (!work?.href) notFound();

  return (
    <main className={`case-page${work.flushImages ? " is-flush-images" : ""}`}>
      <div className="hero-topbar-shell" aria-hidden="true" />
      <CaseHero work={work} />
      {work.images?.map((image, index) => (
        <CaseImg
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={index === 0}
        />
      ))}
      <Works hideSoon />
      <Footer />
    </main>
  );
}
