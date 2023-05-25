import { Request, Response } from "express";
import { executeCode } from "../utils/executeCode";
import { ICodeSubmission } from "../utils/validationSchema";

/**
 * This function receives a code submission with language, code, and input, executes the code, and
 * sends the output or an error message.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, URL, and body. In this case,
 * the `req` parameter is used to extract the `language`, `code`, and `input` properties from
 * @param {Response} res - `res` stands for response and is an object that represents the HTTP response
 * that an Express app sends when it receives an HTTP request. It is used to send the response back to
 * the client with the appropriate status code, headers, and body. In this code snippet, `res` is used
 * to
 */
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
