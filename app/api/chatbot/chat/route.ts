import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { buildBusinessContext } from "@/lib/chat/build-context";
import { systemPrompt } from "@/lib/chat/system-prompt";

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

    // Debug: Log a preview of the context being sent to AI
    console.log("\n=== AI SYSTEM PROMPT PREVIEW ===");
    console.log("First 500 chars of business context:");
    console.log(businessContext.substring(0, 500));
    console.log("=== END PREVIEW ===\n");

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: fullSystemPrompt,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat route error:", error);
    return new Response("Failed to process chat request.", { status: 500 });
  }
}