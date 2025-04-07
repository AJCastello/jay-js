import type { IFragment } from "./Fragment.types";

export function Fragment({ children, ...props }: IFragment): DocumentFragment {
	const fragment = document.createDocumentFragment();

	props &&
		Object.entries(props).forEach(([key, value]) => {
			try {
				(fragment as any)[key] = value;
			} catch (error) {
				if (error instanceof TypeError) {
					console.warn(`JayJS: Cannot set property '${key}' of type '${typeof value}' to '${value}'.`);
					throw error;
				}
			}
		});

	if (Array.isArray(children)) {
		children.forEach((item) => {
			fragment.append(item);
		});
	} else {
		children && fragment.append(children);
	}

	return fragment;
}
