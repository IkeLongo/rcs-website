"use client";

import React, { useState } from "react";
import "./chat.css";

type ChatInputProps = {
  onSubmit: (text: string) => Promise<void> | void;
  disabled?: boolean;
};

export function ChatInput({
  onSubmit,
  disabled = false,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea up to 200px and control overflow
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = 160;
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = newHeight + "px";
      // Only show vertical scrollbar if content overflows
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || disabled) return;
      onSubmit(trimmed);
      setInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || disabled) return;

    await onSubmit(trimmed);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-neutral-200 p-3">
      <div className="flex items-end gap-2">
        <textarea
          name="chat-input"
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell me about your project..."
          disabled={disabled}
          rows={1}
          style={{ maxHeight: 160, minHeight: 32, resize: "none" }}
          className="flex-1 rounded-xl border border-neutral-300 p-3 text-sm outline-none transition-all chat-scrollbar"
        />

        <button
          type="submit"
          disabled={disabled}
          className="rounded-xl bg-navy-500 px-4 py-2 h-11 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </form>
  );
}