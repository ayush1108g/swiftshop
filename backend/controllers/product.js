const axios = require("axios");
const Product = require("./../models/product");
const Review = require("./../models/review_model");
const APIFeatures = require("./../utils/ApiFeatures");
const catchAsync = require("../utils/catchasync");

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
    req.body.new = true;
    const newproduct = await Product.create(req.body);
    res.status(201).json({
      message: "Product posted successfully",
      newproduct,
      prod_id: newproduct._id,
      url: "can view on /" + newproduct._id,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      massage: "Error while adding product",
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
    const totalLength = await Product.countDocuments(query);
    console.log(totalLength);
    const data = await features.query;

    res.status(200).json({
      status: "success",
      results: data.length,
      totalLength,
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.image = async (req, res) => {
  const query = req.query;
  const imglink = Object.keys(query)[0];
  // res.status(200).json({
  //   status: "success",
  //   message: "Successfully fetched image",
  //   link: imglink,
  // });
  try {
    const response = await axios.get(imglink, { responseType: "arraybuffer" });

    res.setHeader("Content-Type", response.headers["content-type"]);
    res.send(Buffer.from(response.data, "binary"));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.productreviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ product_id: req.params.id }).populate({
    path: "user_id",
    select: "name email image",
  });
  if (!reviews) {
    return next(new AppError("No reviews found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.postreview = catchAsync(async (req, res, next) => {
  const review = await Review.create({
    user_id: req.user._id,
    product_id: req.params.id,
    rating: req.body.rating,
    title: req.body.title,
    description: req.body.description,
  });
  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});
