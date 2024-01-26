const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const wish = new Schema({
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

const wishlist = mongoose.model("wishlist", wish);
module.exports = wishlist;
