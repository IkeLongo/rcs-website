import React from 'react';
import { Button } from "@nextui-org/button";

export default function PreferencesModal({ isOpen, onClose, essentialCookies, analyticsCookies, handleToggleEssentials, handleToggleAnalytics, handleSavePreferences }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Cookie Preferences</h2>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={essentialCookies}
              onChange={handleToggleEssentials}
              className="mr-2"
            />
            Essential Cookies
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={analyticsCookies}
              onChange={handleToggleAnalytics}
              className="mr-2"
            />
            Analytics Cookies
          </label>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={handleSavePreferences}
            className="bg-blue-500 hover:bg-blue-700 text-white rounded"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}