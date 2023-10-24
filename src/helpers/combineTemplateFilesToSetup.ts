import type { SandboxSetup } from "@codesandbox/sandpack-client";
import SANDBOX_TEMPLATES from "../templates/index.js";
import type { SandboxTemplate } from "../types.js";
import convertedFilesToBundlerFiles from "./convertedFilesToBundlerFiles.js";
import type { Args } from "./setupStartingFiles.js";

const combineTemplateFilesToSetup = ({
  files,
  template,
  customSetup,
}: Args): SandboxSetup => {
  if (!template && !customSetup) {
    // what happens if someone passes no template, but a custom setup?
    const defaultTemplate =
      SANDBOX_TEMPLATES.vite as unknown as SandboxTemplate;

    return {
      ...defaultTemplate,
      files: {
        ...defaultTemplate.files,
        ...convertedFilesToBundlerFiles(files),
      },
    } as unknown as SandboxSetup;
  }

  const baseTemplate = SANDBOX_TEMPLATES[
    template
  ] as unknown as SandboxTemplate;
  if (!baseTemplate) {
    throw new Error(
      `[sandpack-react]: invalid template "${template}" provided`
    );
  }

  if (!customSetup && !files) {
    return {
      files: convertedFilesToBundlerFiles(baseTemplate.files),
      dependencies: baseTemplate.dependencies,
      devDependencies: baseTemplate.devDependencies,
      entry: baseTemplate.main,
      template: baseTemplate.environment,
    }
  }

  return {
    files: convertedFilesToBundlerFiles({ ...baseTemplate.files, ...files }),
    dependencies: {
      ...baseTemplate.dependencies,
      ...customSetup?.dependencies,
    },
    devDependencies: {
      ...baseTemplate.devDependencies,
      ...customSetup?.devDependencies,
    },
    entry: baseTemplate.main,
    template: baseTemplate.environment,
  };
};

export default combineTemplateFilesToSetup;
