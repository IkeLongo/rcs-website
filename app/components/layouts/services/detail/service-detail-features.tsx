import type { Service } from '@/app/data/services';

export default function ServiceDetailFeatures({ service }: { service: Service }) {
  return (
    <section className="w-full bg-white px-6 py-16 md:px-16 lg:px-24 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-maven-pro text-3xl font-bold text-navy-500 md:text-4xl">
            What&apos;s Included
          </h2>
          {service.intro && (
            <p className="mx-auto mt-4 max-w-2xl font-maven-pro text-base leading-relaxed text-navy-500/60">
              {service.intro}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {service.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-[13px] border border-gray-100 bg-alice-blue-500 p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-navy-500 font-maven-pro text-sm font-bold text-white">
                {idx + 1}
              </div>
              <h3 className="mb-2 font-maven-pro text-lg font-bold text-navy-500">
                {feature.title}
              </h3>
              <p className="font-maven-pro text-sm leading-relaxed text-navy-500/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
