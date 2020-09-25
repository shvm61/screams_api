const express = require("express");
const router = express.Router();
const passport = require("passport");

const screamsController = require("../controllers/screamController");
router.get("/:id", screamsController.getScream);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  screamsController.createScream
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  screamsController.deleteScream
);
router.post(
  "/:id/comment",
  passport.authenticate("jwt", { session: false }),
  screamsController.commentOnScream
);
router.get(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  screamsController.likeScream
);

router.get(
  "/:id/unlike",
  passport.authenticate("jwt", { session: false }),
  screamsController.unLikeScream
);
module.exports = router;
