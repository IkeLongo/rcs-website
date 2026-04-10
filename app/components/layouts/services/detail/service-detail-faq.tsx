'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { IconChevronDown } from '@tabler/icons-react';
import type { ServiceFaq } from '@/app/data/services';

function FaqItem({ faq }: { faq: ServiceFaq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 font-maven-pro text-base font-semibold text-navy-500">
          {faq.question}
        </span>
        <IconChevronDown
          size={18}
          className={clsx(
            'flex-shrink-0 text-navy-500 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>
      <div
        className={clsx(
          'grid transition-[grid-template-rows] duration-200',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-5 font-maven-pro text-sm leading-relaxed text-navy-500/70">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetailFaq({ faqs }: { faqs: ServiceFaq[] }) {
  return (
    <section className="w-full bg-white px-6 py-16 md:px-16 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center font-maven-pro text-3xl font-bold text-navy-500 md:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="rounded-[13px] border border-gray-100 bg-alice-blue-500 px-6">
          {faqs.map((faq, idx) => (
            <FaqItem key={idx} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
