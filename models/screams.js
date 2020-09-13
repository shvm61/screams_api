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
  },
  {
    timestamps: true,
  }
);

const Screams = mongoose.model("Scream", screamsSchema);

module.exports = Screams;
