import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "~/pages/Main";
import QuizPage from "~/pages/Quiz";
import ResultPage from "~/pages/Result";
import WrongPage from "~/pages/Wrong";

const routers = createBrowserRouter([
	{ path: "", element: <MainPage /> },
	{ path: "quiz", element: <QuizPage /> },
	{ path: "result", element: <ResultPage /> },
	{ path: "wrong", element: <WrongPage /> },
]);

export default function Router() {
	return <RouterProvider router={routers} />;
}
