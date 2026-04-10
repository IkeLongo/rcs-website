import type { ServiceProcessStep } from '@/app/data/services';

export default function ServiceDetailProcess({ steps }: { steps: ServiceProcessStep[] }) {
  return (
    <section className="w-full bg-navy-500 px-6 py-16 md:px-16 lg:px-24 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center font-maven-pro text-3xl font-bold text-white md:text-4xl">
          What to Expect
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-green-500/40 bg-green-500/10 font-maven-pro text-base font-bold text-green-500">
                {idx + 1}
              </div>
              <h3 className="font-maven-pro text-lg font-bold text-white">{step.title}</h3>
              <p className="font-maven-pro text-sm leading-relaxed text-white/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
