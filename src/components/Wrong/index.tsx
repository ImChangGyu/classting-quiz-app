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
	console.log(currentIncorrectQuiz);
	return (
		<div className="w-full h-full flex flex-col">
			<Question
				questionIndex={currentIncorrectQuiz.quizIndex}
				question={currentIncorrectQuiz?.question}
			/>
			<div className="w-full h-2/5 flex p-4 gap-4">
				<div className="w-[50%] h-[392px]">
					<p>내가 선택한 답</p>
					<QuizItem answer={currentIncorrectQuiz?.myAnswer} isWrong disabled />
				</div>
				<div className="w-[50%] h-[392px]">
					<p>정답</p>
					<QuizItem answer={currentIncorrectQuiz?.correctAnswer} isAnswer disabled />
				</div>
			</div>
			<div className="w-full h-[30%] flex justify-center items-center">
				{currentIndex + 1 < incorrectQuizCount ? (
					<Button onClick={onNextIncorrectQuiz}>다음 오답</Button>
				) : (
					<Button onClick={onReturnMain}>메인으로</Button>
				)}
			</div>
		</div>
	);
}
