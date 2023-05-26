"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeCompileAndExecuteCommands = void 0;
const path_1 = require("path");
const constants_1 = require("../config/constants");
/**
 * This function returns the appropriate commands for compiling and executing code based on the
 * language specified.
 * @param {string} codeId - A string representing the unique identifier of the code file being compiled
 * and executed.
 * @param {TLanguage} language - The programming language of the code that needs to be compiled and
 * executed. It can be one of the following: "cpp", "c", "java", "python", or "javascript".
 * @returns The function `getCodeCompileAndExecuteCommands` returns an object of type `ICommands` which
 * contains the commands needed to compile and execute the code based on the language specified. The
 * specific commands returned depend on the language specified as an argument to the function.
 */
const getCodeCompileAndExecuteCommands = (codeId, language) => {
    switch (language) {
        case "cpp":
            return {
                compileCommand: "g++",
                compilationArgs: [
                    (0, path_1.join)(__dirname, constants_1.PATH_TO_CODE_FOLDER, `${codeId}.${constants_1.SUPPORTED_LANGUAGES_EXTENSIONS[language]}`),
                    "-o",
                    (0, path_1.join)(__dirname, constants_1.PATH_TO_OUTPUT_FOLDER, `${codeId}.${constants_1.SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language]}`),
                ],
                executeCommand: (0, path_1.join)(__dirname, constants_1.PATH_TO_OUTPUT_FOLDER, `${codeId}.${constants_1.SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language]}`),
            };
        case "c":
            return {
                compileCommand: "gcc",
                compilationArgs: [
                    (0, path_1.join)(__dirname, constants_1.PATH_TO_CODE_FOLDER, `${codeId}.${constants_1.SUPPORTED_LANGUAGES_EXTENSIONS[language]}`),
                    "-o",
                    (0, path_1.join)(__dirname, constants_1.PATH_TO_OUTPUT_FOLDER, `${codeId}.${constants_1.SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language]}`),
                ],
                executeCommand: (0, path_1.join)(__dirname, constants_1.PATH_TO_OUTPUT_FOLDER, `${codeId}.${constants_1.SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language]}`),
            };
        case "java":
            return {
                executeCommand: "java",
                executionArgs: [
                    (0, path_1.join)(__dirname, constants_1.PATH_TO_CODE_FOLDER, `${codeId}.${constants_1.SUPPORTED_LANGUAGES_EXTENSIONS[language]}`),
                ],
            };
        case "python":
            return {
                executeCommand: "python3",
                executionArgs: [
                    (0, path_1.join)(__dirname, constants_1.PATH_TO_CODE_FOLDER, `${codeId}.${constants_1.SUPPORTED_LANGUAGES_EXTENSIONS[language]}`),
                ],
            };
        case "javascript":
            return {
                executeCommand: "node",
                executionArgs: [
                    (0, path_1.join)(__dirname, constants_1.PATH_TO_CODE_FOLDER, `${codeId}.${constants_1.SUPPORTED_LANGUAGES_EXTENSIONS[language]}`),
                ],
            };
    }
    throw new Error("Invalid language");
};
exports.getCodeCompileAndExecuteCommands = getCodeCompileAndExecuteCommands;
