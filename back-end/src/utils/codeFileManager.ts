import fs, { existsSync } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import {
  PATH_TO_CODE_FOLDER,
  PATH_TO_OUTPUT_FOLDER,
  SUPPORTED_LANGUAGES_EXTENSIONS,
  SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS,
} from "../config/constants";
import { TLanguage } from "./validationSchema";

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
export const createCodeFile = (code: string, language: TLanguage) => {
  const codeId = uuidv4();

  const filePath = path.join(
    __dirname,
    `${PATH_TO_CODE_FOLDER}/${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
  );

  fs.writeFileSync(filePath, code);
  return { codeId };
};

/**
 * This function removes a code file and its corresponding output file (if it exists) based on the code
 * ID and language.
 * @param {string} codeId - The unique identifier of the code file that needs to be removed.
 * @param {TLanguage} language - The language parameter is a variable of type TLanguage, which is
 * likely an enum or a string type that represents a programming language. It is used to determine the
 * file extension for the code file and the output file, as well as to check if the output file exists
 * before deleting it.
 */
export const removeCodeFile = (codeId: string, language: TLanguage) => {
  const codeFilePath = path.join(
    __dirname,
    `${PATH_TO_CODE_FOLDER}/${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
  );
  fs.unlinkSync(codeFilePath);

  const outputFilePath = path.join(
    __dirname,
    `${PATH_TO_OUTPUT_FOLDER}/${codeId}.${SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language]}`
  );

  if (
    SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language] &&
    existsSync(outputFilePath)
  ) {
    fs.unlinkSync(outputFilePath);
  }
};
