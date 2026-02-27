// app/ui/booking/booking-client.tsx
"use client";

import dynamic from "next/dynamic";

const BookingWidget = dynamic(
  () => import('./booking').then(mod => ({ default: mod.BookingWidget })),
  { ssr: false }
);

export default function BookingClient() {
  return <BookingWidget />;
}
