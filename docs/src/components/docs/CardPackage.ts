import { Card, CardActions, CardBody, CardTitle, Kbd, Link, Typography } from "@jay-js/ui";

import type { IJayJSPackage } from "../../types";

export function CardPackage(jayJsPackage: IJayJSPackage) {
	return Card({
		className:
			"w-full hover:shadow-xl hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer bg-base-content/20",
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
