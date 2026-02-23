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
    | "cross"
    | "diamond"
    | "store";
  featured?: boolean;
  badgeColor?: PortfolioBadgeColor;
  projectUrl?: string;
  mockups?: string[];
  logos?: string[];
  logoBackgrounds?: string[];
  logoDescription?: string;
  colors?: { name: string; hex: string; rgb: string }[];
  overview?: string;
  challenge?: string;
  solution?: string;
};

export const brandingPortfolioItems: BrandingPortfolioItem[] = [
  {
    id: "mitsurin-wagyu",
    cardImage: "/portfolio-mitsurin-wagyu-image.webp",
    name: "Mitsurin Wagyu",
    cardDescription: "Premium Wagyu beef brand focused on craftsmanship and quality.",
    headerImage: "/brands/mitsurin/mitsurin-branding-header.webp",
    headerDescription: "Mitsurin Wagyu is a refined, heritage-driven brand rooted in craftsmanship, precision and understated luxury.",
    iconKey: "chef",
    badgeColor: "white",
    projectUrl: "",
    mockups: [
      "/brands/mitsurin/mockup-mitsurin-1-delicious-steak-dinner.webp",
      "/brands/mitsurin/mockup-mitsurin-2-raw-steak-in-butchershop.webp",
      "/brands/mitsurin/mockup-mitsurin-3-cowboy-polo.webp",
      "/brands/mitsurin/mockup-mitsurin-4-wagyu-burger-packaging.webp"
    ],
    logos: [
      "/brands/mitsurin/logo-mitsurin-1.svg",
      "/brands/mitsurin/logo-mitsurin-2.svg",
      "/brands/mitsurin/logo-mitsurin-3.svg",
      "/brands/mitsurin/logo-mitsurin-4.svg"
    ],
    logoBackgrounds: [
      "#630811",
      "#1D1D1D",
    ],
    logoDescription: "A classic ranch-style  logo designed to convey heritage, quality, and time-honored craftsmanship.",
    colors: [
      { name: "Black Cherry", hex: "#630811", rgb: "RGB(99, 08, 17)" },
      { name: "Deep Crimson", hex: "#8A101B", rgb: "RGB(138, 16, 27)" },
      { name: "Bronze", hex: "#BE8035", rgb: "RGB(190, 128, 53)" },
      { name: "Parchment", hex: "#F2EFEA", rgb: "RGB(242, 239, 234)" },
      { name: "Carbon Black", hex: "#1D1D1D", rgb: "RGB(29, 29, 29)" }
    ],
    overview:
      "Mitsurin Wagyu partnered with us to create a cohesive brand identity that balances heritage ranch values with a refined, modern presence in the premium beef market.",
    challenge:
      "To create a refined brand identity that honored Mitsurin Wagyu’s ranching heritage while elevating its presence in the premium Wagyu market.",
    solution:
      "We developed a cohesive visual system built on thoughtful typography, a grounded color palette, and supporting brand elements to communicate craftsmanship and understated luxury."
  },
  {
    id: "wali",
    cardImage: "/",
    name: "WA'LI",
    cardDescription: "Refined apparel brand focused on quality, fit, and understated design.",
    headerImage: "/brands/wa'li/wali-branding-header.webp",
    headerDescription: "WA’LI is a refined apparel brand focused on quality, fit, and understated design.",
    iconKey: "shirt",
    featured: true,
    badgeColor: "white",
    projectUrl: "",
    mockups: [
      "/brands/wa'li/mockup-wali-1-business-card.webp",
      "/brands/wa'li/mockup-wali-2-clothing-tag.webp",
      "/brands/wa'li/mockup-wali-3-internal-collar.webp",
      "/brands/wa'li/mockup-wali-4-button-down-tag.webp"
    ],
    logos: [
      "/brands/wa'li/logo-wali-1.svg",
      "/brands/wa'li/logo-wali-2.svg",
      "/brands/wa'li/logo-wali-3.svg",
      "/brands/wa'li/logo-wali-4.svg"
    ],
    logoBackgrounds: [
      "#BE8035",
      "#191512",
    ],
    logoDescription:
      "A modern crest-inspired mark designed to communicate craftsmanship, confidence, and elevated simplicity through balanced symmetry and strong form.",
    colors: [
      { name: "Vanilla Custard", hex: "#F7E5AD", rgb: "RGB(247, 229, 173)" },
      { name: "Sandy Clay", hex: "#DDB279", rgb: "RGB(221, 178, 121)" },
      { name: "Bronze", hex: "#BE8035", rgb: "RGB(190, 128, 53)" },
      { name: "Sea Shell", hex: "#FCF4EE", rgb: "RGB(252, 244, 238)" },
      { name: "Pitch Black", hex: "#191512", rgb: "RGB(25, 21, 18)" },
    ],
    overview:
      "WA’LI approached us to develop a refined brand identity that reflects premium craftsmanship and modern masculinity. Our goal was to create a cohesive visual system that communicates quality, intention, and timeless style.",
    challenge:
      "To position WA’LI as a premium men’s apparel brand in a saturated market while emphasizing quality, fit, and understated design.",
    solution:
      "We developed a clean, confident brand identity centered on a strong mark, refined typography, and a minimal visual system designed to elevate everyday essentials."
  },
  {
    id: "on-point-outfitters",
    cardImage: "/",
    name: "On Point Outfitters & Boutique",
    cardDescription:
      "Relaxed, modern apparel designed for everyday comfort while still looking sharp.",
    headerImage: "/brands/on-point/onpoint-branding-header.webp",
    headerDescription: "On Point Outfitter & Boutique is a bold retail brand designed to celebrate community pride, everyday style, and local spirit.",
    iconKey: "store",
    badgeColor: "white",
    mockups: [
      "/brands/on-point/mockup-onpoint-1-circle-sign.webp",
      "/brands/on-point/mockup-onpoint-2-feather-pattern.webp",
      "/brands/on-point/mockup-onpoint-3-gift-tag.webp",
      "/brands/on-point/mockup-onpoint-4-hoodie.webp"
    ],
    logos: [
      "/brands/on-point/logo-onpoint-1.svg",
      "/brands/on-point/logo-onpoint-2.svg",
      "/brands/on-point/logo-onpoint-3.svg",
      "/brands/on-point/logo-onpoint-4.svg"
    ],
    logoBackgrounds: [
      "#FFFFFF",
      "#121212",
    ],
    logoDescription:
      "A modern crest-inspired mark designed to communicate craftsmanship, confidence, and elevated simplicity through balanced symmetry and strong form.",
    colors: [
      { name: "Night", hex: "#121212", rgb: "RGB(18, 18, 18)" },
      { name: "Dark Goldenrod", hex: "#AF822D", rgb: "RGB(175, 130, 45)" },
      { name: "Buff", hex: "#D8AD75", rgb: "RGB(216, 173, 117)" },
      { name: "Sea Blush", hex: "#CDE9E9", rgb: "RGB(205, 233, 233)" },
      { name: "Snow White", hex: "#FFFFFF", rgb: "RGB(255, 255, 255)" },
    ],
    overview:
      "On Point Outfitter & Boutique partnered with us to create a bold, community-driven brand identity that reflects small-town pride while supporting a wide range of retail offerings — from apparel and gifts to school spirit wear.",
    challenge:
      "To develop a versatile brand identity that could support multiple product categories while maintaining strong recognition and local personality.",
    solution:
      "We created a flexible identity system featuring a strong stamp-style logo, supporting iconography, and adaptable design elements that work seamlessly across apparel, signage, merchandise, and promotional materials."
  },
  {
    id: "marissa-arriaga-jewelry",
    cardImage: "/",
    name: "Marissa Arriaga Jewelry",
    cardDescription: "Elegant jewelry brand with a focus on craftsmanship and timeless design.",
    headerImage: "/brands/marissa-arriaga/marissa-arriaga-branding-header.webp",
    headerDescription: "A refined artisan jewelry brand designed to celebrate softness, femininity, and handcrafted detail.",
    iconKey: "diamond",
    badgeColor: "white",
    projectUrl: "",
    mockups: [
      "/brands/marissa-arriaga/mockup-marissa-arriaga-1-jewelry-gift-box.webp",
      "/brands/marissa-arriaga/mockup-marissa-arriaga-2-gift-bag.webp",
      "/brands/marissa-arriaga/mockup-marissa-arriaga-3-coffee-mug.webp",
      "/brands/marissa-arriaga/mockup-marissa-arriaga-4-multi-packaging.webp"
    ],
    logos: [
      "/brands/marissa-arriaga/logo-1-marissa-arriaga.svg",
      "/brands/marissa-arriaga/logo-2-marissa-arriaga.svg",
      "/brands/marissa-arriaga/logo-3-marissa-arriaga.svg",
      "/brands/marissa-arriaga/logo-4-marissa-arriaga.svg"
    ],
    logoBackgrounds: [
      "#F2F0F1",
      "#595859",
    ],
    logoDescription:
      "A refined wordmark supported by elegant serif typography and soft accent details, designed to evoke femininity, grace, and timeless craftsmanship.",
    colors: [
      { name: "Carolina Blue", hex: "#7DADC0", rgb: "RGB(125, 173, 192)" },
      { name: "Misty Rose", hex: "#F2D0D0", rgb: "RGB(242, 208, 208)" },
      { name: "Tea Rose", hex: "#F2BBBB", rgb: "RGB(242, 187, 187)" },
      { name: "Davies Grey", hex: "#595859", rgb: "RGB(89, 89, 89)" },
      { name: "White Smoke", hex: "#F2F0F1", rgb: "RGB(242, 240, 241)" },
    ],
    overview:
      "Marissa Arriaga Jewelry partnered with us to develop a soft, elegant brand identity that reflects the handmade nature of her artisan pieces while supporting growth through markets, pop-ups, and boutique retail partnerships.",
    challenge:
      "To create a cohesive and feminine brand identity that communicates handcrafted quality while remaining versatile across packaging, social media, and in-person market displays.",
    solution:
      "We developed a refined visual system built around soft typography, a romantic color palette, and adaptable logo variations designed to elevate both digital presence and physical retail experiences."
  },
];