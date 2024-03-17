import AppProvider from "~/providers";
import Router from "~/routers";

export default function App() {
	return (
		<AppProvider>
			<Router />
		</AppProvider>
	);
}
