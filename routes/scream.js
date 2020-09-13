const express = require("express");
const router = express.Router();

const screamsController = require("../controllers/screamController");
router.post("/", screamsController.createScream);

module.exports = router;
