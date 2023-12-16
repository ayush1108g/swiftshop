const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const product = require('./routes/productroute')

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use("/product_data", product)
module.exports = app;
