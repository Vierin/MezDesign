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
  /** Stack case images with no gap. */
  flushImages?: boolean;
};

export const workCases = {
  smeg: {
    id: "smeg",
    slug: "smeg",
    title: "Redesign strony internetowej SMEG® Poland i nowy kierunek wizualny marki",
    heroTitle:
      "Redesign strony\ninternetowej SMEG®\nPoland i nowy kierunek\nwizualny marki",
    heroLead:
      "Projekt obejmował opracowanie nowego kierunku wizualnego, wybranych podstron serwisu oraz materiałów promocyjnych marki.",
    asideLabel: "↙ Co zostało zrealizowane?",
    tags: "Web design / Content",
    image: "/work-1.webp",
    alt: "SMEG® Poland — redesign strony i kierunek wizualny",
    href: "/projekty/smeg",
    flushImages: true,
    images: [
      {
        src: "/smeg-1.webp",
        alt: "SMEG® Poland — redesign strony",
        width: 1980,
        height: 1118,
      },
      {
        src: "/smeg-2.webp",
        alt: "SMEG® Poland — podstrony serwisu",
        width: 1980,
        height: 5813,
      },
      {
        src: "/smeg-3.webp",
        alt: "SMEG® Poland — kierunek wizualny",
        width: 1980,
        height: 1656,
      },
      {
        src: "/smeg-4.webp",
        alt: "SMEG® Poland — materiały promocyjne",
        width: 1980,
        height: 4415,
      },
      {
        src: "/smeg-5.webp",
        alt: "SMEG® Poland — komunikacja marki",
        width: 1980,
        height: 2259,
      },
    ],
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
    image: "/work-2.webp",
    alt: "Chicco — kampania sprzedażowa",
    href: "/projekty/chicco",
    images: [
      {
        src: "/chicco-1.webp",
        alt: "Chicco — kreacje kampanii",
        width: 1982,
        height: 1473,
      },
      {
        src: "/chicco-2.webp",
        alt: "Chicco — materiały social media",
        width: 1980,
        height: 2006,
      },
      {
        src: "/chicco-3.webp",
        alt: "Chicco — kreacje reklamowe",
        width: 1980,
        height: 3228,
      },
      {
        src: "/chicco-4.webp",
        alt: "Chicco — adaptacje formatów",
        width: 1980,
        height: 3359,
      },
      {
        src: "/chicco-5.webp",
        alt: "Chicco — materiały sprzedażowe",
        width: 1980,
        height: 3759,
      },
    ],
  },
  oknoplus: {
    id: "oknoplus",
    slug: "oknoplus",
    title: "Projektowanie komunikacji wizualnej dla marki OknoPlus.®",
    heroTitle: "Projektowanie\nkomunikacji wizualnej\ndla marki OknoPlus.®",
    heroLead:
      "Projekt obejmował prowadzenie i rozwój komunikacji na Instagramie i Facebooku, tworzenie formatów dla social media oraz opracowanie kierunku wizualnego dla materiałów foto i video.",
    asideLabel: "↙ Co zostało zrealizowane?",
    tags: "Instagram / Facebook",
    image: "/work-3.webp",
    alt: "OknoPlus — komunikacja wizualna",
    href: "/projekty/oknoplus",
    images: [
      {
        src: "/okno-1.webp",
        alt: "OknoPlus — komunikacja wizualna",
        width: 1980,
        height: 1320,
      },
    ],
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
