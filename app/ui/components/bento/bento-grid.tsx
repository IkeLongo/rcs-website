import { cn } from "@/app/lib/utils";
import { forwardRef } from "react";

export const BentoGrid = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // MOBILE: horizontal scroll track
        "mx-auto w-full overflow-x-auto",
        "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "scroll-smooth",
        // nice snap - must be on the scroll container!
        "snap-x snap-mandatory",
        className
      )}
    >
      <div
        className={cn(
          // MOBILE: grid that flows horizontally
          "flex flex-row gap-4",
          // padding so first/last cards aren't flush
          "pl-0 pr-4 pb-8",
          // DESKTOP: revert to your normal bento grid
          "md:max-w-7xl"
        )}
      >
        {children}
      </div>
    </div>
  );
});

BentoGrid.displayName = "BentoGrid";

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // responsive card size - fills parent container
        "w-full h-full",
        // your existing styles
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-bold text-navy-500">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-gray-700">
          {description}
        </div>
      </div>
    </div>
  );
};

export const BentoGridItemImage = ({
  className,
  header,
}: {
  className?: string;
  header?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // responsive card size - fills parent container
        "w-full h-full",
        // your existing styles
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl",
        className,
      )}
    >
      {header}
    </div>
  );
};