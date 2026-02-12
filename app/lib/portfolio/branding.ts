export type PortfolioBadgeColor = "white" | "gray";

export type BrandingPortfolioItem = {
  id: string;
  header: string;
  name: string;
  description: string;
  iconKey:
    | "bolt"
    | "chef"
    | "shirt"
    | "barbell"
    | "baseball"
    | "biceps"
    | "cross";
  featured?: boolean;
  badgeColor?: PortfolioBadgeColor;

  // add these now so modal has content later
  projectUrl?: string;
  mockups?: string[];
  logos?: string[];
  logoDescription?: string;
  colors?: { name: string; hex: string; rgb: string }[];
  challenge?: string;
  solution?: string;
};

export const brandingPortfolioItems: BrandingPortfolioItem[] = [
  {
    id: "countdown-fantasy",
    header: "/portfolio-countdown-fantasy-image.webp",
    name: "Countdown Fantasy Sports",
    description: "Fantasy tournament hub with live standings + team pages.",
    iconKey: "bolt",
    featured: true,
    badgeColor: "white",
    projectUrl: "https://countdownfantasy.com",
    mockups: [
      "/mockups/countdown-1.webp",
      "/mockups/countdown-2.webp",
      "/mockups/countdown-3.webp",
      "/mockups/countdown-4.webp"
    ],
    logos: [
      "/portfolio-countdown-fantasy-logo-1.webp",
      "/portfolio-countdown-fantasy-logo-2.webp",
      "/portfolio-countdown-fantasy-logo-3.webp",
      "/portfolio-countdown-fantasy-logo-4.webp"
    ],
    logoDescription:
      "A bold, energetic logo was crafted to capture the competitive spirit of fantasy sports.",
    colors: [
      { name: "Electric Blue", hex: "#0b66ff", rgb: "RGB(11, 102, 255)" },
      { name: "Cyber Purple", hex: "#6b5ce7", rgb: "RGB(107, 92, 231)" },
      { name: "Pure White", hex: "#ffffff", rgb: "RGB(255, 255, 255)" },
      { name: "Carbon Black", hex: "#0a0a0a", rgb: "RGB(10, 10, 10)" }
    ],
    challenge:
      "Create a premium brand that appeals to discerning diners while maintaining approachability.",
    solution:
      "Developed a refined visual language with classic typography and a warm color palette."
  },
  {
    id: "mitsurin-wagyu",
    header: "/portfolio-mitsurin-wagyu-image.webp",
    name: "Mitsurin Wagyu",
    description: "Premium Wagyu beef brand focused on craftsmanship and quality.",
    iconKey: "chef",
    badgeColor: "white",
    projectUrl: "https://mitsurinwagyu.com",
    mockups: [
      "/mockups/countdown-1.webp",
      "/mockups/countdown-2.webp",
      "/mockups/countdown-3.webp",
      "/mockups/countdown-4.webp"
    ],
    logos: [
      "/portfolio-countdown-fantasy-logo-1.webp",
      "/portfolio-countdown-fantasy-logo-2.webp",
      "/portfolio-countdown-fantasy-logo-3.webp",
      "/portfolio-countdown-fantasy-logo-4.webp"
    ],
    colors: [
      { name: "Electric Blue", hex: "#0b66ff", rgb: "RGB(11, 102, 255)" },
      { name: "Cyber Purple", hex: "#6b5ce7", rgb: "RGB(107, 92, 231)" },
      { name: "Pure White", hex: "#ffffff", rgb: "RGB(255, 255, 255)" },
      { name: "Carbon Black", hex: "#0a0a0a", rgb: "RGB(10, 10, 10)" }
    ],
    challenge:
      "Create a premium brand that appeals to discerning diners while maintaining approachability.",
    solution:
      "Developed a refined visual language with classic typography and a warm color palette."
  },
  {
    id: "teddy-gear",
    header: "/portfolio-teddygear-image.webp",
    name: "Teddy Gear",
    description:
      "Relaxed, modern apparel designed for everyday comfort while still looking sharp.",
    iconKey: "shirt",
    badgeColor: "white",
    mockups: [
      "/mockups/countdown-1.webp",
      "/mockups/countdown-2.webp",
      "/mockups/countdown-3.webp",
      "/mockups/countdown-4.webp"
    ],
    logos: [
      "/portfolio-countdown-fantasy-logo-1.webp",
      "/portfolio-countdown-fantasy-logo-2.webp",
      "/portfolio-countdown-fantasy-logo-3.webp",
      "/portfolio-countdown-fantasy-logo-4.webp"
    ],
    colors: [
      { name: "Electric Blue", hex: "#0b66ff", rgb: "RGB(11, 102, 255)" },
      { name: "Cyber Purple", hex: "#6b5ce7", rgb: "RGB(107, 92, 231)" },
      { name: "Pure White", hex: "#ffffff", rgb: "RGB(255, 255, 255)" },
      { name: "Carbon Black", hex: "#0a0a0a", rgb: "RGB(10, 10, 10)" }
    ],
    challenge:
      "Create a premium brand that appeals to discerning diners while maintaining approachability.",
    solution:
      "Developed a refined visual language with classic typography and a warm color palette."
  },
  {
    id: "maximstrong",
    header: "/portfolio-maximstrong-image.webp",
    name: "Maximstrong",
    description: "Gritty fitness landing page built to convert local gym leads.",
    iconKey: "barbell",
    badgeColor: "white",
    projectUrl: "https://maximstrong.com",
    mockups: [
      "/mockups/countdown-1.webp",
      "/mockups/countdown-2.webp",
      "/mockups/countdown-3.webp",
      "/mockups/countdown-4.webp"
    ],
    logos: [
      "/portfolio-countdown-fantasy-logo-1.webp",
      "/portfolio-countdown-fantasy-logo-2.webp",
      "/portfolio-countdown-fantasy-logo-3.webp",
      "/portfolio-countdown-fantasy-logo-4.webp"
    ],
    colors: [
      { name: "Electric Blue", hex: "#0b66ff", rgb: "RGB(11, 102, 255)" },
      { name: "Cyber Purple", hex: "#6b5ce7", rgb: "RGB(107, 92, 231)" },
      { name: "Pure White", hex: "#ffffff", rgb: "RGB(255, 255, 255)" },
      { name: "Carbon Black", hex: "#0a0a0a", rgb: "RGB(10, 10, 10)" }
    ],
    challenge:
      "Create a premium brand that appeals to discerning diners while maintaining approachability.",
    solution:
      "Developed a refined visual language with classic typography and a warm color palette."
  },
  {
    id: "clubhouse-baseball",
    header: "/portfolio-clubhouse-baseball-image.webp",
    name: "Clubhouse Baseball",
    description:
      "Connecting select baseball organizations with families searching for the right team fit.",
    iconKey: "baseball",
    badgeColor: "white",
    mockups: [
      "/mockups/countdown-1.webp",
      "/mockups/countdown-2.webp",
      "/mockups/countdown-3.webp",
      "/mockups/countdown-4.webp"
    ],
    logos: [
      "/portfolio-countdown-fantasy-logo-1.webp",
      "/portfolio-countdown-fantasy-logo-2.webp",
      "/portfolio-countdown-fantasy-logo-3.webp",
      "/portfolio-countdown-fantasy-logo-4.webp"
    ],
    colors: [
      { name: "Electric Blue", hex: "#0b66ff", rgb: "RGB(11, 102, 255)" },
      { name: "Cyber Purple", hex: "#6b5ce7", rgb: "RGB(107, 92, 231)" },
      { name: "Pure White", hex: "#ffffff", rgb: "RGB(255, 255, 255)" },
      { name: "Carbon Black", hex: "#0a0a0a", rgb: "RGB(10, 10, 10)" }
    ],
    challenge:
      "Create a premium brand that appeals to discerning diners while maintaining approachability.",
    solution:
      "Developed a refined visual language with classic typography and a warm color palette."
  },
  {
    id: "collenback-strength",
    header: "/portfolio-collenback-strength-image.webp",
    name: "Collenback Strength",
    description: "Personal training site centered on athlete development and coaching.",
    iconKey: "biceps",
    badgeColor: "white",
    projectUrl: "https://collenbackstrength.com",
    mockups: [
      "/mockups/countdown-1.webp",
      "/mockups/countdown-2.webp",
      "/mockups/countdown-3.webp",
      "/mockups/countdown-4.webp"
    ],
    logos: [
      "/portfolio-countdown-fantasy-logo-1.webp",
      "/portfolio-countdown-fantasy-logo-2.webp",
      "/portfolio-countdown-fantasy-logo-3.webp",
      "/portfolio-countdown-fantasy-logo-4.webp"
    ],
    colors: [
      { name: "Electric Blue", hex: "#0b66ff", rgb: "RGB(11, 102, 255)" },
      { name: "Cyber Purple", hex: "#6b5ce7", rgb: "RGB(107, 92, 231)" },
      { name: "Pure White", hex: "#ffffff", rgb: "RGB(255, 255, 255)" },
      { name: "Carbon Black", hex: "#0a0a0a", rgb: "RGB(10, 10, 10)" }
    ],
    challenge:
      "Create a premium brand that appeals to discerning diners while maintaining approachability.",
    solution:
      "Developed a refined visual language with classic typography and a warm color palette."
  },
  {
    id: "oblate-academy",
    header: "/portfolio-oblate-academy-image.webp",
    name: "Oblate Academy",
    description: "Catholic education platform designed for children, teachers and families.",
    iconKey: "cross",
    badgeColor: "gray",
    mockups: [
      "/mockups/countdown-1.webp",
      "/mockups/countdown-2.webp",
      "/mockups/countdown-3.webp",
      "/mockups/countdown-4.webp"
    ],
    logos: [
      "/portfolio-countdown-fantasy-logo-1.webp",
      "/portfolio-countdown-fantasy-logo-2.webp",
      "/portfolio-countdown-fantasy-logo-3.webp",
      "/portfolio-countdown-fantasy-logo-4.webp"
    ],
    colors: [
      { name: "Electric Blue", hex: "#0b66ff", rgb: "RGB(11, 102, 255)" },
      { name: "Cyber Purple", hex: "#6b5ce7", rgb: "RGB(107, 92, 231)" },
      { name: "Pure White", hex: "#ffffff", rgb: "RGB(255, 255, 255)" },
      { name: "Carbon Black", hex: "#0a0a0a", rgb: "RGB(10, 10, 10)" }
    ],
    challenge:
      "Create a premium brand that appeals to discerning diners while maintaining approachability.",
    solution:
      "Developed a refined visual language with classic typography and a warm color palette."
  },
];