const crypto = require("crypto");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const usersignup = require("./../models/login/login");
const catchasync = require("./../utils/catchasync");
const email = require("./../utils/nodemailer");

exports.signup = async (req, res) => {
  try {
    const newusersignup = await usersignup.create(req.body);
    res.status(200).json({
      // token,
      status: "done",
      data: {
        usersignup: newusersignup,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
    });
  }
};
exports.login = catchasync(async (req, res, next) => {
  const { emailid, password } = req.body;
  if (!emailid || !password) {
    res.status(400).json({
      message: "email or password missing",
    });
  }
  const user = await usersignup.findOne({ emailid }).select("+password");
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      status: "fail",
      message: "username or password incorrect",
    });
  } else {
    res.status(200).json({
      status: "success",
      name: user.name,
      address: user.address,
      phoneno: user.phoneno,
      id: user.id,
    });
  }
});

exports.forgotPassword = catchasync(async (req, res, next) => {
  const user = await usersignup.findOne({ emailid: req.body.emailid });
  if (!user)
    return res.status(404).json({ masg: "no such user with this email id" });

  const resetToken = await user.createpasswordresetpassword();
  console.log(resetToken);
  await user.save();
  const code = resetToken;
  console.log(code);
  const message = `Your verification code is \n ${resetToken}\n you didn't forget your password, please ignore this email!`;
  try {
    await email({
      email: user.emailid,
      subject: "Password Reset code",
      message,
      // html: `<a href="${resetUrl}">Reset Password</a>`,
    });
    res.status(200).json({
      status: "success",
      message: "password reset link sent to your email",
      resetToken,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);
    massage: "reset link invalid";
  }
});
exports.verifycode = async (req, res, next) => {
  const hashtoken = req.body.code;
  console.log(hashtoken);
  const user = await usersignup.findOne({
    resetPasswordToken: hashtoken,
    passwordresetexpired: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "your code is invalid",
    });
  }
  res.status(200).json({
    status: "success",
    message: "go to next page",
  });
};
exports.resetPassword = async (req, res, next) => {
  const hashtoken = req.params.token;
  console.log(hashtoken);
  const user = await usersignup.findOne({
    resetPasswordToken: hashtoken,
    passwordresetexpired: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "password reset link is invalid",
    });
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.passwordresetexpired = undefined;
  user.save();
  res.status(200).json({
    status: "success",
    message: "password changed successfully",
  });
};

exports.getuserbyid = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    let user = await usersignup.findById(id);
    console.log(user);
    const userData = {
      name: user.name,
      emailid: user.emailid,
      phoneno: user.phoneno,
      address: user.address,
    };
    res.status(200).json({
      status: "success",
      data: userData,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateuser = async (req, res) => {
  // console.log(req.params.id, req.body);
  try {
    const user = await usersignup.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const userData = {
      name: user.name,
      emailid: user.emailid,
      phoneno: user.phoneno,
      address: user.address,
    };
    // console.log(data, req.body);
    res.status(201).json({
      status: "success",
      data: userData,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updatepass = async (req, res) => {
  const id = req.params.id;
  // console.log(id, req.body);
  const user = await usersignup.findById(id);
  const x = await user.correctPassword(req.body.oldpassword, user.password);
  // console.log(x);
  try {
    if (!user || !x) {
      res.status(401).json({
        status: "fail",
        message: "username or password incorrect",
      });
    } else {
      user.password = req.body.newpassword;
      user.save();
      res.status(200).json({
        status: "success",
        message: "password updated successfully",
      });
    }
  } catch (err) {
    res.status(403).json({
      status: "fail",
      message: err,
    });
  }
};
