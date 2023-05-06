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
            return { error: err };
        }
    }
    console.log("compile time : ", Date.now() - start);
    start = Date.now();
    const result = yield new Promise((resolve, reject) => {
        const executeChildProcess = (0, child_process_1.spawn)(executeCommand, executionArgs || [], {
            uid: constants_1.ID,
            gid: constants_1.ID,
        });
        const timerId = setTimeout(() => {
            executeChildProcess.kill();
            (0, codeFileManager_1.removeCodeFile)(codeId, language);
            reject("Process timed out");
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
            resolve({ error, output });
            clearTimeout(timerId);
        });
    });
    console.log("execution time : ", Date.now() - start);
    (0, codeFileManager_1.removeCodeFile)(codeId, language);
    return result;
});
exports.executeCode = executeCode;
