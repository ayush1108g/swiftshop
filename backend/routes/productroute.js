const express = require("express");
const productdetails = require("./../controllers/product");
const authentication = require("./../controllers/authentication");
const router = express.Router();

router.route("/image").get(productdetails.image);
router
  .route("/products")
  .get(productdetails.productdetails)
  .post(productdetails.postproduct);

router.route("/products/page").get(productdetails.productpage);
router.route("/products/:id").get(productdetails.productbyid);

router
  .route("/products/:id/reviews")
  .get(productdetails.productreviews)
  .post(authentication.protect, productdetails.postreview);

module.exports = router;
