import { createContext } from "@lit-labs/context";
import { SandpackFiles } from "../types";
import combineTemplateFilesToSetup from "../helpers/combineTemplateFilesToSetup";
import { SandboxSetup } from "@codesandbox/sandpack-client";

export function getInitialState(args: {
  template: 'vite',
  files: SandpackFiles,
}): SandboxSetup {
  const { files, template } = args
  return combineTemplateFilesToSetup({
    template,
    files,
  })
}

export type Context = SandboxSetup;

export const sandpackContext = createContext(Symbol('sandpack-context'));