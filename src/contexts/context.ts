import { createContext } from "@lit-labs/context";
import type { SandpackBundlerFiles } from "@codesandbox/sandpack-client";

export type SandpackContext = {
  files: SandpackBundlerFiles,
  openFiles: string[],
  activeFile: string,
  onFileChange: (newFile: string) => void,
  onActiveFileChange: (newFile: string) => void,
  onFileClose: (file: string) => void,
}


export const sandpackContext = createContext(Symbol('sandpack-context'));