"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeCompileAndExecuteCommands = void 0;
const path_1 = require("path");
const constants_1 = require("../config/constants");
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
