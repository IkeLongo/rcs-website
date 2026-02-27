// app/(site)/(locations)/_locations/locations.data.ts
export type ServiceKey =
  | "web-design"
  | "small-business-web-design"
  | "website-redesign"
  | "nextjs-development";

export type LocationKey =
  | "leon-springs"
  | "boerne"
  | "san-antonio";

export type LocationPageKey =
  | "web-design-leon-springs-tx"
  | "web-design-boerne-tx";

export type FAQ = { q: string; a: string };

export type OutcomeItem = {
  title: string;
  description: string;
  imageSrc: string; // placeholder ok
  imageAlt?: string;
};

export type ServiceItem = {
  key: string;
  title: string;
  description: string;
  icon: "penTool" | "bolt" | "search" | "palette";
  imageSrc: string;
  imageAlt: string;
};

export type WhyChooseUsCard = {
  key: string;
  stat: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type LocationPageConfig = {
  key: LocationPageKey;
  slug: `/${string}`;
  service: ServiceKey;

  city: string;
  state: string;
  areaLabel?: string; // e.g. "Leon Springs & Northwest San Antonio"
  nearbyAreas?: string[];

  // SEO
  title: string;
  description: string;

  // Page content
  heroTitle: string;
  heroSubtitle: string;

  outcomes: OutcomeItem[];
  services: ServiceItem[];
  whyChooseUsCards: WhyChooseUsCard[];

  faqs: FAQ[];

  // Optional: trust / proof
  proofPoints?: string[];
};

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rivercitycreatives.com";

export const LOCATION_PAGES: Record<LocationPageKey, LocationPageConfig> = {
  "web-design-leon-springs-tx": {
    key: "web-design-leon-springs-tx",
    slug: "/web-design-leon-springs-tx",
    service: "web-design",

    city: "Leon Springs",
    state: "TX",
    areaLabel: "Leon Springs & Northwest San Antonio",
    nearbyAreas: ["The Dominion", "Boerne", "Helotes", "La Cantera"],

    title: "Web Design in Leon Springs, TX | RiverCity Creatives",
    description:
      "Custom web design for Leon Springs small businesses — fast, modern websites built to convert and rank locally.",

    heroTitle: "Web Design for Small Businesses in Leon Springs, TX",
    heroSubtitle:
      "Modern, high-performing websites built to earn trust, generate leads, and load fast on every device.",

    outcomes: [
      {
        title: "A modern look that matches your brand",
        description: "Custom design that reflects your unique brand identity, helping you stand out and make a memorable first impression.",
        imageSrc: "/digital-device-screen-mockups-design.webp",
        imageAlt: "Digital device screen mockups showing trustworthy website design for Leon Springs business",
      },
      {
        title: "Fast load times and clean UX",
        description: "Optimized for speed and usability, your site loads quickly and guides visitors smoothly to the information they need.",
        imageSrc: "/young-caucasian-guy-using-laptop-in-studio.webp",
        imageAlt: "Young man using laptop in studio representing clear messaging and conversion-focused web layout",
      },
      {
        title: "Mobile-first layouts that convert",
        description: "Responsive layouts ensure your site looks and works great on every device, turning mobile visitors into leads.",
        imageSrc: "/woman-working-on-a-tablet.webp",
        imageAlt: "Woman working on a tablet illustrating fast and premium website experience",
      },
      {
        title: "SEO-ready structure for local discovery",
        description: "Built with local SEO best practices so your business is easy to find by customers searching in Leon Springs and nearby areas.",
        imageSrc: "/map-pointer-location-on-a-laptop-3d-illustration.webp",
        imageAlt: "Map pointer location on a laptop symbolizing SEO structure and local search visibility for Leon Springs",
      },
    ],

    services: [
      {
        key: "custom-website-design",
        title: "Custom Website Design",
        description:
          "Websites designed from the ground up—no templates, no shortcuts. Every layout is crafted to reflect your brand, build instant trust, and guide visitors with clarity from the first scroll.",
        icon: "penTool",
        imageSrc: "/freelance-blogger-working-on-laptop-screen-mockup.webp",
        imageAlt: "Freelance blogger working on laptop screen mockup",
      },
      {
        key: "performance-first-development",
        title: "Performance-First Development",
        description:
          "Modern builds using frameworks like Next.js to deliver fast load times, smooth interactions, and a secure foundation that scales as your business grows.",
        icon: "penTool",
        imageSrc: "/laptop-smartphone-ant-tablet-pc-with-stock-trader.webp",
        imageAlt: "Laptop, smartphone, and tablet PC with stock trader dashboard",
      },
      {
        key: "conversion-seo-foundations",
        title: "Conversion & SEO Foundations",
        description:
          "Clear messaging, intentional page flow, and on-page SEO fundamentals that help your site convert visitors and get discovered in local search.",
        icon: "penTool",
        imageSrc: "/seo-search-engine-optimization.webp",
        imageAlt: "SEO search engine optimization dashboard",
      },
      {
        key: "branding-visual-polish",
        title: "Branding & Visual Polish",
        description:
          "Typography, color, spacing, and visual refinement that elevate credibility—so your website feels cohesive, professional, and high-quality across every page.",
        icon: "penTool",
        imageSrc: "/office-desk-with-cropped-view-of-designer-artwork.webp",
        imageAlt: "Office desk with cropped view of designer artwork",
      },
    ],

    whyChooseUsCards: [
      {
        key: "nextjs-performance",
        stat: "Modern",
        title: "Built with Next.js",
        description: "Performance and scalability come standard with every site, thanks to a modern Next.js tech stack.",
        imageSrc: "/garden-gardening-home-girl-replanting-green.webp",
        imageAlt: "Fast-loading modern website displayed on laptop and mobile",
      },
      {
        key: "conversion-design",
        stat: "Conversion",
        title: "Designed to Convert",
        description: "Every page is crafted for clarity and action—not just looks—so your site turns visitors into real leads.",
        imageSrc: "/man-sitting-in-cafe-reading-laptop.webp",
        imageAlt: "Website layout planning and wireframe displayed on screen",
      },
      {
        key: "transparent-process",
        stat: "Clear",
        title: "Transparent Process",
        description: "You’ll always know what’s next. We keep timelines clear, communication open, and projects on track.",
        imageSrc: "/young-business-people-meeting-office-teamwork.webp",
        imageAlt: "Small business owner reviewing a website design on laptop",
      },
      {
        key: "local-first",
        stat: "Local",
        title: "Local-First Mindset",
        description: "Pages and content are written for Leon Springs search intent, helping you rank and get found locally.",
        imageSrc: "/young-woman-using-a-laptop-computer-with-a-white.webp",
        imageAlt: "Website project checklist and organized design workflow",
      },
    ],

    faqs: [
      {
        q: "Do you offer ongoing hosting and maintenance?",
        a: "Yes — we offer hosting, backups, security, and monthly updates so you’re not stuck managing the technical side.",
      },
      {
        q: "Can you improve my current website’s speed?",
        a: "Yes — performance improvements are often one of the biggest conversion wins, especially on mobile.",
      },
      {
        q: "Do you meet with clients in Leon Springs or nearby?",
        a: "Yes — we’re based near Leon Springs and can meet virtually or locally depending on your preference."
      },
      {
        q: "How much does a professional website typically cost?",
        a: "Most custom websites fall between a few thousand and mid-five figures depending on complexity, features, and long-term goals."
      },
      {
        q: "Is a custom website worth it for a small business?",
        a: "Yes — a custom website is designed around your business goals, conversions, and SEO, not a one-size-fits-all template."
      },
      {
        q: "How is your approach different from website builders?",
        a: "Unlike page builders, we design and develop custom websites that load faster, rank better, and scale as your business grows."
      },
      {
        q: "Can you help my business rank on Google?",
        a: "We focus on building strong technical foundations that support SEO growth, especially for local and service-based businesses."
      },
      {
        q: "How long does it take to build a website?",
        a: "Most projects take 4–8 weeks depending on scope, content readiness, and feedback timing."
      },
      {
        q: "What do you need from me to get started?",
        a: "We guide you through a simple discovery process to understand your goals, audience, and brand before design begins."
      }
    ],

    proofPoints: [
      "Local, responsive communication",
      "Custom builds designed to scale",
      "Performance-focused tech stack",
    ],
  },

  "web-design-boerne-tx": {
    key: "web-design-boerne-tx",
    slug: "/web-design-boerne-tx",
    service: "web-design",

    city: "Boerne",
    state: "TX",
    areaLabel: "Boerne & The Hill Country",
    nearbyAreas: ["Fair Oaks Ranch", "Leon Springs", "Comfort", "Sisterdale"],

    title: "Web Design in Boerne, TX | RiverCity Creatives",
    description:
      "Custom web design for Boerne businesses — modern websites built for speed, trust, and local visibility.",

    heroTitle: "Web Design for Boerne, TX Businesses",
    heroSubtitle:
      "Premium, modern websites for Hill Country businesses that need leads, credibility, and a clean online presence.",

    outcomes: [
      {
        title: "Higher trust and stronger first impressions",
        description:
          "A premium visual system and clear structure that makes your business feel established from the first scroll.",
        imageSrc: "/digital-device-screen-mockups-design.webp",
        imageAlt: "Digital device screen mockups showing trustworthy website design for Boerne business",
      },
      {
        title: "Clear messaging and conversion-focused layout",
        description:
          "We simplify your offer and guide visitors toward one primary action—call, book, or request a quote.",
        imageSrc: "/young-caucasian-guy-using-laptop-in-studio.webp",
        imageAlt: "Young man using laptop in studio representing clear messaging and conversion-focused web layout",
      },
      {
        title: "Fast pages that feel premium",
        description:
          "Performance-first builds that load quickly on mobile—so users stay, scroll, and take action.",
        imageSrc: "/woman-working-on-a-tablet.webp",
        imageAlt: "Woman working on a tablet illustrating fast and premium website experience",
      },
      {
        title: "SEO-ready structure for local search",
        description:
          "Clean site architecture and local SEO foundations that help Google understand what you do and where you do it.",
        imageSrc: "/map-pointer-location-on-a-laptop-3d-illustration.webp",
        imageAlt: "Map pointer location on a laptop symbolizing SEO structure and local search visibility for Boerne",
      },
    ],


    services: [
      {
        key: "custom-design-development",
        title: "Custom Design & Development",
        description:
          "Every website is built from scratch—no templates. We create a unique, professional look that fits your Boerne business and builds trust from the first click.",
        icon: "penTool",
        imageSrc: "/freelance-blogger-working-on-laptop-screen-mockup.webp",
        imageAlt: "Freelance blogger working on laptop screen mockup",
      },
      {
        key: "nextjs-performance-builds",
        title: "Next.js Performance Builds",
        description:
          "Modern frameworks like Next.js ensure your site loads fast, runs smoothly, and is secure—giving your visitors a premium experience on any device.",
        icon: "bolt",
        imageSrc: "/laptop-smartphone-ant-tablet-pc-with-stock-trader.webp",
        imageAlt: "Laptop, smartphone, and tablet PC with stock trader dashboard",
      },
      {
        key: "local-seo-foundations",
        title: "Local SEO Foundations",
        description:
          "We set up your site with the right structure, schema, and on-page SEO so Boerne customers can find you easily in local search results.",
        icon: "search",
        imageSrc: "/seo-search-engine-optimization.webp",
        imageAlt: "SEO search engine optimization dashboard",
      },
      {
        key: "branding-graphic-support",
        title: "Branding & Graphic Support",
        description:
          "We help you with branding, graphics, and visual polish so your site feels cohesive, credible, and ready to impress.",
        icon: "palette",
        imageSrc: "/office-desk-with-cropped-view-of-designer-artwork.webp",
        imageAlt: "Office desk with cropped view of designer artwork",
      },
    ],

    whyChooseUsCards: [
      {
        key: "clean-fast-builds",
        stat: "Fast",
        title: "No-Bloat Builds",
        description:
          "Clean code and performance-first decisions keep your site lightweight, fast, and smooth on every device—without unnecessary plugins or clutter.",
        imageSrc: "/garden-gardening-home-girl-replanting-green.webp",
        imageAlt: "Fast-loading modern website displayed on laptop and mobile",
      },
      {
        key: "strategy-led-layouts",
        stat: "Clear",
        title: "Strategy-Led Layouts",
        description:
          "Every page is designed around your goals and audience—not a template—so visitors immediately understand what you do and what to do next.",
        imageSrc: "/man-sitting-in-cafe-reading-laptop.webp",
        imageAlt: "Website layout planning and wireframe displayed on screen",
      },
      {
        key: "small-business-focus",
        stat: "Built for",
        title: "Small Business Decisions",
        description:
          "We design for real buyers—clear messaging, trust signals, and simple paths to contact or book, not over-engineered flows.",
        imageSrc: "/young-business-people-meeting-office-teamwork.webp",
        imageAlt: "Small business owner reviewing a website design on laptop",
      },
      {
        key: "organized-process",
        stat: "Smooth",
        title: "Clear, Guided Process",
        description:
          "You’ll always know what’s next. Our process stays organized, efficient, and focused—so projects move forward without confusion or delays.",
        imageSrc: "/young-woman-using-a-laptop-computer-with-a-white.webp",
        imageAlt: "Website project checklist and organized design workflow",
      },
    ],

    faqs: [
      {
        q: "Do you offer ongoing hosting and maintenance?",
        a: "Yes — we offer hosting, backups, security, and monthly updates so you’re not stuck managing the technical side.",
      },
      {
        q: "Can you improve my current website’s speed?",
        a: "Yes — performance improvements are often one of the biggest conversion wins, especially on mobile.",
      },
      {
        q: "Do you meet with clients in Boerne or nearby?",
        a: "Yes — we’re based near Boerne and can meet virtually or locally depending on your preference."
      },
      {
        q: "How much does a professional website typically cost?",
        a: "Most custom websites fall between a few thousand and mid-five figures depending on complexity, features, and long-term goals."
      },
      {
        q: "Is a custom website worth it for a small business?",
        a: "Yes — a custom website is designed around your business goals, conversions, and SEO, not a one-size-fits-all template."
      },
      {
        q: "How is your approach different from website builders?",
        a: "Unlike page builders, we design and develop custom websites that load faster, rank better, and scale as your business grows."
      },
      {
        q: "Can you help my business rank on Google?",
        a: "We focus on building strong technical foundations that support SEO growth, especially for local and service-based businesses."
      },
      {
        q: "How long does it take to build a website?",
        a: "Most projects take 4–8 weeks depending on scope, content readiness, and feedback timing."
      },
      {
        q: "What do you need from me to get started?",
        a: "We guide you through a simple discovery process to understand your goals, audience, and brand before design begins."
      }
    ],
  },

  // "small-business-web-design-san-antonio": {
  //   key: "small-business-web-design-san-antonio",
  //   slug: "/small-business-web-design-san-antonio",
  //   service: "small-business-web-design",

  //   city: "San Antonio",
  //   state: "TX",
  //   areaLabel: "San Antonio",
  //   nearbyAreas: ["Leon Springs", "Boerne", "Alamo Heights", "Stone Oak"],

  //   title: "Small Business Web Design in San Antonio, TX | RiverCity Creatives",
  //   description:
  //     "Small business web design in San Antonio — modern websites built to convert, load fast, and support local SEO.",

  //   heroTitle: "Small Business Web Design in San Antonio, TX",
  //   heroSubtitle:
  //     "A modern website that earns trust, explains your offer clearly, and turns visitors into leads.",

  //   outcomes: [
  //     "Clear messaging and strong CTAs",
  //     "Fast mobile experience",
  //     "SEO-ready structure for local visibility",
  //     "Design that feels premium, not generic",
  //   ],

  //   servicesBullets: [
  //     "Custom web design + development",
  //     "Conversion-focused layouts",
  //     "SEO foundations + internal linking",
  //     "Branding support when needed",
  //   ],

  //   differentiators: [
  //     "Small-business focused strategy",
  //     "Modern stack for speed and stability",
  //     "Clear process and deliverables",
  //   ],

  //   faqs: [
  //     {
  //       q: "What’s the best website platform for a small business?",
  //       a: "It depends on goals. For performance and flexibility, we often use Next.js for custom sites that need speed and scalability.",
  //     },
  //     {
  //       q: "Will my website help me get more leads?",
  //       a: "Yes — we design pages around messaging clarity, trust, and conversion actions (calls, forms, bookings).",
  //     },
  //   ],
  // },
};

export function getLocationPage(key: LocationPageKey) {
  const page = LOCATION_PAGES[key];
  if (!page) throw new Error(`Unknown location page key: ${key}`);
  return page;
}
