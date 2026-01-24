import { cn } from "../../utils/cn";
import type { TRange } from "./range.types";

export function Range({ className, color, size, ...props }: TRange = {}) {
	return <input {...(props as any)} type="range" className={cn("range", color, size, className)} />;
}
