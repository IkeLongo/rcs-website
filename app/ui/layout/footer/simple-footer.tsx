
import Link from 'next/link';

const year = new Date().getFullYear();

export default function SimpleFooter() {
	return (
		<footer className="w-full bg-navy-500 py-6 flex flex-col justify-center items-center">
			<p className="text-white text-center mb-3 text-base">
				RiverCity Creatives Copyright {year}. All materials on this website are the property of RiverCity Creatives. All rights reserved.
			</p>
			<div className="flex gap-8">
				<Link href="/privacy" className="text-white hover:underline">
					Cookie &amp; Privacy Policy
				</Link>
				<Link href="/terms" className="text-white hover:underline">
					Terms &amp; Conditions
				</Link>
			</div>
		</footer>
	);
}
