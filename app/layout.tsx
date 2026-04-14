import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.scss";

const GA_ID = "G-J3JYDC8VFG";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary"
});

export const metadata: Metadata = {
  title: "Projektant graficzny dla marek w Polsce",
  description:
    "Strona projektanta graficznego: identyfikacja wizualna, strony www, materialy do druku i systemy projektowe.",
  openGraph: {
    title: "Projektant graficzny - portfolio i wspolpraca",
    description:
      "Pomagam markom w Polsce budowac spojny wizerunek dzieki identyfikacji wizualnej, nowoczesnym stronom i dopracowanym materialom.",
    type: "website",
    locale: "pl_PL"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={poppins.variable}>
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
        {children}
      </body>
    </html>
  );
}
