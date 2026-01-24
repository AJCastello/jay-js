import { cn } from "../../utils/cn";
import type { TRadio } from "./radio.types";

export function Radio({ className, color, size, ...props }: TRadio = {}): HTMLInputElement {
	return (
		<input
			{...(props as any)}
			type="radio"
			className={cn("radio", color, size, className)}
		/>
	) as unknown as HTMLInputElement;
}
