#!/usr/bin/env node

// terminal
import { Command } from "commander";

// registers
import { registerInitCommand } from "../commands/init/register/registerInitCommand.js";
import { registerBuildCommand } from "../commands/build/register/registerBuildCommand.js";
import { registerUiCommand } from "../commands/ui/register/register-ui-command.js";

const program = new Command();

registerInitCommand(program);
registerBuildCommand(program);
registerUiCommand(program);

program.parse(process.argv);
