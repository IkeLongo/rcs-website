// app/(site)/(locations)/_locations/location-template.tsx

// import Footer from "@/app/ui/layout/footer";
// import FadeInUp from "@/app/ui/components/fade-in-up";
import { LocationSchema } from "./location-schema";
import LocationHero from "./location-hero";
import BentoOutcomeCard from "@/app/ui/components/bento/bento-outcome-card";
import LocationServices from "./location-services";
import LocationWhyChooseUs from "./location-why-choose-us";
import FAQs from "@/app/ui/components/classic-faq";
import type { LocationPageConfig } from "./locations.data";
import LocationFinalCTA from "./location-cta";

export default function LocationTemplate({ page }: { page: LocationPageConfig }) {
  return (
    <>
      <LocationSchema page={page} />

      <LocationHero page={page} />

      {/* OUTCOMES SECTION - Bento Grid */}
      <section className="locations w-full bg-alice-blue-500 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            {/* <FadeInUp> */}
              <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-5">
                What You'll Get
              </h2>
              <p className="text-md2 text-navy-600 max-w-3xl mx-auto">
                A premium website system built for speed, trust, and real leads — not just a prettier homepage.
              </p>
            {/* </FadeInUp> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {Array.isArray(page.outcomes) && typeof page.outcomes[0] === 'object' && (
              <>
                <BentoOutcomeCard
                  {...page.outcomes[0]}
                  label="First Impressions"
                  className="lg:col-span-1 min-h-[280px]"
                />

                <BentoOutcomeCard
                  {...page.outcomes[1]}
                  label="Conversions"
                  className="lg:col-span-2 min-h-[280px]"
                />

                <BentoOutcomeCard
                  {...page.outcomes[2]}
                  label="Performance"
                  className="lg:col-span-2 min-h-[280px]"
                />

                <BentoOutcomeCard
                  {...page.outcomes[3]}
                  label="Local SEO"
                  className="lg:col-span-1 min-h-[280px]"
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION - Enhanced with visual elements */}
      <LocationServices city={page.city} services={page.services} />

      {/* WHY CHOOSE US SECTION */}
      <LocationWhyChooseUs cards={page.whyChooseUsCards} />

      {/* NEARBY AREAS SECTION */}
      {page.nearbyAreas?.length ? (
        <section className="locations w-full bg-alice-blue-200 py-16">
          <div className="mx-auto max-w-6xl px-6 text-center">
            {/* <FadeInUp> */}
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-6">
                Nearby Areas We Serve
              </h2>
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {page.nearbyAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-block px-6 py-3 bg-white rounded-full text-navy-900 font-medium shadow-md hover:shadow-lg transition-shadow"
                  >
                    {area}
                  </span>
                ))}
              </div>
            {/* </FadeInUp> */}
          </div>
        </section>
      ) : null}

      {/* FAQS SECTION */}
      <section className="locations w-full bg-white py-20">
        <FAQs 
          faqs={page.faqs.map(faq => ({ question: faq.q, answer: faq.a }))}
        />
      </section>

      {/* FINAL CTA SECTION */}
      <LocationFinalCTA
        city={page.city}
        heading={`Ready to Upgrade Your Website in ${page.city}?`}
        subheading="Let's talk through your goals and recommend the simplest path to a modern, high-performing site that drives real business results."
        stats={[
          {
            key: "years",
            value: 5,
            suffix: "+",
            label: "Over 5 years building websites for small businesses."
          },
          {
            key: "sites",
            value: 50,
            suffix: "+",
            label: "More than 50 websites launched for clients like you."
          },
          {
            key: "satisfaction",
            value: 100,
            suffix: "%",
            label: "100% client satisfaction with clear process and results."
          },
        ]}
      />

      {/* <Footer bgGradientClass="bg-footer-bg-gradient-solid" /> */}
    </>
  );
}
