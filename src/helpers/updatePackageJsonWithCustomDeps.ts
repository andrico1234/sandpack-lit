import type { SandboxSetup } from "@codesandbox/sandpack-client";

const updatePackageJsonWithCustomDeps = (setup: SandboxSetup): SandboxSetup => {
  const { dependencies, devDependencies, files } = setup;

  const packageJson = files["/package.json"];
  const packageJsonContent = JSON.parse(packageJson.code);

  const updatedPackageJson = {
    ...packageJsonContent,
    dependencies: {
      ...packageJsonContent.dependencies,
      ...dependencies,
    },
    devDependencies: {
      ...packageJsonContent.devDependencies,
      ...devDependencies,
    },
  }

  const updatedFiles = {
    ...files,
    "/package.json": {
      ...packageJson,
      code: JSON.stringify(updatedPackageJson, null, 2),
    },
  }

  return {
    ...setup,
    files: updatedFiles,
  }
}

export default updatePackageJsonWithCustomDeps