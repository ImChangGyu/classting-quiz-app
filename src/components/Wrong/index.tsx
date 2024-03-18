import Button from "~/components/Button";
import Question from "~/components/Question";
import QuizItem from "~/components/QuizItem";
import { useIncorrectQuiz } from "~/services/Quiz";

export default function Wrong() {
	const {
		currentIncorrectQuiz,
		currentIndex,
		incorrectQuizCount,
		onNextIncorrectQuiz,
		onReturnMain,
	} = useIncorrectQuiz();

	return (
		<div className="w-full h-full flex flex-col">
			<Question
				questionIndex={currentIncorrectQuiz.quizIndex}
				question={currentIncorrectQuiz?.question}
			/>
			<div className="w-full h-2/5 flex p-4 gap-4">
				<div className="w-[50%] h-[392px]">
					<p>내가 선택한 답</p>
					<QuizItem
						answer={currentIncorrectQuiz?.myAnswer}
						isWrong
						disabled
						dataTestId="my-answer"
					/>
				</div>
				<div className="w-[50%] h-[392px]">
					<p>정답</p>
					<QuizItem
						answer={currentIncorrectQuiz?.correctAnswer}
						isAnswer
						disabled
						dataTestId="correct-answer"
					/>
				</div>
			</div>
			<div className="w-full h-[30%] flex justify-center items-center">
				{currentIndex + 1 < incorrectQuizCount ? (
					<Button onClick={onNextIncorrectQuiz} data-testid="next-incorrect-button">
						다음 오답
					</Button>
				) : (
					<Button onClick={onReturnMain} data-testid="navigate-main-button">
						메인으로
					</Button>
				)}
			</div>
		</div>
	);
}
