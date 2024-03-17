import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { TimerAtom } from "~/atoms";
import { convertSecondsToTime } from "~/utils/fomatter";

export default function Timer() {
	const [timer, setTimer] = useAtom(TimerAtom);
	const onTimer = useCallback(() => {
		return setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 1000);
	}, [setTimer]);
	useEffect(() => {
		let intervalTimer: any;
		intervalTimer = onTimer();

		return () => {
			clearInterval(intervalTimer);
		};
	}, [timer]);

	return <div className="absolute top-2 right-3">{convertSecondsToTime(timer)}</div>;
}
