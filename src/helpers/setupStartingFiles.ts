import { SandboxTemplateKey, SandpackFiles, SandpackSetup } from "../types.js";
import combineTemplateFilesToSetup from "./combineTemplateFilesToSetup.js";
import updatePackageJsonWithCustomDeps from "./updatePackageJsonWithCustomDeps.js";

export interface Args {
  files?: SandpackFiles;
  template: SandboxTemplateKey;
  customSetup?: SandpackSetup
}

const setupStartingFiles = (args: Args) => {
  const combinedSetup = combineTemplateFilesToSetup(args)
  const setupWithUpdatedDeps = updatePackageJsonWithCustomDeps(combinedSetup)

  return setupWithUpdatedDeps
}

export default setupStartingFiles