"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CodeExecute_controllers_1 = require("../controllers/CodeExecute.controllers");
const validateCodeSubmissionSchema_middleware_1 = __importDefault(require("../middlewares/validateCodeSubmissionSchema.middleware"));
const router = express_1.default.Router();
router.post('/', validateCodeSubmissionSchema_middleware_1.default, CodeExecute_controllers_1.getCodeOutput);
exports.default = router;
