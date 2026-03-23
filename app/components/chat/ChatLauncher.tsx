
"use client";

import { MessageCircle } from "lucide-react";

type ChatLauncherProps = {
  onClick: () => void;
};

export function ChatLauncher({ onClick }: ChatLauncherProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open chat"
      className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-900 shadow-xl transition hover:-translate-y-0.5"
    >
      <span className="text-neutral-800">Chat with us</span>
      <MessageCircle className="h-5 w-5 text-neutral-700" aria-hidden="true" />
    </button>
  );
}