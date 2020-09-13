const express = require("express");
const router = express.Router();

// const reportController = require("../controllers/report_controller");
console.log("router loaded");

router.get("/", (req, res) => {
  return res.status(200).json({
    msg: "hello",
  });
});

module.exports = router;
