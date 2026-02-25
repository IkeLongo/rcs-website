
import { format } from "date-fns";
import { sanityFetch } from "@/sanityStudio/lib/live";
import { POST_QUERY } from "@/sanityStudio/lib/queries";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { urlFor } from "@/sanityStudio/lib/image";
import { components } from "@/sanityStudio/portableTextComponents";

import type { Post } from "@/types/blogTypes";

export default async function BlogContentCentered({ params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: await params,
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full bg-navy-500 pt-28 md:pt-40 pb-20">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <img
          src={urlFor(post.mainImage).width(1024).height(720).url()}
          alt={post.title}
          className="h-60 w-full rounded-3xl object-cover md:h-[30rem]"
          height={720}
          width={1024}
        />
        <h2 className="mt-6 mb-2 !text-lg md:!text-2xl !font-bold tracking-tight !text-alice-blue-500 !font-maven-pro">
          {post.title}
        </h2>
        <div className="flex items-center">
          <img
            src={urlFor(post.authorAvatar).width(20).height(20).url()}
            alt={post.author}
            className="h-5 w-5 rounded-full"
            height={20}
            width={20}
          />
          <p className="pl-2 !text-sm !text-neutral-400">
            {post.author}
          </p>
          <div className="mx-2 h-1 w-1 rounded-full bg-neutral-200" />
          <p className="pl-1 !text-sm !text-neutral-400">
            {format(new Date(post.publishedAt), "LLLL d, yyyy")}
          </p>
        </div>
        <div className="prose-sm mt-10 sm:mt-20">
          {post?.body ? (
            <div className="!text-neutral-200">
              <PortableText value={post.body} components={components} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
