import { Request, Response } from 'express';
 
export const getCodeOutput=(req:Request,res:Response)=>
{
    console.log(req.body);
    res.send('GOT IT');
}