import { SandboxSetup } from "@codesandbox/sandpack-client";
import SANDBOX_TEMPLATES from "../templates/index";
import { SandboxTemplate, SandpackFiles, SandpackSetup } from "../types";
import convertedFilesToBundlerFiles from "./convertedFilesToBundlerFiles";

const combineTemplateFilesToSetup = ({
  files,
  template,
  customSetup,
}: {
  files?: SandpackFiles;
  template?: "vite";
  customSetup?: SandpackSetup;
}): SandboxSetup => {
  if (!template) {
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
    return baseTemplate as SandboxSetup;
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
    main: baseTemplate.main,
    environment: baseTemplate.environment,
  } as SandboxSetup;
};

export default combineTemplateFilesToSetup;
