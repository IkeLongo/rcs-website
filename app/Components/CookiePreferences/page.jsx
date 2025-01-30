"use client";

import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Switch,
} from "@heroui/react";

export default function PreferencesModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [isNecessary, setIsNecessary] = useState(true);
  const [isFunctional, setIsFunctional] = useState(true);
  const [isStatistical, setIsStatistical] = useState(true);
  const [isMarketing, setIsMarketing] = useState(true);

  useEffect(() => {
    const cookiePreferences = Cookies.get("cookiePreferences");
    if (cookiePreferences) {
      const preferences = JSON.parse(cookiePreferences);
      setIsFunctional(preferences.functional);
      setIsStatistical(preferences.statistical);
      setIsMarketing(preferences.marketing);
    }
  }, []);

  const updateCookiePreferences = (type, value) => {
    const preferences = {
      functional: isFunctional,
      statistical: isStatistical,
      marketing: isMarketing,
    };

    preferences[type] = value;
    Cookies.set("cookiePreferences", JSON.stringify(preferences), { expires: 365 });
  };

  return (
    <>
      <Modal backdrop="blur" className="max-w-lg max-h-[600px] md:max-h-none" scrollBehavior="inside" isDismissable={false} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-gray-900 flex justify-center items-center">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center font-gentium-book-plus text-[28px]">Cookies & Your Privacy</ModalHeader>
              <ModalBody className='font-avenir text-[16px]'>
                <p>We use cookies to gather information about your interactions with our website. This helps us:</p>
                <ul className='list-decimal list-inside'>
                  <li><strong>Enhance your browsing experience</strong> (functional)</li>
                  <li><strong>Track page visits for analytics</strong> (statistics)</li>
                  <li><strong>Deliver relevant promotions</strong> (marketing)</li>
                </ul>
                <p>
                  By clicking <strong>“OK”</strong>, you agree to our use of cookies for these purposes. 
                  You can also customize your preferences by selecting specific categories and clicking <strong>“Save settings.”</strong>
                </p>
                <p>
                  You may adjust or withdraw your consent anytime by clicking the icon in the bottom left corner. 
                  For more details on how we handle cookies and data, please review our 
                  <a href="/privacy#privacy-notice" className="text-blue-400 hover:underline" onClick={onClose}> Privacy Policy</a> and 
                  <a href="/privacy#cookie-policy" className="text-blue-400 hover:underline" onClick={onClose}> Cookie Policy</a>.
                </p>
                <p>
                  We adhere to 
                  <a href="https://business.safety.google/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"> Google’s Business Data Responsibility guidelines </a>
                  to ensure transparency and control over your information.
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <p className='text-center'>Strictly Necessary</p>
                    <Switch
                      defaultSelected
                      isDisabled
                      size="lg"
                      isSelected={isNecessary}
                      onValueChange={(value) => {
                        setIsNecessary(value);
                        updateCookiePreferences("functional", value);
                      }}
                      classNames={{
                        wrapper: [
                          "text-gray-300",
                          "group-data-[selected=true]:bg-green-500",
                          "bg-gray-300",
                        ],
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-end items-center">
                    <p>Functional</p>
                    <Switch
                      defaultSelected
                      size="lg"
                      isSelected={isFunctional}
                      onValueChange={(value) => {
                        setIsFunctional(value);
                        updateCookiePreferences("functional", value);
                      }}
                      classNames={{
                        wrapper: [
                          "text-gray-300",
                          "group-data-[selected=true]:bg-green-500",
                          "bg-gray-300",
                        ],
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-end items-center">
                    <p>Statistical</p>
                    <Switch
                      defaultSelected
                      size="lg"
                      isSelected={isStatistical}
                      onValueChange={(value) => {
                        setIsStatistical(value);
                        updateCookiePreferences("statistical", value);
                      }}
                      classNames={{
                        wrapper: [
                          "text-gray-300",
                          "group-data-[selected=true]:bg-green-500",
                          "bg-gray-300",
                        ],
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-end items-center">
                    <p>Marketing</p>
                    <Switch
                      defaultSelected
                      size="lg"
                      isSelected={isMarketing}
                      onValueChange={(value) => {
                        setIsMarketing(value);
                        updateCookiePreferences("marketing", value);
                      }}
                      classNames={{
                        wrapper: [
                          "text-gray-300",
                          "group-data-[selected=true]:bg-green-500",
                          "bg-gray-300",
                        ],
                      }}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="solid"
                  className='bg-green-500 text-white font-bold'
                  onPress={() => {
                    updateCookiePreferences();
                    onClose();
                  }}
                >
                  OK
                </Button>
                <Button
                  variant="bordered"
                  className="border-green-500 text-white font-bold"
                  onPress={() => {
                    updateCookiePreferences();
                    onClose();
                  }}
                >
                  Save Settings
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}