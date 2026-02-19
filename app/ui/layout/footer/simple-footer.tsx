

import Link from 'next/link';
import Image from 'next/image';

const year = new Date().getFullYear();

export default function SimpleFooter() {
	return (
		<footer className="sim-footer w-full bg-navy-500 py-8 pb-10">
			<div className="w-full flex justify-center">
				<div className="flex flex-row items-center gap-6 mx-4 md:px-4">
					{/* Logo on the left of content */}
					<div className="hidden md:flex items-center flex-shrink-0">
						<Image
							src="/logo-circle-rivercity-creatives-white.png"
							alt="RiverCity Creatives Logo"
							width={48}
							height={48}
							className="w-20 h-20"
						/>
					</div>
					{/* Centered content, left-aligned text */}
					<div className="flex flex-col items-center md:items-start flex-1 gap-4 md:gap-0">
						<p className="text-white text-center md:!text-left mb-3 text-base">
							RiverCity Creatives Copyright {year}. All materials on this website are the property of RiverCity Creatives. All rights reserved.
						</p>
            <div className="md:hidden flex items-center flex-shrink-0 mb-4">
              <Image
                src="/logo-circle-rivercity-creatives-white.png"
                alt="RiverCity Creatives Logo"
                width={48}
                height={48}
                className="w-20 h-20"
              />
            </div>
						<div className="flex gap-3 md:gap-8 items-center justify-center md:!justify-start">
							<Link href="/privacy" className="text-white hover:underline">
								Contact
							</Link>
							<span className="h-5 w-[2px] md:w-1 rounded-full bg-white"></span>
							<Link href="/privacy" className="text-white hover:underline whitespace-nowrap">
								Privacy Policy
							</Link>
							<span className="h-5 w-[2px] md:w-1 rounded-full bg-white"></span>
							<div className="w-full flex justify-center md:w-auto md:inline-flex">
                <Link href="/terms" className="text-white hover:underline whitespace-nowrap">
                  Terms & Conditions
                </Link>
              </div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
