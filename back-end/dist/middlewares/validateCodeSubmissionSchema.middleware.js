"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const validationSchema_1 = require("../utils/validationSchema");
const validateCodeSubmissionSchema = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield validationSchema_1.codeSubmissionSchema.validate(body);
        return next();
    }
    catch (error) {
        if (error instanceof yup_1.ValidationError) {
            res.status(400).json({ error: error.message });
            return;
        }
        return res.status(500).send('Internal server error');
    }
});
exports.default = validateCodeSubmissionSchema;
