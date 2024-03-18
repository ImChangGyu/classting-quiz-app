import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { PropsWithChildren } from "react";

const HydrateAtoms = ({ initialValues, children }: PropsWithChildren<any>) => {
	useHydrateAtoms(initialValues);
	return children;
};

export const AtomProvider = ({ initialValues, children }: PropsWithChildren<any>) => (
	<Provider>
		<HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
	</Provider>
);
