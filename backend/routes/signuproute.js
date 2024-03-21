const express = require("express");
const usersignupcontroller = require("./../controllers/signup");
const authcontroller = require("./../controllers/authentication");
const router = express.Router();

router
  .route("/verifytoken")
  .get(authcontroller.protect, usersignupcontroller.verifytoken);

router.route("/verifyrefreshtoken").get(authcontroller.verifyRefreshToken);

router.route("/signup").post(usersignupcontroller.signup);
router.route("/login").post(usersignupcontroller.login);
router.route("/forgotpassword").post(usersignupcontroller.forgotPassword);
router.route("/verifycode").post(usersignupcontroller.verifycode);
router.route("/resetpassword/:token").patch(usersignupcontroller.resetPassword);

router
  .route("/update")
  .get(authcontroller.protect, usersignupcontroller.getuserbyid)
  .put(authcontroller.protect, usersignupcontroller.updateuser);

router
  .route("/updatepassword")
  .put(authcontroller.protect, usersignupcontroller.updatepass);

router.route("/getall").get(usersignupcontroller.getallusers);

module.exports = router;
