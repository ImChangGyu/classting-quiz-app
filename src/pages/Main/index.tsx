import { useSetAtom } from "jotai";
import { useNavigate } from "react-router";
import { IncorrectQuizListAtom } from "~/atoms";
import Button from "~/components/Button";

export default function MainPage() {
	const setIncorrectQuizList = useSetAtom(IncorrectQuizListAtom);
	const navigate = useNavigate();

	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-8">
			<h1 className="text-[36px]">클래스팅 퀴즈 앱</h1>
			<Button
				onClick={() => {
					setIncorrectQuizList([]);
					localStorage.clear();
					navigate("/quiz");
				}}
			>
				퀴즈 풀기
			</Button>
		</div>
	);
}
