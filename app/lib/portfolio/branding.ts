export type PortfolioBadgeColor = "white" | "gray";

export type BrandingPortfolioItem = {
  id: string;
  cardImage: string;
  name: string;
  cardDescription: string;
  headerImage?: string;
  headerDescription?: string;
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
    id: "mitsurin-wagyu",
    cardImage: "/portfolio-mitsurin-wagyu-image.webp",
    name: "Mitsurin Wagyu",
    cardDescription: "Premium Wagyu beef brand focused on craftsmanship and quality.",
    headerImage: "/mitsurin-branding-header.webp",
    headerDescription: "Mitsurin Wagyu is a refined, heritage-driven brand rooted in craftsmanship, precision and understated luxury.",
    iconKey: "chef",
    badgeColor: "white",
    projectUrl: "https://mitsurinwagyu.com",
    mockups: [
      "/brands/mitsurin/mockup-mitsurin-1-delicious-steak-dinner.webp",
      "/brands/mitsurin/mockup-mitsurin-2-raw-steak-in-butchershop.webp",
      "/brands/mitsurin/mockup-mitsurin-3-cowboy-polo.webp",
      "/brands/mitsurin/mockup-mitsurin-4-wagyu-burger-packaging.webp"
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
    id: "countdown-fantasy",
    cardImage: "/portfolio-countdown-fantasy-image.webp",
    name: "Countdown Fantasy Sports",
    cardDescription: "Fantasy tournament hub with live standings + team pages.",
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
    id: "teddy-gear",
    cardImage: "/portfolio-teddygear-image.webp",
    name: "Teddy Gear",
    cardDescription:
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
    cardImage: "/portfolio-maximstrong-image.webp",
    name: "Maximstrong",
    cardDescription: "Gritty fitness landing page built to convert local gym leads.",
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
    cardImage: "/portfolio-clubhouse-baseball-image.webp",
    name: "Clubhouse Baseball",
    cardDescription:
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
    cardImage: "/portfolio-collenback-strength-image.webp",
    name: "Collenback Strength",
    cardDescription: "Personal training site centered on athlete development and coaching.",
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
    cardImage: "/portfolio-oblate-academy-image.webp",
    name: "Oblate Academy",
    cardDescription: "Catholic education platform designed for children, teachers and families.",
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