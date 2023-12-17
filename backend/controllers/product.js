const Product = require("./../models/product");
const APIFeatures = require("./../utils/ApiFeatures");

exports.productdetails = async (req, res) => {
  const searchWord = req.query.search;
  console.log(searchWord);
  const query = {
    product_category_tree: { $regex: new RegExp(searchWord, "i") },
  };
  try {
    let newProduct;
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

    if (limit) {
      newProduct = await Product.aggregate([
        { $match: query },
        { $sample: { size: limit } },
      ]);
    } else {
      newProduct = await Product.find(query);
    }

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

exports.productbyid = async (req, res) => {
  const id = req.params.id;
  try {
    const prod = await Product.findById(id);
    res.status(200).json({
      status: "success",
      data: prod,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.productpage = async (req, res) => {
  console.log(req.query);
  const searchWord = req.query.search;
  console.log(searchWord);
  const query = {
    product_category_tree: { $regex: new RegExp(searchWord, "i") },
  };
  try {
    const features = new APIFeatures(Product.find(query), req.query)
      .sort()
      .paginate();
    const data = await features.query;

    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
