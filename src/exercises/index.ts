import { SandpackFiles, SandpackSetup } from "../types";
import exerciseOne from "./exercise-one";

export interface Exercise {
  files: SandpackFiles;
  customSetup?: SandpackSetup;
}

const exercises: Exercise[] = [
  {
    files: exerciseOne.files,
    customSetup: exerciseOne.customSetup,
  },
];

export default exercises;
