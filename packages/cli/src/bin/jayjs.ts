#!/usr/bin/env node

// terminal
import { Command } from "commander";

// registers
import { registerInitCommand } from "../commands/init/register/registerInitCommand.js";
import { registerPrepareCommand } from "../commands/prepare/register/registerPrepareCommand.js";
import { registerBuildCommand } from "../commands/render/register/registerBuildCommand.js";
import { registerContextCommand } from "../commands/context/register/registerContextCommand.js";
import { registerI18nCommand } from "../commands/i18n/register/registerI18nCommand.js";

const program = new Command();

registerInitCommand(program);
registerPrepareCommand(program);
registerBuildCommand(program);
registerContextCommand(program);
registerI18nCommand(program);

program.parse(process.argv);
