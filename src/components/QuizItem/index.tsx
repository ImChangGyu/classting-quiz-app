import { cn } from "~/utils/cn";
import { sanitize } from "~/utils/fomatter";

interface QuizItemProps {
	answer: string;
	isAnswer?: boolean;
	isWrong?: boolean;
	onClick?: (selectedValue: string) => void;
	disabled?: boolean;
	dataTestId?: string;
}

export default function QuizItem({
	answer,
	isAnswer,
	isWrong,
	onClick,
	disabled,
	dataTestId,
}: QuizItemProps) {
	return (
		<button
			className={cn(
				"w-full h-full rounded-lg bg-white flex justify-center items-center shadow-spread",
				isAnswer && "text-white bg-green",
				isWrong && "text-white bg-error"
			)}
			onClick={() => onClick && onClick(answer)}
			disabled={disabled}
			data-testid={dataTestId}
		>
			{sanitize(answer)}
		</button>
	);
}
