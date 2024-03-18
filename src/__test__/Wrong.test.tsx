import "@testing-library/jest-dom";
import { vitest, expect } from "vitest";
import * as router from "react-router";
import Wrong from "~/components/Wrong";
import { IncorrectQuizType } from "~/types/Quiz";
import { AtomProvider } from "~/__test__/AtomProvider";
import { IncorrectQuizListAtom } from "~/atoms";
import { fireEvent, render, screen } from "@testing-library/react";

const incorrectListMockData = [
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

interface WrongProviderProps {
	incorrectMockData: IncorrectQuizType[];
}

const WrongProvider = ({ incorrectMockData }: WrongProviderProps) => {
	return (
		<AtomProvider initialValues={[[IncorrectQuizListAtom, incorrectMockData]]}>
			<Wrong />
		</AtomProvider>
	);
};

const navigate = vitest.fn();

beforeEach(() => {
	vitest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

describe("오답 노트페이지에 대한 테스트", () => {
	it("문제에 대한 정보와 내가 선택한 답과 정답을 확인할 수 있다.", () => {
		render(<WrongProvider incorrectMockData={incorrectListMockData} />);
		expect(screen.getByTestId("question")).toBeInTheDocument();
		expect(screen.getByTestId("my-answer")).toBeInTheDocument();
		expect(screen.getByTestId("correct-answer")).toBeInTheDocument();
	});
	it("모든 오답을 확인하면 메인으로 버튼을 확인할 수 있다.", () => {
		render(<WrongProvider incorrectMockData={incorrectListMockData} />);
		for (let index = 0; index < incorrectListMockData.length - 1; index++) {
			fireEvent.click(screen.getByTestId("next-incorrect-button"));
		}
		expect(screen.getByTestId("navigate-main-button")).toBeInTheDocument();
	});
	it("메인으로 버튼을 클릭하면 메인페이지로 이동할 수 있다", () => {
		render(<WrongProvider incorrectMockData={incorrectListMockData} />);
		for (let index = 0; index < incorrectListMockData.length - 1; index++) {
			fireEvent.click(screen.getByTestId("next-incorrect-button"));
		}
		fireEvent.click(screen.getByTestId("navigate-main-button"));
		expect(navigate).toHaveBeenCalledWith("/");
	});
});
