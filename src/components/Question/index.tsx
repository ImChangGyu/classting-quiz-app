import { sanitize } from "~/utils/fomatter";

interface QuestionProps {
	questionIndex: number;
	question: string;
}

export default function Question({ questionIndex, question }: QuestionProps) {
	return (
		<h1
			className="w-full h-1/4 flex justify-center items-center text-2xl font-semibold"
			data-testid="question"
		>
			{questionIndex}. {sanitize(question)}
		</h1>
	);
}
