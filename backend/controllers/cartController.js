const cartModel = require("../models/cart_model");
const catchasync = require("../utils/catchasync");
const AppError = require("../utils/appError");

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
