import fs, { readdirSync } from "fs";
import path, { join } from "path";
import { v4 as uuidv4 } from "uuid";
import {
  SUPPORTED_LANGUAGES_EXTENSIONS,
  SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS,
} from "../config/constants";
import { TLanguage } from "./validationSchema";

export const createCodeFile = (code: string, language: TLanguage) => {
  const codeId = uuidv4();
  let files = readdirSync(join(process.cwd(), "/usr/code"));
  console.log(files);

  const filePath = path.join(
    process.cwd(),
    `/usr/code/${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
  );
  fs.writeFileSync(filePath, code);
  files = readdirSync(join(process.cwd(), "/usr/code"));
  console.log(files);

  return { codeId };
};

export const removeCodeFile = (codeId: string, language: TLanguage) => {
  const codeFilePath = path.join(
    process.cwd(),
    `/usr/code/${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
  );
  fs.unlinkSync(codeFilePath);

  if (SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language]) {
    const outputFilePath = path.join(
      process.cwd(),
      `/usr/output/${codeId}.${SUPPORTED_LANGUAGES_OUTPUT_EXTENSIONS[language]}`
    );
    fs.unlinkSync(outputFilePath);
  }
};
