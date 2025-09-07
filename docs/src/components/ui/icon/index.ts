import { Typography } from "@jay-js/elements";

export function Icon(props: any) {
	return Typography({
		tag: "i",
		...props,
		children: props.icon,
	});
}
