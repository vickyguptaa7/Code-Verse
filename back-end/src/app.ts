import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cron from "node-cron";
import helmet from "helmet";

import { SERVER_URL } from "./config/constants";
import { validateApiKey } from "./middlewares/validateApiKey.middleware";
import codeExecuteRoute from "./routes/CodeExecute.route";
import pingRoute from "./routes/Ping.route";

dotenv.config();

const port =  process.env.PORT || 3000;
const app = express();

app.use(helmet())
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(validateApiKey);

app.use("/api/ping", pingRoute);
app.use("/api/execute", codeExecuteRoute);

app.listen(port, () => {
  console.log("now listending on port", port);
});

cron.schedule("*/14 * * * *", async () => {
  try {
    const response = await axios({
      method: "GET",
      url: SERVER_URL + "/api/ping",
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
});