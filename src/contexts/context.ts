import { createContext } from "@lit-labs/context";
import { SandpackBundlerFiles } from "@codesandbox/sandpack-client";

export type SandpackContext = {
  files: SandpackBundlerFiles,
  activeFile: string,
  onFileChange: (newFile: string) => void,
  onActiveFileChange: (newFile: string) => void,
}


export const sandpackContext = createContext(Symbol('sandpack-context'));