import Image from 'next/image';

export default function Do({ icon, title, description }) {
	return (
		<div>
			<div className="w-[233px] p-6 flex flex-col justify-center gap-4 items-stretch rounded-[14px] border border-gray-500 bg-do-custom-gradient">
				<div className='flex flex-col items-center'>
					<Image 
						src={icon}
						alt="Icon"
						width={60.25}
						height={60.25}
						className=""
					/>
					<h3 className="font-gentium-book-plus text-white text-[16px] font-bold text-center">{title}</h3>
				</div>
				<p className="font-harmattan text-center text-[16px]">
        	{description}
      	</p>
				<div className='flex justify-center gap-1'>
					<p className='font-harmattan uppercase text-[14px]'>
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
		</div>
	);
}