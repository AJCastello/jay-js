import { addActionMethod } from "../modules/addActionMethod";
import { addInterface } from "../modules/addInterface";
import { addPrivateState } from "../modules/addPrivateState";
import { addSpecMethod } from "../modules/addSpecMethod";
import { addStateMethod } from "../modules/addStateMethod";
import { addStorage } from "../modules/addStorage";
import { TContextCommandOptions } from "../types";
import { log } from "../../../utils/terminal";

export async function addHandler(
  contextName: string,
  options: TContextCommandOptions
) {
  const { state, action, storage, privateState, description } = options;
  const resources = [state, action, storage, privateState].filter(Boolean).join(", ");

  if (state) {
    await addStateMethod(contextName, state, description);
    await addInterface(contextName, state, "States");
    await addSpecMethod(contextName, state, "states", description);
  }
  if (action) {
    await addActionMethod(contextName, action, description);
    await addInterface(contextName, action, "Actions");
    await addSpecMethod(contextName, action, "actions", description);
  }
  if (storage) {
    await addStorage(contextName, storage)
    await addInterface(contextName, storage, "PrivateStorage");
  };
  if (privateState) {
    await addPrivateState(contextName, privateState)
    await addInterface(contextName, privateState, "PrivateStates");
  }
  
  log`{gray {green ✔}  "${resources}" added to context "{yellow ${contextName}}"!}`;
}