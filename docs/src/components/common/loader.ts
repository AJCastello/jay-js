import { Box } from "@jay-js/elements";
import { Loading } from "../ui";

export function Loader() {
	return Box({
		className: "flex justify-center items-center p-10 h-full w-full flex-grow",
		children: Loading({
			className: "text-primary",
			size: "loading-lg",
		}),
	});
}
