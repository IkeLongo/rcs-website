"use client";

import { useState } from "react";
import { formatPhoneNumber, isValidPhoneNumber } from "@/lib/utils/validation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FormValues = {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  website: string; // honeypot — never sent to the server
};

type ResultState =
  | null
  | { status: "success"; sessionsRemaining?: number }
  | { status: "failure"; reason: string };

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

/**
 * Returns null when valid, or an error message string when invalid.
 */
function getValidationError(values: FormValues): string | null {
  const phone = values.phone.trim();
  const email = values.email.trim();
  const first = values.firstName.trim();
  const last = values.lastName.trim();

  // At least one complete identifier must be provided
  const hasPhone = phone !== "" && isValidPhoneNumber(phone);
  const hasEmail = email !== "";
  const hasFullName = first !== "" && last !== "";
  const hasPartialName = (first !== "" && last === "") || (first === "" && last !== "");

  if (hasPartialName) {
    return "Please enter both first and last name, or use phone/email.";
  }

  if (!hasPhone && !hasEmail && !hasFullName) {
    return null; // treated as "nothing entered yet" — button stays disabled
  }

  // Phone entered but invalid format
  if (phone !== "" && !isValidPhoneNumber(phone)) {
    return "Please enter a valid phone number.";
  }

  return null; // all good
}

/** True when the form has enough valid data to submit */
function canSubmit(values: FormValues): boolean {
  const phone = values.phone.trim();
  const email = values.email.trim();
  const first = values.firstName.trim();
  const last = values.lastName.trim();

  const hasPhone = phone !== "" && isValidPhoneNumber(phone);
  const hasEmail = email !== "";
  const hasFullName = first !== "" && last !== "";

  return hasPhone || hasEmail || hasFullName;
}

// ---------------------------------------------------------------------------
// Failure reason → display text
// ---------------------------------------------------------------------------

