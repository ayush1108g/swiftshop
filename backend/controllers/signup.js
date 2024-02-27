const crypto = require("crypto");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const usersignup = require("./../models/login/login");
const catchasync = require("./../utils/catchAsync");
const email = require("./../utils/nodemailer");
const AppError = require("./../utils/appError");
const authentication = require("./authentication");

exports.verifytoken = catchasync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "token verified",
    name: req.user.name,
  });
});
exports.signup = catchasync(async (req, res) => {
  const newusersignup = await usersignup.create(req.body);
  // res.status(200).json({
  //   status: "done",
  //   data: {
  //     usersignup: newusersignup,
  //   },
  // });
  authentication.createSendToken(newusersignup, 201, res);
});
exports.login = catchasync(async (req, res, next) => {
  const { emailid, password } = req.body;
  if (!emailid || !password) {
    return next(new AppError("please provide email and password", 400));
  }
  const user = await usersignup.findOne({ emailid }).select("+password");
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }
  console.log(user);
  authentication.createSendToken(user, 200, res);
});

exports.forgotPassword = catchasync(async (req, res, next) => {
  const user = await usersignup.findOne({ emailid: req.body.emailid });
  if (!user)
    return next(new AppError("there is no user with that email address", 404));

  const resetToken = await user.createpasswordresetpassword();
  console.log(resetToken);
  await user.save();
  const code = resetToken;
  console.log(code);
  const message = `Your verification code is \n ${resetToken}\n If you didn't forget your password, please ignore this email!`;
  try {
    await email({
      email: user.emailid,
      subject: "Password Reset code",
      message,
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
    return next(
      new AppError("there was an error sending the email. try again later", 500)
    );
  }
});
exports.verifycode = catchasync(async (req, res, next) => {
  const hashtoken = req.body.code;
  console.log(hashtoken);
  const user = await usersignup.findOne({
    resetPasswordToken: hashtoken,
    passwordresetexpired: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("password reset code is invalid", 404));
  }
  res.status(200).json({
    status: "success",
    message: "go to next page",
  });
});

exports.resetPassword = catchasync(async (req, res, next) => {
  const hashtoken = req.params.token;
  console.log(hashtoken);
  const user = await usersignup.findOne({
    resetPasswordToken: hashtoken,
    passwordresetexpired: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("password reset code is invalid", 404));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.passwordresetexpired = undefined;
  await user.save();
  authentication.createSendToken(user, 200, res);
});

exports.getuserbyid = catchasync(async (req, res) => {
  // const id = req.params.id;
  // console.log(id);
  // let user = await usersignup.findById(id);
  // console.log(user);
  // const userData = {
  //   name: user.name,
  //   emailid: user.emailid,
  //   phoneno: user.phoneno,
  //   address: user.address,
  // };
  // res.status(200).json({
  //   status: "success",
  //   data: userData,
  // });
  const user = req.user;
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
});

exports.updateuser = catchasync(async (req, res) => {
  // console.log(req.params.id, req.body);
  // try {
  //   const user = await usersignup.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //     runValidators: true,
  //   });
  //   const userData = {
  //     name: user.name,
  //     emailid: user.emailid,
  //     phoneno: user.phoneno,
  //     address: user.address,
  //   };
  //   // console.log(data, req.body);
  //   res.status(201).json({
  //     status: "success",
  //     data: userData,
  //   });
  // } catch (err) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: err,
  //   });
  // }
  const user = req.user;
  user.name = req.body.name || user.name;
  user.emailid = req.body.emailid || user.emailid;
  user.phoneno = req.body.phoneno || user.phoneno;
  user.address = req.body.address || user.address;

  await user.save();
  authentication.createSendToken(user, 200, res);
});

exports.updatepass = catchasync(async (req, res) => {
  // const id = req.params.id;
  // // console.log(id, req.body);
  // const user = await usersignup.findById(id);
  // const x = await user.correctPassword(req.body.oldpassword, user.password);
  // // console.log(x);
  // try {
  //   if (!user || !x) {
  //     res.status(401).json({
  //       status: "fail",
  //       message: "username or password incorrect",
  //     });
  //   } else {
  //     user.password = req.body.newpassword;
  //     user.save();
  //     res.status(200).json({
  //       status: "success",
  //       message: "password updated successfully",
  //     });
  //   }
  // } catch (err) {
  //   res.status(403).json({
  //     status: "fail",
  //     message: err,
  //   });
  // }
  const user = req.user;
  console.log(req.body.oldpassword, user.password);
  if (!(await user.correctPassword(req.body.oldpassword, user.password))) {
    return next(new AppError("incorrect password", 401));
  }
  user.password = req.body.newpassword;
  await user.save();
  authentication.createSendToken(user, 200, res);
});

exports.getallusers = async (req, res) => {
  try {
    const users = await usersignup.find();
    res.status(200).json({
      status: "success",
      length: users.length,
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
