import { runSetup } from "../modules/runSetup";

export function runAction(fileName: string){
  if(fileName){
    runSetup(fileName);
  }
}