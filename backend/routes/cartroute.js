const express = require("express");
const cartcontroller = require("./../controllers/cartController");
const router = express.Router();
const authcontroller = require("./../controllers/authentication");
router
  .route("/")
  .get(authcontroller.protect, cartcontroller.getcartbyid)
  .post(authcontroller.protect, cartcontroller.addcart);

router
  .route("/wishlist")
  .get(authcontroller.protect, cartcontroller.getwishlist)
  .post(authcontroller.protect, cartcontroller.addwishlist);
module.exports = router;
