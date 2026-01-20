// app/ui/pages/home/HomeHero.tsx (SERVER)
import Image from "next/image";
import dynamic from "next/dynamic";

const HomeHeroEffects = dynamic(() => import("./client/home-hero-client"), {
  // keep initial layout stable (no shift)
  loading: () => null,
});

export default function HomeHero() {
  return (
    <section
      data-hero-section
      className="relative w-full min-h-[900px] h-[100svh]"
    >
      <div className="absolute bottom-0 w-full h-full overflow-hidden bg-alice-blue-500">
        {/* Background shapes (static) */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none z-10 flex w-[1220px] max-w-full flex-col items-center">
          <div
            className="w-[min(890px,80vw)] aspect-[890/800] -mt-[600px] rounded-[50%]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(132, 196, 65, 0.40) 0%, rgba(191, 238, 60, 0.35) 30%, rgba(191, 238, 60, 0.2) 50%, rgba(191, 238, 60, 0) 70%)",
            }}
          />
          {/* Blob positioned behind people */}
          <Image
            src="/hero-blob.webp"
            alt="Background blob"
            width={800}
            height={650}
            sizes="(max-width: 768px) 90vw, 800px"
            className="absolute left-1/2 -translate-x-1/2 -translate-y-[250px] sm:translate-y-0 select-none w-[90vw] min-w-[400px] md:w-[min(800px,70vw)] h-auto"
            style={{
              bottom: "clamp(15%, 20svh, 25%)",
            }}
            priority={false}
          />
        </div>

        {/* ✅ Client-only effects (deferred) */}
        <HomeHeroEffects />

        {/* Hero content (static) */}
        <div className="relative flex h-full w-full flex-col items-center p-6 md:top-4 md:px-20">
          <div className="flex w-full flex-col pt-28 md:pt-36 self-center md:items-end md:justify-end">
            <h1 className="w-full max-w-lg text-navy-500 z-40 mx-auto text-center">
              Crafting Powerful{" "}
              <span className="italic text-neongreen-700">Websites</span> and
              <br className="hidden md:block" />
              <span className="italic text-neongreen-700"> Branding</span> for
              Your Business
            </h1>

            <div
              className="
                pointer-events-none
                absolute left-1/2 bottom-0 -translate-x-1/2
                z-30
                overflow-hidden
                w-[min(700px,100vw)]
                h-[600px]
              "
            >
              <Image
                src="/barb.webp"
                alt="Barb"
                width={350}
                height={450}
                priority
                fetchPriority="high"
                sizes="350px"
                className="absolute bottom-0 left-1/2 -translate-x-[90%] w-[350px] h-auto"
              />

              <Image
                src="/isaac.webp"
                alt="Isaac"
                width={300}
                height={400}
                loading="lazy"
                priority={false}
                sizes="300px"
                className="absolute bottom-0 left-1/2 -translate-x-[10%] md:-translate-x-[0%] w-[300px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
