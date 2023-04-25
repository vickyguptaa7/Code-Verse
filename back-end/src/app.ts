import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';

import { validateApiKey } from "./middlewares/validateApiKey.middleware";
import codeExecuteRoute from "./routes/CodeExecute.route";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(validateApiKey);

app.use('/api/execute',codeExecuteRoute);


app.listen(port, () => {
    console.log('now listending on port',port);
});