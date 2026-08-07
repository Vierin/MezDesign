import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "O mnie — Mez.Design",
  description:
    "Poznaj Darię — multidisciplinary designer. Branding, web design i komunikacja wizualna dla marek.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="hero-topbar-shell" aria-hidden="true" />

      <section className="about-page-content">
        <div className="container about-grid">
          <div>
            <p className="eyebrow">O mnie</p>
            <h1>Buduję marki, które są zapamiętywane i wybierane.</h1>
            <p>
              Wspieram freelancerów i małe firmy na polskim rynku. Łączę estetykę, strategię i
              praktyczne podejście do projektowania, aby komunikacja wizualna była spójna,
              czytelna i łatwa do skalowania.
            </p>
            <p>
              Pracuję nad identyfikacją wizualną, stronami WWW, social media i materiałami, które
              porządkują wizerunek marki online i offline.
            </p>
          </div>
          <div className="about-card">
            <p className="card-title">Jak pracujemy</p>
            <ol>
              <li>Rozpoznanie marki, celu i grupy docelowej</li>
              <li>Propozycja konceptu i kierunku wizualnego</li>
              <li>Realizacja i przekazanie gotowych materiałów</li>
            </ol>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
