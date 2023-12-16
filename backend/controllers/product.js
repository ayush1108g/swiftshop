const Product = require("./../models/product");

exports.productdetails = async (req, res) => {
  const searchWord = req.query.search;
  const query = {
    product_category_tree: { $regex: new RegExp(searchWord, "i") },
  };
  try {
    const newProduct = await Product.find(query);

    res.status(200).json({
      status: "success",
      results: newProduct.length,
      data: {
        newProduct,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.postproduct = async (req, res) => {
  try {
    const newproduct = await Product.create(req.body);
    res.status(201).json({
      message: "Feedback posted successfully",
      newproduct,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      massage: "Error while posting feedback",
    });
  }
};
