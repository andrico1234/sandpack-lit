import SANDBOX_TEMPLATES from "../templates/index";
import { SandboxTemplate, SandpackFiles } from "../types";
import convertedFilesToBundlerFiles from "./convertedFilesToBundlerFiles";

const combineTemplateFilesToSetup = ({
  files,
  template,
}: {
  files?: SandpackFiles;
  template?: "vite";
}): SandboxTemplate => {
  if (!template) {
    const defaultTemplate =
      SANDBOX_TEMPLATES.vite as unknown as SandboxTemplate;

    return {
      ...defaultTemplate,
      files: {
        ...defaultTemplate.files,
        ...convertedFilesToBundlerFiles(files),
      },
    } as unknown as SandboxTemplate;
  }

  const baseTemplate = SANDBOX_TEMPLATES[
    template
  ] as unknown as SandboxTemplate;
  if (!baseTemplate) {
    throw new Error(
      `[sandpack-react]: invalid template "${template}" provided`
    );
  }

  // If no setup and not files, the template is used entirely
  if (!files) {
    return baseTemplate;
  }

  // Merge the setup on top of the template
  return {
    /**
     * The input setup might have files in the simple form Record<string, string>
     * so we convert them to the sandbox template format
     */
    files: convertedFilesToBundlerFiles({ ...baseTemplate.files, ...files }),
    /**
     * Merge template dependencies and user custom dependencies.
     * As a rule, the custom dependencies must overwrite the template ones.
     */
    dependencies: {
      ...baseTemplate.dependencies,
    },
    devDependencies: {
      ...baseTemplate.devDependencies,
    },
    main: baseTemplate.main,
    environment: baseTemplate.environment,
  } as SandboxTemplate;
};

export default combineTemplateFilesToSetup;
