import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import { codeSubmissionSchema } from "../utils/validationSchema";

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
const validateCodeSubmissionSchema=async(req:Request,res:Response,next:NextFunction)=>{
    const body=req.body;
    try{
        await codeSubmissionSchema.validate(body);
        return next();
    }catch(error){
        if(error instanceof ValidationError)
        {
            res.status(400).json({error:error.message});
            return;
        }
        return res.status(500).send('Internal server error');
    }
}

export default validateCodeSubmissionSchema;