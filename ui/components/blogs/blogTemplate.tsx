
import Link from "next/link";
import { urlFor } from "@/sanityStudio/lib/image";

import type { Post } from "@/types/blogTypes";

import { cn } from "@/lib/utils";

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <span className="font-medium text-black dark:text-white">DevStudio</span>
    </Link>
  );
};

export const BlogCard = async ({ post }: { post: Post }) => {
  console.log("📝 Post title:", post.title);
  console.log("📝 Post description:", post.description);
  console.log("📝 Description type:", typeof post.description);
  console.log("📝 Description length:", post.description?.length);
  
  // Ensure description always has ellipsis if it seems truncated
  const formatDescription = (desc: string | undefined) => {
    if (!desc) return "";
    const trimmed = desc.trim();
    // If description ends with incomplete sentence indicators or is long enough, add ellipsis
    const needsEllipsis = trimmed.length > 150 || /[:;,]$/.test(trimmed);
    return needsEllipsis && !trimmed.endsWith('...') ? `${trimmed}...` : trimmed;
  };
  
  return (
    <Link
      className="shadow-derek w-full overflow-hidden rounded-3xl border bg-white transition duration-200 hover:scale-[1.02] dark:border-neutral-800 dark:bg-neutral-900"
      href={`/learn/${post?.slug?.current}`}
    >
      {post.mainImage ? (
        <img
          src={urlFor(post.mainImage).width(800).height(400).url()}
          alt={post.title}
          height="400"
          width="800"
          className="h-52 w-full object-cover"
        />
      ) : (
        <div className="flex h-52 items-center justify-center bg-white dark:bg-neutral-900">
          <Logo />
        </div>
      )}
      <div className="bg-white p-4 md:p-8 dark:bg-neutral-900">
        <div className="mb-2 flex items-center space-x-2">
          <img
            src={urlFor(post.authorAvatar).width(20).height(20).url()}
            alt={post.author}
            width={20}
            height={20}
            className="h-5 w-5 rounded-full"
          />
          <p className="!text-sm !font-maven-pro !text-neutral-600">
            {post.author}
          </p>
        </div>
        <p className="mb-4 line-clamp-2 !text-left !text-md !font-maven-pro !font-bold !text-neutral-800">
          {post.title}
        </p>
        <p className="mt-2 line-clamp-3 !text-left !text-sm !font-maven-pro !text-neutral-600">
          {formatDescription(post.description)}
        </p>
      </div>
    </Link>
  );
};

export function GridPatternContainer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_50%,white_0%,transparent_70%)]",
        className,
      )}
    >
      <GridPattern />
    </div>
  );
}
export function GridPattern() {
  const columns = 30;
  const rows = 13;
  return (
    <div className="flex flex-shrink-0 scale-105 flex-wrap items-center justify-center gap-x-px gap-y-px bg-gray-200 dark:bg-neutral-700">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`flex h-10 w-10 flex-shrink-0 rounded-[1px] ${
                index % 2 === 0
                  ? "bg-gray-100 dark:bg-neutral-800"
                  : "bg-gray-100 shadow-[0px_0px_0px_3px_rgba(255,255,255,1)_inset] dark:bg-neutral-800 dark:shadow-[0px_0px_0px_3px_rgba(0,0,0,0.2)_inset]"
              }`}
            />
          );
        }),
      )}
    </div>
  );
}