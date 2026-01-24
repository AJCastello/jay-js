import { cn } from "../../utils/cn";
import type { TTextArea } from "./text-area.types";

export function TextArea({ className, variant, color, size, fullWidth, children, ...props }: TTextArea = {}): HTMLTextAreaElement {
	return (
		<textarea
			{...(props as any)}
			className={cn("textarea", variant, color, size, fullWidth ? "w-full" : "", className)}
		>
			{children}
		</textarea>
	) as unknown as HTMLTextAreaElement;
}
