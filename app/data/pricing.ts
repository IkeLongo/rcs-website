import { type PlanData } from "@/app/components/ui/pricing/pricing-cards";

export const plans: PlanData[] = [
  {
    id: "launch",
    name: "Launch",
    audience: "For small businesses getting started online",
    setupFee: 1000,
    monthlyPrice: 97,
    currency: "$",
    description:
      "Build a professional online presence that helps your business look credible and capture new leads.",
    features: [
      "Custom website design",
      "Mobile-friendly layout",
      "Contact form integration",
      "Basic on-page SEO",
      "SMS and Email Automations",
      "Hosting and maintenance",
      "1 website update per month",
    ],
    buttonText: "Choose Launch",
  },
  {
    id: "grow",
    name: "Grow",
    audience: "For businesses ready to generate and manage more leads",
    setupFee: 1500,
    monthlyPrice: 297,
    currency: "$",
    featured: true,
    description:
      "Turn more visitors into opportunities with stronger lead capture, automation, and search visibility.",
    additionalFeatures: ["Everything in Launch"],
    features: [
      "Booking or quote request system",
      "CRM integration",
      "Chat Widget setup",
      "Google review automation tools",
      "Expanded SEO setup",
      "3 website updates per month",
    ],
    buttonText: "Choose Grow",
  },
  {
    id: "scale",
    name: "Scale",
    audience: "For established businesses focused on growth and efficiency",
    setupFee: 2500,
    monthlyPrice: 597,
    currency: "$",
    description:
      "Scale your online presence with deeper automation, stronger visibility, and more customized support.",
    additionalFeatures: ["Everything in Launch", "Everything in Grow"],
    features: [
      "Advanced website customization",
      "Landing page creation",
      "Ongoing SEO support",
      "AI chatbot setup",
      "Advanced workflow automations",
      "Reporting insights",
      "5 website updates per month",
    ],
    buttonText: "Choose Scale",
  },
];

export const pricingFaqs: { q: string; a: string }[] = [
  {
    q: "Is there a long-term contract?",
    a: "No long-term contracts. Plans are month-to-month and you can cancel any time. The setup fee covers your initial design and build work.",
  },
  {
    q: "What does the setup fee cover?",
    a: "The one-time setup fee covers the full design, development, and launch of your website plus any integrations included in your plan — CRM, booking system, automations, etc.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Absolutely. You can upgrade at any time and we'll prorate the difference. Many clients start on Launch and move to Grow once their business picks up.",
  },
  {
    q: "Do you offer a la carte services?",
    a: "Yes. If you only need a specific deliverable — a landing page, a logo refresh, or a one-time SEO audit — reach out and we'll put together a custom quote.",
  },
  {
    q: "How long does it take to launch my site?",
    a: "Most Launch sites go live within 2–3 weeks. Grow and Scale projects typically take 3–5 weeks depending on scope and how quickly we receive your content.",
  },
  {
    q: "What happens if I need more than the included monthly updates?",
    a: "Additional update requests beyond your plan's allotment are billed at an hourly rate. We'll always give you a heads-up before any extra charges apply.",
  },
];
