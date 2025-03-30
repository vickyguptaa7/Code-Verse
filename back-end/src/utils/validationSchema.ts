import * as yup from "yup";
import { SUPPORTED_LANGUAGES } from "../config/constants";

const codeSubmissionSchema = yup.object().shape({
  language: yup
    .string()
    .trim()
    .lowercase()
    .required("Language is required")
    .oneOf(SUPPORTED_LANGUAGES),
  code: yup.string().trim().required("Code is required"),
  input: yup.string().trim(),
});

const codeSubmissionOutputSchema = yup.object().shape({
  id: yup.string().trim().required("ID is required"),
});

export type TLanguage = "cpp" | "java" | "python" | "c" | "javascript";

export interface ICodeSubmission
  extends yup.InferType<typeof codeSubmissionSchema> {
  // using interface instead of type generally gives nicer editor feedback
  code: string;
  language: TLanguage;
  input: string;
  id?: string;
}

export interface ISubmissionQueueItem extends ICodeSubmission {
  id: string;
}

export interface ISubmissionDatabase {
  [key: string]: {
    status: "success" | "error";
    id: string;
    output: any;
    error?: any;
    timestamp: Date;
    executionTime: number;
  };
}

export interface IQueueIdSet {
  [key: string]: boolean;
}

export { codeSubmissionOutputSchema, codeSubmissionSchema };
