import Image from "next/image";

type PortfolioWebsiteProps = {
  bg: string;      // background image src
  web: string;     // web image src
  name: string;
  link?: string;   // website URL
};

export default function PortfolioWebsite({ bg, web, name, link }: PortfolioWebsiteProps) {
  const content = (
    <div className="flex flex-col items-center cursor-pointer">
      <div
        className="relative w-[230px] md:w-[300px] h-[230px] md:h-[300px] rounded-[10px] overflow-hidden"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay to darken the background image */}
        <div className="absolute inset-0 bg-black-500/60 z-0 pointer-events-none" />
        <div className="absolute left-1/2 -translate-x-1/2 w-[135px] md:w-[170px] top-10 md:pt-4 rounded-[10px]">
          <Image
            src={web}
            alt={name}
            width={135}
            height={90}
            loading="eager"
            className="w-full h-auto object-contain rounded-[4px] border border-white"
          />
        </div>
      </div>
      <h4 className="text-navy-500 text-center mt-5 text-md" style={{ marginTop: 20 }}>
        {name}
      </h4>
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="no-underline">
      {content}
    </a>
  ) : (
    content
  );
}