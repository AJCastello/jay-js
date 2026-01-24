import { cn } from "../../utils";
import type { TToggle } from "./toggle.types";

export function Toggle({
	label,
	color,
	size,
	position = "toggle-after",
	formControl,
	...props
}: TToggle = {}): HTMLDivElement | HTMLInputElement {
	const className = cn("toggle", color, size, props.className);
	const toggleId = (props as any).id ?? (props as any).name ?? `jay-ui-toggle-${Math.random().toString(36).slice(2)}`;

	const toggleElement = (
		<input {...(props as any)} type="checkbox" className={className} />
	) as unknown as HTMLInputElement;

	toggleElement.id = toggleId;

	if (!label) {
		return toggleElement;
	}

	const { className: formControlClassName, children: _children, ...formControlProps } = (formControl ?? {}) as any;

	return (
		<div {...(formControlProps as any)} className={cn("form-control", formControlClassName)}>
			<label htmlFor={toggleId} className="label cursor-pointer justify-start gap-2">
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
