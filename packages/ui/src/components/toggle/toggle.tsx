import { cn } from "../../utils";
import type { TToggle } from "./toggle.types";

export function Toggle({ label, color, size, position = "toggle-after", formControl, ...props }: TToggle = {}):
	| HTMLDivElement
	| HTMLInputElement {
	const className = cn("toggle", color, size, props.className);

	const toggleElement = (
		<input
			{...(props as any)}
			type="checkbox"
			className={className}
		/>
	) as unknown as HTMLInputElement;

	if (!label) {
		return toggleElement;
	}

	const { className: formControlClassName, children: _children, ...formControlProps } = (formControl ?? {}) as any;

	return (
		<div {...(formControlProps as any)} className={cn("form-control", formControlClassName)}>
			<label className="label cursor-pointer justify-start gap-2">
				{position === "toggle-before" ? (
					<>
						<span className="label-text">{label}</span>
						{toggleElement}
					</>
				) : (
					<>
						{toggleElement}
						<span className="label-text">{label}</span>
					</>
				)}
			</label>
		</div>
	) as unknown as HTMLDivElement;
}
