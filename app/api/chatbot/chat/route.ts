import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  streamText,
  tool,
  type UIMessage,
} from "ai";
import { buildBusinessContext } from "@/lib/chat/build-context";
import { systemPrompt } from "@/lib/chat/system-prompt";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, pageUrl }: { messages: UIMessage[]; pageUrl?: string } = body;

    const latestUserMessage =
      [...messages]
        .reverse()
        .find((message) => message.role === "user")
        ?.parts?.find((part) => part.type === "text" && "text" in part)?.text ?? "";

    const businessContext = await buildBusinessContext(latestUserMessage);

    const fullSystemPrompt = `
${systemPrompt}

Current page: ${pageUrl ?? "unknown"}

Business context:
${businessContext}
`;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: fullSystemPrompt,
      messages: await convertToModelMessages(messages),
      tools: {
        collectContactInfo: tool({
          description:
            "Call this tool when the user wants to send a general inquiry, get a quote, ask about working together, or submit their contact information. This will show them a contact form to fill out.",
          inputSchema: z.object({
            reason: z
              .string()
              .describe("Brief reason why the user wants to get in touch"),
          }),
        }),
        scheduleCall: tool({
          description:
            "Call this tool when the user wants to book a discovery call, schedule a meeting, or set up a consultation. This will show them a booking form.",
          inputSchema: z.object({
            reason: z.string().describe("Brief reason for the call"),
          }),
        }),
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat route error:", error);
    return new Response("Failed to process chat request.", { status: 500 });
  }
}