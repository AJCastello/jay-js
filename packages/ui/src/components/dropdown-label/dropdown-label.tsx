import type { TDropdownLabel } from "./dropdown-label.types";

export function DropdownLabel({ className, children, ...props }: TDropdownLabel = {}): HTMLElementTagNameMap["button"] {
	return (
		<button {...(props as any)} type="button" className={className}>
			{children}
		</button>
	) as unknown as HTMLElementTagNameMap["button"];
}
