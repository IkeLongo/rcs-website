import Image from "next/image";
import { IconPhoto } from "@tabler/icons-react";

/**
 * Pattern per group of 4 images:
 * 0: big hero
 * 1-2: two-up row
 * 3: big hero
 * repeat...
 */
function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

type BrandInActionProps = {
  projectName: string;
  mockups?: string[];
  // optional: tighten/loosen the section spacing in your modal
  className?: string;
};

export function BrandInAction({
  projectName,
  mockups = [],
  className = "",
}: BrandInActionProps) {
  if (!mockups.length) {
    return (
      <div className={className}>
        <div className="text-neutral-400 text-center py-8 w-full">
          No mockups available.
        </div>
      </div>
    );
  }

  const groups = chunk(mockups, 4);

  return (
    <section className={className}>
      <div className="mt-4 space-y-4">
        {groups.map((group, groupIndex) => {
          const [a, b, c, d] = group;

          return (
            <div key={`${projectName}-mockup-group-${groupIndex}`} className="space-y-1">
              {/* Big hero (a) */}
              {a && (
                <MockupCard
                  src={a}
                  alt={`${projectName} mockup ${groupIndex * 4 + 1}`}
                  variant="hero"
                  className="max-h-[400px]"
                />
              )}

              {/* Two-up row (b,c) -> stacks on mobile */}
              {(b || c) && (
                <div className="flex gap-2 items-stretch max-h-[400px]">
                  {b && (
                    <div className="flex-[5] flex flex-col">
                      <MockupCard
                        src={b}
                        alt={`${projectName} mockup ${groupIndex * 4 + 2}`}
                        variant="wide"
                        fillHeight
                      />
                    </div>
                  )}
                  {c && (
                    <div className="flex-[3] flex flex-col">
                      <MockupCard
                        src={c}
                        alt={`${projectName} mockup ${groupIndex * 4 + 3}`}
                        variant="tall"
                        className="h-full object-center fill"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Big hero (d) */}
              {d && (
                <MockupCard
                  src={d}
                  alt={`${projectName} mockup ${groupIndex * 4 + 4}`}
                  variant="hero"
                  className="max-h-[400px]"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MockupCard({
  src,
  alt,
  variant,
  className = "",
  fillHeight = false,
}: {
  src: string;
  alt: string;
  variant: "hero" | "square" | "wide" | "tall";
  className?: string;
  fillHeight?: boolean;
}) {
  // Aspect ratios for each variant
  let aspect = "aspect-square";
  let sizes = "(min-width: 768px) 450px, 100vw";
  if (variant === "hero") {
    aspect = "aspect-[1045/562]";
    sizes = "(min-width: 768px) 900px, 100vw";
  } else if (variant === "wide") {
    aspect = "aspect-[613/520]";
    sizes = "(min-width: 768px) 600px, 100vw";
  } else if (variant === "tall") {
    aspect = "aspect-[405/515]";  // w-405px h-515px ratio
    sizes = "(min-width: 768px) 350px, 100vw";
  }

  // If fillHeight is true, don't use aspect ratio - fill container height instead
  const heightClass = fillHeight ? "h-full" : aspect;

  return (
    <div className={`rounded-[10px] overflow-hidden border border-white/10 bg-white/5 ${fillHeight ? 'h-full' : ''} ${className}`}>
      <div className={`relative w-full ${heightClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes={sizes}
          draggable={false}
          loading="lazy"
        />
      </div>
    </div>
  );
}