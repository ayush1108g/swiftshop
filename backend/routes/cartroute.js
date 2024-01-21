const express = require("express");
const cartcontroller = require("./../controllers/cartController");
const router = express.Router();
const authcontroller = require("./../controllers/authentication");
router
  .route("/")
  .get(authcontroller.protect, cartcontroller.getcartbyid)
  .post(authcontroller.protect, cartcontroller.addcart);
module.exports = router;
