import { runSetup } from "../modules/runSetup";

export function runAction(fileName: string){

  if(fileName){
    console.log("Running Jay JS file: ", fileName);
    runSetup(fileName);
  }
}