const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userHandle: {
      type: String,
      required: [true, "handle is required"],
    },
    screamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screams",
    },
    body: {
      type: String,
    },
    userImage: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comment", commentSchema);

module.exports = Comments;
