import { cn } from "~/utils/cn";

interface ProgressBarProps {
	totalNumber: number;
	number: number;
}

export default function ProgressBar({ totalNumber, number }: ProgressBarProps) {
	return (
		<div className="relative w-[240px] h-[30px] overflow-hidden bg-gray-400 rounded-lg">
			<div
				className={cn(`h-full absolute top-0 left-0 bg-green`)}
				style={{ width: `${(number / totalNumber) * 100}%` }}
			/>
		</div>
	);
}
