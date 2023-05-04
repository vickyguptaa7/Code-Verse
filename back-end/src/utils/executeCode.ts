import { spawn } from "child_process";
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
    const executeChildProcess = spawn(executeCommand, executionArgs || []);

    let output = "",
      error = "";

    const timerId = setTimeout(() => {
      executeChildProcess.kill();
      removeCodeFile(codeId, language);
      console.log("Error : ", error, " Output : ", output);
      reject(" Process timed out");
    }, 10 * 2000);

    if (input.length > 0) {
      input.split("\n").forEach((inLine) => {
        executeChildProcess.stdin.write(inLine + "\n");
      });
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
