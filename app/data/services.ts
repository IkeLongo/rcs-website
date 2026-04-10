// ─── Types ────────────────────────────────────────────────────────────────────

export type ServiceFeature = {
  title: string;
  description: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  heroDescription: string;
  intro?: string;
  features: ServiceFeature[];
  process?: ServiceProcessStep[];
  faqs?: ServiceFaq[];
  ctaText: string;
  ctaHref: string;
  seo: {
    title: string;
    description: string;
  };
};

// ─── Service data ─────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    slug: 'web-design-development',
    title: 'Web Design & Development',
    shortDescription: 'Custom websites built to convert visitors into clients.',
    heroDescription:
      'We design and build custom websites that are fast, secure, and built around your business goals — not just looks.',
    intro:
      'Your website is your most powerful sales tool. We combine strategy, design, and development to build an online presence that works as hard as you do.',
    features: [
      {
        title: 'Custom Design',
        description:
          'Every site is designed from scratch to match your brand identity and speak directly to your ideal clients.',
      },
      {
        title: 'SEO-Ready Architecture',
        description:
          'Built with search engine optimization baked in from day one — clean code, fast load times, and proper structure.',
      },
      {
        title: 'Mobile-First Development',
        description:
          'Fully responsive across all devices. Your clients will have a seamless experience whether on desktop, tablet, or phone.',
      },
      {
        title: 'Lead Generation Focus',
        description:
          'Strategic CTAs, contact forms, and conversion pathways designed to turn browsers into paying clients.',
      },
      {
        title: 'Security & Performance',
        description:
          'SSL, security headers, optimized assets, and best-practice hosting configuration come standard.',
      },
      {
        title: 'Ongoing Support',
        description:
          'After launch, we remain your partner — available for updates, improvements, and growth strategies.',
      },
    ],
    process: [
      {
        title: 'Discovery & Strategy',
        description:
          'We learn your business, your goals, and your audience before writing a single line of code.',
      },
      {
        title: 'Design & Feedback',
        description: 'We present a detailed design concept and refine it based on your feedback.',
      },
      {
        title: 'Development & QA',
        description: 'We build, test, and polish every detail before your site goes live.',
      },
      {
        title: 'Launch & Handoff',
        description:
          'We deploy your site and make sure you know how to use and manage it going forward.',
      },
    ],
    faqs: [
      {
        question: 'How long does a website project take?',
        answer:
          'Most projects are completed within 60–90 days, depending on scope and how quickly feedback rounds are completed.',
      },
      {
        question: "Do I own the website after it's built?",
        answer:
          'Yes. Once the project is complete and paid in full, you own all of the assets and source code.',
      },
      {
        question: 'Will my site be easy to update?',
        answer:
          'We build sites with maintainability in mind. We can also set up a CMS so you can handle basic updates yourself.',
      },
    ],
    ctaText: 'Start Your Project',
    ctaHref: '/contact',
    seo: {
      title: 'Web Design & Development | River City Creatives',
      description:
        'Custom website design and development services for small businesses. Fast, secure, and built to convert.',
    },
  },
  {
    slug: 'branding-visual-identity',
    title: 'Branding & Visual Identity',
    shortDescription: 'A brand that earns trust before you say a word.',
    heroDescription:
      'We craft visual identities that command attention, build trust, and communicate your value at a glance.',
    intro:
      "Your brand is more than a logo — it's the feeling people get when they encounter your business. We help you make that feeling count.",
    features: [
      {
        title: 'Logo Design',
        description:
          'A distinctive, professional mark that represents your business and works across every medium.',
      },
      {
        title: 'Brand Color System',
        description:
          'A cohesive color palette that communicates your brand personality and stands out in your market.',
      },
      {
        title: 'Typography Selection',
        description:
          'Carefully chosen typefaces that convey your tone — whether bold and confident or elegant and refined.',
      },
      {
        title: 'Brand Style Guide',
        description:
          'A comprehensive reference document so your brand stays consistent across every touchpoint.',
      },
      {
        title: 'Supporting Visual Assets',
        description:
          'Icons, patterns, and graphic elements that bring your brand to life across digital and print.',
      },
      {
        title: 'Brand Strategy',
        description:
          'Positioning, message framing, and audience clarity so your visuals are backed by substance.',
      },
    ],
    process: [
      {
        title: 'Brand Discovery',
        description:
          'A deep-dive session to understand your business, audience, and the impression you want to make.',
      },
      {
        title: 'Concept Development',
        description: 'We develop multiple brand directions and present them for your feedback.',
      },
      {
        title: 'Refinement',
        description:
          'We finalize every element based on your input until the brand feels exactly right.',
      },
      {
        title: 'Delivery',
        description:
          'You receive all files, the brand guide, and any supporting assets in organized, production-ready formats.',
      },
    ],
    faqs: [
      {
        question: 'What deliverables will I receive?',
        answer:
          "You'll receive logo files in all formats (SVG, PNG, PDF), a full brand style guide, and any additional assets included in your package.",
      },
      {
        question: 'How many revisions are included?',
        answer:
          'We include structured feedback rounds at each stage. Most clients achieve a result they love within 2–3 revision cycles.',
      },
      {
        question: 'Can I use the brand on both print and digital?',
        answer:
          'Yes. All assets are delivered in formats suitable for both digital use and professional print production.',
      },
    ],
    ctaText: 'Build Your Brand',
    ctaHref: '/contact',
    seo: {
      title: 'Branding & Visual Identity | River City Creatives',
      description:
        'Professional branding services including logo design, color systems, and brand strategy for small businesses.',
    },
  },
  {
    slug: 'lead-capture-growth-systems',
    title: 'Lead Capture & Growth Systems',
    shortDescription: 'Turn your website into a consistent source of new clients.',
    heroDescription:
      'We build the systems and infrastructure that capture leads, nurture prospects, and support long-term business growth.',
    intro:
      'Traffic without a system is just noise. We implement the tools and workflows that convert your online presence into a reliable pipeline.',
    features: [
      {
        title: 'Lead Capture Forms',
        description:
          'Optimized forms and landing pages designed to convert visitors into qualified leads.',
      },
      {
        title: 'CRM Integration',
        description:
          'Connect your website to your CRM so every lead is captured and followed up automatically.',
      },
      {
        title: 'Email Automation',
        description:
          'Set up automated sequences that nurture leads and keep your business top of mind.',
      },
      {
        title: 'Analytics & Tracking',
        description:
          'Understand where your leads come from and which channels are worth your investment.',
      },
      {
        title: 'Booking & Scheduling',
        description:
          'Calendar integrations that turn interest into booked appointments without back-and-forth.',
      },
      {
        title: 'Monthly Reporting',
        description:
          'Regular performance insights so you always know how your growth systems are performing.',
      },
    ],
    process: [
      {
        title: 'Audit & Plan',
        description:
          'We review your current setup and map out the systems that will have the biggest impact.',
      },
      {
        title: 'Build & Integrate',
        description:
          'We implement the tools, connect the integrations, and configure everything for your workflow.',
      },
      {
        title: 'Test & Launch',
        description: 'Every form, sequence, and trigger is tested before going live.',
      },
      {
        title: 'Monitor & Optimize',
        description:
          'Ongoing review of results with regular adjustments to keep performance strong.',
      },
    ],
    faqs: [
      {
        question: 'What tools do you use?',
        answer:
          'We work with a range of tools depending on your needs and existing stack — including GoHighLevel, HubSpot, Mailchimp, and custom integrations.',
      },
      {
        question: 'Do I need to be tech-savvy to manage this?',
        answer:
          'No. We build these systems with business owners in mind and provide clear documentation and training.',
      },
      {
        question: 'How quickly can I expect results?',
        answer:
          'You can expect to start capturing leads immediately after launch. Results compound over time as the system is optimized.',
      },
    ],
    ctaText: 'Set Up My Growth System',
    ctaHref: '/contact',
    seo: {
      title: 'Lead Capture & Growth Systems | River City Creatives',
      description:
        'Lead generation systems, CRM integrations, and marketing automation for small businesses ready to grow.',
    },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
