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
					<div>총 개수: {QUIZ_LENGTH}개</div>
					<span>맞은 개수: {QUIZ_LENGTH - incorrectCount}</span>
					<span>틀린 개수: {incorrectCount}</span>
				</div>
				<div className="flex flex-col gap-4">
					<span>소요된 시간: {convertSecondsToTime(timer)}</span>
					<div>
						정답률: {((QUIZ_LENGTH - incorrectCount) / QUIZ_LENGTH) * 100}%
						<ProgressBar
							totalNumber={QUIZ_LENGTH}
							number={QUIZ_LENGTH - incorrectCount}
						/>
					</div>
				</div>
			</div>
			{incorrectCount !== 0 ? (
				<Button onClick={() => navigate("/wrong")}>오답노트 확인하기</Button>
			) : (
				<Button onClick={() => navigate("/")}>메인으로</Button>
			)}
		</div>
	);
}
