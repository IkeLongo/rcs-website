"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function TestimonialsWithCarousel() {
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const visibleTestimonials = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="bg-white">
      <div className="base mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <div className="mt-4 flex items-center justify-between gap-4">
          <h2 className="!text-lg !text-left font-medium tracking-tight !text-navy-500 md:!text-4xl lg:text-5xl dark:text-white">
            Don't Take it From Us, Hear from Our Clients.
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={handlePrevious}
              className="flex size-10 items-center justify-center rounded-full border border-black/15 text-black transition duration-200 hover:bg-black/5 active:scale-98 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={handleNext}
              className="flex size-10 items-center justify-center rounded-full border border-black/15 text-black transition duration-200 hover:bg-black/5 active:scale-98 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  filter: "blur(10px)",
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={testimonial.name}
                className="flex h-full flex-col justify-between rounded-lg bg-alice-blue-200 p-4 shadow-sm ring-1 shadow-black/10 ring-black/10 md:p-6 dark:bg-neutral-900 dark:shadow-white/10 dark:ring-white/5"
              >
                <p className="!text-gray-950 !text-md !text-left">
                  {testimonial.quote}
                </p>
                <div className="mt-14 flex items-center gap-3">
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="size-8 shrink-0 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-black dark:text-white">
                      {testimonial.name}
                    </span>
                    {testimonial.designation && (
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {testimonial.designation}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

interface Testimonial {
  src: string;
  quote: string;
  name: string;
  designation?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Mario Gonzalez",
    quote:
      "Rivercity Creatives completely transformed our online presence. Within two months of launching our new site, we saw a 40% increase in leads. They didn't just build a website — they built us a sales tool.",
    src: "https://assets.aceternity.com/avatars/1.webp",
    designation: "Owner, Gonzalez Family Law",
  },
  {
    name: "Denise Tran",
    quote:
      "Our old website was embarrassing to share. The team at Rivercity gave us a brand identity that finally matches the quality of our work. Now I'm proud to hand out my business card.",
    src: "https://assets.aceternity.com/avatars/2.webp",
    designation: "Founder, Tran Construction Co.",
  },
  {
    name: "Samuel Reyes",
    quote:
      "I came to them with just a logo and a vision. They turned it into a full brand — colors, fonts, website, the whole package. My boutique looks and feels legit now. Customers comment on it all the time.",
    src: "https://assets.aceternity.com/avatars/3.webp",
    designation: "Owner, Solis Boutique",
  },
  {
    name: "James Whitfield",
    quote:
      "They redesigned our site and handled our SEO. We went from page 5 on Google to page 1 in under 90 days. The ROI has been incredible and the team was easy to work with throughout.",
    src: "https://assets.aceternity.com/avatars/4.webp",
    designation: "CEO, Whitfield Roofing",
  },
  {
    name: "Priya Nair",
    quote:
      "As a photographer, my website is everything. Rivercity understood that immediately. The design they created showcases my portfolio beautifully and the site loads fast on every device.",
    src: "https://assets.aceternity.com/avatars/6.webp",
    designation: "Founder, Nair Photography",
  },
  {
    name: "Carlos Mendoza",
    quote:
      "We run three locations and needed a site that could handle bookings, reviews, and local SEO for each one. Rivercity nailed it. Our phone hasn't stopped ringing since the launch.",
    src: "https://assets.aceternity.com/avatars/5.webp",
    designation: "Owner, Mendoza Auto & Tire",
  },
  {
    name: "Angela Brooks",
    quote:
      "The branding work they did for our nonprofit was exceptional — and they were incredibly mindful of our budget. Our donors have noticed the professionalism and our online donations doubled.",
    src: "https://assets.aceternity.com/avatars/7.webp",
    designation: "Executive Director, Brooks Foundation",
  },
  {
    name: "Tania Okafor",
    quote:
      "I was skeptical about hiring an agency, but Rivercity earned my trust quickly. They explained every decision, hit every deadline, and the final product blew me away. Worth every penny.",
    src: "https://assets.aceternity.com/avatars/8.webp",
    designation: "Founder, Okafor Fitness Studio",
  },
  {
    name: "Lisa Harmon",
    quote:
      "From the initial discovery call to launch day, the communication was top-notch. They really listened. The website they designed for my spa feels luxurious — exactly what I wanted.",
    src: "https://assets.aceternity.com/avatars/9.webp",
    designation: "Owner, Serenity Med Spa",
  },
  {
    name: "Rebecca Vega",
    quote:
      "Our e-commerce sales jumped 60% in the first quarter after our redesign. Rivercity understood conversion-focused design and it shows. Hands down the best investment we've made.",
    src: "https://assets.aceternity.com/avatars/10.webp",
    designation: "Owner, Vega Outdoor Gear",
  },
  {
    name: "Natalie Chu",
    quote:
      "I've worked with two other agencies before and the difference is night and day. Rivercity actually cares about results, not just deliverables. They feel like a true partner in our growth.",
    src: "https://assets.aceternity.com/avatars/11.webp",
    designation: "Marketing Director, Pinnacle Realty Group",
  },
  {
    name: "Madeline Ellison",
    quote:
      "They took our outdated, clunky website and turned it into something modern and fast. Our bounce rate dropped dramatically and patients are booking appointments directly online now. Game changer.",
    src: "https://assets.aceternity.com/avatars/12.webp",
    designation: "Practice Manager, Ellison Dental",
  },
];
