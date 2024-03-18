import "@testing-library/jest-dom/vitest";
import { beforeEach, vitest, expect } from "vitest";
import * as router from "react-router";
import { fireEvent, render, screen } from "@testing-library/react";
import Result from "~/components/Result";

import { IncorrectQuizListAtom, TimerAtom } from "~/atoms";
import { AtomProvider } from "~/__test__/AtomProvider";
import { IncorrectQuizType } from "~/types/Quiz";

interface ResultProviderProps {
	incorrectMockData: IncorrectQuizType[];
}

const hasIncorrectListMockData = [
	{
		quizIndex: 1,
		question: "what is my name",
		correctAnswer: "ImChangGyu",
		myAnswer: "bruno fernandes",
	},
	{
		quizIndex: 3,
		question: "where is the manchester united's hometown",
		correctAnswer: "manchester",
		myAnswer: "london",
	},
];

const ResultProvider = ({ incorrectMockData }: ResultProviderProps) => {
	return (
		<AtomProvider
			initialValues={[
				[IncorrectQuizListAtom, incorrectMockData],
				[TimerAtom, 10],
			]}
		>
			<Result />
		</AtomProvider>
	);
};

const navigate = vitest.fn();

beforeEach(() => {
	vitest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

describe("오답이 존재하는 결과 페이지에 대한 테스트", () => {
	it("총 문제, 정답 개수, 오답 개수, 소요 시간, 정/오답 비율의 차트가 올바르게 보여진다.", () => {
		render(<ResultProvider incorrectMockData={hasIncorrectListMockData} />);
		expect(screen.getByTestId("full-count").textContent).toBe("총 개수: 10개");
		expect(screen.getByTestId("correct-count").textContent).toBe("맞은 개수: 8개");
		expect(screen.getByTestId("incorrect-count").textContent).toBe("틀린 개수: 2개");
		expect(screen.getByTestId("wasted-time").textContent).toBe("소요된 시간: 00:00:10");
		expect(screen.getByTestId("correct-rate").textContent).toBe("정답률: 80%");
	});

	it("오답노트 확인하기 버튼이 보여진다.", () => {
		render(<ResultProvider incorrectMockData={hasIncorrectListMockData} />);
		expect(screen.getByTestId("navigate-wrong-button")).toBeInTheDocument();
	});

	it("오답노트 확인하기 버튼을 눌러 오답노트 페이지로 이동한다.", () => {
		render(<ResultProvider incorrectMockData={hasIncorrectListMockData} />);
		fireEvent.click(screen.getByTestId("navigate-wrong-button"));
		expect(navigate).toHaveBeenCalledWith("/wrong");
	});
});

describe("오답이 존재하지 않는 결과 페이지에 대한 테스트", () => {
	it("총 문제, 정답 개수, 오답 개수, 소요 시간, 정/오답 비율의 차트가 올바르게 보여진다.", () => {
		render(<ResultProvider incorrectMockData={[]} />);
		expect(screen.getByTestId("full-count").textContent).toBe("총 개수: 10개");
		expect(screen.getByTestId("correct-count").textContent).toBe("맞은 개수: 10개");
		expect(screen.getByTestId("incorrect-count").textContent).toBe("틀린 개수: 0개");
		expect(screen.getByTestId("wasted-time").textContent).toBe("소요된 시간: 00:00:10");
		expect(screen.getByTestId("correct-rate").textContent).toBe("정답률: 100%");
	});

	it("메인 버튼이 보여진다.", () => {
		render(<ResultProvider incorrectMockData={[]} />);
		expect(screen.getByTestId("navigate-main-button")).toBeInTheDocument();
	});

	it("메인으로 버튼을 눌러 메인 페이지로 이동한다.", () => {
		render(<ResultProvider incorrectMockData={[]} />);
		fireEvent.click(screen.getByTestId("navigate-main-button"));
		expect(navigate).toHaveBeenCalledWith("/");
	});
});
