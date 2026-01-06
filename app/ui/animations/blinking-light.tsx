// BlinkingLight.tsx
"use client";

/**
 * A blinking lime-400 dot with a fading glow, for use as a status/active indicator.
 */
export function BlinkingLight({ className = "", color = "#a3e635" }: { className?: string; color?: string }) {
	// color: default is lime-400 (#a3e635)
	return (
		<span
			className={`inline-block h-2 w-2 rounded-full animate-blink-glow relative before:content-[''] before:absolute before:inset-0 before:rounded-full before:blur-[6px] before:pointer-events-none before:animate-blink-glow-residue ${className}`}
			style={{ backgroundColor: color }}
		>
			<style jsx global>{`
				@keyframes blink-glow {
					0%, 100% {
						opacity: 1;
					}
					50% {
						opacity: 0.25;
					}
				}
				@keyframes blink-glow-residue {
					0%, 100% {
						opacity: 0.5;
					}
					50% {
						opacity: 0.12;
					}
				}
				.animate-blink-glow-residue {
					animation: blink-glow-residue 1.2s infinite cubic-bezier(0.4,0,0.2,1);
				}
				.animate-blink-glow {
					animation: blink-glow 1.2s infinite cubic-bezier(0.4,0,0.2,1);
				}
			`}</style>
			<span
				className="absolute inset-0 rounded-full blur-[6px] pointer-events-none animate-blink-glow-residue"
				style={{ backgroundColor: color, zIndex: 0 }}
			/>
		</span>
	);
}
