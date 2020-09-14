const Users = require("../models/user");

module.exports.signUp = async (req, res) => {
  try {
    let user = await Users.create(req.body);
    return res.status(201).json({
      response: "success",
      msg: "successfully signed up",
      id: user._id,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      msg: "error",
      error: err,
    });
  }
};
