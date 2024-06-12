#!/usr/bin/env node

// terminal
import { Command } from "commander";

// registers
import { registerRunCommand } from "../commands/run/register/registerRunCommand.js";
import { registerInitCommand } from "../commands/init/register/registerInitCommand.js";
import { registerPrepareCommand } from "../commands/prepare/register/registerPrepareCommand.js";
import { registerBuildCommand } from "../commands/build/register/registerBuildCommand.js";
import { registerContextCommand } from "../commands/context/register/registerContextCommand.js";
import { registerI18nCommand } from "../commands/i18n/register/registerI18nCommand.js";
import { registerModuleCommand } from "../commands/module/register/registerModuleCommand.js";

const program = new Command();

registerRunCommand(program);
registerInitCommand(program);
registerPrepareCommand(program);
registerBuildCommand(program);
registerContextCommand(program);
registerI18nCommand(program);
registerModuleCommand(program);

program.parse(process.argv);
