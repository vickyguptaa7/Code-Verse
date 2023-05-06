import dotenv from "dotenv";
import express from "express";
import helment from "helmet";

import { validateApiKey } from "./middlewares/validateApiKey.middleware";
import codeExecuteRoute from "./routes/CodeExecute.route";
import pingRoute from "./routes/Ping.route";
import { keepServerAwake } from "./utils/pingServer";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(helment());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(validateApiKey);

app.use("/api/ping", pingRoute);
app.use("/api/execute", codeExecuteRoute);

keepServerAwake();

app.listen(port, () => {
  console.log("now listending on port", port);
});
