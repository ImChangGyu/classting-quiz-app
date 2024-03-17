import { API } from "~/apis/API";
import { QUIZ_LENGTH } from "~/constants/state";

export async function fetchQuizList() {
	const { data } = await API.get(
		`?amount=${QUIZ_LENGTH}&category=21&difficulty=easy&type=multiple`
	);
	return data;
}
