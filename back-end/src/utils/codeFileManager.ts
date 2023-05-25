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

export const createCodeFile = (code: string, language: TLanguage) => {
  const codeId = uuidv4();

  const filePath = path.join(
    __dirname,
    `${PATH_TO_CODE_FOLDER}/${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
  );

  fs.writeFileSync(filePath, code);
  return { codeId };
};

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
