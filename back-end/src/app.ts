import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { rateLimit } from "express-rate-limit";
import slowDown from "express-slow-down";
import helmet from "helmet";
import cron from "node-cron";

import { SERVER_URL } from "./config/constants";
import { validateApiKey } from "./middlewares/validateApiKey.middleware";
import codeExecuteRoute from "./routes/CodeExecute.route";
import pingRoute from "./routes/Ping.route";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 15, // limit each IP to 15 requests per windowMs
  message: { error: "Too many requests, please try again after 1 minutes." },
});

const speedLimiter = slowDown({
  windowMs: 60 * 1000, // 1 minutes
  delayAfter: 1, // add dealy after 1 requests
  delayMs: 200, // begin adding 200ms of delay per request
});

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);
app.use(
  cors({
    origin: "*",
  })
);

app.use(limiter);
app.use(speedLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(validateApiKey);

app.use((req, res, next) => {
  console.log("--- Request Details ---");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("HTTP Version:", req.httpVersion);
  console.log("Headers:", req.headers);
  console.log("Query:", req.query);
  console.log("Body:", req.body);
  console.log("Params:", req.params);
  console.log("IP:", req.ip);
  console.log("Protocol:", req.protocol);
  console.log("Hostname:", req.hostname);
  console.log("Cookies:", req.cookies);
  console.log("------------------------");
  next();
});

app.use("/api/ping", pingRoute);
app.use("/api/execute", codeExecuteRoute);

app.listen(port, () => {
  console.log("now listending on port", port);
});

/* This code is scheduling a cron job to run every 14 minutes. The cron job sends a GET request to the
"/api/ping" endpoint of the server using axios and logs the response data to the console. The
request includes an "x-api-key" header with the value of the API key stored in the environment
variable "process.env.API_KEY". This cron job is useful for keeping the server awake and preventing
it from going to sleep due to inactivity. */
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
