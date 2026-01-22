"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function normalizeUrlInput(value: string) {
  let v = value.trim();
  v = v.replace(/^https?:\/\//i, "");
  v = v.replace(/\/+$/, "");
  return v;
}

function isValidUrlInput(value: string) {
  const v = value.trim();
  if (!v) return false;
  return (
    /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/.test(v) ||
    /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(v)
  );
}

export default function SeoScanForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [touched, setTouched] = useState(false);

  const urlOk = isValidUrlInput(url);
  const showError = touched && !urlOk;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!urlOk) return;

    const normalized = normalizeUrlInput(url);
    router.push(`/free-seo-scan?url=${encodeURIComponent(normalized)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8" noValidate>
      <div className="p-3 md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-center">
          <div>
            <label className="sr-only" htmlFor="seo-url">
              Website URL
            </label>
            <input
              id="seo-url"
              type="url"
              inputMode="url"
              placeholder="example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={() => setTouched(true)}
              className={[
                "w-full rounded-xl border bg-white px-4 py-3 text-sm md:text-base",
                "outline-none focus:ring-2 focus:ring-navy-300 h-[48px] md:h-[52px]",
                showError ? "border-red-400" : "border-grey-200",
              ].join(" ")}
            />

            {showError ? (
              <p className="mt-3 text-xs text-red-600 !text-left">
                Please enter a valid website URL (example.com).
              </p>
            ) : (
              <p className="mt-3 text-xs text-grey-500 !text-left">
                Next: we’ll run the scan and show your scores + top issues.
              </p>
            )}
          </div>

          <div className="flex flex-col items-start justify-start h-full">
            <button
              type="submit"
              disabled={touched && !urlOk}
              className={[
                "h-[48px] md:h-[52px] px-6 rounded-xl font-semibold",
                "bg-lime-500 text-navy-800 shadow-sm",
                "hover:bg-green-500 hover:text-navy-800",
                "disabled:opacity-60 disabled:cursor-not-allowed",
              ].join(" ")}
            >
              Scan My Site
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
