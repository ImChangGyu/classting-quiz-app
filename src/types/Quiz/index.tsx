export interface QuizType {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	answer_list: string[];
	question: string;
	type: string;
}

export interface QuizResponseType {
	response_code: number;
	results: QuizType[];
}

export interface IncorrectQuizType {
	quizIndex: number;
	question: string;
	correctAnswer: string;
	myAnswer: string;
}
