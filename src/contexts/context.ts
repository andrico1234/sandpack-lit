import { createContext } from "@lit-labs/context";
import { SandpackFiles } from "../types";
import combineTemplateFilesToSetup from "../helpers/combineTemplateFilesToSetup";
import { SandpackBundlerFiles } from "@codesandbox/sandpack-client";

export type SandpackContext = {
  files: SandpackBundlerFiles,
  template: 'vite',
  activeFile: string,
  onFileChange: () => void,
}

interface Args {
  template: 'vite',
  files: SandpackFiles,
  onFileChange: () => void
  activeFile: string
}

export function getFileState(args: Args) {
  const { files, template, ...rest } = args
  const { files: updatedFiles } = combineTemplateFilesToSetup({
    template,
    files,
  })

  return { files: updatedFiles, template, ...rest }

}


export const sandpackContext = createContext(Symbol('sandpack-context'));