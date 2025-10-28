import type { Route } from "../../../types";

export type TBuildCommandOptions = {
	static: boolean;
	prepare: boolean;
};

export type TResolvedRoutes = Map<string, Route>;
