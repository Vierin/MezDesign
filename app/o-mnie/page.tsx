import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { Partners } from "@/components/sections/Partners";

export const metadata: Metadata = {
  title: "O mnie — Mez.Design",
  description:
    "Cześć, jestem Daria! Multidyscyplinarna projektantka z doświadczeniem w marketingu i AI.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="hero-topbar-shell" aria-hidden="true" />
      <AboutHero />
      <AboutIntro />
      <Partners />
      <Footer />
    </main>
  );
}
