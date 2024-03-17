import { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	disabled?: boolean;
}

export default function Button({ children, disabled, ...rest }: ButtonProps) {
	return (
		<button
			className="w-fit h-12 px-[14px] rounded-lg bg-green text-white disabled:bg-gray-400"
			{...rest}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
