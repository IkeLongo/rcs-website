"use client";

import {Form, Input, Button, Textarea, Select, SelectItem} from "@heroui/react";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

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

  const onSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data);
  };

  // const selectedValue = React.useMemo(
  //   () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
  //   [selectedKeys],
  // );

  return (
    <Form className="w-full" validationBehavior="native" onSubmit={onSubmit}>
      <div className="w-full flex justify-between gap-2">
        <Input
          isRequired
          errorMessage="Please enter your first name"
          name="firstName"
          placeholder="First Name"
          type="text"
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
        <Input
          isRequired
          errorMessage="Please enter your last name"
          name="lastName"
          placeholder="Last Name"
          type="text"
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
        <Input
          isRequired
          errorMessage="Please enter your address"
          name="address"
          placeholder="Address"
          type="text"
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
      </div>
      <Select
        isRequired
        errorMessage="Please select a request type"
        backdrop="blur"
        className="text-gray-900"
        color="gray-300"
        placeholder="Choose Request Type"
        variant="faded"
        classNames={{
          base: [
            "bg-gray-900",
            "border-gray-900",
          ],
          value: "text-gray-300",
          mainWrapper: [
            "bg-gray-900",
            "text-white",
            "placeholder:text-gray-300",
          ],
          trigger: "bg-gray-900",
          listboxWrapper: "bg-gray-900",
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
      >
        {selections.map((selection) => (
          <SelectItem key={selection.key} className="text-white bg-gray-900"
          classNames={{
            content: "bg-gray-900",
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
          >
            {selection.label}</SelectItem>
        ))}
      </Select>
      <Textarea
        isRequired
        errorMessage="Please a description of your request"
        name="request"
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
      {/* <Dropdown
        backdrop="blur"
        isRequired
        errorMessage="Please select a request type"
        >
        <DropdownTrigger>
          <Button className="capitalize" variant="bordered">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Single selection example"
          selectedKeys={selectedKeys}
          selectionMode="single"
          variant="flat"
          onSelectionChange={setSelectedKeys}
        >
          <DropdownItem key="information" className="text-gray-900">Information</DropdownItem>
          <DropdownItem key="correction" className="text-gray-900">Correction</DropdownItem>
          <DropdownItem key="objection" className="text-gray-900">Objection</DropdownItem>
          <DropdownItem key="insight" className="text-gray-900">Insight</DropdownItem>
          <DropdownItem key="deletion" className="text-gray-900">Deletion</DropdownItem>
          <DropdownItem key="data-portability" className="text-gray-900">Data Portability</DropdownItem>
          <DropdownItem key="profiling" className="text-gray-900">Profiling</DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
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