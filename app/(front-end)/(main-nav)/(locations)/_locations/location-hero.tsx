import Link from "next/link";
import { BlinkingLight } from "@/ui/animations/blinking-light";
// import FadeInUp from "@/app/ui/components/fade-in-up";
import MitsurinHeroVideo from "@/ui/video/autoplay";
import type { LocationPageConfig } from "./locations.data";

export default function LocationHero({ page }: { page: LocationPageConfig }) {
	return (
		<section className="locations relative w-full overflow-hidden bg-gradient-to-br from-navy-500 via-navy-600 to-navy-700 text-white">
			{/* Noise overlay */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
				style={{ backgroundImage: "url('/noise.png')" }}
			/>

			{/* Spotlight glows */}
			<div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-lime-500/20 blur-[120px]" />
			<div aria-hidden className="pointer-events-none absolute bottom-[-140px] right-[-140px] h-[520px] w-[520px] rounded-full bg-babyblue-300/20 blur-[140px]" />

			<div className="relative mx-auto max-w-6xl px-6 pt-40 pb-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					{/* Left */}
					<div>
						{/* <FadeInUp> */}
							<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/10 backdrop-blur text-sm font-medium">
								<BlinkingLight />
								Serving {page.areaLabel ?? `${page.city}, ${page.state}`}
							</span>
						{/* </FadeInUp> */}

						{/* <FadeInUp> */}
							<h1 className="mt-6 text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
								{page.heroTitle}{" — "}
								<span className="relative inline-block">
									<span className="absolute inset-x-0 -bottom-1 h-3 bg-lime-500/25 blur-[6px]" />
									<span className="relative text-lime-200">Built to Convert</span>
								</span>
							</h1>
						{/* </FadeInUp> */}

						{/* <FadeInUp> */}
							<p className="mt-5 text-md text-alice-blue-100 leading-relaxed max-w-2xl">
								{page.heroSubtitle}
							</p>
						{/* </FadeInUp> */}

					{/* <FadeInUp className="hidden lg:block"> */}
						<div className="mt-8 flex flex-col sm:flex-row gap-4 hidden lg:block">
								<Link
									href="/booking"
									className="inline-flex items-center justify-center py-4 px-6 bg-lime-500 text-navy-500 rounded-xl font-bold text-md
										hover:bg-lime-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
								>
									Book a Free Discovery Call
									<svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</Link>
							</div>
						{/* </FadeInUp> */}
					</div>

					{/* Right: Preview + floating testimonials */}
					<div className="mt-4 lg:mt-0">
						{/* <FadeInUp> */}
							<div 
								className="relative w-full flex flex-col items-center"
								style={{ isolation: "isolate" }}
							>
								{/* Preview layer with video */}
								<div className="relative w-full flex flex-col items-center max-w-3xl w-full">
									<div className="relative z-20 overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur shadow-2xl transition-shadow duration-300 hover:shadow-[0_0_32px_8px_rgba(80,180,255,0.4)] w-full">
										{/* Browser chrome bar */}
										<div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
											<div className="flex items-center gap-2">
												<span className="h-3 w-3 rounded-full bg-white/20" />
												<span className="h-3 w-3 rounded-full bg-white/20" />
												<span className="h-3 w-3 rounded-full bg-white/20" />
											</div>
											<div className="text-xs text-white/70">
												Recent build • {`${page.city}, ${page.state}`}
											</div>
										</div>
										{/* Video content */}
										<div className="relative">
											<MitsurinHeroVideo />
											<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-700/50 via-transparent to-transparent" />
										</div>
									</div>
									{/* CTA button below video for mobile/tablet */}
									<div className="block lg:hidden mt-6 w-full">
										<Link
											href="/booking"
											className="inline-flex items-center justify-center w-full py-4 px-6 bg-lime-500 text-navy-500 rounded-xl font-bold text-md hover:bg-lime-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
										>
											Book a Free Discovery Call
											<svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
											</svg>
										</Link>
									</div>
								</div>
								{/* Decorative glow */}
								<div aria-hidden className="pointer-events-none absolute -z-10 inset-0">
									<div className="absolute -top-12 right-12 h-48 w-48 rounded-full bg-lime-500/15 blur-[80px]" />
									<div className="absolute bottom-0 left-8 h-56 w-56 rounded-full bg-babyblue-300/15 blur-[100px]" />
								</div>
							</div>
						{/* </FadeInUp> */}
					</div>
				</div>
			</div>
		</section>
	);
}
