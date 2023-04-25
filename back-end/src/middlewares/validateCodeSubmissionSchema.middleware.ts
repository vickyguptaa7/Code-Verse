import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import { codeSubmissionSchema } from "../utils/validationSchema";

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