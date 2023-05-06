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
const getCodeOutput = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { language, code, input } = req.body;
    console.log(language, code, input);
    try {
        const output = yield (0, executeCode_1.executeCode)(code, language, input);
        res.send(output);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(`${err}`);
    }
});
exports.getCodeOutput = getCodeOutput;
