import { NextFunction, Request, Response } from 'express';
 
export const getCodeOutput=(req:Request,res:Response,next:NextFunction)=>
{
    console.log(req.body);
    res.send('GOT IT');
}