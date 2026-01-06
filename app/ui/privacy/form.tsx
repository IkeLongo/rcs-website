"use client";

import {Form, Input, Button, Textarea, Select, SelectItem} from "@heroui/react";
import React, { useState, useRef, FormEvent } from "react";
import emailjs from '@emailjs/browser';
import {toast} from 'react-toastify';
import { PrivacyFormData } from "@/types/components";

export const selections = [
  {key: "information", label: "Information"},
  {key: "correction", label: "Correction"},
  {key: "objection", label: "Objection"},
  {key: "insight", label: "Insight"},
  {key: "deletion", label: "Deletion"},
  {key: "data-portability", label: "Data Portability"},
  {key: "profiling", label: "Profiling"},
];

export default function PrivacyContactForm() {
  const [submitted, setSubmitted] = useState<PrivacyFormData | null>(null); // ✅ Ensure state matches form data type
  const formRef = useRef<HTMLFormElement>(null); // ✅ Correctly type useRef

  // ✅ Type the Email Sending Handler
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return; // Ensure formRef is not null

    emailjs
      .sendForm("service_of79jpv", "template_rrjiba9", formRef.current, {
        publicKey: "aeIyCorze0snqKQe0",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          // ✅ Reset the form using `formRef.current`
          if (formRef.current) {
            formRef.current.reset(); 
          }
          toast.success("Form submitted successfully!", {
            className: "bg-gray-900",
          });
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  console.log("env:", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);

  return (
    <Form
      className="w-full"
      validationBehavior="native"
      onSubmit={sendEmail}
      ref={formRef}
    >
      <div className="w-full flex justify-between gap-2">
        <Input
          isRequired
          errorMessage="Please enter your first name"
          name="firstName"
          placeholder="First Name"
          type="text"
          variant="faded"
          classNames={{
            mainWrapper: [
              "rounded-[14px]",
              "bg-white",
              "text-navy-900",
            ],
            inputWrapper: [
              "shadow-xl",
              "border-navy-900",
              "!cursor-text",
              "rounded-[14px]",
            ],
            input: [
              "rounded-[14px]",
              "placeholder:text-blue-500/60",
            ],
            innerWrapper: [
              "rounded-[14px]",
            ]
          }}
        />
        <Input
          isRequired
          errorMessage="Please enter your last name"
          name="lastName"
          placeholder="Last Name"
          type="text"
          variant="faded"
          classNames={{
            mainWrapper: [
              "rounded-[14px]",
              "bg-white",
              "text-navy-900",
            ],
            inputWrapper: [
              "shadow-xl",
              "border-navy-900",
              "!cursor-text",
              "rounded-[14px]",
            ],
            input: [
              "rounded-[14px]",
              "placeholder:text-blue-500/60",
            ],
            innerWrapper: [
              "rounded-[14px]",
            ]
          }}
        />
      </div>
      <div className="w-full flex justify-between gap-2">
        <Input
          isRequired
          errorMessage="Please enter a valid email address"
          name="email"
          placeholder="Email"
          type="email"
          variant="faded"
          classNames={{
            mainWrapper: [
              "rounded-[14px]",
              "bg-white",
              "text-navy-900",
            ],
            inputWrapper: [
              "shadow-xl",
              "border-navy-900",
              "!cursor-text",
              "rounded-[14px]",
            ],
            input: [
              "rounded-[14px]",
              "placeholder:text-blue-500/60",
            ],
            innerWrapper: [
              "rounded-[14px]",
            ]
          }}
        />
        <Input
          isRequired
          errorMessage="Please enter your address"
          name="address"
          placeholder="Address"
          type="text"
          variant="faded"
          classNames={{
            mainWrapper: [
              "rounded-[14px]",
              "bg-white",
              "text-navy-900",
            ],
            inputWrapper: [
              "shadow-xl",
              "border-navy-900",
              "!cursor-text",
              "rounded-[14px]",
            ],
            input: [
              "rounded-[14px]",
              "placeholder:text-blue-500/60",
            ],
            innerWrapper: [
              "rounded-[14px]",
            ]
          }}
        />
      </div>
      
      <Textarea
        isRequired
        errorMessage="Please a description of your request"
        name="description"
        placeholder="Description of Request"
        variant="faded"
        classNames={{
          inputWrapper: [
            "shadow-xl",
            "bg-white",
            "border-navy-900",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "group-data-[focus=true]:bg-white",
            "group-data-[focus=true]:text-navy-900",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
            "rounded-[14px]",
            "h-32",
            "flex-col", // Ensure it's a flex container if needed
            "items-stretch", // Let children stretch
          ],
          innerWrapper: [
            "bg-white",
            "flex-col", // Ensure it's a flex container if needed
            "items-stretch", // Let children stretch
          ],
          input: [
            "bg-white",
            "text-navy-900",
            "placeholder:text-blue-500/60",
            "resize-y", // Allow vertical resizing
          ],
          label: "text-white",
        }}
      />
      <Button
      type="submit"
      variant="bordered"
      className='bg-navy-900 text-white font-bold border-navy-900 mt-4'
      >
        Submit
      </Button>
      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </Form>
  );
}