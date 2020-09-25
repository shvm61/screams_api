const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController");
const multerUpload = require("../middlewares/multerUpload");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.getUserInfo
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.addUserDetails
);
router.get("/:handle", userController.getUserDetails);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post(
  "/image",
  [
    multerUpload.multerUploads,
    passport.authenticate("jwt", { session: false }),
  ],
  userController.uploadImage
);
module.exports = router;
