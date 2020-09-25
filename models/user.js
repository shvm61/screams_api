const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    handle: {
      type: String,
      required: [true, "handle is required"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/kal61/image/upload/v1601015005/sslshiwoftfz9w05z933.jpg",
    },
    bio: {
      type: String,
    },
    website: {
      type: String,
    },
    location: { type: String },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", userSchema);

module.exports = Users;
