import React, { useState, useEffect } from 'react';
import {Button, ButtonGroup} from "@nextui-org/button";
import PreferencesModal from '../CookiePreferences';

export default function CookieBanner({ setBlurContent }) {
  const [showBanner, setShowBanner] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [essentialCookies, setEssentialCookies] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    const preferences = JSON.parse(localStorage.getItem('cookiePreferences'));

    if (!consent) {
      setShowBanner(true);
      setBlurContent(true);
    } else if (preferences && preferences.analytics) {
      setAnalyticsCookies(preferences.analytics);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', essentialCookies);
    localStorage.setItem('cookiePreferences', JSON.stringify({ analytics: analyticsCookies }));
    setShowBanner(false);
    setBlurContent(false);
  };

  const handlePreferences = () => {
    localStorage.setItem('cookieConsent', essentialCookies);
    localStorage.setItem('cookiePreferences', JSON.stringify({ analytics: analyticsCookies }));
    setPreferencesOpen(true);
    setShowCookieBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', essentialCookies);
    localStorage.setItem('cookiePreferences', JSON.stringify({ analytics: analyticsCookies }));
    setPreferencesOpen(false);
    setBlurContent(false);
  };

  const handleToggleEssentials = () => {
    setEssentialCookies(!essentialCookies);
  };

  const handleToggleAnalytics = () => {
    setAnalyticsCookies(!analyticsCookies);
  };

  if (!showBanner) return null;

  return (
    <div>
      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white px-6 py-4 border-t border-gray-500 z-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm md:text-base mb-4 md:mb-0">
              We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic. By clicking “Accept,” you agree to our website's cookie use as described in our Cookie Policy. You can change your cookie settings at any time by clicking “Preferences.”
            </p>
            <div className="flex flex-col items-center justify-center gap-2">
              <Button
                onClick={handleAccept}
                className="bg-blue-500 hover:bg-blue-700 text-white text-sm md:text-base font-semibold px-4 py-2 rounded"
              >
                Accept
              </Button>
              <Button
                onClick={handlePreferences}
                className="underline bg-gray-900 hover:bg-gray-700 text-white text-sm md:text-base font-medium px-4 py-2 rounded"
              >
                Preferences
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      <PreferencesModal
        isOpen={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
        essentialCookies={essentialCookies}
        analyticsCookies={analyticsCookies}
        handleToggleEssentials={handleToggleEssentials}
        handleToggleAnalytics={handleToggleAnalytics}
        handleSavePreferences={handleSavePreferences}
      />
    </div>
  );
}
