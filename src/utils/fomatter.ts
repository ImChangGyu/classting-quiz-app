export function convertSecondsToTime(number: number) {
	const hours = Math.floor(number / 3600);
	const minutes = Math.floor((number % 3600) / 60);
	const seconds = Math.floor(number % 60);

	return [hours, minutes, seconds].map((value) => (value < 10 ? "0" + value : value)).join(":");
}

export function shuffleArray<T>(...array: T[]) {
	return array.sort(() => Math.random() - 0.5);
}

export function sanitize(string: string) {
	const container = document.createElement("div");
	container.innerHTML = string;

	return container.textContent;
}
