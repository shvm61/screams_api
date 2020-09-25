const Screams = require("../models/screams");
const Comment = require("../models/comment");

module.exports.createScream = async (req, res) => {
  try {
    console.log(req.body);
    let scream = await Screams.create({
      userHandle: req.user.handle,
      body: req.body.body,
    });
    return res.status(200).json({
      success: true,
      message: "successfully created",
      id: scream._id,
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
        .json({ success: false, error: "Must not be empty" });

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
    return res.status(201).json(comment);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
