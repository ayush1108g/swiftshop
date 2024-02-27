const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
var Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  general: String,
});

const signupmodel = new Schema({
  name: {
    type: "string",
    required: [true, "Please tell us your name"],
  },
  phoneno: {
    type: "Number",
    required: [true, "Please tell us your phone number"],
  },
  emailid: {
    type: "string",
    required: [true, "Please provide your email"],
    unique: true,
  },
  image: {
    type: "string",
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  address: addressSchema,
  role: {
    type: String,
    enum: ["user", "retailer", "admin"],
    default: "user",
  },
  registrationDate: {
    type: Date,
    default: Date.now,
    select: false,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
    select: false,
  },
  password: {
    type: "string",
    required: [true, "Please provide a password"],
  },

  passwordChangedAt: Date,
  resetPasswordToken: {
    type: "string",
  },
  passwordresetexpired: Date,
});
signupmodel.pre("save", async function (next) {
  if (!this.isModified("password") || !this.isNew) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
signupmodel.pre("save", function (next) {
  if (!this.isModified("password") || !this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
signupmodel.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
signupmodel.methods.createpasswordresetpassword = function () {
  const resetToken = Math.floor(Math.random() * 100000) + 100000;

  this.resetPasswordToken = resetToken;
  console.log({ resetToken }, this.resetPasswordToken);

  this.passwordresetexpired = Date.now() + 600000;

  return resetToken;
};
signupmodel.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
const User = mongoose.model("user1", signupmodel);

module.exports = User;
