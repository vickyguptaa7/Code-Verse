import { Request, Response } from "express";
import { executeCode } from "../utils/executeCode";
import { ICodeSubmission } from "../utils/validationSchema";

export const getCodeOutput = async (req: Request, res: Response) => {
  const { language, code, input } = req.body as ICodeSubmission;
  console.log(language);
  
  try {
    const output = await executeCode(code, language, input);
    res.send(output);
  } catch (err) {
    console.log(err);
    res.status(400).send(JSON.stringify({ error: err }));
  }
};
