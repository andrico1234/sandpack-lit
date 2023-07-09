export interface SandboxTemplate {
  files: SandpackFiles;
  dependencies: Record<string, string>;
  devDependencies?: Record<string, string>;
  entry?: string;
  main: string;
  environment: SandboxEnvironment;
}

type SandboxEnvironment = "node";

export interface SandpackFile {
  code: string;
  hidden?: boolean;
  active?: boolean;
  readOnly?: boolean;
}

export type SandpackFiles = Record<string, string | SandpackFile>;
