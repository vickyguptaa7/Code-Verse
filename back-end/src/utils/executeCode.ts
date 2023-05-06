import { spawn } from "child_process";
import { ID, TimeoutTimeInSeconds } from "../config/constants";
import { createCodeFile, removeCodeFile } from "./codeFileManager";
import { ICommands, getCodeCompileAndExecuteCommands } from "./commands";
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
  }: ICommands = getCodeCompileAndExecuteCommands(codeId, language);

  if (compileCommand) {
    try {
      await new Promise((resolve, reject) => {
        const compileCodeProcess = spawn(compileCommand, compilationArgs || []);
        compileCodeProcess.stderr.on("data", (data: Buffer) => {
          reject(data.toString());
        });
        compileCodeProcess.on("exit", (code: number) => {
          resolve(code);
        });
      });
    } catch (err) {
      console.log(err);
      removeCodeFile(codeId, language);
      return { error: err };
    }
  }

  const result = await new Promise((resolve, reject) => {
    const executeChildProcess = spawn(executeCommand, executionArgs || [], {
      timeout: TimeoutTimeInSeconds * 1000,
      uid: ID,
      gid: ID,
    });

    const timerId = setTimeout(() => {
      executeChildProcess.kill();
      removeCodeFile(codeId, language);
      reject("Process timed out");
    }, TimeoutTimeInSeconds * 1000);

    let output = "",
      error = "";

    if (input) {
      executeChildProcess.stdin.on("error", (err: Object) => {
        console.error(`Error writing to stdin: ${err}`);
      });
      executeChildProcess.stdin.writableHighWaterMark;
      const lineByLineInput = input.split("\n");
      for (const line of lineByLineInput) {
        executeChildProcess.stdin.write(line + "\n");
      }
      executeChildProcess.stdin.end();
    }

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
