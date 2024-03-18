import "@testing-library/jest-dom";
import { fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import * as router from "react-router";
import { Wrapper } from "~/__test__/Wrapper";
import { vitest, expect } from "vitest";
import Quiz from "~/components/Quiz";
import { useQuery } from "@tanstack/react-query";
import { QuizResponseType, QuizType } from "~/types/Quiz";
import { fetchQuizList } from "~/apis/quiz";
import { QUIZ_LENGTH } from "~/constants/state";

const quizListMockData = {
	response_code: 0,
	results: [
		{
			type: "multiple",
			difficulty: "easy",
			category: "Sports",
			question: "Which team has won the most Stanley Cups in the NHL?",
			correct_answer: "Montreal Canadians",
			incorrect_answers: ["Chicago Blackhawks", "Toronto Maple Leafs", "Detroit Red Wings"],
			answer_list: [
				"Montreal Canadians",
				"Chicago Blackhawks",
				"Toronto Maple Leafs",
				"Detroit Red Wings",
			],
		},
		{
			type: "multiple",
			difficulty: "easy",
			category: "Sports",
			question: "&quot;Stadium of Light&quot; is the home stadium for which soccer team?",
			correct_answer: "Sunderland FC",
			incorrect_answers: ["Barcelona FC", "Paris Saints-Germain", "Manchester United"],
			answer_list: [
				"Sunderland FC",
				"Barcelona FC",
				"Paris Saints-Germain",
				"Manchester United",
			],
		},
		{
			type: "multiple",
			difficulty: "easy",
			category: "Sports",
			question: "Which team won 2014 FIFA World Cup in Brazil?",
			correct_answer: "Germany",
			incorrect_answers: ["Argentina", "Brazil", "Netherlands"],
			answer_list: ["Germany", "Argentina", "Brazil", "Netherlands"],
		},
		{
			type: "multiple",
			difficulty: "easy",
			category: "Sports",
			question: "What is the name of Manchester United&#039;s home stadium?",
			correct_answer: "Old Trafford",
			incorrect_answers: ["Anfield", "City of Manchester Stadium", "St James Park"],
			answer_list: ["Old Trafford", "Anfield", "City of Manchester Stadium", "St James Park"],
		},
		{
			type: "multiple",
			difficulty: "easy",
			category: "Sports",
			question: "Who did Steven Gerrard win the Champions League with?",
			correct_answer: "Liverpool",
			incorrect_answers: ["Real Madrid", "Chelsea", "Man City"],
			answer_list: ["Liverpool", "Real Madrid", "Chelsea", "Man City"],
		},
		{
			type: "multiple",
			difficulty: "easy",
			category: "Sports",
			question: "Which English football club has the nickname &#039;The Foxes&#039;?",
			correct_answer: "Leicester City",
			incorrect_answers: ["Northampton Town", "Bradford City", "West Bromwich Albion"],
			answer_list: [
				"Leicester City",
				"Northampton Town",
				"Bradford City",
				"West Bromwich Albion",
			],
		},
		{
			type: "multiple",
			difficulty: "easy",
			category: "Sports",
			question: "Which country hosted the 2022 FIFA World Cup?",
			correct_answer: "Qatar",
			incorrect_answers: ["USA", "Japan", "Switzerland"],
			answer_list: ["Qatar", "USA", "Japan", "Switzerland"],
		},
		{
			type: "multiple",
			difficulty: "easy",
			category: "Sports",
			question: "What is the most common type of pitch thrown by pitchers in baseball?",
			correct_answer: "Fastball",
			incorrect_answers: ["Slowball", "Screwball", "Palmball"],
			answer_list: ["Fastball", "Slowball", "Screwball", "Palmball"],
		},
		{
			type: "multiple",
			difficulty: "easy",
			category: "Sports",
			question: "Who won the 2016 Formula 1 World Driver&#039;s Championship?",
			correct_answer: "Nico Rosberg",
			incorrect_answers: ["Lewis Hamilton", "Max Verstappen", "Kimi Raikkonen"],
			answer_list: ["Nico Rosberg", "Lewis Hamilton", "Max Verstappen", "Kimi Raikkonen"],
		},
		{
			type: "multiple",
			difficulty: "easy",
			category: "Sports",
			question:
				"What was the final score of the Germany vs. Brazil 2014 FIFA World Cup match?",
			correct_answer: "7 - 1",
			incorrect_answers: ["0 - 1", "3 - 4", "16 - 0"],
			answer_list: ["7 - 1", "0 - 1", "3 - 4", "16 - 0"],
		},
	],
};

const mockedFetchQuizList = async () => {
	const { result } = renderHook(
		() =>
			useQuery<QuizResponseType, Error, QuizType[]>({
				queryKey: ["quiz-list"],
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
				initialData: quizListMockData,
			}),
		{ wrapper: Wrapper }
	);

	try {
		await waitFor(() => {
			return result.current.isSuccess;
		}, {});
	} catch (error) {
		console.log(error);
		throw new Error("문제가 생겨 데이터를 불러올 수 없습니다.");
	}

	return result.current.data;
};

const navigate = vitest.fn();

const onSelectFlow = () => {
	for (let index = 0; index < QUIZ_LENGTH; index++) {
		fireEvent.click(screen.getByTestId("select-answer"));
		if (index < QUIZ_LENGTH - 1) {
			fireEvent.click(screen.getByTestId("next-button"));
		}
	}
};

beforeEach(() => {
	vitest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

describe("퀴즈 페이지에 대한 테스트", () => {
	it("사용자는 4개의 정답 리스트 중 한개를 고를 수 있다.", async () => {
		const data = await mockedFetchQuizList();
		render(<Quiz />, { wrapper: Wrapper });

		data.map((item) => expect(item.answer_list.length).toBe(4));

		fireEvent.click(screen.getByTestId("select-answer"));
		expect(screen.getByTestId("next-button")).not.toBeDisabled();
	});
	it("사용자는 정답을 모두 선택한 후 결과 보기 버튼을 확인할 수 있다.", async () => {
		await mockedFetchQuizList();
		render(<Quiz />, { wrapper: Wrapper });
		onSelectFlow();
		expect(screen.getByTestId("result-button")).toBeInTheDocument();
	});
	it("사용자는 결과 보기 버튼을 눌러 결과 페이지로 이동할 수 있다.", async () => {
		await mockedFetchQuizList();
		render(<Quiz />, { wrapper: Wrapper });
		onSelectFlow();
		fireEvent.click(screen.getByTestId("result-button"));
		await waitFor(() => expect(navigate).toHaveBeenCalledWith("/result"));
	});
});
