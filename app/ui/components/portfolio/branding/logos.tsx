import Image from "next/image";

type LogosSectionProps = {
	logos?: string[];
	projectName: string;
  description?: string;
	bgA?: string; // top left & bottom right
	bgB?: string; // top right & bottom left
};

export function LogosSection({ logos = [], projectName, description, bgA, bgB }: LogosSectionProps) {
	// Only show up to 4 logos
	const [a, b, c, d] = logos.slice(0, 4);
	return (
		<div className="overflow-hidden">
      <p 
        className="!text-sm md:!text-base !font-maven-pro !font-normal !text-left !text-neutral-800"
      >
        {description || "A collection of logos representing the project's brand identity."}
      </p>
			<div className="relative mt-4">
				<div className="grid grid-cols-2 grid-rows-2 gap-2">
					{/* Top left */}
				  <div style={{ backgroundColor: bgA }} className="rounded-[10px] flex items-center justify-center aspect-square p-8">
						{a ? (
							<LogoCard
								name={projectName + ' Logo 1'}
								image={a}
							/>
						) : <div className="text-neutral-400 text-center py-8 w-full">No logo</div>}
					</div>
					{/* Top right */}
				  <div style={{ backgroundColor: bgB }} className="rounded-[10px] flex items-center justify-center aspect-square p-8">
						{b ? (
							<LogoCard
								name={projectName + ' Logo 2'}
								image={b}
							/>
						) : <div className="text-neutral-400 text-center py-8 w-full">No logo</div>}
					</div>
					{/* Bottom left */}
				  <div style={{ backgroundColor: bgB }} className="rounded-[10px] flex items-center justify-center aspect-square p-8">
						{c ? (
							<LogoCard
								name={projectName + ' Logo 3'}
								image={c}
							/>
						) : <div className="text-neutral-400 text-center py-8 w-full">No logo</div>}
					</div>
					{/* Bottom right */}
				  <div style={{ backgroundColor: bgA }} className="rounded-[10px] flex items-center justify-center aspect-square p-8">
						{d ? (
							<LogoCard
								name={projectName + ' Logo 4'}
								image={d}
							/>
						) : <div className="text-neutral-400 text-center py-8 w-full">No logo</div>}
					</div>
				</div>
			</div>
		</div>
	);
}

function LogoCard({ name, image }: { name: string; image: string }) {
	return (
		<div className="overflow-hidden w-full shadow-sm">
			<div className="relative w-full aspect-square">
				<Image
					src={image}
					alt={name + " logo"}
					fill
					className="object-contain object-center"
					sizes="200px"
				/>
			</div>
		</div>
	);
}
