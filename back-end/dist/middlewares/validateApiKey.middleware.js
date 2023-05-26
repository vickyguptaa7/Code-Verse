"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateApiKey = void 0;
/**
 * This function validates an API key in a request header and either allows the request to proceed or
 * returns an error message.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - `res` stands for response and it is an object that represents the HTTP
 * response that an Express app sends when it receives an HTTP request. It contains methods for sending
 * the response back to the client, such as `send()`, `json()`, `status()`, etc. In the given code
 * @param {NextFunction} next - `next` is a function that is called when the middleware function has
 * completed its task. It is used to pass control to the next middleware function in the chain. If
 * `next` is not called, the request will be left hanging and the client will not receive a response.
 */
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