function mapFailureReason(reason: string): { title: string; message: string } {
  const r = reason.toLowerCase();
  if (r.includes("already checked in today"))
    return {
      title: "Already Checked In Today",
      message: "Please speak with staff if this is incorrect.",
    };
  if (r.includes("contact not found"))
    return {
      title: "Membership Not Found",
      message: "Please check your info or speak with staff.",
    };
  if (r.includes("no sessions remaining"))
    return {
      title: "No Sessions Remaining",
      message: "Please purchase more sessions or speak with staff.",
    };
  if (r.includes("expired"))
    return {
      title: "Membership Expired",
      message: "Please renew your membership.",
    };
  if (r.includes("not active") || r.includes("inactive"))
    return {
      title: "Membership Inactive",
      message: "Please speak with staff.",
    };
  if (r.includes("multiple"))
    return {
      title: "Multiple Members Found",
      message: "Please use phone/email or speak with staff.",
    };
  if (r.includes("spam"))
    return {
      title: "Check-In Failed",
      message: "Please try again or speak with staff.",
    };
  return {
    title: "Check-In Failed",
    message: "Please speak with staff.",
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CheckInForm({ clientSlug }: { clientSlug: string }) {
  const empty: FormValues = {
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
    website: "",
  };

  const [values, setValues] = useState<FormValues>(empty);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultState>(null);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleReset() {
    setValues(empty);
    setTouched(false);
    setResult(null);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);

    // Honeypot guard
    if (values.website) return;

    if (!canSubmit(values)) return;
    if (getValidationError(values)) return;

    setLoading(true);
    setResult(null);

    const payload = {
      phone: values.phone.trim() || undefined,
      email: values.email.trim() || undefined,
      firstName: values.firstName.trim() || undefined,
      lastName: values.lastName.trim() || undefined,
      website: values.website,
      source: "custom_check_in_form",
      checkInLocation: "MaximStrong Gym",
    };

    console.log("Submitting payload:", payload);

    try {
      const res = await fetch(`/api/ghl/${clientSlug}/check-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data.success) {
        setResult({
          status: "success",
          sessionsRemaining:
            typeof data.sessionsRemaining === "number"
              ? data.sessionsRemaining
              : undefined,
        });
      } else {
        setResult({
          status: "failure",
          reason: data.reason ?? "Unknown error",
        });
      }
    } catch (err) {
      console.error("Check-in fetch error:", err);
      setResult({
        status: "failure",
        reason: "Network error",
      });
    } finally {
      setLoading(false);
    }
  }

  // -------------------------------------------------------------------------
  // Result screens
  // -------------------------------------------------------------------------

  if (result?.status === "success") {
    const sessionNote =
      typeof result.sessionsRemaining === "number"
        ? ` (${result.sessionsRemaining} session${
            result.sessionsRemaining !== 1 ? "s" : ""
          } remaining)`
        : "";
    return (
      <ResultCard
        icon="✅"
        title="Check-In Successful"
        message={`You're good to go.${sessionNote}`}
        accent="emerald"
        onReset={handleReset}
      />
    );
  }

  if (result?.status === "failure") {
    const { title, message } = mapFailureReason(result.reason);
    return (
      <ResultCard
        icon="❌"
        title={title}
        message={message}
        accent="red"
        onReset={handleReset}
      />
    );
  }

  // -------------------------------------------------------------------------
  // Form
  // -------------------------------------------------------------------------

  const validationError = touched ? getValidationError(values) : null;
  const submitDisabled = loading || !canSubmit(values) || !!getValidationError(values);

  const inputBase = [
    "w-full rounded-xl bg-zinc-800 border px-4 py-3.5 text-white",
    "text-base placeholder:text-zinc-500 outline-none transition-colors",
    "focus:ring-2 focus:ring-offset-1 focus:ring-offset-zinc-900",
  ].join(" ");
  const inputNormal = "border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500";
  const inputError = "border-red-500 focus:ring-red-500";

  const phoneHasError =
    touched && values.phone.trim() !== "" && !isValidPhoneNumber(values.phone);
  const namePartialError =
    touched &&
    ((values.firstName.trim() !== "" && values.lastName.trim() === "") ||
      (values.firstName.trim() === "" && values.lastName.trim() !== ""));

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full space-y-5">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={(e) => set("website", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none w-0 h-0"
      />

      {/* Helper hint */}
      <p className="text-xs text-zinc-500 leading-relaxed">
        Provide at least one of the following to look up your account.
      </p>

      {/* Phone */}
      <Field label="Phone Number">
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="(555) 555-5555"
          value={values.phone}
          onChange={(e) => set("phone", formatPhoneNumber(e.target.value))}
          onBlur={() => setTouched(true)}
          className={`${inputBase} ${phoneHasError ? inputError : inputNormal}`}
        />
        {phoneHasError && (
          <FieldError>Please enter a valid phone number.</FieldError>
        )}
      </Field>

      {/* Divider */}
      <Divider />

      {/* Email */}
      <Field label="Email">
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          onBlur={() => setTouched(true)}
          className={`${inputBase} ${inputNormal}`}
        />
      </Field>

      {/* Divider */}
      <Divider />

      {/* First + Last name (side-by-side on sm+) */}
      <div className="space-y-1.5">
        <span className="block text-sm font-semibold tracking-wide text-zinc-300 uppercase">
          Name
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            value={values.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            onBlur={() => setTouched(true)}
            className={`${inputBase} ${namePartialError ? inputError : inputNormal}`}
          />
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            value={values.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            onBlur={() => setTouched(true)}
            className={`${inputBase} ${namePartialError ? inputError : inputNormal}`}
          />
        </div>
        {namePartialError && (
          <FieldError>
            Please enter both first and last name, or use phone/email.
          </FieldError>
        )}
      </div>

      {/* Global validation error */}
      {validationError && !phoneHasError && !namePartialError && (
        <p className="text-xs text-red-400">{validationError}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitDisabled}
        className={[
          "w-full rounded-xl px-6 py-4 text-base font-bold tracking-widest uppercase",
          "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white",
          "transition-all duration-150",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
          "focus:ring-offset-zinc-900",
        ].join(" ")}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Checking In…
          </span>
        ) : (
          "Check In"
        )}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Small layout helpers
// ---------------------------------------------------------------------------

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <span className="block text-sm font-semibold tracking-wide text-zinc-300 uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-red-400">{children}</p>;
}

function Divider() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-zinc-600" />
      <span className="text-xs text-zinc-400 uppercase tracking-widest">or</span>
      <div className="flex-1 h-px bg-zinc-600" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Result card sub-component
// ---------------------------------------------------------------------------

function ResultCard({
  icon,
  title,
  message,
  accent,
  onReset,
}: {
  icon: string;
  title: string;
  message: string;
  accent: "emerald" | "red";
  onReset: () => void;
}) {
  const ring =
    accent === "emerald"
      ? "border-emerald-500/40 bg-emerald-900/20"
      : "border-red-500/40 bg-red-900/20";

  const resetBtn =
    accent === "emerald"
      ? "bg-zinc-700 hover:bg-zinc-600 text-white"
      : "bg-red-700 hover:bg-red-600 text-white";

  return (
    <div className={`w-full rounded-2xl border ${ring} px-6 py-8 text-center space-y-4`}>
      <div className="text-5xl">{icon}</div>
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-zinc-300 text-sm leading-relaxed">{message}</p>
      <button
        onClick={onReset}
        className={[
          "mt-2 w-full rounded-xl px-6 py-3.5 text-sm font-bold uppercase tracking-widest",
          resetBtn,
          "transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500",
        ].join(" ")}
      >
        Check In Another Member
      </button>
    </div>
  );
}
