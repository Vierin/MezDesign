export type WorkCaseImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type WorkCase = {
  id: string;
  slug: string;
  /** Short title used in Works listing */
  title: string;
  /** Full case-study hero headline */
  heroTitle: string;
  heroLead: string;
  asideLabel: string;
  tags: string;
  image?: string;
  alt: string;
  /** Case page path; omit for coming-soon cards (no link). */
  href?: string;
  images?: WorkCaseImage[];
};

export const workCases = {
  henzo: {
    id: "henzo",
    slug: "henzo",
    title: "Projektowanie produktu cyfrowego dla marketplace’u fitness",
    heroTitle: "Projektowanie produktu cyfrowego dla marketplace’u fitness",
    heroLead:
      "Zaprojektowano spójny produkt cyfrowy — od architektury informacji po interfejsy wspierające sprzedaż i zaangażowanie użytkowników.",
    asideLabel: "↙ Co zostało zrealizowane?",
    tags: "Instagram / Facebook",
    image: "/work-1.jpg",
    alt: "Henzo — marketplace fitness",
    href: "/projekty/henzo",
  },
  chicco: {
    id: "chicco",
    slug: "chicco",
    title: "Projektowanie kampanii wspierających sprzedaż produktów Chicco.",
    heroTitle:
      "Spójna komunikacja wizualna wspierająca działania marketingowe marki Chicco",
    heroLead:
      "Opracowano kreacje do kampanii Google Ads i Meta Ads, dostosowane do różnych kategorii produktów, oraz materiały do komunikacji marki na Facebooku i Instagramie.",
    asideLabel: "↙ Co zostało zrealizowane?",
    tags: "Social media / Meta Ads / Google Ads",
    image: "/work-2.jpg",
    alt: "Chicco — kampania sprzedażowa",
    href: "/projekty/chicco",
    images: [
      {
        src: "/chicco-1.jpg",
        alt: "Chicco — kreacje kampanii",
        width: 1982,
        height: 1473,
      },
      {
        src: "/chicco-2.jpg",
        alt: "Chicco — materiały social media",
        width: 1980,
        height: 3359,
      },
    ],
  },
  oknoplus: {
    id: "oknoplus",
    slug: "oknoplus",
    title: "Projektowanie komunikacji wizualnej dla marki OknoPlus.",
    heroTitle: "Projektowanie komunikacji wizualnej dla marki OknoPlus",
    heroLead:
      "Opracowano spójny system komunikacji wizualnej wspierający obecność marki w social media i materiałach reklamowych.",
    asideLabel: "↙ Co zostało zrealizowane?",
    tags: "Instagram / Facebook",
    image: "/work-3.jpg",
    alt: "OknoPlus — komunikacja wizualna",
    href: "/projekty/oknoplus",
  },
  campaign: {
    id: "campaign",
    slug: "campaign",
    title: "Projektowanie kampanii wspierających sprzedaż produktów Chicco.",
    heroTitle:
      "Spójna komunikacja wizualna wspierająca działania marketingowe marki Chicco",
    heroLead:
      "Opracowano kreacje do kampanii Google Ads i Meta Ads, dostosowane do różnych kategorii produktów, oraz materiały do komunikacji marki na Facebooku i Instagramie.",
    asideLabel: "↙ Co zostało zrealizowane?",
    tags: "Social media / Meta Ads / Google Ads",
    alt: "Kampania sprzedażowa",
  },
} as const satisfies Record<string, WorkCase>;

export type WorkSlug = keyof typeof workCases;

export function getWorkCase(slug: string): WorkCase | undefined {
  return workCases[slug as WorkSlug];
}

export function getAllWorkSlugs(): WorkSlug[] {
  return (Object.keys(workCases) as WorkSlug[]).filter((slug) => "href" in workCases[slug]);
}
