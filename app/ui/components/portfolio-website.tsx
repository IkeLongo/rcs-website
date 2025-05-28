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
        className="relative w-[230px] h-[230px] rounded-[10px] overflow-hidden"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-10 w-[135px] rounded-[10px]">
          <Image
            src={web}
            alt={name}
            width={135}
            height={90}
            className="w-[135px] h-auto object-contain rounded-[4px] border border-white"
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