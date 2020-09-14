const express = require("express");
const router = express.Router();
const passport = require("passport");

const screamsController = require("../controllers/screamController");
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  screamsController.createScream
);

module.exports = router;
