const express = require("express");
const cartcontroller = require("./../controllers/cartController");
const router = express.Router();

router
  .route("/:id")
  .get(cartcontroller.getcartbyid)
  .post(cartcontroller.addcart);
module.exports = router;
