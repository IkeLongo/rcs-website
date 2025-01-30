"use client";

import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
  Link,
} from "@heroui/react";
import PreferencesModal from '../CookiePreferences/page';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const cookiePreferences = Cookies.get("cookiePreferences");

    if (!cookiePreferences) {
      setShowBanner(true); // Show banner if no preferences exist
      return;
    }

    try {
      const preferences = JSON.parse(cookiePreferences);
      if (
        preferences.functional === undefined ||
        preferences.statistical === undefined ||
        preferences.marketing === undefined
      ) {
        setShowBanner(true);
      }
    } catch (error) {
      console.error("Error parsing cookie preferences:", error);
      setShowBanner(true);
    }
  }, []);

  // Function to accept all cookies and store preferences
  const acceptAllCookies = () => {
    const preferences = {
      functional: true,
      statistical: true,
      marketing: true,
    };

    Cookies.set("cookiePreferences", JSON.stringify(preferences), { expires: 365 });
    setShowBanner(false);
  };

  // Function to accept all cookies and open cookie preferences modal
  const configureCookies = () => {
    const preferences = {
      functional: true,
      statistical: true,
      marketing: true,
    };

    Cookies.set("cookiePreferences", JSON.stringify(preferences), { expires: 365 });
    setShowBanner(false);
    setShowPreferences(true);
  };

  return (
    <>
      {showPreferences && (
        <PreferencesModal
          isOpen={showPreferences}
          onClose={() => setShowPreferences(false)}
        />
      )}

      <Drawer
        backdrop="blur"
        placement="bottom"
        hideCloseButton={true}
        isDismissable={false}
        className="bg-gray-900"
        isOpen={showBanner}
        onOpenChange={() => setShowBanner(false)}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 font-gentium-book-plus text-[28px]">
                We Use Cookies
              </DrawerHeader>
              <DrawerBody>
                <p>
                  We use cookies to tailor our website and services to your preferences, as well as
                  for analytics and performance tracking. By continuing to use our website and
                  products, you consent to our use of cookies.
                </p>
              </DrawerBody>
              <DrawerFooter className='justify-start'>
                <Button
                  variant="solid"
                  className="bg-green-500 text-white font-bold"
                  onPress={acceptAllCookies}
                >
                  Accept All
                </Button>
                <Button
                  variant="bordered"
                  className="border-green-500 text-white font-bold"
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
