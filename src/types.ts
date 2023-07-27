export interface SandboxTemplate {
  files: SandpackFiles;
  dependencies: Record<string, string>;
  devDependencies?: Record<string, string>;
  entry?: string;
  main: string;
  environment: SandboxEnvironment;
}

type SandboxEnvironment = "node";

export type SandboxTemplateKey = "vite" | "node";

export type InitMode = 'immediate' | 'lazy'

export interface PresetOptions {
  files: SandpackFiles;
  customSetup?: SandpackSetup;
  closableTabs?: false;
  initMode?: InitMode;
  template: SandboxTemplateKey;
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

export type SandpackFiles = Record<string, string | SandpackFile>;

