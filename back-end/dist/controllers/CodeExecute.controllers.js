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
exports.getCodeOutput = void 0;
const executeCode_1 = require("../utils/executeCode");
/**
 * This function receives a code submission with language, code, and input, executes the code, and
 * sends the output or an error message.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, URL, and body. In this case,
 * the `req` parameter is used to extract the `language`, `code`, and `input` properties from
 * @param {Response} res - `res` stands for response and is an object that represents the HTTP response
 * that an Express app sends when it receives an HTTP request. It is used to send the response back to
 * the client with the appropriate status code, headers, and body. In this code snippet, `res` is used
 * to
 */
const getCodeOutput = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { language, code, input } = req.body;
    console.log(language);
    try {
        const output = yield (0, executeCode_1.executeCode)(code, language, input);
        res.send(output);
    }
    catch (err) {
        console.log(err);
        res
            .status(400)
            .send(JSON.stringify({ error: err, output: "", executionTime: 0 }));
    }
});
exports.getCodeOutput = getCodeOutput;
