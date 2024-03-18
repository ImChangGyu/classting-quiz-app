import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: false, refetchOnWindowFocus: false },
		mutations: { retry: false },
	},
});

interface OptionProps {
	initialEntries: `/${string}`;
}

export const Wrapper = ({ children }: PropsWithChildren, Option: OptionProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<MemoryRouter initialEntries={[Option.initialEntries ?? "/"]}>{children}</MemoryRouter>
		</QueryClientProvider>
	);
};
