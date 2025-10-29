#!/usr/bin/env node

// terminal
import { Command } from "commander";
import { registerBuildCommand } from "../commands/build/register/register-build-command.js";
// registers
import { registerInitCommand } from "../commands/init/register/register-init-command.js";
import { registerUiCommand } from "../commands/ui/register/register-ui-command.js";

const program = new Command();

registerInitCommand(program);
registerBuildCommand(program);
registerUiCommand(program);

program.parse(process.argv);
