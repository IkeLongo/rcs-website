"use client";

import { useState } from "react";
import { formatPhoneNumber, isValidPhoneNumber, isValidEmail } from "@/lib/utils/validation";

type BookingFormProps = {
  onSubmit: (data: BookingFormData) => Promise<void>;
  disabled?: boolean;
};

export type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
};

// Generate 30-min time slots from 8am to 6pm
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 8; h < 18; h++) {
    for (const m of [0, 30]) {
      const hour = h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";
      const min = m === 0 ? "00" : "30";
      slots.push(`${hour}:${min} ${ampm}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

// Minimum date = today
function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export function BookingForm({ onSubmit, disabled }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");
    setEmailError("");

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);
    await onSubmit({ name, email, phone, preferredDate, preferredTime, notes });
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
        ✓ Booking request received! We'll confirm your call shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-1 rounded-xl border border-navy-100 bg-white p-4 shadow-sm space-y-3">
      <p className="text-xs font-semibold text-navy-700 uppercase tracking-wide">Book a Discovery Call</p>

      <div>
        <input
          type="text"
          placeholder="Full name *"
          required
          value={name}
          disabled={disabled || submitting}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-navy-400"
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="Email address *"
          required
          value={email}
          disabled={disabled || submitting}
          onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-navy-400"
        />
        {emailError && <p className="mt-1 text-xs text-red-600">{emailError}</p>}
      </div>

      <div>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="Phone number *"
          required
          value={formatPhoneNumber(phone)}
          maxLength={14}
          disabled={disabled || submitting}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            if (raw.length <= 10) { setPhone(raw); setPhoneError(""); }
          }}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-navy-400"
        />
        {phoneError && <p className="mt-1 text-xs text-red-600">{phoneError}</p>}
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="date"
            required
            value={preferredDate}
            min={todayISO()}
            disabled={disabled || submitting}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-navy-400"
          />
        </div>
        <div className="flex-1">
          <select
            required
            value={preferredTime}
            disabled={disabled || submitting}
            onChange={(e) => setPreferredTime(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-navy-400 bg-white"
          >
            <option value="">Time *</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <textarea
          placeholder="Anything you'd like us to know before the call?"
          rows={2}
          value={notes}
          disabled={disabled || submitting}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-navy-400 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={disabled || submitting || !name || !email || !phone || !preferredDate || !preferredTime}
        className="w-full rounded-lg bg-navy-800 py-2 text-sm font-medium text-white transition hover:bg-navy-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Requesting..." : "Request Call"}
      </button>
    </form>
  );
}
