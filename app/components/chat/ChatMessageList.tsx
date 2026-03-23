
"use client";

import { User, ExternalLink } from "lucide-react";
import Image from "next/image";

import type { UIMessage } from "ai";

type ChatMessageListProps = {
  messages: UIMessage[];
};

// Parse markdown links [text](url) and extract them separately
function extractLinks(text: string): { cleanText: string; links: Array<{ text: string; url: string }> } {
  const links: Array<{ text: string; url: string }> = [];
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  // Extract all links
  let match;
  while ((match = markdownLinkRegex.exec(text)) !== null) {
    links.push({
      text: match[1],
      url: match[2],
    });
  }
  
  // Remove markdown link syntax, leaving just the link text
  const cleanText = text.replace(markdownLinkRegex, '$1');
  
  return { cleanText, links };
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
  if (!messages.length) {
    return (
      <div className="flex">
        <div className="flex items-end mr-2">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-alice-blue-100">
            <Image 
              height={20}
              width={20}
              aria-hidden="true"
              src="/logo-rivercity-creatives-solo-navy-blue.svg"
              alt="RiverCity Creatives Assistant Icon"
              className="h-5 w-5 text-navy-700"
            />
          </span>
        </div>
        <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-600">
          Hi — I can help with services, pricing guidance, recommendations, and next steps.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isUser = message.role === "user";

        return (
          <div
            key={message.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            {/* For user, show icon to the right of the bubble */}
            {isUser ? (
              <>
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm bg-navy-800 text-white break-words`}
                >
                  <div className="mb-1 text-[10px] uppercase tracking-wide opacity-70">
                    You
                  </div>
                  <div className="space-y-2">
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        // Extract all links from the text
                        const lines = part.text.split("\n");
                        const allLinks: Array<{ text: string; url: string }> = [];
                        
                        const processedLines = lines.map((line) => {
                          const { cleanText, links } = extractLinks(line);
                          allLinks.push(...links);
                          return cleanText;
                        });

                        return (
                          <div key={index} className="space-y-2">
                            {/* Render text */}
                            {processedLines.map((line, i) => {
                              const isBullet = line.startsWith("- ") && line.includes(":");
                              
                              return (
                                <div key={i}>
                                  {isBullet ? (
                                    <p className="leading-6 break-words whitespace-pre-line">
                                      {"- "}
                                      {(() => {
                                        const [service, ...rest] = line.slice(2).split(":");
                                        return (
                                          <>
                                            <strong>{service.trim()}</strong>
                                            {":" + rest.join(":")}
                                          </>
                                        );
                                      })()}
                                    </p>
                                  ) : line.trim() ? (
                                    <p className="leading-6 break-words whitespace-pre-line">
                                      {line}
                                    </p>
                                  ) : null}
                                </div>
                              );
                            })}
                            
                            {/* Render buttons at the end */}
                            {allLinks.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {allLinks.map((link, linkIdx) => (
                                  <a
                                    key={linkIdx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy-800 text-white rounded-lg hover:bg-navy-700 transition-colors text-sm font-medium"
                                  >
                                    {link.text}
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
                <div className="flex items-end ml-2">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-navy-800">
                    <User className="h-5 w-5 text-neutral-200" aria-hidden="true" />
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-end mr-2">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-alice-blue-100">
                    <Image 
                      height={20}
                      width={20}
                      aria-hidden="true"
                      src="/logo-rivercity-creatives-solo-navy-blue.svg"
                      alt="RiverCity Creatives Assistant Icon"
                      className="h-5 w-5 text-navy-700"
                    />
                  </span>
                </div>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm bg-alice-blue-100 text-navy-900`}
                >
                  <div className="mb-1 text-[10px] uppercase tracking-wide opacity-70">
                    Assistant
                  </div>
                  <div className="space-y-2">
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        // Extract all links from the text
                        const lines = part.text.split("\n");
                        const allLinks: Array<{ text: string; url: string }> = [];
                        
                        const processedLines = lines.map((line) => {
                          const { cleanText, links } = extractLinks(line);
                          allLinks.push(...links);
                          return cleanText;
                        });

                        return (
                          <div key={index} className="space-y-2">
                            {/* Render text */}
                            {processedLines.map((line, i) => {
                              const isBullet = line.startsWith("- ") && line.includes(":");
                              
                              return (
                                <div key={i}>
                                  {isBullet ? (
                                    <p className="leading-6 whitespace-pre-line">
                                      {"- "}
                                      {(() => {
                                        const [service, ...rest] = line.slice(2).split(":");
                                        return (
                                          <>
                                            <strong>{service.trim()}</strong>
                                            {":" + rest.join(":")}
                                          </>
                                        );
                                      })()}
                                    </p>
                                  ) : line.trim() ? (
                                    <p className="leading-6 whitespace-pre-line">
                                      {line}
                                    </p>
                                  ) : null}
                                </div>
                              );
                            })}
                            
                            {/* Render buttons at the end */}
                            {allLinks.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {allLinks.map((link, linkIdx) => (
                                  <a
                                    key={linkIdx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy-800 text-white rounded-lg hover:bg-navy-700 transition-colors text-sm font-medium"
                                  >
                                    {link.text}
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}