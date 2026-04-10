import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs } from '@/app/data/services';
import type { Metadata } from 'next';
import ServiceDetailHero from '@/app/components/layouts/services/detail/service-detail-hero';
import ServiceDetailFeatures from '@/app/components/layouts/services/detail/service-detail-features';
import ServiceDetailProcess from '@/app/components/layouts/services/detail/service-detail-process';
import ServiceDetailFaq from '@/app/components/layouts/services/detail/service-detail-faq';
import ServiceDetailCta from '@/app/components/layouts/services/detail/service-detail-cta';
import Footer from '@/app/components/layouts/footer/footer';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: {
      canonical: `https://rivercitycreatives.com/services/${service.slug}`,
    },
    openGraph: {
      type: 'website',
      title: service.seo.title,
      description: service.seo.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ServiceDetailHero service={service} />
      <ServiceDetailFeatures service={service} />
      {service.process && service.process.length > 0 && (
        <ServiceDetailProcess steps={service.process} />
      )}
      {service.faqs && service.faqs.length > 0 && (
        <ServiceDetailFaq faqs={service.faqs} />
      )}
      <ServiceDetailCta service={service} />
      <Footer bgGradientClass="bg-footer-bg-gradient-solid" />
    </div>
  );
}
