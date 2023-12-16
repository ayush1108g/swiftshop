const express = require("express");
const productdetails = require("./../controllers/product");

const router = express.Router();

router
  .route("/products")
  .get(productdetails.productdetails)
  .post(productdetails.postproduct)

module.exports = router;