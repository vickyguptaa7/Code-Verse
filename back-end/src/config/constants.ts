import { join } from "path";

export const SUPPORTED_LANGUAGES = ["cpp", "java", "python", "c", "javascript"];



export const SUPPORTED_LANGUAGES_EXTENSIONS = {
  cpp: "cpp",
  java: "java",
  python: "py",
  c: "c",
  javascript: "js",
};

export interface ICommands {
  compileCommand?: string;
  compilationArgs?: string[];
  executeCommand: string;
  executionArgs?: string[];
  outputExtension?: string;
}

export const getCommands = (codeId: string, language: string): ICommands => {
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
        outputExtension: "out",
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
        outputExtension: "out",
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
  return {
    compileCommand: "",
    compilationArgs: [],
    executeCommand: "",
    executionArgs: [],
    outputExtension: "",
  };
};
