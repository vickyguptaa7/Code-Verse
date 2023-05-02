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

export type TLanguage = "cpp" | "java" | "python" | "c" | "javascript";

export interface ICodeSubmission
  extends yup.InferType<typeof codeSubmissionSchema> {
  // using interface instead of type generally gives nicer editor feedback
  code: string;
  language: TLanguage;
  input: string;
}

export { codeSubmissionSchema };
