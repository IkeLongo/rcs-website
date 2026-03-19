"use client";

import dynamic from "next/dynamic";

const BookingModalWidget = dynamic(
  () =>
    import("./booking-modal-widget").then((mod) => ({
      default: mod.BookingModalWidget,
    })),
  { ssr: false }
);

export default function BookingModalClient() {
  return <BookingModalWidget />;
}
