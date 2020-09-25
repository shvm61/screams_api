const mongoose = require("mongoose");

const screamsSchema = new mongoose.Schema(
  {
    userHandle: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
    },
    commentCount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Screams = mongoose.model("Scream", screamsSchema);

module.exports = Screams;
