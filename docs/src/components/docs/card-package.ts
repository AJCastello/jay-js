import { Link, Typography } from "../../../../packages/elements/src";
import type { IJayJSPackage } from "../../types";
import { Card, CardActions, CardBody, CardTitle, Kbd } from "../ui";

export function CardPackage(jayJsPackage: IJayJSPackage) {
	return Card({
		className:
			"w-full hover:shadow-xl hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer bg-base-200/50 border border-base-300 hover:border-primary/50",
		children: [
			// CardFigure({
			//   children: [
			//     Img({
			//       src: jayJsPackage.image,
			//     })
			//   ]
			// }),
			Link({
				href: jayJsPackage.url,
				className: "no-underline",
				children: CardBody({
					children: [
						CardTitle({
							className: "text-lg font-bold text-primary",
							children: jayJsPackage.name,
						}),
						Typography({
							children: jayJsPackage.description,
						}),
						CardActions({
							className: "justify-center mt-4",
							children: [
								Kbd({
									// className: "bg-primary text-primary-content",
									children: jayJsPackage.packageName,
								}),
							],
						}),
					],
				}),
			}),
		],
	});
}
