import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface AppProviderProps {
	children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false, refetchOnWindowFocus: false },
			mutations: { retry: false },
		},
	});
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
