// /sanityStudio/portableTextComponents.tsx

import Image from "next/image";
import Link from "next/link";
import { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanityStudio/lib/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import MuxPlayer from "@mux/mux-player-react";

export const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="!text-4xl font-bold mt-8 mb-4 text-neutral-950">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="!text-3xl font-bold mt-6 mb-3 text-neutral-950">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="!text-lg !font-gentium-book-plus font-semibold mt-5 mb-2 text-neutral-950">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="!text-md2 !font-gentium-book-plus font-semibold mt-4 mb-2 text-neutral-950">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-neutral-700 leading-7">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-neutral-200 pl-4 italic text-neutral-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-neutral-200">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-neutral-200">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-7">{children}</li>,
    number: ({ children }) => <li className="leading-7">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-neutral-100 text-neutral-900 px-2 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <Link
        href={value?.href || "#"}
        className="text-alice-blue-500 hover:text-alice-blue-300 underline"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    ),
  },
  types: {
    codeBlock: ({ value }) => {
      const filename = value?.filename as string | undefined;
      const language = value?.language as string | undefined;
      const code = (value?.code as string | undefined) ?? "";

      return (
        <div className="my-6 rounded-lg overflow-hidden border border-neutral-700/50 shadow-lg">
          {/* Header bar with filename and language */}
          <div 
            className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-700/50"
            style={{ 
              backgroundColor: '#1e1e1e',
              paddingTop: '0.625rem',
              paddingBottom: '0.625rem',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              {filename && (
                <span className="ml-2 text-sm text-neutral-300 font-mono">
                  {filename}
                </span>
              )}
            </div>
            {language && (
              <span className="text-xs text-neutral-400 font-mono uppercase">
                {language}
              </span>
            )}
          </div>

          {/* Code block with syntax highlighting */}
          <SyntaxHighlighter
            language={language || "typescript"}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1.25rem",
              fontSize: "0.875rem",
              lineHeight: "1.6",
              background: "#1e1e1e",
            }}
            showLineNumbers={true}
            wrapLines={true}
            lineNumberStyle={{
              minWidth: "2.5em",
              paddingRight: "1em",
              color: "#858585",
              userSelect: "none",
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    },
    image: (props) =>
      props.value ? (
        <Image
          className="rounded-lg not-prose w-full h-auto mb-6"
          src={urlFor(props.value)
            .width(600)
            .height(400)
            .quality(80)
            .auto("format")
            .url()}
          alt={props?.value?.alt || ""}
          width="600"
          height="400"
        />
      ) : null,
    video: ({ value }) => {
      if (!value?.asset) return null;
      
      return (
        <div className="my-6 rounded-lg overflow-hidden shadow-lg">
          <MuxPlayer
            playbackId={value.asset.playbackId}
            metadata={{
              video_title: value.asset.filename || "Video",
            }}
            streamType="on-demand"
            className="w-full"
            style={{ aspectRatio: '16/9' }}
          />
        </div>
      );
    },
  },
};