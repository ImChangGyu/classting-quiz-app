/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundColor: {
				green: "rgb(0, 200, 150)",
				error: "#f44",
			},
			boxShadow: {
				spread: "0px 0px 15px rgba(0,0,0,0.2)",
			},
			colors: {
				green: "rgb(0, 200, 150)",
			},
		},
	},
	plugins: [],
};
