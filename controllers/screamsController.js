const Screams = require("../models/screams");

module.exports.getAllScreams = async (req, res) => {
  try {
    let screams = [];
    let query = await Screams.find({}).sort("-createdAt");
    query.forEach((el) => {
      screams.push({
        screamId: el._id,
        body: el.body,
        userHandle: el.userHandle,
        createdAt: el.createdAt,
      });
    });
    return res.status(200).json(screams);
  } catch (err) {
    return res.status(500).json({
      msg: "error",
      error: err,
    });
  }
};
