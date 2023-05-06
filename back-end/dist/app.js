"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const validateApiKey_middleware_1 = require("./middlewares/validateApiKey.middleware");
const CodeExecute_route_1 = __importDefault(require("./routes/CodeExecute.route"));
const Ping_route_1 = __importDefault(require("./routes/Ping.route"));
const pingServer_1 = require("./utils/pingServer");
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(validateApiKey_middleware_1.validateApiKey);
app.use("/api/ping", Ping_route_1.default);
app.use("/api/execute", CodeExecute_route_1.default);
(0, pingServer_1.keepServerAwake)();
app.listen(port, () => {
    console.log("now listending on port", port);
});
