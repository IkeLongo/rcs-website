'use client';

import { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Select, SelectItem } from "@heroui/react";

type WebsiteRow = {
  id: number;
  display_name: string;
  clientName: string;
  host: string;
  status: string;
  hostingCost: number;
};

type WebsiteStatusOption = {
  id: number;
  name: string;
  display_name: string;
  color: string;
};

export default function WebsitesTable(
  { websites, websiteStatusOptions }: { websites: WebsiteRow[]; websiteStatusOptions: WebsiteStatusOption[]; }  
) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const filteredWebsites = websites.filter((site) => {
    const normalizedSearch = search.toLowerCase();

    // Match display_name or domain (optional)
    const matchesSearch = site.display_name.toLowerCase().includes(normalizedSearch);

    // Resolve selected status name from the filter ID
    const selectedStatus = websiteStatusOptions.find((s) => String(s.id) === filter);
    const selectedStatusName = selectedStatus?.name?.toLowerCase() || '';

    // Compare the resolved status name to the site's status string
    const matchesStatus = filter === '' || site.status.toLowerCase() === selectedStatusName;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {/* Search & Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          errorMessage="Please enter your password"
          placeholder="Search by domain..."
          type="text"
          variant="faded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          classNames={{
            base: "w-64",
            input: [
              "placeholder:text-gray-700",
              "text-gray-700",
            ],
            innerWrapper: [
              "bg-white",
              "rounded-[13px]",
              "!outline-none", // remove the default outline
            ],
            inputWrapper: [
              "shadow-xl",
              "bg-white",
              "!cursor-text",
              "rounded-[13px]",
              "focus-within:ring-2", // Add focus styles here
              "focus-within:ring-blue-500", // Customize the focus color
            ],
          }}
        />
        <Select
          className="w-64"
          variant="faded"
          placeholder="Filter by status"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          classNames={{
            base: "w-64 relative",
            trigger: [
              "rounded-[13px]",
              "bg-white",
              "shadow-xl",
              "focus-within:ring-2",
              "focus-within:ring-blue-500",
              "!outline-none",
              "flex items-center justify-between",
            ],
            innerWrapper: [
              "bg-white",
              "rounded-[13px]",
              "text-gray-700",
              "placeholder:text-gray-700",
              "!outline-none", // remove the default outline
            ],
            selectorIcon: [
              "absolute", // Position the icon absolutely
              "right-3",
              "text-gray-700",
              "align-right",
            ],
            listbox: [
              "max-w-[240px]",
              "bg-white",
              "rounded-[13px]",
              "text-gray-700",
              "py-2",
              "px-1",
              "m-1",
              "border-2",
              "border-gray-100",
              "focus-within:ring-2",
              "focus-within:ring-blue-500",
            ],
          }}
          listboxProps={{
            itemClasses: {
              base: [
                "transition-opacity",
                //"data-[hover=true]:text-black",
                //"data-[hover=true]:bg-white",
                //"dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:text-blue-500",
                //"data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
                "!outline-none",
              ],
              // title: [
              //   "p-5",
              // ],
            },
          }}
        >
          {websiteStatusOptions.map((option) => (
            <SelectItem
              key={option.id}
              textValue={option.name}
              className="my-1"
            >
              {option.display_name}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Website Table */}
      <div className="overflow-x-auto border rounded-lg">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-50 text-sm text-gray-600 text-left">
            <TableColumn className="px-4 py-2">Business</TableColumn>
            <TableColumn className="px-4 py-2">Client</TableColumn>
            <TableColumn className="px-4 py-2">Host</TableColumn>
            <TableColumn className="px-4 py-2">Cost</TableColumn>
            <TableColumn className="px-4 py-2">Status</TableColumn>
            <TableColumn className="px-4 py-2 text-right text-gray-500">Actions</TableColumn>
          </TableHeader>
          <TableBody className="text-sm text-gray-800 divide-y divide-gray-100">
            {filteredWebsites.length > 0 ? (
              filteredWebsites.map((site) => (
                <TableRow key={site.id}>
                  <TableCell className="px-4 py-2">{site.display_name}</TableCell>
                  <TableCell className="px-4 py-2">{site.clientName}</TableCell>
                  <TableCell className="px-4 py-2">{site.host}</TableCell>
                  <TableCell className="px-4 py-2">${site.hostingCost.toFixed(2)}</TableCell>
                  <TableCell className="px-4 py-2">
                    <span className={`px-2 py-1}`}>
                      {site.status.charAt(0).toUpperCase() + site.status.slice(1).toLowerCase()}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-2 text-right space-x-2">
                    <button className="text-blue-600 hover:underline">View</button>
                    <button className="text-yellow-600 hover:underline">Edit</button>
                    <button className="text-red-600 hover:underline">Pause</button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No websites match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Website Button */}
      <div className="mt-6 text-right">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add New Website
        </button>
      </div>
    </>
  );
}
