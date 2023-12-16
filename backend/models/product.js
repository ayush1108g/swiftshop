const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Product = new Schema({
    uniq_id: {
        type: String,
        required: true
    },
})
const Product1 = mongoose.model("product_data", Product);

module.exports = Product1;