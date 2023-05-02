import { spawn } from "child_process";
import { createCodeFile, removeCodeFile } from "./codeFileManager";
import { ICommands, getCommands } from "./getCommands";
import { TLanguage } from "./validationSchema";

export const executeCode = async (
  code: string,
  language: TLanguage,
  input: string
) => {
  const { codeId } = createCodeFile(code, language);
  const {
    compileCommand,
    compilationArgs,
    executeCommand,
    executionArgs,
  }: ICommands = getCommands(codeId, language);

  if (compileCommand) {
    await new Promise((resolve, reject) => {
      const compileCodeProcess = spawn(compileCommand, compilationArgs || []);
      compileCodeProcess.stderr.on("data", (data: Buffer) => {
        reject(data.toString());
      });
      compileCodeProcess.on("exit", (code: number) => {
        resolve(0);
      });
    });
  }

  const result = await new Promise((resolve, reject) => {
    const executeChildProcess = spawn(executeCommand, executionArgs || [], {
      stdio: "pipe",
      timeout: 2000,
    });

    const timerId = setTimeout(() => {
      executeChildProcess.kill();
      removeCodeFile(codeId, language);
      reject(  "Process timed out" );
    }, 2000);

    let output = "",
      error = "";

    executeChildProcess.stdout.on("data", (data: Buffer) => {
      output += data.toString();
    });

    executeChildProcess.stderr.on("data", (data: Buffer) => {
      error += data.toString();
    });

    executeChildProcess.on("error", (err: Object) => {
      console.log(err);
      clearTimeout(timerId);
    });

    executeChildProcess.on("exit", (code: number) => {
      resolve({ error, output });
      clearTimeout(timerId);
    });
  });
  removeCodeFile(codeId, language);

  return result;
};
