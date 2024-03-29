"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCode = void 0;
const child_process_1 = require("child_process");
const constants_1 = require("../config/constants");
const codeFileManager_1 = require("./codeFileManager");
const commands_1 = require("./commands");
/**
 * This function executes code in a specified language with given input and returns the output, error,
 * and execution time.
 * @param {string} code - The code parameter is a string that represents the code to be executed.
 * @param {TLanguage} language - The programming language of the code being executed.
 * @param {string} input - The input parameter is a string that represents the input that will be
 * passed to the code being executed. It is used to simulate user input for programs that require user
 * input during runtime.
 * @returns The `executeCode` function returns a Promise that resolves to an object containing the
 * `error`, `output`, and `executionTime` properties. The `error` property contains any error messages
 * generated during the execution of the code, the `output` property contains the output generated by
 * the code, and the `executionTime` property contains the time taken to execute the code. If there was
 * an error
 */
const executeCode = (code, language, input) => __awaiter(void 0, void 0, void 0, function* () {
    const { codeId } = (0, codeFileManager_1.createCodeFile)(code, language);
    const { compileCommand, compilationArgs, executeCommand, executionArgs, } = (0, commands_1.getCodeCompileAndExecuteCommands)(codeId, language);
    let start = Date.now();
    if (compileCommand) {
        try {
            yield new Promise((resolve, reject) => {
                const compileCodeProcess = (0, child_process_1.spawn)(compileCommand, compilationArgs || []);
                compileCodeProcess.stderr.on("data", (data) => {
                    reject(data.toString());
                });
                compileCodeProcess.on("exit", (code) => {
                    resolve(code);
                });
            });
        }
        catch (err) {
            console.log(err);
            (0, codeFileManager_1.removeCodeFile)(codeId, language);
            return { error: err, output: "", executionTime: 0 };
        }
    }
    const result = yield new Promise((resolve, reject) => {
        const executeChildProcess = (0, child_process_1.spawn)(executeCommand, executionArgs || [], {
            uid: constants_1.ID,
            gid: constants_1.ID,
        });
        const timerId = setTimeout(() => {
            executeChildProcess.kill();
            (0, codeFileManager_1.removeCodeFile)(codeId, language);
            reject("Process timed out! \nOne of the reason could be no input provided.");
        }, constants_1.TimeoutTimeInSeconds * 1000);
        let output = "", error = "";
        if (input) {
            executeChildProcess.stdin.on("error", (err) => {
                console.error(`Error writing to stdin: ${err}`);
            });
            executeChildProcess.stdin.writableHighWaterMark;
            const lineByLineInput = input.split("\n");
            for (const line of lineByLineInput) {
                executeChildProcess.stdin.write(line + "\n");
            }
            executeChildProcess.stdin.end();
        }
        executeChildProcess.stdout.on("data", (data) => {
            output += data.toString();
        });
        executeChildProcess.stderr.on("data", (data) => {
            error += data.toString();
        });
        executeChildProcess.on("error", (err) => {
            console.log(err);
            clearTimeout(timerId);
        });
        executeChildProcess.on("exit", (code) => {
            const executionTime = Date.now() - start;
            console.log("execution time : ", executionTime);
            resolve({ error, output, executionTime });
            clearTimeout(timerId);
        });
    });
    (0, codeFileManager_1.removeCodeFile)(codeId, language);
    return result;
});
exports.executeCode = executeCode;
