import { cn } from "../../utils/cn";
import type { TRadialProgress } from "./radial-progress.types";

export function RadialProgress({
	value = 0,
	size,
	thickness,
	className,
	onmount,
	children,
	...props
}: TRadialProgress = {}) {
	const mergedClassName = cn("radial-progress", className);

	return (
		<div
			{...props}
			className={mergedClassName}
			role="progressbar"
			onmount={(element) => {
				const currentStyle = element.getAttribute("style") ?? "";
				let styleWithVars = currentStyle;

				if (value) {
					styleWithVars = `${styleWithVars} --value: ${value};`;
				}
				if (size) {
					styleWithVars = `${styleWithVars} --size: ${size};`;
				}
				if (thickness) {
					styleWithVars = `${styleWithVars} --thickness: ${thickness};`;
				}

				element.setAttribute("style", styleWithVars);
				return onmount?.(element);
			}}
		>
			{children}
		</div>
	);
}
