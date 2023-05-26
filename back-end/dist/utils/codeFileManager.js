"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCodeFile = exports.createCodeFile = void 0;
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const constants_1 = require("../config/constants");
/**
 * This function creates a code file with a unique ID and specified language extension, and writes the
 * provided code to the file.
 * @param {string} code - The code parameter is a string that represents the code content that will be
 * written to a file.
 * @param {TLanguage} language - TLanguage is a custom type that represents the programming language of
 * the code file being created. It could be one of the following values: "javascript", "typescript",
 * "python", "java", "c", "cpp", "ruby", "go", "swift", "php", "rust",
 * @returns An object with a single property `codeId`, which is a unique identifier generated using
 * `uuidv4()` function.
 */
const createCodeFile = (code, language) => {
    const codeId = (0, uuid_1.v4)();
    const filePath = path_1.default.join(__dirname, `${constants_1.PATH_TO_CODE_FOLDER}/${codeId}.${constants_1.SUPPORTED_LANGUAGES_EXTENSIONS[language]}`);
    fs_1.default.writeFileSync(filePath, code);
    return { codeId };
};
exports.createCodeFile = createCodeFile;
/**
 * This function removes a code file and its corresponding output file (if it exists) based on the code
 * ID and language.
 * @param {string} codeId - The unique identifier of the code file that needs to be removed.
 * @param {TLanguage} language - The language parameter is a variable of type TLanguage, which is
 * likely an enum or a string type that represents a programming language. It is used to determine the
 * file extension for the code file and the output file, as well as to check if the output file exists
 * before deleting it.
 */
const removeCodeFile = (codeId, language) => {
    const codeFilePath = path_1.default.join(__dirname, `${constants_1.PATH_TO_CODE_FOLDER}/${codeId}.${constants_1.SUPPORTED_LANGUAGES_EXTENSIONS[language]}`);
    fs_1.default.unlinkSync(codeFilePath);
    const outputFilePath = path_1.default.join(__dirname, `${constants_1.PATH_TO_OUTPUT_FOLDER}/${codeId}.${constants_1.SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language]}`);
    if (constants_1.SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language] &&
        (0, fs_1.existsSync)(outputFilePath)) {
        fs_1.default.unlinkSync(outputFilePath);
    }
};
exports.removeCodeFile = removeCodeFile;
