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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keepServerAwake = void 0;
const axios_1 = __importDefault(require("axios"));
const keepServerAwake = () => {
    // Ping the server every 10 minutes to keep it awake for reducing cold start time
    const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds
    const pingUrl = "https://vscode-s.onrender.com/api/ping";
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, axios_1.default)({
                method: "GET",
                url: pingUrl,
                headers: {
                    "x-api-key": process.env.API_KEY,
                },
            });
            console.log(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }), TEN_MINUTES);
};
exports.keepServerAwake = keepServerAwake;
