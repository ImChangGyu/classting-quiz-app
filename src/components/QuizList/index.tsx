import QuizItem from "~/components/QuizItem";
import { QuizType } from "~/types/Quiz";

interface QuizListProps {
	quiz: QuizType;
	onAnswer: (selectedValue: string) => void;
	selectedAnswer: string;
}

export default function QuizList({ quiz, onAnswer, selectedAnswer }: QuizListProps) {
	return (
		<div className="w-screen h-3/5 p-4 gap-4 grid grid-cols-2">
			{quiz.answer_list.map((answer, index) => (
				<QuizItem
					key={`quiz-${index}`}
					answer={answer}
					onClick={onAnswer}
					isAnswer={selectedAnswer !== "" && quiz.correct_answer === answer}
					isWrong={
						answer === selectedAnswer && quiz.incorrect_answers.includes(selectedAnswer)
					}
					disabled={selectedAnswer !== ""}
				/>
			))}
		</div>
	);
}
