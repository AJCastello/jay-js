#!/usr/bin/env node

// terminal
import { Command } from "commander";

// registers
import { registerInitCommand } from "../commands/init/register/registerInitCommand.js";
import { registerPrepareCommand } from "../commands/prepare/register/registerPrepareCommand.js";
import { registerBuildCommand } from "../commands/render/register/registerBuildCommand.js";
import { registerContextCommand } from "../commands/context/register/registerContextCommand.js";

const program = new Command();

registerInitCommand(program);
registerPrepareCommand(program);
registerBuildCommand(program);
registerContextCommand(program);

program.parse(process.argv);
