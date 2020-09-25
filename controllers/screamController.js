const Screams = require("../models/screams");
const Comment = require("../models/comment");
const Likes = require("../models/like");

module.exports.createScream = async (req, res) => {
  try {
    console.log(req.body);
    let scream = await Screams.create({
      userHandle: req.user.handle,
      body: req.body.body,
      likeCount: 0,
      commentCount: 0,
      userImage: req.user.imageUrl,
    });

    let resScream = scream.toObject();
    return res.status(200).json({
      success: true,
      ...resScream,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

module.exports.getScream = async (req, res) => {
  try {
    let screamData = {};
    let scream = await Screams.findById(req.params.id);
    // console.log(scream);
    if (!scream) {
      return res.status(404).json({
        success: false,
        error: "Scream not found",
      });
    }
    screamData = scream.toObject();
    // console.log(screamData);
    let comments = await Comment.find({ screamId: req.params.id }).sort(
      "-createdAt"
    );

    // console.log("comments", comments);
    screamData.comments = comments;
    // console.log("scream data", screamData);
    return res.status(200).json(screamData);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

module.exports.commentOnScream = async (req, res) => {
  try {
    if (req.body.body.trim() === "")
      return res
        .status(400)
        .json({ success: false, comment: "Must not be empty" });

    let scream = await Screams.findById(req.params.id);
    if (!scream) {
      return res.status(404).json({
        success: false,
        error: "Scream not found",
      });
    }
    let comment = await Comment.create({
      body: req.body.body,
      screamId: req.params.id,
      userHandle: req.user.handle,
      userImage: req.user.imageUrl,
    });
    scream.commentCount += 1;
    await scream.save();
    comment = comment.toObject();
    return res
      .status(201)
      .json({ ...comment, commentCount: scream.commentCount });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

module.exports.likeScream = async (req, res) => {
  try {
    const likes = await Likes.find({
      userHandle: req.user.handle,
      screamId: req.params.id,
    });

    const scream = await Screams.findById(req.params.id);
    if (!scream) {
      return res.status(404).json({
        success: false,
        error: "Scream not found",
      });
    }
    let newLike;
    if (likes.length === 0) {
      newLike = await Likes.create({
        userHandle: req.user.handle,
        screamId: req.params.id,
      });
      scream.likeCount += 1;
      await scream.save();
    } else {
      return res.status(404).json({
        success: false,
        error: "Scream already liked",
      });
    }
    return res.status(200).json({
      userHandle: req.user.handle,
      likeCount: scream.likeCount,
      body: scream.body,
      createdAt: newLike.createdAt,
      screamId: scream.id,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

module.exports.unLikeScream = async (req, res) => {
  try {
    const likes = await Likes.find({
      userHandle: req.user.handle,
      screamId: req.params.id,
    });

    const scream = await Screams.findById(req.params.id);
    if (!scream) {
      return res.status(404).json({
        success: false,
        error: "Scream not found",
      });
    }

    if (likes.length !== 0) {
      await Likes.findByIdAndDelete(likes[0]._id);
      if (scream.likeCount > 0) scream.likeCount -= 1;
      await scream.save();
    } else {
      return res.status(404).json({
        success: false,
        error: "Scream not liked",
      });
    }
    return res.status(200).json({
      userHandle: req.user.handle,
      likeCount: scream.likeCount,
      body: scream.body,
      screamId: scream.id,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

module.exports.deleteScream = async (req, res) => {
  try {
    let scream = await Screams.findById(req.params.id);
    if (!scream) {
      return res.status(404).json({
        success: false,
        error: "Scream doesnt Exist",
      });
    }
    if (scream.userHandle !== req.user.handle) {
      return res.status(404).json({
        success: false,
        error: "Unauthorised request",
      });
    }
    await Screams.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Scream deleted!" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
