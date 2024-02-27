const cartModel = require("../models/cart_model");
const wishModel = require("../models/wishlist_model");

const catchasync = require("./../utils/catchAsync.js");
const AppError = require("./../utils/appError");

exports.getcartbyid = catchasync(async (req, res, next) => {
  const userid = req.user._id;
  const cart = await cartModel.find({ id: userid });
  console.log(cart.length);
  if (cart.length == 0)
    return next(new AppError("No cart found with that ID", 404));
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.addcart = catchasync(async (req, res, next) => {
  const userid = req.user._id;
  const productid = req.body.product_id;
  const existingCartItem = await cartModel.findOne({
    id: userid,
    product_id: productid,
  });

  if (existingCartItem) {
    if (req.body.quantity * 1 === 0) {
      await cartModel.findByIdAndDelete(existingCartItem._id);

      res.status(200).json({
        status: "success",
        data: {
          message: "Cart item deleted",
        },
      });
    } else {
      existingCartItem.quantity =
        req.body.quantity || existingCartItem.quantity + 1;
      await existingCartItem.save();

      res.status(200).json({
        status: "success",
        data: {
          cart: existingCartItem,
        },
      });
    }
  } else {
    if (req.body.quantity * 1 !== 0) {
      const newCartItem = await cartModel.create({
        id: userid,
        product_id: productid,
        quantity: req.body.quantity || 1,
      });

      res.status(200).json({
        status: "success",
        data: {
          cart: newCartItem,
        },
      });
    } else {
      return next(new AppError("Invalid quantity value", 400));
      // res.status(400).json({
      //   status: "fail",
      //   error: "Invalid quantity value",
      // });
    }
  }
});

exports.getwishlist = catchasync(async (req, res, next) => {
  const userid = req.user._id;
  const wishlist = await wishModel.find({ id: userid });
  console.log(wishlist.length);
  if (wishlist.length == 0)
    return next(new AppError("No wish item found with that ID", 404));
  res.status(200).json({
    status: "success",
    data: {
      wishlist,
    },
  });
});

exports.addwishlist = catchasync(async (req, res, next) => {
  const userid = req.user._id;
  const productid = req.body.product_id;
  const existingWishItem = await wishModel.findOne({
    id: userid,
    product_id: productid,
  });

  if (existingWishItem) {
    if (req.body.quantity * 1 === 0) {
      await wishModel.findByIdAndDelete(existingWishItem._id);

      res.status(200).json({
        status: "success",
        data: {
          message: "Wish item deleted",
        },
      });
    } else {
      existingWishItem.quantity =
        req.body.quantity || existingWishItem.quantity + 1;
      await existingWishItem.save();

      res.status(200).json({
        status: "success",
        data: {
          wishlist: existingWishItem,
        },
      });
    }
  } else {
    if (req.body.quantity * 1 !== 0) {
      const newWishItem = await wishModel.create({
        id: userid,
        product_id: productid,
        quantity: req.body.quantity || 1,
      });

      res.status(200).json({
        status: "success",
        data: {
          wishlist: newWishItem,
        },
      });
    } else {
      return next(new AppError("Invalid quantity value", 400));
      // res.status(400).json({
      //   status: "fail",
      //   error: "Invalid quantity value",
      // });
    }
  }
});
