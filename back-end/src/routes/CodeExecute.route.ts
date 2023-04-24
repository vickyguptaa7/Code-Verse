import express from 'express';
import { getCodeOutput } from '../controllers/CodeExecute.controllers';

const router= express.Router();

router.post('/',getCodeOutput);

export default router;