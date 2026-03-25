"use client";

import { usePathname } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { QuickActions } from "./QuickActions";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import { useState, useEffect } from "react";
import type { ContactFormData } from "./ContactCollectionForm";

const CHAT_STORAGE_KEY = "rivercity-chat-messages";

type ChatWindowProps = {
  onClose: () => void;
};

export function ChatWindow({ onClose }: ChatWindowProps) {
  const pathname = usePathname();
  const [quickActionsVisible, setQuickActionsVisible] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const { messages, setMessages, sendMessage, addToolOutput, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chatbot/chat",
    }),
    // Re-submit to AI after addToolOutput resolves a tool call,
    // but ONLY if the AI hasn't already responded with text (prevents infinite loop)
    sendAutomaticallyWhen: ({ messages: msgs }) => {
      const last = msgs[msgs.length - 1];
      if (!last || last.role !== "assistant") {
        console.log("[sendAutomaticallyWhen] skipping — last message role:", last?.role);
        return false;
      }
      console.log("[sendAutomaticallyWhen] evaluating last assistant message parts:", JSON.stringify(last.parts.map((p: any) => ({ type: p.type, hasOutput: !!p.output, outputValue: p.output, state: p.state, textPreview: p.text?.slice?.(0, 50) })), null, 2));
      const hasResolvedTool = last.parts.some(
        (p: any) => (p.type as string)?.startsWith("tool-") && p.output
      );
      const hasTextResponse = last.parts.some(
        (p: any) => p.type === "text" && (p as any).text?.trim()
      );
      console.log("[sendAutomaticallyWhen] hasResolvedTool:", hasResolvedTool, "hasTextResponse:", hasTextResponse, "→ will send:", hasResolvedTool && !hasTextResponse);
      return hasResolvedTool && !hasTextResponse;
    },
  });

  // Load initial messages from sessionStorage on mount
  useEffect(() => {
    if (isInitialized) return;
    
    try {
      const stored = sessionStorage.getItem(CHAT_STORAGE_KEY);
      // console.log("📦 Loading from sessionStorage:", stored);
      if (stored) {
        const parsed = JSON.parse(stored);
        // console.log("📦 Parsed messages:", parsed);
        // console.log("📦 Setting messages in useChat");
        setMessages(parsed);
      }
    } catch (e) {
      // console.error("Failed to load chat history:", e);
    }
    
    setIsInitialized(true);
  }, [isInitialized, setMessages]);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    // console.log("💾 Messages changed:", messages.length, messages);
    if (messages.length > 0) {
      try {
        const serialized = JSON.stringify(messages);
        // console.log("💾 Saving to sessionStorage:", serialized);
        sessionStorage.setItem(CHAT_STORAGE_KEY, serialized);
        // console.log("✅ Saved successfully");
      } catch (e) {
        // console.error("Failed to save chat history:", e);
      }
    }
  }, [messages]);

  const isBusy = status === "submitted" || status === "streaming";

  // Debug: log status changes
  useEffect(() => {
    console.log("[ChatWindow] status changed:", status);
  }, [status]);

  // Hide quick actions if user has sent a message
  const hasUserSentMessage = messages.some((m) => m.role === "user");

  // Hide quick actions if user has sent a message or clicked an action
  const showQuickActions = quickActionsVisible && !hasUserSentMessage;

  const submitMessage = async (text: string) => {
    setQuickActionsVisible(false);
    await sendMessage(
      { text },
      {
        body: {
          pageUrl: pathname,
        },
      }
    );
  };

  const handleContactSubmit = async (toolCallId: string, data: ContactFormData) => {
    console.log("[ChatWindow] handleContactSubmit called, toolCallId:", toolCallId, "data:", data);
    // Fire webhook in background - don't block the UI
    fetch("/api/chatbot/chat-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "contact", ...data }),
    }).catch((err) => console.error("chat-lead webhook error:", err));

    // Resolve the tool call so the AI can respond
    console.log("[ChatWindow] calling addToolOutput for collectContactInfo, toolCallId:", toolCallId);
    await addToolOutput({
      toolCallId,
      tool: "collectContactInfo",
      output: {
        submitted: true,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
      },
    });
    console.log("[ChatWindow] addToolOutput resolved. status:", status);
    console.log("[ChatWindow] messages after addToolOutput:", JSON.stringify(messages.map(m => ({ role: m.role, parts: m.parts.map((p: any) => ({ type: p.type, hasOutput: !!p.output, state: p.state, text: p.text?.slice?.(0, 40) })) })), null, 2));
  };

  const handleBookingConfirm = async (toolCallId: string) => {
    console.log("[ChatWindow] handleBookingConfirm called, toolCallId:", toolCallId);
    // GHL handles the actual booking — just resolve the tool so the AI can respond
    console.log("[ChatWindow] calling addToolOutput for scheduleCall, toolCallId:", toolCallId);
    await addToolOutput({
      toolCallId,
      tool: "scheduleCall",
      output: { confirmed: true },
    });
    console.log("[ChatWindow] addToolOutput resolved. status:", status);
    console.log("[ChatWindow] messages after addToolOutput:", JSON.stringify(messages.map(m => ({ role: m.role, parts: m.parts.map((p: any) => ({ type: p.type, hasOutput: !!p.output, state: p.state, text: p.text?.slice?.(0, 40) })) })), null, 2));
  };

  return (
    <div className="flex h-[560px] w-[380px] flex-col overflow-hidden rounded-3xl border border-navy-200 bg-gradient-to-b from-blue-50 to-alice-blue-500 shadow-2xl">
      <div className="flex items-start justify-between border-b border-navy-100 bg-gradient-to-r from-navy-800 to-blue-400 px-4 py-3">
        <div>
          <h3 className="font-semibold text-white drop-shadow-sm tracking-wide">
            RiverCity Assistant
          </h3>
          <p className="text-sm text-blue-100/90">
            Ask about services, pricing, and next steps.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-full p-2 text-blue-100 hover:bg-blue-200/40 hover:text-navy-900 transition"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <ChatMessageList
          messages={messages}
          onContactSubmit={handleContactSubmit}
          onBookingConfirm={handleBookingConfirm}
          disabled={isBusy}
        />
      </div>

      {showQuickActions && (
        <div className="px-4 py-3 flex justify-end">
          <QuickActions onActionSelect={submitMessage} disabled={isBusy} />
        </div>
      )}

      {error ? (
        <div className="border-t border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700">
          Something went wrong. Please try again.
        </div>
      ) : null}

      {isBusy ? (
        <div className="px-4 py-2 text-xs text-navy-800">
          Thinking...
        </div>
      ) : null}

      <ChatInput onSubmit={submitMessage} disabled={isBusy} />
    </div>
  );
}