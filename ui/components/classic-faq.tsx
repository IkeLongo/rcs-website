"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ScrollAnimationWrapper from "../animations/scroll-animation-wrapper";

interface FAQ {
  question: string;
  answer: string;
}

const defaultFaqs: FAQ[] = [
  {
    question: "What makes Mitsurin Wagyu different from other beef?",
    answer:
      "Mitsurin Wagyu comes from 100% full-blooded Japanese cattle with authentic genetics, raised on our Texas ranch using traditional Japanese methods. Our cattle are pasture-raised, grain-finished, and receive stress-free handling, resulting in exceptional marbling and the signature melt-in-your-mouth texture that Wagyu is famous for.",
  },
  {
    question: "What cuts are included in a 1/2 or whole cow purchase?",
    answer:
      "Both packages include premium cuts like ribeye, strip steaks, tenderloin, and ground beef, along with roasts, short ribs, and specialty cuts. You'll receive a variety that represents the entire animal, professionally butchered and vacuum-sealed. We provide a detailed cut sheet so you know exactly what to expect.",
  },
  {
    question: "How long does Wagyu beef stay fresh and how should I store it?",
    answer:
      "Vacuum-sealed Wagyu beef stays fresh in your freezer for up to 12 months. In the refrigerator, it's best consumed within 3-5 days. We recommend thawing slowly in the refrigerator for 24-48 hours before cooking. The high fat content and marbling actually help preserve the meat's quality over time.",
  },
  {
    question: "Is Mitsurin Wagyu worth the investment compared to regular beef?",
    answer:
      "Absolutely. Wagyu beef offers an unmatched dining experience with its rich marbling, buttery texture, and incredibly deep, savory flavor. When you purchase from Mitsurin, you're getting restaurant-quality beef at a fraction of what you'd pay dining out, plus the convenience of having premium beef available whenever you want it.",
  },
  {
    question: "How do I properly cook Wagyu beef to get the best results?",
    answer:
      "Wagyu beef cooks faster than regular beef due to its high fat content. Use medium to medium-high heat, and don't overcook - medium-rare to medium is ideal. The marbling will render beautifully, creating its own natural sauce. Season simply with salt and pepper to let the beef's natural flavor shine through.",
  },
  {
    question: "Do you offer smaller quantities or individual cuts?",
    answer:
      "Currently, we focus on half and whole cow purchases to provide the best value and ensure our customers experience the full range of what Wagyu has to offer. This approach allows us to maintain our quality standards while making premium Wagyu more accessible than individual retail cuts. Many customers split a whole cow with friends or family members, making it even more affordable while everyone gets to enjoy authentic Wagyu beef.",
  },
];

const FAQs = ({ 
  heading = "Frequently Asked Questions",
  eyebrowText,
  className = "",
  faqs = defaultFaqs
}: {
  heading?: string;
  eyebrowText?: string;
  className?: string;
  faqs?: FAQ[];
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ScrollAnimationWrapper
      className={["mx-auto max-w-3xl px-4 lg:px-8", className].join(" ")}
      id="faqs-section"
      animationType="slideUp"
      duration={0.6}
      initialY={60}
    >
      <div className="rounded-3xl bg-white/80 backdrop-blur px-0 md:px-0 py-8 md:py-12">
        {eyebrowText && (
          <p className="text-green-600 text-sm font-semibold tracking-wide mb-3 text-center uppercase">
            {eyebrowText}
          </p>
        )}

        <h3 className="text-4xl lg:text-5xl font-bold text-navy-900 text-center mb-10">
          {heading}
        </h3>

        <div className="flex flex-col gap-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`transition-all duration-300 overflow-hidden rounded-lg ${isOpen ? "border-2 border-alice-blue-400 bg-alice-blue-100" : "border border-alice-blue-300 bg-alice-blue-200"}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left font-semibold text-navy-900 cursor-pointer bg-transparent"
                  aria-expanded={isOpen}
                >
                  <span className="text-md md:text-md2 font-medium font-avenir">{faq.question}</span>
                  <span
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                  >
                    {isOpen ? <MinusIcon className="size-6 text-green-600" /> : <PlusIcon className="size-6 text-navy-400" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden px-8 pb-0">
                    <p className="mt-2 text-md font-avenir text-navy-700 leading-relaxed pb-6">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollAnimationWrapper>
  );
}

export default FAQs;
