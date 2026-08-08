import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { CursorOrb } from "@/components/CursorOrb";
import { RouteScroll } from "@/components/RouteScroll";
import "./globals.scss";

const GA_ID = "G-J3JYDC8VFG";

const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Mez.Design — multidisciplinary designer",
  description:
    "Dbam o to, jak Twoja marka wygląda i komunikuje się z odbiorcami — online i offline.",
  openGraph: {
    title: "Mez.Design — multidisciplinary designer",
    description:
      "Projektowanie graficzne, web design i social media dla marek, które chcą wyglądać i komunikować się spójnie.",
    type: "website",
    locale: "pl_PL",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={instrumentSans.variable}>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Header />
        <CursorOrb />
        <RouteScroll />
        {children}
      </body>
    </html>
  );
}
