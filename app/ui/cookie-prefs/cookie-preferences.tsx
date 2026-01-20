"use client";

import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import CustomSwitch from "../components/switch";
import { PreferencesModalProps } from "@/types/components";

type CookiePrefs = {
  functional: boolean;
  statistical: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "cookiePreferences";
const COOKIE_EXPIRES_DAYS = 365;

// Consent-mode safe defaults
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
    path: "/",
    sameSite: "Lax",
    secure: true,
  });

  // Optional: broadcast for analytics/GTM gating
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    event: "cookie_consent_update",
    cookiePreferences: prefs,
  });
}

export default function PreferencesModal({ isOpen, onClose }: PreferencesModalProps) {
  const [isNecessary] = useState(true);

  const [functional, setFunctional] = useState(DEFAULT_PREFS.functional);
  const [statistical, setStatistical] = useState(DEFAULT_PREFS.statistical);
  const [marketing, setMarketing] = useState(DEFAULT_PREFS.marketing);

  // Load current prefs each time modal opens (not just once on mount)
  useEffect(() => {
    if (!isOpen) return;

    const existing = safeParsePrefs(Cookies.get(COOKIE_KEY));
    const prefs = existing ?? DEFAULT_PREFS;

    setFunctional(prefs.functional);
    setStatistical(prefs.statistical);
    setMarketing(prefs.marketing);
  }, [isOpen]);

  const currentPrefs: CookiePrefs = useMemo(
    () => ({ functional, statistical, marketing }),
    [functional, statistical, marketing]
  );

  const saveAndClose = () => {
    writePrefs(currentPrefs);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      backdrop="blur"
      className="max-w-lg max-h-[600px] md:max-h-none rounded-lg"
      scrollBehavior="inside"
      isDismissable={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent className="bg-navy-900 flex justify-center items-center">
        {() => (
          <>
            <ModalHeader className="font-gentium-book-plus text-[24px] md:text-md2 font-semibold my-4 text-center text-white">
              Cookies &amp; Your Privacy
            </ModalHeader>

            <ModalBody className="font-avenir text-[16px] text-white">
              <p className="text-left">
                We use cookies to gather information about your interactions with our website. This helps us:
              </p>

              <ul className="list-decimal list-inside">
                <li className="text-white">
                  <strong>Enhance your browsing experience</strong> (functional)
                </li>
                <li className="text-white">
                  <strong>Track page visits for analytics</strong> (statistics)
                </li>
                <li className="text-white">
                  <strong>Deliver relevant promotions</strong> (marketing)
                </li>
              </ul>

              <p className="text-left">
                You can customize your preferences below and click <strong>Save settings</strong>.
              </p>

              <p className="text-left">
                You may adjust or withdraw your consent anytime by clicking the icon in the bottom left corner.
                For more details, please review our{" "}
                <a href="/privacy#privacy-notice" className="text-royal-blue-500 hover:underline" onClick={onClose}>
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/privacy#cookie-policy" className="text-royal-blue-500 hover:underline" onClick={onClose}>
                  Cookie Policy
                </a>
                .
              </p>

              <p className="text-left">
                We adhere to{" "}
                <a
                  href="https://business.safety.google/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-royal-blue-500 hover:underline"
                >
                  Google’s Business Data Responsibility guidelines
                </a>{" "}
                to ensure transparency and control over your information.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <p className="text-center">Strictly Necessary</p>
                  <CustomSwitch
                    defaultSelected
                    isDisabled
                    size="md"
                    isSelected={isNecessary}
                    onValueChange={() => {}}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-end items-center">
                  <p>Functional</p>
                  <CustomSwitch
                    size="md"
                    isSelected={functional}
                    onValueChange={(value) => setFunctional(value)}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-end items-center">
                  <p>Statistical</p>
                  <CustomSwitch
                    size="md"
                    isSelected={statistical}
                    onValueChange={(value) => setStatistical(value)}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-end items-center">
                  <p>Marketing</p>
                  <CustomSwitch
                    size="md"
                    isSelected={marketing}
                    onValueChange={(value) => setMarketing(value)}
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="solid"
                className="bg-green-500 text-white font-bold rounded-lg py-2"
                onPress={saveAndClose}
              >
                OK
              </Button>

              <Button
                variant="bordered"
                className="border-green-500 text-white font-bold rounded-lg py-2"
                onPress={saveAndClose}
              >
                Save Settings
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
