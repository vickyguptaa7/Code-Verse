import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import helment from "helmet";

import { validateApiKey } from "./middlewares/validateApiKey.middleware";
import codeExecuteRoute from "./routes/CodeExecute.route";
import pingRoute from "./routes/Ping.route";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(helment());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(validateApiKey);

app.use("/api/ping", pingRoute);
app.use("/api/execute", codeExecuteRoute);

// Ping the server every 10 minutes to keep it awake for reducing cold start time
const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds
const pingUrl="https://vscode-s.onrender.com/api/ping";
setInterval(async () => {
  try {
    const response = await axios({
      method: "GET",
      url: pingUrl,
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}, TEN_MINUTES);

app.listen(port, () => {
  console.log("now listending on port", port);
});
