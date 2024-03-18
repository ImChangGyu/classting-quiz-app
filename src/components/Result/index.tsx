import { useNavigate } from "react-router";
import Button from "~/components/Button";
import ProgressBar from "~/components/ProgressBar";
import { QUIZ_LENGTH } from "~/constants/state";
import { useResult } from "~/services/Quiz";
import { convertSecondsToTime } from "~/utils/fomatter";

export default function Result() {
	const navigate = useNavigate();
	const { incorrectCount, timer } = useResult();
	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-20">
			<div className="flex gap-20 justify-center items-center">
				<div className="flex flex-col gap-4">
					<div data-testid="full-count">총 개수: {QUIZ_LENGTH}개</div>
					<span data-testid="correct-count">
						맞은 개수: {QUIZ_LENGTH - incorrectCount}개
					</span>
					<span data-testid="incorrect-count">틀린 개수: {incorrectCount}개</span>
				</div>
				<div className="flex flex-col gap-4">
					<span data-testid="wasted-time">
						소요된 시간: {convertSecondsToTime(timer)}
					</span>
					<div data-testid="correct-rate">
						정답률: {((QUIZ_LENGTH - incorrectCount) / QUIZ_LENGTH) * 100}%
						<ProgressBar
							totalNumber={QUIZ_LENGTH}
							number={QUIZ_LENGTH - incorrectCount}
						/>
					</div>
				</div>
			</div>
			{incorrectCount !== 0 ? (
				<Button onClick={() => navigate("/wrong")} data-testid="navigate-wrong-button">
					오답노트 확인하기
				</Button>
			) : (
				<Button onClick={() => navigate("/")} data-testid="navigate-main-button">
					메인으로
				</Button>
			)}
		</div>
	);
}
