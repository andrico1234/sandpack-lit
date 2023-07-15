export interface SandboxTemplate {
  files: SandpackFiles;
  dependencies: Record<string, string>;
  devDependencies?: Record<string, string>;
  entry?: string;
  main: string;
  environment: SandboxEnvironment;
}

type SandboxEnvironment = "node";

export type SandboxTemplateKey = "vite";

export type InitMode = 'immediate' | 'lazy'

export interface PresetOptions {
  closableTabs?: false;
  initMode?: InitMode;
}

export interface SandpackSetup {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export interface SandpackFile {
  code: string;
  hidden?: boolean;
  active?: boolean;
  readOnly?: boolean;
}

export type SandpackFiles = Record<SandboxTemplateKey, string | SandpackFile>;

