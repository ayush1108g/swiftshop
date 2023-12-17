const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const cart = new Schema({
  id: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cart1 = mongoose.model("cart", cart);
module.exports = cart1;
