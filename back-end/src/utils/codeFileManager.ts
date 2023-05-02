import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { SUPPORTED_LANGUAGES_EXTENSIONS } from "../config/constants";
import { TLanguage } from "./validationSchema";

export const createCodeFile = (code: string, language: TLanguage) => {
  const codeId = uuidv4();
  const filePath = path.join(
    process.cwd(),
    `/usr/code/${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
  );
  fs.writeFileSync(filePath, code);
  return { codeId };
};

export const removeCodeFile = (
  codeId: string,
  language: TLanguage,
  outputExtension?: string
) => {
  const codeFilePath = path.join(
    process.cwd(),
    `/usr/code/${codeId}.${SUPPORTED_LANGUAGES_EXTENSIONS[language]}`
  );
  fs.unlinkSync(codeFilePath);

  if (outputExtension) {
    const outputFilePath = path.join(
      process.cwd(),
      `/usr/output/${codeId}.${outputExtension}`
    );
    fs.unlinkSync(outputFilePath);
  }
};
