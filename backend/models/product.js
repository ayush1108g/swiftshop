const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Product = new Schema({
  uniq_id: {
    type: String,
    default: new Date().toISOString() + Math.random().toString(),
  },
  crawl_timestamp: {
    type: String,
    default: new Date().toISOString(),
  },
  product_name: {
    type: String,
    required: [true, "Product name is required"],
  },
  product_category_tree: {
    type: String,
    required: [true, "Product category is required"],
  },
  pid: {
    type: String,
    default: new Date().toISOString() + Math.random().toString(),
  },
  retail_price: {
    type: String,
    required: [true, "Retail price is required"],
  },
  discounted_price: {
    type: String,
    required: [true, "Discounted price is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  is_FK_Advantage_product: {
    type: String,
    required: [true, "Advantage product is required"],
    default: false,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  product_rating: {
    type: String,
    required: [true, "Product rating is required"],
  },
  overall_rating: {
    type: String,
    required: [true, "Overall rating is required"],
  },
  brand: {
    type: String,
    required: [true, "Brand is required"],
  },
  product_specifications: {
    type: String,
    required: [true, "Product specifications is required"],
  },
  new: {
    type: Boolean,
    required: [true, "New/old is required"],
  },
});
const Product1 = mongoose.model("product_data", Product);

module.exports = Product1;
