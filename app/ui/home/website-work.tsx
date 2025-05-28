import PortfolioWebsite from "../components/portfolio-website";

const portfolioItems = [
  {
    bg: "/portfolio-countdownfantasy-bg.webp",
    web: "/portfolio-countdownfantasy-web.webp",
    name: "Countdown Fantasy Sports",
    link: "https://countdownfantasy.com",
  },
  {
    bg: "/portfolio-maximstrong-bg.webp",
    web: "/portfolio-maximstrong-web.webp",
    name: "Maximstrong",
    link: "https://maximstrong.com",
  },
  {
    bg: "/portfolio-bobbielynn-bg.webp",
    web: "/portfolio-bobbielynn-web.webp",
    name: "Bobbie Lynn Designs",
    link: "https://bobbielynndesigns.com",
  },
];

export default function WebsiteWork() {
  return (
    <div className="flex gap-8 w-full max-w-full overflow-x-auto px-6 pb-8">
      {portfolioItems.map((item, idx) => (
        <PortfolioWebsite key={idx} {...item} />
      ))}
    </div>
  );
}