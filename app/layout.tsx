import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Projektant graficzny dla marek w Polsce",
  description:
    "Landing page projektanta graficznego: branding, strony www, social media, materialy do druku i e-mail marketing.",
  openGraph: {
    title: "Projektant graficzny - portfolio i wspolpraca",
    description:
      "Pomagam markom w Polsce rosnac dzieki strategii wizualnej, nowoczesnym stronom i komunikacji, ktora sprzedaje.",
    type: "website",
    locale: "pl_PL"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
