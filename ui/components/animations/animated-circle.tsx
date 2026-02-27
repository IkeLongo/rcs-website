
import { useEffect, useState } from "react";
import { Circle } from "react-circle";
import type { AnimatedCircleProps } from "@/types/seo";

export function AnimatedCircle({ value, progressColor, formatScore }: AnimatedCircleProps) {
	const [circleValue, setCircleValue] = useState(0);

	useEffect(() => {
		if (value === null) {
			setCircleValue(0);
			return;
		}
		setCircleValue(0);
		let current = 0;
		const step = () => {
			if (current < value) {
				current += 1;
				setCircleValue(current);
				setTimeout(step, 10); // Adjust speed as needed
			}
		};
		step();
	}, [value]);

	return (
		<div className="relative flex items-center justify-center my-4">
			<Circle
				progress={value === null ? 0 : circleValue}
				animate={true}
				animationDuration="1s"
				progressColor={progressColor}
				bgColor="#e5e7eb"
				textColor="#091a33"
				textStyle={{ font: 'Maven Pro, sans-serif' }}
				size="100px"
				lineWidth="30px"
				showPercentage={false}
				roundedStroke={true}
			/>
			<span className="absolute !text-3xl font-extrabold !text-navy-700">
				{formatScore(value)}
			</span>
		</div>
	);
}
