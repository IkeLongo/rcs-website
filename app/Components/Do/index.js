import Image from 'next/image';

export default function Do({ icon, title, description }) {
	return (
		<div className="min-w-[233px] p-6 flex flex-col justify-between gap-4 items-stretch rounded-[14px] border border-gray-500 bg-do-custom-gradient">
			<div className='flex flex-col items-center'>
				<Image 
					src={icon}
					alt="Icon"
					width={60.25}
					height={60.25}
					className=""
				/>
				<h3 className="font-gentium-book-plus text-white text-[18px] font-bold text-center">{title}</h3>
			</div>
			<p className="font-avenir text-center text-[14px] flex-grow">
				{description}
			</p>
			<div className='flex justify-center gap-1'>
				<p className='font-avenir uppercase text-[14px]'>
					Learn More
				</p>
				<Image 
					src="/arrow-circle-right.svg"
					alt="Right arrow"
					width={16.87}
					height={16.87}
					className=""
				/>
			</div>
		</div>
	);
}