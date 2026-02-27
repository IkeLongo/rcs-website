"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import PreferencesModal from "./cookie-preferences";

type CookiePrefs = {
  functional: boolean;
  statistical: boolean; // analytics
  marketing: boolean;
};

const COOKIE_KEY = "cookiePreferences";
const COOKIE_EXPIRES_DAYS = 365;

// Consent-mode safe defaults (no analytics/ads by default)
const DEFAULT_PREFS: CookiePrefs = {
  functional: true,
  statistical: false,
  marketing: false,
};

function safeParsePrefs(raw: string | undefined): CookiePrefs | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.functional === "boolean" &&
      typeof parsed?.statistical === "boolean" &&
      typeof parsed?.marketing === "boolean"
    ) {
      return parsed as CookiePrefs;
    }
    return null;
  } catch {
    return null;
  }
}

function writePrefs(prefs: CookiePrefs) {
  Cookies.set(COOKIE_KEY, JSON.stringify(prefs), {
    expires: COOKIE_EXPIRES_DAYS,
    sameSite: "Lax",
    secure: true,
  });

  // 1) CustomEvent for your app (GA component listens to this)
  window.dispatchEvent(new CustomEvent("cookie_consent_update", { detail: prefs }));

  // 2) Optional: dataLayer event for GTM setups
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    event: "cookie_consent_update",
    cookiePreferences: prefs,
  });
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Only decide whether to show. Do not write cookies on mount.
    const existing = safeParsePrefs(Cookies.get(COOKIE_KEY));
    if (!existing) setShowBanner(true);
  }, []);

  const acceptAllCookies = () => {
    writePrefs({
      functional: true,
      statistical: true,
      marketing: true,
    });
    setShowBanner(false);
  };

  const rejectNonEssential = () => {
    // Consent-mode default: essential only
    writePrefs(DEFAULT_PREFS);
    setShowBanner(false);
  };

  const configureCookies = () => {
    setShowBanner(false);
    setShowPreferences(true);
  };

  return (
    <>
      {showPreferences && (
        <PreferencesModal
          isOpen={showPreferences}
          onClose={() => setShowPreferences(false)}
          // Optional: if your modal supports passing defaults
          // defaultPreferences={safeParsePrefs(Cookies.get(COOKIE_KEY)) ?? DEFAULT_PREFS}
          // onSave={(prefs: CookiePrefs) => { writePrefs(prefs); setShowPreferences(false); }}
        />
      )}

      <Drawer
        placement="bottom"
        hideCloseButton={false}
        isDismissable={false}
        className="bg-blue-950"
        isOpen={showBanner}
        shouldBlockScroll={false}
        onOpenChange={() => setShowBanner(false)}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1 font-gentium-book-plus text-[28px] text-white">
                We Respect Your Privacy
              </DrawerHeader>

              <DrawerBody>
                <p className="text-left text-white">
                  We use cookies to improve site functionality and, with your permission, to
                  measure performance and marketing effectiveness. You can accept all, reject
                  non-essential cookies, or customize your preferences.
                </p>
              </DrawerBody>

              <DrawerFooter className="justify-start gap-2">
                <Button
                  variant="solid"
                  className="bg-green-500 text-white font-bold rounded-lg py-2"
                  onPress={acceptAllCookies}
                >
                  Accept All
                </Button>

                <Button
                  variant="bordered"
                  className="border-white/40 text-white font-bold rounded-lg py-2"
                  onPress={rejectNonEssential}
                >
                  Reject Non-Essential
                </Button>

                <Button
                  variant="bordered"
                  className="border-green-500 text-white font-bold rounded-lg py-2"
                  onPress={configureCookies}
                >
                  Configure Cookies
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
