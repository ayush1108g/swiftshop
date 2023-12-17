const cartModel = require("../models/cart_model");

exports.getcartbyid = async (req, res) => {
  try {
    const cart = await cartModel.find({ id: req.params.id });
    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
    });
  }
};

exports.addcart = async (req, res) => {
  const userid = req.params.id;
  const productid = req.body.product_id;
  try {
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
        res.status(400).json({
          status: "fail",
          error: "Invalid quantity value",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
};
