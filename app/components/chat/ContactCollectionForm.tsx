"use client";

import { useState } from "react";
import { formatPhoneNumber, isValidPhoneNumber, isValidEmail } from "@/lib/utils/validation";

type ContactCollectionFormProps = {
  onSubmit: (data: ContactFormData) => Promise<void>;
  disabled?: boolean;
};

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

export function ContactCollectionForm({ onSubmit, disabled }: ContactCollectionFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
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
    await onSubmit({ name, email, phone, company, message });
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
        ✓ Got it! We'll be in touch soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-1 rounded-xl border border-navy-100 bg-white p-4 shadow-sm space-y-3">
      <p className="text-xs font-semibold text-navy-700 uppercase tracking-wide">Contact Info</p>

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

      <div>
        <input
          type="text"
          placeholder="Company name"
          value={company}
          disabled={disabled || submitting}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-navy-400"
        />
      </div>

      <div>
        <textarea
          placeholder="What can we help you with? *"
          required
          rows={3}
          value={message}
          disabled={disabled || submitting}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-navy-400 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={disabled || submitting || !name || !email || !phone || !message}
        className="w-full rounded-lg bg-navy-800 py-2 text-sm font-medium text-white transition hover:bg-navy-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
