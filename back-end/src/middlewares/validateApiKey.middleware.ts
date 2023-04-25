import { NextFunction, Request, Response } from "express";

export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers["x-api-key"];
    if(process.env.API_KEY === apiKey) {
        next();
    } else {
        res.status(401).send("Invalid API Key");
    }
}

