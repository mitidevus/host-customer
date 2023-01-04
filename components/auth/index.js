const express = require("express");
const router = express.Router();

const authController = require("./authController");
const passport = require("./passport");
const auth = require("../../middlewares/auth");

router.get("/register", authController.showRegistrationForm);
router.post("/register", authController.register);

router.get("/login", authController.showLoginForm);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    // failureRedirect: "/auth/login",
    failWithError: true,
  }),
  function (err, req, res, next) {
    // handle error
    return res.render('auth/login', { error: err.message });
  }
);

router.get("/forgotpassword", authController.showForgetPasswordForm);
router.post("/forgotpassword", authController.forgetPassword);

router.get("/resetpassword/:id", authController.showResetPasswordForm);
router.post("/resetpassword", authController.resetPassword);

router.get("/logout", auth, authController.logout);

module.exports = router;
