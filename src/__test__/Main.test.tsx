import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import * as router from "react-router";
import MainPage from "~/pages/Main";
import { expect, vitest } from "vitest";

const navigate = vitest.fn();

beforeEach(() => {
	vitest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

describe("메인 페이지에 대한 테스트", () => {
	it("사용자가 퀴즈 풀기 버튼을 클릭해 퀴즈 페이지로 이동한다.", () => {
		render(<MainPage />);
		fireEvent.click(screen.getByTestId("quiz-button"));
		expect(navigate).toHaveBeenCalledWith("/quiz");
	});
});
