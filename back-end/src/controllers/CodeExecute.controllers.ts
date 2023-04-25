import { Request, Response } from "express";
import { executeJsCode } from "../utils/executeJsCode";
import { ICodeSubmission } from "../utils/validationSchema";

export const getCodeOutput = async (req: Request, res: Response) => {
  const { language, code } = req.body as ICodeSubmission;
  console.log(language, code);

  try {
    if (language === "javascript") {
      const output = await executeJsCode(code);
      res.send({ output });
    } else {
      throw new Error("Language not supported now");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Something went wrong: ${err}`);
  }
};
