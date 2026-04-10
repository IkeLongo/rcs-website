import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import { TrackedCTA } from '@/app/components/analytics/tracked-cta';
import type { Service } from '@/app/data/services';

export default function ServiceDetailHero({ service }: { service: Service }) {
  return (
    <section className="relative flex min-h-[460px] w-full flex-col items-start justify-center overflow-hidden bg-navy-500 px-6 pb-16 pt-[105px] md:px-16 md:pt-[130px] lg:px-24 lg:pt-[140px]">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -right-32 -top-16 h-80 w-80 rounded-full bg-royal-blue-500 opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-green-500 opacity-10 blur-3xl" />

      <div className="relative z-10 max-w-3xl">
        <span className="mb-5 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1 font-maven-pro text-xs font-semibold uppercase tracking-widest text-green-500">
          Our Services
        </span>
        <h1 className="mb-4 font-maven-pro text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          {service.title}
        </h1>
        <p className="mb-8 max-w-xl font-maven-pro text-lg leading-relaxed text-white/70">
          {service.heroDescription}
        </p>
        <div className="flex flex-wrap gap-4">
          <TrackedCTA
            href={service.ctaHref}
            cta_id={`${service.slug}-hero-cta`}
            location={`service-detail-hero-${service.slug}`}
            className="inline-flex items-center gap-2 rounded-[13px] bg-lime-500 px-6 py-3 font-maven-pro text-base font-bold text-navy-500 transition-colors hover:bg-green-600"
          >
            {service.ctaText}
            <IconArrowRight size={18} />
          </TrackedCTA>
          <Link
            href="/services"
            className="inline-flex items-center rounded-[13px] border border-white/20 px-6 py-3 font-maven-pro text-base font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
