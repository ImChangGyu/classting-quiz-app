import { atomWithStorage } from "jotai/utils";
import { IncorrectQuizType } from "~/types/Quiz";

export const TimerAtom = atomWithStorage("finishedTime", 0);

export const IncorrectQuizListAtom = atomWithStorage<IncorrectQuizType[]>("incorrectQuiz", []);
