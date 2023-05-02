import { join } from "path";
import { SUPPORTED_LANGUAGES_EXTENSIONS } from "../config/constants";
import { TLanguage } from "./validationSchema";

export interface ICommands {
  compileCommand?: string;
  compilationArgs?: string[];
  executeCommand: string;
  executionArgs?: string[];
}

export const getCommands = (codeId: string, language: TLanguage): ICommands => {
  switch (language) {
    case "cpp":
      return {
        compileCommand: "g++",
        compilationArgs: [
          join(
            process.cwd(),
            `/usr/code/${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
          ),
          "-o",
          join(process.cwd(), `/usr/output/${codeId}.out`),
        ],
        executeCommand: join(process.cwd(), `/usr/output/${codeId}.out`),
      };

    case "c":
      return {
        compileCommand: "gcc",
        compilationArgs: [
          join(
            process.cwd(),
            `/usr/code/${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
          ),
          "-o",
          join(process.cwd(), `/usr/output/${codeId}.out`),
        ],
        executeCommand: join(process.cwd(), `/usr/output/${codeId}.out`),
      };

    case "java":
      return {
        executeCommand: "java",
        executionArgs: [
          join(
            process.cwd(),
            `/usr/code/${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
          ),
        ],
      };

    case "python":
      return {
        executeCommand: "python3",
        executionArgs: [
          join(
            process.cwd(),
            `/usr/code/${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
          ),
        ],
      };

    case "javascript":
      return {
        executeCommand: "node",
        executionArgs: [
          join(
            process.cwd(),
            `/usr/code/${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
          ),
        ],
      };
  }
  throw new Error("Invalid language");
};
