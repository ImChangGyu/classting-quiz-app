import { useQuery } from "@tanstack/react-query";
import { fetchQuizList } from "~/apis/quiz";
import { QuizResponseType } from "~/types/Quiz";

const QuizQueryKeys = {
	quizList: () => ["quiz-list"],
};

export function useFetchQuizList() {
	return useQuery({
		queryKey: QuizQueryKeys.quizList(),
		queryFn: () => fetchQuizList(),
		select(data: QuizResponseType) {
			if (data.response_code === 0) {
				return data.results.map((item) => {
					const answerList = [...item.incorrect_answers, item.correct_answer];
					return {
						...item,
						answer_list: answerList,
					};
				});
			}
			return [];
		},
	});
}
