"use client";

import { useState } from "react";
import { ChatLauncher } from "./ChatLauncher";
import { ChatWindow } from "./ChatWindow";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  // console.log("ChatWidget rendered, isOpen:", isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <ChatWindow onClose={() => setIsOpen(false)} />
      ) : (
        <ChatLauncher onClick={() => setIsOpen(true)} />
      )}
    </div>
  );
}