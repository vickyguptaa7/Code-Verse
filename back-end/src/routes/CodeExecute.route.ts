import express from "express";
import {
    getSubmissionStatus,
    submitCode,
} from "../controllers/CodeExecute.controllers";
import validateCodeSubmissionSchema, { ValidateCodeSubmissionOutputSchema } from "../middlewares/validateCodeSubmissionSchema.middleware";

const router = express.Router();

router.post("/", validateCodeSubmissionSchema, submitCode);
router.get("/:id", ValidateCodeSubmissionOutputSchema, getSubmissionStatus);

export default router;
