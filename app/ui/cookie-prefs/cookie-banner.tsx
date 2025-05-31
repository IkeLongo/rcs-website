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
import PreferencesModal from './cookie-preferences';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const cookiePreferences = Cookies.get("cookiePreferences");

    if (!cookiePreferences) {
      // ✅ Auto-set cookies when the banner opens
      const defaultPreferences = {
        functional: true,
        statistical: true,
        marketing: true,
      };

      Cookies.set("cookiePreferences", JSON.stringify(defaultPreferences), { expires: 365 });
      setShowBanner(true);
    }
  }, []);

  // ✅ Function to update cookie preferences
  const acceptAllCookies = () => {
    const preferences = {
      functional: true,
      statistical: true,
      marketing: true,
    };

    Cookies.set("cookiePreferences", JSON.stringify(preferences), { expires: 365 });
    setShowBanner(false);
  };

  // ✅ Function to configure cookies
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
        />
      )}

      <Drawer
        //backdrop="blur"
        placement="bottom"
        hideCloseButton={false}
        isDismissable={false}
        className="bg-blue-950"
        isOpen={showBanner}
        shouldBlockScroll={false}
        onOpenChange={() => setShowBanner(false)}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 font-gentium-book-plus text-[28px] text-white">
                We Respect Your Privacy
              </DrawerHeader>
              <DrawerBody>
                <p className='text-left'>
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