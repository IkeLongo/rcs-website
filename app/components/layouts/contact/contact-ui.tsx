"use client";
import React, { useState } from "react";
import { formatPhoneNumber, isValidPhoneNumber, isValidEmail } from "@/lib/utils/validation";
import { IconMailFilled } from "@tabler/icons-react";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import confetti from "canvas-confetti";

export function ContactFormGridWithDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  function fireConfetti(durationMs = 1200) {
    const end = Date.now() + durationMs;
    const colors = ["#A8DD76", "#0c2244"];
    (function frame() {
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    // console.log("Form submitted - preventDefault called");
    // console.log("Event defaultPrevented:", e.defaultPrevented);
    // console.log("Message value before sending:", message);
    // console.log("Message length:", message?.length);
    setStatus("");
    setSubmitted(false);
    setPhoneError("");
    setEmailError("");

    // Validate phone
    if (!isValidPhoneNumber(phone)) {
      setPhoneError("Phone number must be 10 digits");
      return;
    }

    // Validate email
    if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    const formData = { name, email, phone, company, message };
    try {
      // Send admin notification
      const contactRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, message }),
      });
      // Send client confirmation and store contact
      const leadRes = await fetch("/api/contact/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, message, smsConsent: consentChecked }),
      });
      if (contactRes.ok && leadRes.ok) {
        setStatus("success");
        setSubmitted(true);
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setMessage("");
        setConsentChecked(false);
        fireConfetti(2000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
    return false;
  };

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-10 md:px-6 md:py-20 lg:grid-cols-2">
      <div className="relative flex flex-col items-center overflow-hidden lg:items-start">
        <div className="flex items-start justify-start">
          <FeatureIconContainer className="flex items-center justify-center overflow-hidden">
            <IconMailFilled className="h-6 w-6 text-blue-500" />
          </FeatureIconContainer>
        </div>
        <h2 className="mt-9 font-maven-pro bg-gradient-to-b from-neutral-800 to-neutral-900 bg-clip-text text-left text-xl font-bold text-transparent md:text-3xl lg:text-5xl">
          Contact Us
        </h2>
        <p className="mt-8 max-w-lg text-center text-base text-neutral-600 md:text-left">
          Have a project in mind? Whether you need a new website, a brand refresh, or help 
          improving your online presence, we’d love to hear from you. <br/>
        </p>

        <p className="mt-4 max-w-lg text-center text-base text-neutral-600 md:text-left">
          Fill out the form below and tell us a little about your business and what you're 
          looking to build. We'll review your message and get back to you shortly to discuss 
          how we can help bring your ideas to life.
        </p>

        <div className="mt-10 hidden flex-col items-center gap-4 md:flex-row lg:flex">
          <p className="text-sm text-neutral-500">
            contact@rivercitycreatives.com
          </p>

          <div className="h-1 w-1 rounded-full bg-neutral-500" />
          <p className="text-sm text-neutral-500">
            +1 (210) 730-6232
          </p>
          {/* <div className="h-1 w-1 rounded-full bg-neutral-500" /> */}

          {/* <p className="text-sm text-neutral-500 dark:text-neutral-400">
            support@yoursaas.ai
          </p> */}
        </div>
        <div className="div relative mt-20 flex w-[600px] flex-shrink-0 -translate-x-10 items-center justify-end [perspective:800px] [transform-style:preserve-3d] sm:-translate-x-0 lg:-translate-x-32">
          <Pin className="-top-2 left-6" />

          <img
            src="/world.svg"
            width={500}
            height={500}
            alt="world map"
            className="[transform:rotateX(45deg)_translateZ(0px)] opacity-50"
          />
        </div>
      </div>
      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-start gap-4 overflow-hidden rounded-3xl bg-gradient-to-b from-blue-100 to-alice-blue-500 p-4 sm:p-10">
        <Grid size={20} />
        <form className="w-full" onSubmit={handleSubmit} action="javascript:void(0);">
          <div className="relative z-20 mb-4 w-full">
            <label
              className="mb-2 inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300"
              htmlFor="name"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ricky Bobby"
              className="shadow-input h-10 w-full rounded-md border border-transparent bg-white pl-4 text-sm text-neutral-700 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800 focus:outline-none active:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="relative z-20 mb-4 w-full">
            <label
              className="mb-2 inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="contact@rivercitycreatives.com"
              className="shadow-input h-10 w-full rounded-md border border-transparent bg-white pl-4 text-sm text-neutral-700 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800 focus:outline-none active:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            {emailError && (
              <div className="text-xs text-red-600 mt-1">{emailError}</div>
            )}
          </div>
          <div className="relative z-20 mb-4 w-full">
            <label
              className="mb-2 inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder="(123) 456-7890"
              className="shadow-input h-10 w-full rounded-md border border-transparent bg-white pl-4 text-sm text-neutral-700 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800 focus:outline-none active:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
              value={formatPhoneNumber(phone)}
              maxLength={14}
              onChange={(e) => {
                // Only allow numbers, format as (XXX) XXX-XXXX
                const raw = e.target.value.replace(/\D/g, "");
                if (raw.length <= 10) {
                  setPhone(raw);
                  setPhoneError("");
                }
              }}
            />
            {phoneError && (
              <div className="text-xs text-red-600 mt-1">{phoneError}</div>
            )}
          </div>
          <div className="relative z-20 mb-4 w-full">
            <label
              className="mb-2 inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300"
              htmlFor="company"
            >
              Company
            </label>
            <input
              id="company"
              type="text"
              placeholder="Shake N' Bake LLC"
              className="shadow-input h-10 w-full rounded-md border border-transparent bg-white pl-4 text-sm text-neutral-700 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800 focus:outline-none active:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="relative z-20 mb-4 w-full">
            <label
              className="mb-2 inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Type your message here"
              className="shadow-input w-full rounded-md border border-transparent bg-white pt-4 pl-4 text-sm text-neutral-700 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800 focus:outline-none active:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit" className="relative z-10 flex items-center justify-center rounded-md border border-transparent bg-navy-800 px-4 py-2 text-sm font-medium text-white shadow-[0px_1px_0px_0px_#FFFFFF20_inset] transition duration-200 hover:bg-navy-900 md:text-sm">
            Submit
          </button>
          <div className="flex items-start w-full font-avenir pt-4">
            <input
              id="report-consent"
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-1 mr-2 accent-navy-500"
            />
            <label htmlFor="report-consent" className="text-sm text-gray-700 leading-tight">
              I agree to receive conversational and transactional SMS messages from RiverCity 
              Creatives (operated by Inventive Collective LLC) related to my inquiry, including 
              follow-up, appointment confirmation, and scheduling messages. Message frequency may 
              vary. Message & data rates may apply. Reply STOP to opt out or HELP for assistance. 
              View our{" "}
              <a href="/privacy" className="underline hover:text-navy-700">Privacy Policy</a>{" "}
              and{" "}
              <a href="/terms" className="underline hover:text-navy-700">Terms of Service</a>.
              Consent is not mandatory for form submission.
            </label>
          </div>
        </form>
        {submitted && status === "success" && (
          <div className="mt-4 w-full rounded-xl border border-green-200 bg-green-50 p-4">
            <div className="font-semibold text-green-700">Your message was sent!</div>
            <div className="text-green-700/90 mt-1">
              We’ll review your message and get back to you soon.
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="mt-4 w-full rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="font-semibold text-red-700">Something went wrong.</div>
            <div className="text-red-700/90 mt-1">
              Please try again or email us directly.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const Pin = ({ className }: { className?: string }) => {
  return (
    <motion.div
      style={{ transform: "translateZ(1px)" }}
      className={cn(
        "pointer-events-none absolute z-[60] flex h-40 w-96 items-center justify-center opacity-100 transition duration-500",
        className,
      )}
    >
      <div className="h-full w-full">
        <div className="absolute inset-x-0 top-0 z-20 mx-auto inline-block w-fit rounded-lg bg-neutral-200 px-2 py-1 text-xs font-normal text-neutral-700 dark:bg-neutral-800 dark:text-white">
          We are here
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-blue-400/0 via-blue-400/90 to-blue-400/0 transition-opacity duration-500"></span>
        </div>

        {/* Radiant Rings */}
        <div
          style={{
            perspective: "800px",
            transform: "rotateX(70deg) translateZ(0px)",
          }}
          className="absolute left-[39.5%] bottom-1/2 translate-x-[14px] translate-y-[14px]"
        >
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
              }}
              transition={{ duration: 6, repeat: Infinity, delay: 0 }}
              className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] dark:bg-sky-500/[0.2]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
              }}
              transition={{ duration: 6, repeat: Infinity, delay: 2 }}
              className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] dark:bg-sky-500/[0.2]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
              }}
              transition={{ duration: 6, repeat: Infinity, delay: 4 }}
              className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] dark:bg-sky-500/[0.2]"
            ></motion.div>
          </>
        </div>

        {/* Radiant Lines */}
        <>
          <motion.div className="absolute right-1/2 bottom-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-blue-500 blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-blue-500" />
          <motion.div className="absolute right-1/2 bottom-1/2 z-40 h-[4px] w-[4px] translate-x-[1.5px] translate-y-[14px] rounded-full bg-blue-600 blur-[3px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 z-40 h-[2px] w-[2px] translate-x-[0.5px] translate-y-[14px] rounded-full bg-blue-300" />
        </>
      </div>
    </motion.div>
  );
};

export const FeatureIconContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative h-14 w-14 rounded-md bg-gradient-to-b from-gray-50 to-neutral-200 p-[4px] dark:from-neutral-800 dark:to-neutral-950",
        className,
      )}
    >
      <div
        className={cn(
          "relative z-20 h-full w-full rounded-[5px] bg-gray-50 dark:bg-neutral-800",
          className,
        )}
      >
        {children}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-30 mx-auto h-4 w-full rounded-full bg-neutral-600 opacity-50 blur-lg"></div>
      <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-[60%] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-[60%] bg-gradient-to-r from-transparent via-blue-600 to-transparent dark:h-[8px] dark:blur-sm"></div>
    </div>
  );
};

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const [clientPattern, setClientPattern] = useState<number[][] | undefined>(undefined);

  React.useEffect(() => {
    if (!pattern) {
      setClientPattern([
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      ]);
    }
  }, [pattern]);

  const p = pattern ?? clientPattern ?? [
    [7, 1], [7, 1], [7, 1], [7, 1], [7, 1] // fallback for SSR
  ];

  return (
    <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/30 to-zinc-900/30 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-10">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full fill-navy-500 stroke-black/100 mix-blend-overlay"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any, idx: number) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}-${idx}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}