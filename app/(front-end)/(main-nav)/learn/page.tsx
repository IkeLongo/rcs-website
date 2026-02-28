import { GridPatternContainer } from "@/ui/components/blogs/blogTemplate";
import { BlogCard } from "@/ui/components/blogs/blogTemplate";
import { sanityFetch } from "@/sanityStudio/lib/live";
import { POSTS_QUERY } from "@/sanityStudio/lib/queries";
import Footer from "@/ui/layout/footer";

import type { Post } from "@/types/blogTypes";

import { cn } from "@/lib/utils";

export default async function SimpleBlogWithGrid() {
  const { data: posts } : { data: Post[] } = await sanityFetch({ query: POSTS_QUERY });

  return (
    <div className="base relative overflow-hidden py-20 md:py-0 bg-navy-500">
      <div className="relative overflow-hidden mx-auto pt-0 md:pt-20 pb-10">
        <GridPatternContainer className="opacity-20" />
        <div className="relative z-20 pt-10 md:pt-20 pb-10 max-w-7xl mx-auto px-4 md:px-8">
          <h1
            className={cn(
              "mb-6 scroll-m-20 !text-4xl md:!text-5xl !text-left font-bold !text-white",
            )}
          >
            Learn
          </h1>

          <p className="text-neutral-400-foreground !mb-6 max-w-xl !text-left !font-maven-pro !text-md2md:!text-md2 text-neutral-600">
            Discover insightful resources and expert advice from our seasoned
            team to elevate your knowledge.
          </p>
        </div>
      </div>
      <div className="w-full mx-auto flex flex-col items-center justify-between px-4 pb-20 md:px-8 bg-navy-500">
        <div className="relative max-w-7xl z-20 grid w-full grid-cols-1 gap-10 md:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard post={post} key={post.title + index} />
          ))}
        </div>
      </div>
      <Footer bgGradientClass="bg-footer-bg-gradient" />
    </div>
  );
}