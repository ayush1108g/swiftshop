const crypto = require("crypto");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchasync = require("../utils/catchasync.js");
const usersignup = require("./../models/login/login");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  const token = jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  console.log(token);
  return token;
};

const createSendToken = catchasync(async (user, statusCode, res) => {
  user.lastlogin = Date.now();
  await user.save({ validateBeforeSave: false });
  const token = signToken({ id: user._id });
  const cookieoptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    withCredentials: true,
    // httpOnly: true,
    // domain: ".github.io",
    // domain: "localhost",
    // path: "/winter_code_week_2/#/",
    path: "/",
    secure: true,
    sameSite: "None",
    httpOnly: false,
  };
  // if (process.env.NODE_ENV === "production") cookieoptions.secure = true;
  // console.log(cookieoptions);
  res.cookie("token", token, cookieoptions);
  // console.log(token);
  // console.log(user);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
});

const protect = catchasync(async (req, res, next) => {
  // console.log("hello ");
  let token;
  // console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("you are not logged in", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await usersignup.findById(decoded.id).select("+password");
  // console.log(currentUser);
  if (!currentUser) {
    return next(
      new AppError("the user belonging to this token does not exist", 401)
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("user recently changed password! please login again", 401)
    );
  }
  req.user = currentUser;
  next();
});

module.exports = {
  signToken,
  createSendToken,
  protect,
};
