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
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const helmet_1 = __importDefault(require("helmet"));
const constants_1 = require("./config/constants");
const validateApiKey_middleware_1 = require("./middlewares/validateApiKey.middleware");
const CodeExecute_route_1 = __importDefault(require("./routes/CodeExecute.route"));
const Ping_route_1 = __importDefault(require("./routes/Ping.route"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)({
    crossOriginEmbedderPolicy: false,
}));
app.use((0, cors_1.default)({
    origin: "https://code-verse-app.netlify.app",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(validateApiKey_middleware_1.validateApiKey);
app.use("/api/ping", Ping_route_1.default);
app.use("/api/execute", CodeExecute_route_1.default);
app.listen(port, () => {
    console.log("now listending on port", port);
});
node_cron_1.default.schedule("*/14 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)({
            method: "GET",
            url: constants_1.SERVER_URL + "/api/ping",
            headers: {
                "x-api-key": process.env.API_KEY,
            },
        });
        console.log(response.data);
    }
    catch (err) {
        console.log(err);
    }
}));
