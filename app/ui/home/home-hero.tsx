// app/ui/pages/home/HomeHero.tsx (SERVER)
import Image from "../components/image";
import dynamic from "next/dynamic";

const HomeHeroEffects = dynamic(() => import("./client/home-hero-client"), {
  // keep initial layout stable (no shift)
  loading: () => null,
});

export default function HomeHero() {
  return (
    <section
      data-hero-section
      className="relative w-full min-h-[900px]"
      style={{ height: "100vh", minHeight: "900px" }}
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
          <Image
            src="/hero-blob.webp"
            alt="Background blob"
            width={800}
            height={650}
            className="-mt-[200px] sm:-mt-[300px] md:-mt-[500px] select-none z-5"
            style={{ userSelect: "none" }}
            priority
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

            <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 z-30 flex w-full items-end justify-center -gap-10">
              <Image
                src="/barb.webp"
                alt="Barb"
                width={350}
                height={450}
                className="-mr-8 min-w-[350px] min-h-[450px]"
                priority
                fetchPriority="high"
              />
              <Image
                src="/isaac.webp"
                alt="Isaac"
                width={300}
                height={400}
                className="-ml-8 min-w-[300px] min-h-[400px]"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
