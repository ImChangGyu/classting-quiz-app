import { useState, useEffect } from "react";
import { useFetchQuizList } from "~/queries/Quiz";
import { IncorrectQuizType, QuizType } from "~/types/Quiz";
import { useNavigate } from "react-router";
import { shuffleArray } from "~/utils/fomatter";
import { useAtomValue, useSetAtom } from "jotai";
import { IncorrectQuizListAtom, TimerAtom } from "~/atoms";

export function useQuiz() {
	const navigate = useNavigate();

	const { data: quizList, isLoading, isError } = useFetchQuizList();

	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentQuiz, setCurrentQuiz] = useState({} as QuizType);
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const setIncorrectQuizList = useSetAtom(IncorrectQuizListAtom);

	function onAnswer(selectedValue: string) {
		setSelectedAnswer(selectedValue);
		if (selectedValue !== currentQuiz.correct_answer) {
			setIncorrectQuizList((prev) => [
				...prev,
				{
					quizIndex: currentIndex + 1,
					question: currentQuiz.question,
					correctAnswer: currentQuiz.correct_answer,
					myAnswer: selectedValue,
				},
			]);
		}
	}

	function onReturnMain() {
		navigate("/");
	}

	function onNextQuiz() {
		setSelectedAnswer("");
		setCurrentIndex((prev) => prev + 1);
	}
	function onResult() {
		navigate("/result");
	}

	function onPreventUnload(event: BeforeUnloadEvent) {
		event.preventDefault();
		event.returnValue = "";
	}

	useEffect(() => {
		if (!quizList) return;
		const quiz = quizList[currentIndex];
		setCurrentQuiz({ ...quiz, answer_list: shuffleArray(...quiz.answer_list) });
	}, [currentIndex, quizList]);

	return {
		currentQuiz,
		currentIndex,
		selectedAnswer,
		isLoading,
		isError,
		onNextQuiz,
		onReturnMain,
		onResult,
		onAnswer,
		onPreventUnload,
	};
}

export function useResult() {
	const incorrectQuizList = useAtomValue(IncorrectQuizListAtom);
	const timer = useAtomValue(TimerAtom);

	return { incorrectCount: incorrectQuizList.length, timer };
}

export function useIncorrectQuiz() {
	const navigate = useNavigate();

	const incorrectQuizList = useAtomValue(IncorrectQuizListAtom);
	const [currentIncorrectQuiz, setCurrentIncorrectQuiz] = useState<IncorrectQuizType>(
		{} as IncorrectQuizType
	);
	const [currentIndex, setCurrentIndex] = useState(0);

	function onNextIncorrectQuiz() {
		setCurrentIndex((prev) => prev + 1);
	}

	function onReturnMain() {
		navigate("/");
	}

	useEffect(() => {
		setCurrentIncorrectQuiz(incorrectQuizList[currentIndex]);
	}, [incorrectQuizList, currentIndex]);

	return {
		currentIncorrectQuiz,
		incorrectQuizCount: incorrectQuizList.length,
		currentIndex,
		onNextIncorrectQuiz,
		onReturnMain,
	};
}
