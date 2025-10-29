// types

import inquirer, { type QuestionCollection } from "inquirer";
import { faceChalk } from "../../../utils/terminal";
import { initPrepare } from "../modules/prepare/init-prepare";
import { initStatic } from "../modules/static/init-static";
import type { TBuildCommandOptions } from "../types";

export async function buildAction(options: TBuildCommandOptions) {
	if (options.prepare) {
		await initPrepare();
		return;
	}

	if (options.static) {
		await initStatic();
		return;
	}

	handleInquirer();
}

async function handleInquirer() {
	const questions: QuestionCollection<{ features: string }> = [
		{
			type: "list",
			name: "features",
			message: "Choose the features/layers you want to add:",
			choices: [
				{ name: faceChalk`{yellow Prepare} {italic.gray (search and transform markdown files)}`, value: "prepare" },
				{ name: faceChalk`{blue Static} {italic.gray (compiles to static files)}`, value: "static" },
			],
			loop: false,
		},
	];

	inquirer.prompt(questions).then(async (options) => {
		const { features } = options;
		const featuresOptions = {
			prepare: features === "prepare",
			static: features === "static",
		};
		buildAction(featuresOptions);
	});
}
