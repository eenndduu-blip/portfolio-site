export type Category = "Art" | "Architecture" | "Photography";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  year: string;
  location: string;
  blurb: string;
  seed: string;
  /** override image path (relative to /public) — if omitted, falls back to picsum */
  image?: string;
  /** grid span in columns/rows on the desktop 6-col grid */
  span: "lg" | "md" | "sm";
};

export const projects: Project[] = [
  {
    slug: "concrete-meridian",
    title: "Concrete Meridian",
    category: "Architecture",
    year: "2024",
    location: "Lisbon, PT",
    blurb: "A poured-concrete pavilion tracing the path of the solstice sun.",
    seed: "meridian-01",
    span: "lg",
  },
  {
    slug: "still-life-no-7",
    title: "Still Life No. 7",
    category: "Art",
    year: "2023",
    location: "Studio, Brooklyn",
    blurb: "Oil and pigment study on raw linen, second in the Object series.",
    seed: "stilllife-07",
    span: "sm",
  },
  {
    slug: "low-tide",
    title: "Low Tide",
    category: "Photography",
    year: "2024",
    location: "Faroe Islands",
    blurb: "Long exposures of basalt coastline at first light.",
    seed: "lowtide-09",
    image: "/photos/photo-001.jpg",
    span: "md",
  },
  {
    slug: "glass-archive",
    title: "Glass Archive",
    category: "Architecture",
    year: "2022",
    location: "Kyoto, JP",
    blurb: "Adaptive reuse of a 1960s archive building into a public reading room.",
    seed: "glassarchive-02",
    span: "md",
  },
  {
    slug: "figure-in-negative",
    title: "Figure in Negative",
    category: "Art",
    year: "2024",
    location: "Studio, Brooklyn",
    blurb: "Charcoal and erasure on gesso panel, exploring absence as form.",
    seed: "figneg-04",
    span: "sm",
  },
  {
    slug: "interstitial",
    title: "Interstitial",
    category: "Photography",
    year: "2023",
    location: "Hong Kong",
    blurb: "A study of the in-between spaces of vertical density.",
    seed: "interstitial-11",
    image: "/photos/photo-040.jpg",
    span: "lg",
  },
  {
    slug: "the-quiet-frame",
    title: "The Quiet Frame",
    category: "Photography",
    year: "2022",
    location: "Oaxaca, MX",
    blurb: "Portraits made in the hour before market light fades.",
    seed: "quietframe-03",
    image: "/photos/photo-080.jpg",
    span: "sm",
  },
  {
    slug: "monolith-house",
    title: "Monolith House",
    category: "Architecture",
    year: "2021",
    location: "Joshua Tree, US",
    blurb: "A single-volume residence carved into desert rock.",
    seed: "monolith-06",
    span: "md",
  },
  {
    slug: "fragment-series",
    title: "Fragment Series",
    category: "Art",
    year: "2023",
    location: "Studio, Brooklyn",
    blurb: "Salvaged steel and resin assemblages, eight pieces.",
    seed: "fragment-08",
    span: "md",
  },
];

export const categories: Category[] = ["Art", "Architecture", "Photography"];

export function picsumUrl(seed: string, w: number, h: number) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export function projectImageUrl(project: Project, w: number, h: number): string {
  return project.image ?? picsumUrl(project.seed, w, h);
}

/** All photos available in /public/photos, numbered photo-001.jpg .. photo-100.jpg */
export const galleryPhotos: string[] = Array.from(
  { length: 100 },
  (_, i) => `/photos/photo-${String(i + 1).padStart(3, "0")}.jpg`,
);

