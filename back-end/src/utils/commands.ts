import { join } from "path";
import {
  PATH_TO_CODE_FOLDER,
  PATH_TO_OUTPUT_FOLDER,
  SUPPORTED_LANGUAGES_EXTENSIONS,
  SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS,
} from "../config/constants";
import { TLanguage } from "./validationSchema";

export interface ICommands {
  compileCommand?: string;
  compilationArgs?: string[];
  executeCommand: string;
  executionArgs?: string[];
}

export const getCodeCompileAndExecuteCommands = (
  codeId: string,
  language: TLanguage
): ICommands => {
  switch (language) {
    case "cpp":
      return {
        compileCommand: "g++",
        compilationArgs: [
          join(
            __dirname,
            PATH_TO_CODE_FOLDER,
            `${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
          ),
          "-o",
          join(
            __dirname,
            PATH_TO_OUTPUT_FOLDER,
            `${codeId}.${SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language]}`
          ),
        ],
        executeCommand: join(
          __dirname,
          PATH_TO_OUTPUT_FOLDER,
          `${codeId}.${SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language]}`
        ),
      };

    case "c":
      return {
        compileCommand: "gcc",
        compilationArgs: [
          join(
            __dirname,
            PATH_TO_CODE_FOLDER,
            `${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
          ),
          "-o",
          join(
            __dirname,
            PATH_TO_OUTPUT_FOLDER,
            `${codeId}.${SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language]}`
          ),
        ],
        executeCommand: join(
          __dirname,
          PATH_TO_OUTPUT_FOLDER,
          `${codeId}.${SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language]}`
        ),
      };

    case "java":
      return {
        executeCommand: "java",
        executionArgs: [
          join(
            __dirname,
            PATH_TO_CODE_FOLDER,
            `${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
          ),
        ],
      };

    case "python":
      return {
        executeCommand: "python3",
        executionArgs: [
          join(
            __dirname,
            PATH_TO_CODE_FOLDER,
            `${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
          ),
        ],
      };

    case "javascript":
      return {
        executeCommand: "node",
        executionArgs: [
          join(
            __dirname,
            PATH_TO_CODE_FOLDER,
            `${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
          ),
        ],
      };
  }
  throw new Error("Invalid language");
};
