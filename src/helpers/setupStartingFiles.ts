import { SandpackFiles, SandpackSetup } from "../types";
import combineTemplateFilesToSetup from "./combineTemplateFilesToSetup";
import updatePackageJsonWithCustomDeps from "./updatePackageJsonWithCustomDeps";

export interface Args {
  files?: SandpackFiles;
  template: 'vite'
  customSetup?: SandpackSetup
}

const setupStartingFiles = (args: Args) => {
  const combinedSetup = combineTemplateFilesToSetup(args)
  const setupWithUpdatedDeps = updatePackageJsonWithCustomDeps(combinedSetup)

  return setupWithUpdatedDeps
}

export default setupStartingFiles