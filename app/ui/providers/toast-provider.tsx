"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __enableToasts?: () => void;
    __toastsEnabled?: boolean;
  }
}

export default function ToastProvider() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Expose a function that allows the toast util to mount this provider later
    window.__enableToasts = () => {
      window.__toastsEnabled = true;
      setEnabled(true);
    };

    // If a toast was triggered before provider mounted, mount immediately
    if (window.__toastsEnabled) setEnabled(true);

    return () => {
      delete window.__enableToasts;
    };
  }, []);

  if (!enabled) return null;

  // ✅ Only require toastify *after* enabled becomes true
  const { ToastContainer } = require("react-toastify");
  require("react-toastify/dist/ReactToastify.css");

  return <ToastContainer limit={1} theme="dark" />;
}
