const express = require("express");
const productdetails = require("./../controllers/product");

const router = express.Router();

router
  .route("/products")
  .get(productdetails.productdetails)
  .post(productdetails.postproduct);

router.route("/products/page").get(productdetails.productpage);
router.route("/products/:id").get(productdetails.productbyid);

module.exports = router;
