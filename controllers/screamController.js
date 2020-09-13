const Screams = require("../models/screams");

module.exports.createScream = async (req, res) => {
  try {
    let scream = await Screams.create(req.body);
    return res.status(200).json({
      response: "success",
      msg: "successfully created",
      id: scream._id,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      msg: "error",
      error: err,
    });
  }
};
