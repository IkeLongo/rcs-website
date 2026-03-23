// app/(site)/layout.tsx

import { ChatWidget } from "@/app/components/chat/ChatWidget";
import Navbar from "@/app/components/layouts/navbar/navbar";

export default function MainNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
      </div>

      <div>
        {children}
        <ChatWidget />
      </div>
    </>
  );
}
