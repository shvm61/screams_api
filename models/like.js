const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    userHandle: {
      type: String,
      required: [true, "handle is required"],
      unique: true,
    },
    screamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screams",
    },
  },
  {
    timestamps: true,
  }
);

const Likes = mongoose.model("Like", likeSchema);

module.exports = Likes;
