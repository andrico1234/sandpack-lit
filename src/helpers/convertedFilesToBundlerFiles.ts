import {
  SandpackBundlerFile,
  SandpackBundlerFiles,
} from "@codesandbox/sandpack-client";
import { SandpackFiles } from "../types";

/**
 * Transform an regular object, which contain files to
 * an object that sandpack-client can understand
 *
 * From: Record<string, string>
 * To: Record<string, { code: string }>
 */
const convertedFilesToBundlerFiles = (
  files?: SandpackFiles
): SandpackBundlerFiles => {
  if (!files) return {};

  return Object.keys(files).reduce((acc: SandpackBundlerFiles, key) => {
    if (typeof files[key] === "string") {
      acc[key] = { code: files[key] as string };
    } else {
      acc[key] = files[key] as SandpackBundlerFile;
    }

    return acc;
  }, {});
};

export default convertedFilesToBundlerFiles;
