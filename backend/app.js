const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const product = require("./routes/productroute");
const usersignuprouter = require("./routes/signuproute");
const cart = require("./routes/cartroute");
const axios = require("axios");
const app = express();
const cron = require("node-cron");
const https = require("https");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
const backendUrl = "https://ecommerce-web-lwxy.onrender.com";
cron.schedule("*/180 * * * * *", function () {
  console.log("Restarting server");

  https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("Restarted");
      } else {
        console.error(`failed to restart with status code: ${res.statusCode}`);
      }
    })
    .on("error", (err) => {
      console.error("Error ", err.message);
    });
});

app.use("/user", usersignuprouter);
app.use("/product_data", product);
app.use("/cart", cart);

app.get("/image", async (req, res) => {
  const query = req.query;
  const imglink = Object.keys(query)[0];
  try {
    const response = await axios.get(imglink, { responseType: "arraybuffer" });

    res.setHeader("Content-Type", response.headers["content-type"]);
    res.send(Buffer.from(response.data, "binary"));
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
      error,
    });
  }
});

module.exports = app;
