import bodyParser from 'body-parser';
import express from 'express';
import codeExecuteRoute from "./routes/CodeExecute.route";
const port = 8000;

const app = express();

app.use(bodyParser.json());
app.use('/api/execute',codeExecuteRoute);

app.listen(port, () => {
    console.log(`now listending on port ${port}`);
})