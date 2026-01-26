import { cn } from "../../utils";
import type { TFileInput } from "./file-input.types";

export function FileInput({ className, variant, color, size, fullWidth, ...props }: TFileInput = {}) {
	return (
		<input
			{...(props as any)}
			type="file"
			className={cn("file-input", variant, color, size, fullWidth ? "w-full" : "", className)}
		/>
	);
}
