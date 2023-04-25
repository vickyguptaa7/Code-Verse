import * as yup from 'yup';
import { ACCEPTED_LANGUAGES } from '../config/constants';

const codeSubmissionSchema = yup.object().shape({
    language: yup.string().trim().lowercase().required('Language is required').oneOf(ACCEPTED_LANGUAGES),
    code: yup.string().trim().required('Code is required'),
});

export interface ICodeSubmission extends yup.InferType<typeof codeSubmissionSchema> {
    // using interface instead of type generally gives nicer editor feedback
    code:string;
    language:'cpp'|'java'|'python'|'c'|'javascript';
}

export { codeSubmissionSchema };
