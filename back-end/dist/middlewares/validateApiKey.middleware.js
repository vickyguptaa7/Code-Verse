"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateApiKey = void 0;
const validateApiKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (process.env.API_KEY === apiKey) {
        next();
    }
    else {
        res.status(401).send("Invalid API Key");
    }
};
exports.validateApiKey = validateApiKey;
