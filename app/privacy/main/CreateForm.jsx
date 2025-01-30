"use client";

import {Form, Input, Button, Textarea, Select, SelectItem} from "@heroui/react";
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {toast} from 'react-toastify';

export const selections = [
  {key: "information", label: "Information"},
  {key: "correction", label: "Correction"},
  {key: "objection", label: "Objection"},
  {key: "insight", label: "Insight"},
  {key: "deletion", label: "Deletion"},
  {key: "data-portability", label: "Data Portability"},
  {key: "profiling", label: "Profiling"},
];

export default function CreateForm() {
  const [submitted, setSubmitted] = useState(null);
  const form = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data);

    console.log("Submitting data:", data);

    try {
      const response = await fetch("/api/dpoContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${response.status} - ${errorData.message}`);
      }
  
      // Handle successful response
      const result = await response.json();
      console.log("Success:", result);
      // Show success toast
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_of79jpv", "template_rrjiba9", form.current, {
        publicKey: "aeIyCorze0snqKQe0",
      })
      .then(
        () => {
          console.log('SUCCESS!');
          e.target.reset();
          // Show success toast
          toast.success("Form submitted successfully!", {
            className: 
            "bg-gray-900",
          });
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  console.log("env:", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);

  // const selectedValue = React.useMemo(
  //   () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
  //   [selectedKeys],
  // );

  return (
    <Form className="w-full" validationBehavior="native" onSubmit={sendEmail} ref={form}>
      <div className="w-full flex justify-between gap-2">
        <Input
          isRequired
          errorMessage="Please enter your first name"
          name="firstName"
          placeholder="First Name"
          type="text"
          variant="faded"
          classNames={{
            input: [
              "placeholder:text-gray-300",
            ],
            innerWrapper: "bg-gray-900",
            inputWrapper: [
              "shadow-xl",
              "bg-gray-900",
              "border-gray-300",
              "!cursor-text",
            ],
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
            input: [
              "placeholder:text-gray-300",
            ],
            innerWrapper: "bg-gray-900",
            inputWrapper: [
              "shadow-xl",
              "bg-gray-900",
              "border-gray-300",
              "!cursor-text",
            ],
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
            input: [
              "placeholder:text-gray-300",
            ],
            innerWrapper: "bg-gray-900",
            inputWrapper: [
              "shadow-xl",
              "bg-gray-900",
              "border-gray-300",
              "!cursor-text",
            ],
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
            input: [
              "placeholder:text-gray-300",
            ],
            innerWrapper: "bg-gray-900",
            inputWrapper: [
              "shadow-xl",
              "bg-gray-900",
              "border-gray-300",
              "!cursor-text",
            ],
          }}
        />
      </div>
      <Select
        isRequired
        name="type"
        errorMessage="Please select a request type"
        backdrop="blur"
        className="text-gray-300"
        color="gray-300"
        placeholder="Choose Request Type"
        variant="faded"
        classNames={{
          value: [
            "text-gray-300",
            "group-data-[has-value=true]:text-white",
          ],
          trigger: [
            "bg-gray-900",
            "border-gray-300",
          ],
          listbox: [
            "bg-gray-900",
            "rounded-[14px]",
            "text-gray-300",
          ],
          innerWrapper: "bg-gray-900 hover:bg-gray-900",
          inputWrapper: [
            "shadow-xl",
            "bg-gray-900",
            "border-gray-300",
            "!cursor-text",
          ],
        }}
        listboxProps={{
          itemClasses: {
            base: [
              "bg-gray-900",
              "text-gray-300",
              "transition-opacity",
              "data-[hover=true]:text-black",
              "data-[hover=true]:bg-white",
              "dark:data-[hover=true]:bg-default-50",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          },
        }}
        popoverProps={{
          classNames: {
            base: "rounded-[14px]",
            content: "bg-gray-900 p-0 border-medium border-gray-300",
          },
        }}
      >
        {selections.map((selection) => (
          <SelectItem key={selection.key} className="text-white bg-gray-900"
          >
            {selection.label}</SelectItem>
        ))}
      </Select>
      <Textarea
        isRequired
        errorMessage="Please a description of your request"
        name="description"
        placeholder="Description of Request"
        variant="faded"
        classNames={{
          label: "text-white",
          input: [
            "bg-gray-900",
            "text-white",
            "placeholder:text-gray-300",
          ],
          innerWrapper: "bg-gray-900",
          inputWrapper: [
            "shadow-xl",
            "bg-gray-900",
            "border-gray-300",
            "hover:border-white",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "group-data-[focus=true]:bg-gray-900",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
      />
      <Button type="submit" variant="bordered">
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