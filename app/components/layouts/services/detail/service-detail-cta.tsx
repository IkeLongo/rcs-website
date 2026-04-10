import { IconArrowRight } from '@tabler/icons-react';
import { TrackedCTA } from '@/app/components/analytics/tracked-cta';
import type { Service } from '@/app/data/services';

export default function ServiceDetailCta({ service }: { service: Service }) {
  return (
    <section className="w-full bg-navy-500 px-6 py-16 md:px-16 lg:px-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 font-maven-pro text-3xl font-bold text-white md:text-4xl">
          Ready to Get Started?
        </h2>
        <p className="mb-8 font-maven-pro text-base leading-relaxed text-white/70">
          Let&apos;s talk about your project and figure out the best path forward for your business.
        </p>
        <TrackedCTA
          href={service.ctaHref}
          cta_id={`${service.slug}-bottom-cta`}
          location={`service-detail-bottom-${service.slug}`}
          className="inline-flex items-center gap-2 rounded-[13px] bg-lime-500 px-8 py-4 font-maven-pro text-base font-bold text-navy-500 transition-colors hover:bg-green-600"
        >
          {service.ctaText}
          <IconArrowRight size={18} />
        </TrackedCTA>
      </div>
    </section>
  );
}
