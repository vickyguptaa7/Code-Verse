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
/**
 * This function validates a code submission schema and returns an error message if the validation
 * fails.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, headers, URL, and body.
 * @param {Response} res - `res` stands for response and it is an object that represents the HTTP
 * response that an Express app sends when it receives an HTTP request. It contains methods and
 * properties that allow the app to send data back to the client, such as `status`, `json`, and `send`.
 * In the context
 * @param {NextFunction} next - `next` is a function that is called when the middleware has finished
 * its job and wants to pass control to the next middleware function in the chain. It is typically used
 * to chain multiple middleware functions together to handle a request.
 * @returns If the code submission schema is successfully validated, the `next()` function is called to
 * move on to the next middleware function. If there is a validation error, a 400 status response with
 * the error message is returned. If there is any other error, a 500 status response with the message
 * "Internal server error" is returned.
 */
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
