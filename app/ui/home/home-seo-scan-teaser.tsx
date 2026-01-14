"use client";

import { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { BackgroundLines } from "../components/backgrounds/background-lines";

function normalizeUrlInput(value: string) {
  let v = value.trim();

  // Remove protocol for a cleaner query param (tool page can re-add)
  v = v.replace(/^https?:\/\//i, "");

  // Remove trailing slash
  v = v.replace(/\/+$/, "");

  return v;
}

function isValidUrlInput(value: string) {
  const v = value.trim();
  if (!v) return false;

  // accept domain-only OR full URL
  return (
    /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/.test(v) || // allows domain + optional path
    /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(v)
  );
}

export default function HomeSeoScanTeaser() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [touched, setTouched] = useState(false);

  const urlOk = useMemo(() => isValidUrlInput(url), [url]);
  const showError = touched && !urlOk;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!urlOk) return;

    const normalized = normalizeUrlInput(url);

    // Redirect to tool page with URL prefilled
    router.push(`/free-seo-scan?url=${encodeURIComponent(normalized)}`);
  }

  return (
    <section className="base w-full flex items-center justify-center">
      <BackgroundLines className="flex items-center justify-center w-full h-full">
        <div className="mx-auto max-w-6xl w-full flex flex-col items-center justify-center">
          <div className="px-6 py-10 md:px-10 md:py-12 w-full">
            {/* Header */}
            <div className="text-center">
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight !text-white">
                Run a free SEO scan on your website
              </h3>
              <p className="mt-3 text-sm md:text-base text-grey-600 max-w-2xl mx-auto">
                Instantly find SEO issues, missed opportunities, and what’s holding your site back from growth.
              </p>
            </div>

            {/* URL input strip */}
            <form onSubmit={handleSubmit} className="mt-8" noValidate>
              <div className="p-3 md:p-4">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-center">
                  {/* URL input */}
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

                  {/* CTA */}
                  <div className="flex flex-col items-start justify-start h-full">
                    <Button
                      type="submit"
                      variant="contained"
                      disableElevation
                      disabled={touched && !urlOk}
                      sx={{
                        height: { xs: 48, md: 52 },
                        px: 3,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: { xs: "1rem", md: "1.125rem" },
                        backgroundColor: "#d9e64e",
                        color: "#091a33",
                        boxShadow: 1,
                        "&:hover": {
                          backgroundColor: "#84c441",
                          color: "#091a33",
                        },
                        "&.Mui-disabled": {
                          opacity: 0.6,
                          color: "#091a33",
                        },
                      }}
                    >
                      Scan My Site
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </BackgroundLines>
    </section>
  );
}
