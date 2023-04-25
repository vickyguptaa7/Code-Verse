import express from 'express';
import { getCodeOutput } from '../controllers/CodeExecute.controllers';
import validateCodeSubmissionSchema from '../middlewares/validateCodeSubmissionSchema.middleware';

const router= express.Router();

router.post('/',validateCodeSubmissionSchema,getCodeOutput);

export default router;