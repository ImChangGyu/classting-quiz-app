import { useEffect } from "react";
import Button from "~/components/Button";
import Question from "~/components/Question";
import QuizList from "~/components/QuizList";
import Timer from "~/components/Timer";
import { QUIZ_LENGTH } from "~/constants/state";
import { useQuiz } from "~/services/Quiz";
import { isObjectNull } from "~/utils/object";

export default function Quiz() {
	const {
		currentQuiz,
		currentIndex,
		isLoading,
		isError,
		onNextQuiz,
		onReturnMain,
		selectedAnswer,
		onResult,
		onAnswer,
		onPreventUnload,
	} = useQuiz();

	useEffect(() => {
		window.addEventListener("beforeunload", onPreventUnload);
		return () => window.removeEventListener("beforeunload", onPreventUnload);
	}, []);

	if (isError)
		return (
			<div className="w-full h-full flex flex-col justify-center items-center gap-8">
				<span>일시적인 에러가 있습니다.</span>
				<Button onClick={onReturnMain}>홈으로</Button>
			</div>
		);
	if (isLoading || isObjectNull(currentQuiz))
		return <div className="w-full h-full flex justify-center items-center">로딩중...</div>;
	return (
		<div className="w-full h-full">
			<Question questionIndex={currentIndex + 1} question={currentQuiz.question} />
			<QuizList quiz={currentQuiz} onAnswer={onAnswer} selectedAnswer={selectedAnswer} />
			<div className="w-full h-[15%] flex justify-center items-center">
				{currentIndex + 1 < QUIZ_LENGTH ? (
					<Button
						onClick={onNextQuiz}
						disabled={selectedAnswer === ""}
						data-testid="next-button"
					>
						다음 문제
					</Button>
				) : (
					<Button
						onClick={onResult}
						disabled={selectedAnswer === ""}
						data-testid="result-button"
					>
						결과 보기
					</Button>
				)}
			</div>
			<Timer />
		</div>
	);
}
