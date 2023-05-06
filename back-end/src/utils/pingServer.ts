import axios from "axios";

export const keepServerAwake = () => {
  // Ping the server every 10 minutes to keep it awake for reducing cold start time
  const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds
  const pingUrl = "https://vscode-s.onrender.com/api/ping";
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
};
