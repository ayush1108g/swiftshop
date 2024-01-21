const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
const cron = require("node-cron");
const https = require("https");
let cookieParser = require("cookie-parser");
const reteLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const app = express();

const product = require("./routes/productroute");
const usersignuprouter = require("./routes/signuproute");
const imagerouter = require("./routes/imageroute");
const cart = require("./routes/cartroute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// const limiter = reteLimit({
//   max: 2000,
//   windowMs: 60 * 1000,
//   message: "Too many request from this IP, please try again in few minutes",
// });
// app.use("/", limiter);

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3002",
      "https://ayush1108g.github.io",
    ],
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", [
    "https://ayush1108g.github.io",
    // "http://localhost:3000",
  ]);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.use(express.static(`${__dirname}/public`));
app.use(express.json({ limit: "100kb" }));
// app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

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

app.use("/image", imagerouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
