const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const path = require("path");
const User = require("../models/user");
const Likes = require("../models/likes");
const saltRounds = 10;

module.exports.signUp = async (req, res) => {
  try {
    const errors = {};
    if (!validator.isEmail(req.body.email.trim()))
      errors.email = "Email is not valid";
    if (validator.isEmpty(req.body.password.trim()))
      errors.password = "Password is not valid";
    if (validator.isEmpty(req.body.handle.trim()))
      errors.handle = "Handle is not valid";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);
    let hash = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hash;
    let user = await User.create(req.body);
    let token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRY,
    });
    return res.status(201).json({
      success: true,
      token,
    });
  } catch (err) {
    console.log("error", err);
    if (err.code === 11000) {
      const handle = err.keyValue.handle;
      if (handle) {
        return res.status(400).json({
          success: false,
          handle: "this handle is already taken",
        });
      }
      const email = err.keyValue.email;
      if (email) {
        return res.status(400).json({
          success: false,
          email: "this email is already taken",
        });
      }
    }
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const errors = {};
    if (!validator.isEmail(req.body.email.trim()))
      errors.email = "Email is not valid";
    if (validator.isEmpty(req.body.password.trim()))
      errors.password = "Password is not valid";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res
        .status(422)
        .json({ success: false, error: "Inavlid username or password" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match)
      return res.status(200).json({
        success: true,
        message: "Sign in successful, here is your token, please keep it safe!",
        token: jwt.sign(user.toJSON(), process.env.JWT_KEY, {
          expiresIn: process.env.JWT_EXPIRY,
        }),
      });
    else {
      return res
        .status(422)
        .json({ success: false, error: "Inavlid username or password" });
    }
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({ success: false, error: err });
  }
};

module.exports.uploadImage = async (req, res) => {
  try {
    // console.log(req.file);
    // console.log(req.user);
    const {
      cloudinaryConfig,
      uploader,
    } = require("../config/cloudinaryConfig");
    const { dataUri } = require("../middlewares/multerUpload");
    cloudinaryConfig();
    const imageExt = path.extname(req.file.originalname).toString();
    if (imageExt !== ".png" && imageExt !== ".jpg" && imageExt !== ".jpeg") {
      return res.status(400).json({ success: false, error: "Wrong file type" });
    }
    const file = dataUri(req).content;
    const result = await uploader.upload(file);
    const imageUrl = result.url;
    const user = await User.findByIdAndUpdate(req.user._id, { imageUrl });
    return res.status(200).json({
      success: true,
      message: "Your image has been uploded successfully to cloudinary",
      imageUrl,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ success: false, error });
  }
};
function reduceUserDetails(data) {
  let userDeatils = {};
  if (!validator.isEmpty(data.bio.trim())) userDeatils.bio = data.bio.trim();
  if (!validator.isEmpty(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http") {
      userDeatils.website = `http://${data.website.trim()}`;
    } else {
      userDeatils.website = data.website;
    }
  }
  if (!validator.isEmpty(data.location.trim()))
    userDeatils.location = data.location.trim();
  return userDeatils;
}
module.exports.addUserDetails = async (req, res) => {
  try {
    let userDeatils = reduceUserDetails(req.body);
    console.log("userDetails", userDeatils);
    const user = await User.findByIdAndUpdate(req.user._id, { ...userDeatils });
    return res.json({
      success: true,
      message: "Details updated successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ success: false, error });
  }
};

module.exports.getUserInfo = async (req, res) => {
  try {
    let userData = {};
    const user = await User.findById(req.user._id);
    userData.credentials = user;
    const likes = await likes.find({ userHandle: req.user.handle });
    userData.likes = likes;
    res.status(200).json(userData);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ success: false, error });
  }
};
