const Screams = require("../models/screams");

module.exports.getAllScreams = async (req, res) => {
  try {
    let screams = await Screams.find({}).sort("-createdAt");
    return res.status(200).json({ success: true, screams });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
